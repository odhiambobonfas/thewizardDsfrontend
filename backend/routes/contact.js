const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const Contact = require('../models/Contact');
const { sendContactNotification } = require('../utils/emailService');
const router = express.Router();

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 contact form submissions per windowMs
  message: {
    success: false,
    message: 'Too many contact form submissions. Please try again in 15 minutes.'
  }
});

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name cannot exceed 100 characters'),
  
  body('serviceType')
    .isIn([
      'web-development',
      'mobile-app',
      'desktop-app',
      'cybersecurity',
      'portfolio-website',
      'full-stack-solution',
      'consultation',
      'other'
    ])
    .withMessage('Please select a valid service type'),
  
  body('budget')
    .optional()
    .isIn(['under-5k', '5k-10k', '10k-25k', '25k-50k', 'over-50k', 'not-sure'])
    .withMessage('Please select a valid budget range'),
  
  body('timeline')
    .optional()
    .isIn(['asap', '1-month', '2-3-months', '3-6-months', 'flexible'])
    .withMessage('Please select a valid timeline'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
];

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', contactLimiter, contactValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      name,
      email,
      phone,
      company,
      serviceType,
      budget,
      timeline,
      message
    } = req.body;

    // Create contact entry
    const contact = new Contact({
      name,
      email,
      phone,
      company,
      serviceType,
      budget,
      timeline,
      message,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await contact.save();

    // Send notification email
    try {
      await sendContactNotification(contact);
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Continue execution even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.',
      data: {
        id: contact._id,
        submittedAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
});

// @route   GET /api/contact/stats
// @desc    Get contact form statistics
// @access  Public (limited data)
router.get('/stats', async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$serviceType',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const totalContacts = await Contact.countDocuments();
    const recentContacts = await Contact.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    res.json({
      success: true,
      data: {
        totalContacts,
        recentContacts,
        serviceTypeStats: stats
      }
    });

  } catch (error) {
    console.error('Contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch statistics'
    });
  }
});

module.exports = router;
