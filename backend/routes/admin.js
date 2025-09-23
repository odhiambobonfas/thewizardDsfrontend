const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const Contact = require('../models/Contact');
const Portfolio = require('../models/Portfolio');
const { authenticateAdmin } = require('../middleware/auth');
const router = express.Router();

// Rate limiting for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per windowMs
  message: {
    success: false,
    message: 'Too many login attempts. Please try again in 15 minutes.'
  }
});

// @route   POST /api/admin/login
// @desc    Admin login
// @access  Public
router.post('/login', loginLimiter, [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
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

    const { email, password } = req.body;

    // Check admin credentials (in production, use database)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@thewizards.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (email !== adminEmail) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // In production, hash the password and store in database
    const isValidPassword = password === adminPassword;
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: 'admin',
        email: adminEmail,
        role: 'admin'
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: 'admin',
          email: adminEmail,
          role: 'admin'
        }
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard data
// @access  Private (Admin only)
router.get('/dashboard', authenticateAdmin, async (req, res) => {
  try {
    // Get contact statistics
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const recentContacts = await Contact.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    // Get portfolio statistics
    const totalProjects = await Portfolio.countDocuments();
    const publishedProjects = await Portfolio.countDocuments({ status: 'published' });
    const featuredProjects = await Portfolio.countDocuments({ featured: true });

    // Get service type breakdown
    const serviceStats = await Contact.aggregate([
      {
        $group: {
          _id: '$serviceType',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Get recent contacts
    const recentContactsList = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('name email serviceType status createdAt');

    // Get monthly contact trends
    const monthlyContacts = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          totalContacts,
          newContacts,
          recentContacts,
          totalProjects,
          publishedProjects,
          featuredProjects
        },
        serviceStats,
        recentContacts: recentContactsList,
        monthlyTrends: monthlyContacts
      }
    });

  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch dashboard data'
    });
  }
});

// @route   GET /api/admin/contacts
// @desc    Get all contacts with filtering and pagination
// @access  Private (Admin only)
router.get('/contacts', authenticateAdmin, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      serviceType, 
      priority,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    let filter = {};
    
    if (status) filter.status = status;
    if (serviceType) filter.serviceType = serviceType;
    if (priority) filter.priority = priority;
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const contacts = await Contact.find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / parseInt(limit)),
          count: contacts.length,
          totalContacts: total
        }
      }
    });

  } catch (error) {
    console.error('Admin contacts fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch contacts'
    });
  }
});

// @route   PUT /api/admin/contacts/:id
// @desc    Update contact status/notes
// @access  Private (Admin only)
router.put('/contacts/:id', authenticateAdmin, async (req, res) => {
  try {
    const { status, priority, notes } = req.body;
    
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    if (status) contact.status = status;
    if (priority) contact.priority = priority;
    if (notes !== undefined) contact.notes = notes;

    await contact.save();

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Contact update error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to update contact'
    });
  }
});

// @route   DELETE /api/admin/contacts/:id
// @desc    Delete contact
// @access  Private (Admin only)
router.delete('/contacts/:id', authenticateAdmin, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });

  } catch (error) {
    console.error('Contact deletion error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to delete contact'
    });
  }
});

// @route   GET /api/admin/portfolio
// @desc    Get all portfolio projects for admin
// @access  Private (Admin only)
router.get('/portfolio', authenticateAdmin, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      category, 
      featured,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    let filter = {};
    
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (featured !== undefined) filter.featured = featured === 'true';
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const projects = await Portfolio.find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

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
    console.error('Admin portfolio fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch portfolio projects'
    });
  }
});

// @route   GET /api/admin/stats
// @desc    Get comprehensive admin statistics
// @access  Private (Admin only)
router.get('/stats', authenticateAdmin, async (req, res) => {
  try {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Contact statistics
    const contactStats = {
      total: await Contact.countDocuments(),
      thisMonth: await Contact.countDocuments({ createdAt: { $gte: lastMonth } }),
      thisWeek: await Contact.countDocuments({ createdAt: { $gte: lastWeek } }),
      byStatus: await Contact.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      byService: await Contact.aggregate([
        { $group: { _id: '$serviceType', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
    };

    // Portfolio statistics
    const portfolioStats = {
      total: await Portfolio.countDocuments(),
      published: await Portfolio.countDocuments({ status: 'published' }),
      featured: await Portfolio.countDocuments({ featured: true }),
      byCategory: await Portfolio.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]),
      totalViews: await Portfolio.aggregate([
        { $group: { _id: null, total: { $sum: '$analytics.views' } } }
      ])
    };

    res.json({
      success: true,
      data: {
        contacts: contactStats,
        portfolio: portfolioStats,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch statistics'
    });
  }
});

module.exports = router;
