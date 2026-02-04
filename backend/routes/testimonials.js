const express = require('express');
const { body, validationResult } = require('express-validator');
const Testimonial = require('../models/Testimonial');
const { authenticateAdmin } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/testimonials
// @desc    Get all approved testimonials
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { limit = 10, featured } = req.query;
    
    let query = { status: 'approved' };
    if (featured === 'true') {
      query.featured = true;
    }
    
    const testimonials = await Testimonial.find(query)
      .sort({ featured: -1, displayOrder: 1, createdAt: -1 })
      .limit(parseInt(limit));
    
    res.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    console.error('Testimonials fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch testimonials'
    });
  }
});

// @route   GET /api/testimonials/featured
// @desc    Get featured testimonials
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const { limit = 6 } = req.query;
    const testimonials = await Testimonial.getFeatured(parseInt(limit));
    
    res.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    console.error('Featured testimonials fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch featured testimonials'
    });
  }
});

// Validation rules for testimonial submission
const testimonialValidation = [
  body('clientName').trim().isLength({ min: 2, max: 100 }).withMessage('Client name must be between 2 and 100 characters'),
  body('clientEmail').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('company').optional().trim().isLength({ max: 100 }).withMessage('Company name cannot exceed 100 characters'),
  body('role').optional().trim().isLength({ max: 100 }).withMessage('Role cannot exceed 100 characters'),
  body('projectName').optional().trim().isLength({ max: 200 }).withMessage('Project name cannot exceed 200 characters'),
  body('testimonial').trim().isLength({ min: 20, max: 1000 }).withMessage('Testimonial must be between 20 and 1000 characters'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
];

// @route   POST /api/testimonials
// @desc    Submit a new testimonial (Client)
// @access  Public
router.post('/', testimonialValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const testimonial = new Testimonial({
      ...req.body,
      status: 'pending' // All submissions start as pending
    });
    
    await testimonial.save();
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your testimonial! It will be reviewed and published soon.',
      data: testimonial
    });
  } catch (error) {
    console.error('Testimonial submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to submit testimonial'
    });
  }
});

// @route   GET /api/testimonials/admin/all
// @desc    Get all testimonials (Admin only)
// @access  Private
router.get('/admin/all', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    
    let filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { clientName: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { projectName: { $regex: search, $options: 'i' } }
      ];
    }
    
    const testimonials = await Testimonial.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await Testimonial.countDocuments(filter);
    
    res.json({
      success: true,
      data: {
        testimonials,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / parseInt(limit)),
          count: testimonials.length,
          totalTestimonials: total
        }
      }
    });
  } catch (error) {
    console.error('Admin testimonials fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch testimonials'
    });
  }
});

// @route   PUT /api/testimonials/:id/status
// @desc    Update testimonial status (Admin only)
// @access  Private
router.put('/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }
    
    testimonial.status = status;
    await testimonial.save();
    
    res.json({
      success: true,
      message: `Testimonial ${status} successfully`,
      data: testimonial
    });
  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to update testimonial status'
    });
  }
});

// @route   POST /api/testimonials/:id/toggle-featured
// @desc    Toggle featured status (Admin only)
// @access  Private
router.post('/:id/toggle-featured', authenticateAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }
    
    testimonial.featured = !testimonial.featured;
    await testimonial.save();
    
    res.json({
      success: true,
      message: `Testimonial ${testimonial.featured ? 'featured' : 'unfeatured'} successfully`,
      data: { featured: testimonial.featured }
    });
  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to toggle featured status'
    });
  }
});

// @route   PUT /api/testimonials/:id
// @desc    Update testimonial (Admin only)
// @access  Private
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }
    
    Object.assign(testimonial, req.body);
    await testimonial.save();
    
    res.json({
      success: true,
      message: 'Testimonial updated successfully',
      data: testimonial
    });
  } catch (error) {
    console.error('Testimonial update error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to update testimonial'
    });
  }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete testimonial (Admin only)
// @access  Private
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }
    
    await Testimonial.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    console.error('Testimonial deletion error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to delete testimonial'
    });
  }
});

module.exports = router;
