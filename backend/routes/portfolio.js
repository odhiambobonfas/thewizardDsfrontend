const express = require('express');
const { body, validationResult } = require('express-validator');
const Portfolio = require('../models/Portfolio');
const { uploadImage, deleteImage } = require('../utils/cloudinaryService');
const { authenticateAdmin } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/portfolio
// @desc    Get all published portfolio projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit = 20, page = 1, search } = req.query;
    
    let filter = { status: 'published' };
    
    if (category) {
      filter.category = category;
    }
    
    if (featured === 'true') {
      filter.featured = true;
    }
    
    let query = Portfolio.find(filter);
    
    if (search) {
      query = Portfolio.search(search, { limit: parseInt(limit) });
    } else {
      query = query
        .sort({ featured: -1, priority: -1, createdAt: -1 })
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit));
    }
    
    const projects = await query.populate('analytics');
    const total = await Portfolio.countDocuments(filter);
    
    res.json({
      success: true,
      data: {
        projects,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / parseInt(limit)),
          count: projects.length,
          totalProjects: total
        }
      }
    });
    
  } catch (error) {
    console.error('Portfolio fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch portfolio projects'
    });
  }
});

// @route   GET /api/portfolio/featured
// @desc    Get featured portfolio projects
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const { limit = 6 } = req.query;
    const projects = await Portfolio.getFeatured(parseInt(limit));
    
    res.json({
      success: true,
      data: projects
    });
    
  } catch (error) {
    console.error('Featured portfolio fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch featured projects'
    });
  }
});

// @route   GET /api/portfolio/categories
// @desc    Get portfolio categories with counts
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Portfolio.aggregate([
      { $match: { status: 'published' } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          featured: { $sum: { $cond: ['$featured', 1, 0] } }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      success: true,
      data: categories
    });
    
  } catch (error) {
    console.error('Categories fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch categories'
    });
  }
});

// @route   GET /api/portfolio/:slug
// @desc    Get single portfolio project by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const project = await Portfolio.findOne({
      'seo.slug': req.params.slug,
      status: 'published'
    });
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Increment views
    await project.incrementViews();
    
    res.json({
      success: true,
      data: project
    });
    
  } catch (error) {
    console.error('Portfolio project fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch project'
    });
  }
});

// @route   POST /api/portfolio
// @desc    Create new portfolio project
// @access  Private (Admin only)
router.post('/', authenticateAdmin, [
  body('title').trim().isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
  body('description').trim().isLength({ min: 20, max: 1000 }).withMessage('Description must be between 20 and 1000 characters'),
  body('shortDescription').trim().isLength({ min: 10, max: 300 }).withMessage('Short description must be between 10 and 300 characters'),
  body('category').isIn(['web-development', 'mobile-app', 'desktop-app', 'cybersecurity', 'portfolio-website', 'full-stack', 'ui-ux-design', 'other']).withMessage('Invalid category'),
  body('technologies').isArray().withMessage('Technologies must be an array'),
  body('liveUrl').optional().isURL().withMessage('Live URL must be valid'),
  body('githubUrl').optional().matches(/^https?:\/\/(www\.)?github\.com\/.+/).withMessage('GitHub URL must be valid')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const project = new Portfolio(req.body);
    await project.save();
    
    res.status(201).json({
      success: true,
      message: 'Portfolio project created successfully',
      data: project
    });
    
  } catch (error) {
    console.error('Portfolio creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to create portfolio project'
    });
  }
});

// @route   PUT /api/portfolio/:id
// @desc    Update portfolio project
// @access  Private (Admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const project = await Portfolio.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    Object.assign(project, req.body);
    await project.save();
    
    res.json({
      success: true,
      message: 'Portfolio project updated successfully',
      data: project
    });
    
  } catch (error) {
    console.error('Portfolio update error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to update portfolio project'
    });
  }
});

// @route   DELETE /api/portfolio/:id
// @desc    Delete portfolio project
// @access  Private (Admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const project = await Portfolio.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Delete associated images from Cloudinary
    for (const image of project.images) {
      try {
        await deleteImage(image.publicId);
      } catch (imageError) {
        console.error('Image deletion error:', imageError);
      }
    }
    
    await Portfolio.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Portfolio project deleted successfully'
    });
    
  } catch (error) {
    console.error('Portfolio deletion error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to delete portfolio project'
    });
  }
});

// @route   POST /api/portfolio/:id/toggle-featured
// @desc    Toggle featured status of portfolio project
// @access  Private (Admin only)
router.post('/:id/toggle-featured', authenticateAdmin, async (req, res) => {
  try {
    const project = await Portfolio.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    await project.toggleFeatured();
    
    res.json({
      success: true,
      message: `Project ${project.featured ? 'featured' : 'unfeatured'} successfully`,
      data: { featured: project.featured }
    });
    
  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to toggle featured status'
    });
  }
});

module.exports = router;
