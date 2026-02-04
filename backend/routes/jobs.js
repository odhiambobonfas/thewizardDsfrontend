const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { authenticateAdmin } = require('../middleware/auth');

// Public Routes

// Get all active jobs
router.get('/', async (req, res) => {
  try {
    const { type, location, experienceLevel, department } = req.query;
    
    let filter = { status: 'active' };
    
    if (type) filter.type = type;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (experienceLevel) filter.experienceLevel = experienceLevel;
    if (department) filter.department = { $regex: department, $options: 'i' };
    
    const jobs = await Job.find(filter)
      .sort({ featured: -1, order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs',
      error: error.message
    });
  }
});

// Get featured jobs
router.get('/featured', async (req, res) => {
  try {
    const jobs = await Job.getFeatured();
    
    res.json({
      success: true,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching featured jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured jobs',
      error: error.message
    });
  }
});

// Get single job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findOne({ 
      _id: req.params.id,
      status: 'active'
    });
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    res.json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch job',
      error: error.message
    });
  }
});

// Admin Routes (Protected)

// Get all jobs for admin (including drafts and closed)
router.get('/admin/all', authenticateAdmin, async (req, res) => {
  try {
    const jobs = await Job.find()
      .sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs',
      error: error.message
    });
  }
});

// Create new job
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const jobData = {
      title: req.body.title,
      department: req.body.department,
      location: req.body.location,
      type: req.body.type || 'full-time',
      experienceLevel: req.body.experienceLevel || 'mid',
      description: req.body.description,
      responsibilities: req.body.responsibilities || [],
      requirements: req.body.requirements || [],
      benefits: req.body.benefits || [],
      skills: req.body.skills || [],
      salary: req.body.salary || {},
      applicationDeadline: req.body.applicationDeadline,
      status: req.body.status || 'active',
      featured: req.body.featured || false,
      order: req.body.order || 0
    };

    const job = new Job(jobData);
    await job.save();

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create job',
      error: error.message
    });
  }
});

// Update job
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Update fields
    if (req.body.title) job.title = req.body.title;
    if (req.body.department) job.department = req.body.department;
    if (req.body.location) job.location = req.body.location;
    if (req.body.type) job.type = req.body.type;
    if (req.body.experienceLevel) job.experienceLevel = req.body.experienceLevel;
    if (req.body.description) job.description = req.body.description;
    if (req.body.responsibilities) job.responsibilities = req.body.responsibilities;
    if (req.body.requirements) job.requirements = req.body.requirements;
    if (req.body.benefits) job.benefits = req.body.benefits;
    if (req.body.skills) job.skills = req.body.skills;
    if (req.body.salary) job.salary = req.body.salary;
    if (req.body.applicationDeadline) job.applicationDeadline = req.body.applicationDeadline;
    if (req.body.status) job.status = req.body.status;
    if (req.body.featured !== undefined) job.featured = req.body.featured;
    if (req.body.order !== undefined) job.order = req.body.order;

    await job.save();

    res.json({
      success: true,
      message: 'Job updated successfully',
      data: job
    });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update job',
      error: error.message
    });
  }
});

// Delete job
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    await job.deleteOne();

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete job',
      error: error.message
    });
  }
});

// Toggle featured status
router.post('/:id/toggle-featured', authenticateAdmin, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    job.featured = !job.featured;
    await job.save();

    res.json({
      success: true,
      message: `Job ${job.featured ? 'featured' : 'unfeatured'} successfully`,
      data: job
    });
  } catch (error) {
    console.error('Error toggling featured status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle featured status',
      error: error.message
    });
  }
});

// Update job status
router.patch('/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['active', 'closed', 'draft'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    job.status = status;
    await job.save();

    res.json({
      success: true,
      message: 'Job status updated successfully',
      data: job
    });
  } catch (error) {
    console.error('Error updating job status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update job status',
      error: error.message
    });
  }
});

module.exports = router;
