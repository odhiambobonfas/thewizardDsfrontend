const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Job');
const cloudinary = require('../utils/cloudinaryService');
const multer = require('multer');
const { authenticateAdmin } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'), false);
    }
  }
});

// @route   POST /api/applications
// @desc    Submit job application
// @access  Public
router.post('/', upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'CV file is required' });
    }

    const { jobId, firstName, lastName, email, phone, location, linkedIn, portfolio, coverLetter, experience, currentCompany, currentPosition, availableFrom, expectedSalary } = req.body;

    // Validate required fields
    if (!jobId || !firstName || !lastName || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Check if user already applied for this job
    const existingApplication = await Application.findOne({ jobId, email });
    if (existingApplication) {
      return res.status(400).json({ success: false, message: 'You have already applied for this position' });
    }

    // Upload CV to Cloudinary
    const cvUploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'job-applications',
          resource_type: 'raw',
          public_id: `cv_${Date.now()}_${email.split('@')[0]}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    // Create application
    const application = new Application({
      jobId,
      jobTitle: job.title,
      firstName,
      lastName,
      email,
      phone,
      location,
      linkedIn,
      portfolio,
      coverLetter,
      cv: {
        url: cvUploadResult.secure_url,
        publicId: cvUploadResult.public_id,
        fileName: req.file.originalname
      },
      experience: experience ? parseInt(experience) : 0,
      currentCompany,
      currentPosition,
      availableFrom: availableFrom ? new Date(availableFrom) : null,
      expectedSalary
    });

    await application.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ success: false, message: error.message || 'Error submitting application' });
  }
});

// @route   GET /api/applications/stats/overview
// @desc    Get application statistics (admin only)
// @access  Private
router.get('/stats/overview', authenticateAdmin, async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();
    const pendingApplications = await Application.countDocuments({ status: 'pending' });
    const shortlistedApplications = await Application.countDocuments({ status: 'shortlisted' });
    const interviewedApplications = await Application.countDocuments({ status: 'interviewed' });

    const applicationsByJob = await Application.aggregate([
      {
        $group: {
          _id: '$jobId',
          count: { $sum: 1 },
          jobTitle: { $first: '$jobTitle' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      data: {
        total: totalApplications,
        pending: pendingApplications,
        shortlisted: shortlistedApplications,
        interviewed: interviewedApplications,
        topJobs: applicationsByJob
      }
    });
  } catch (error) {
    console.error('Error fetching application stats:', error);
    res.status(500).json({ success: false, message: 'Error fetching application stats' });
  }
});

// @route   GET /api/applications
// @desc    Get all applications (admin only)
// @access  Private
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const { jobId, status, page = 1, limit = 20 } = req.query;
    const query = {};

    if (jobId) query.jobId = jobId;
    if (status) query.status = status;

    const applications = await Application.find(query)
      .populate('jobId', 'title department location type')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Application.countDocuments(query);

    res.json({
      success: true,
      data: applications,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ success: false, message: 'Error fetching applications' });
  }
});

// @route   GET /api/applications/:id
// @desc    Get single application (admin only)
// @access  Private
router.get('/:id', authenticateAdmin, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('jobId', 'title department location type experienceLevel');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.json({ success: true, data: application });
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ success: false, message: 'Error fetching application' });
  }
});

// @route   PUT /api/applications/:id/status
// @desc    Update application status (admin only)
// @access  Private
router.put('/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { status, notes } = req.body;

    const validStatuses = ['pending', 'reviewing', 'shortlisted', 'interviewed', 'offered', 'rejected', 'withdrawn'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    application.status = status;
    if (notes) application.notes = notes;
    await application.save();

    res.json({
      success: true,
      message: 'Application status updated',
      data: application
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ success: false, message: 'Error updating application status' });
  }
});

// @route   DELETE /api/applications/:id
// @desc    Delete application (admin only)
// @access  Private
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Delete CV from Cloudinary
    if (application.cv?.publicId) {
      await cloudinary.uploader.destroy(application.cv.publicId, { resource_type: 'raw' });
    }

    await Application.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ success: false, message: 'Error deleting application' });
  }
});

module.exports = router;
