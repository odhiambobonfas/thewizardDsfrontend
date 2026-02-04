const express = require('express');
const { body, validationResult } = require('express-validator');
const Team = require('../models/Team');
const { uploadImage, deleteImage } = require('../utils/cloudinaryService');
const { authenticateAdmin } = require('../middleware/auth');
const multer = require('multer');
const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// @route   GET /api/team/admin/all
// @desc    Get all team members including inactive (Admin only)
// @access  Private
router.get('/admin/all', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    let filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
        { expertise: { $regex: search, $options: 'i' } }
      ];
    }
    
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const members = await Team.find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await Team.countDocuments(filter);
    
    res.json({
      success: true,
      data: {
        members,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / parseInt(limit)),
          count: members.length,
          totalMembers: total
        }
      }
    });
  } catch (error) {
    console.error('Admin team fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch team members'
    });
  }
});

// @route   GET /api/team
// @desc    Get all active team members
// @access  Public
router.get('/', async (req, res) => {
  try {
    const members = await Team.find({ status: 'active' })
      .sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      data: members
    });
  } catch (error) {
    console.error('Team fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch team members'
    });
  }
});

// @route   GET /api/team/:id
// @desc    Get single team member
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const member = await Team.findOne({ 
      _id: req.params.id, 
      status: 'active' 
    });
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    res.json({
      success: true,
      data: member
    });
  } catch (error) {
    console.error('Team member fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch team member'
    });
  }
});

// Validation rules
const teamValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('role').trim().isLength({ min: 2, max: 100 }).withMessage('Role must be between 2 and 100 characters'),
  body('expertise').optional().trim().isLength({ max: 200 }).withMessage('Expertise cannot exceed 200 characters'),
  body('bio').optional().trim().isLength({ max: 1000 }).withMessage('Bio cannot exceed 1000 characters'),
  body('experience').optional().trim().isLength({ max: 50 }).withMessage('Experience cannot exceed 50 characters')
];

// @route   POST /api/team
// @desc    Create new team member (Admin only)
// @access  Private
router.post('/', authenticateAdmin, upload.single('avatar'), async (req, res) => {
  try {
    // Manual validation for FormData
    if (!req.body.name || req.body.name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name must be at least 2 characters'
      });
    }
    
    if (!req.body.role || req.body.role.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Role must be at least 2 characters'
      });
    }
    
    const memberData = {
      name: req.body.name,
      role: req.body.role,
      expertise: req.body.expertise || '',
      bio: req.body.bio || '',
      experience: req.body.experience || 0,
      skills: req.body.skills ? JSON.parse(req.body.skills) : [],
      certifications: req.body.certifications ? JSON.parse(req.body.certifications) : [],
      socialLinks: {
        email: req.body.email || '',
        linkedin: req.body.linkedin || '',
        github: req.body.github || '',
        website: req.body.website || ''
      },
      order: req.body.order || 0,
      status: req.body.status || 'active'
    };

    // Handle avatar upload
    if (req.file) {
      const avatarResult = await uploadImage(req.file.buffer, 'team');
      memberData.avatar = {
        url: avatarResult.url,
        publicId: avatarResult.publicId
      };
    }
    
    const member = new Team(memberData);
    await member.save();
    
    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      data: member
    });
  } catch (error) {
    console.error('Team member creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Unable to create team member'
    });
  }
});

// @route   PUT /api/team/:id
// @desc    Update team member (Admin only)
// @access  Private
router.put('/:id', authenticateAdmin, upload.single('avatar'), async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    // Update fields
    if (req.body.name) member.name = req.body.name;
    if (req.body.role) member.role = req.body.role;
    if (req.body.expertise !== undefined) member.expertise = req.body.expertise;
    if (req.body.bio !== undefined) member.bio = req.body.bio;
    if (req.body.experience !== undefined) member.experience = req.body.experience;
    if (req.body.skills) member.skills = JSON.parse(req.body.skills);
    if (req.body.certifications) member.certifications = JSON.parse(req.body.certifications);
    if (req.body.order !== undefined) member.order = req.body.order;
    if (req.body.status) member.status = req.body.status;
    
    // Update social links
    if (req.body.email !== undefined) member.socialLinks.email = req.body.email;
    if (req.body.linkedin !== undefined) member.socialLinks.linkedin = req.body.linkedin;
    if (req.body.github !== undefined) member.socialLinks.github = req.body.github;
    if (req.body.website !== undefined) member.socialLinks.website = req.body.website;

    // Handle avatar upload
    if (req.file) {
      // Delete old avatar if exists
      if (member.avatar?.publicId) {
        await deleteImage(member.avatar.publicId);
      }
      
      const avatarResult = await uploadImage(req.file.buffer, 'team');
      member.avatar = {
        url: avatarResult.url,
        publicId: avatarResult.publicId
      };
    }
    
    await member.save();
    
    res.json({
      success: true,
      message: 'Team member updated successfully',
      data: member
    });
  } catch (error) {
    console.error('Team member update error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Unable to update team member'
    });
  }
});

// @route   DELETE /api/team/:id
// @desc    Delete team member (Admin only)
// @access  Private
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    // Delete avatar from Cloudinary if exists
    if (member.avatar.publicId) {
      try {
        await deleteImage(member.avatar.publicId);
      } catch (imageError) {
        console.error('Avatar deletion error:', imageError);
      }
    }
    
    await Team.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    console.error('Team member deletion error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to delete team member'
    });
  }
});

// @route   POST /api/team/:id/avatar
// @desc    Upload team member avatar (Admin only)
// @access  Private
router.post('/:id/avatar', authenticateAdmin, upload.single('avatar'), async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }
    
    // Delete old avatar if exists
    if (member.avatar.publicId) {
      try {
        await deleteImage(member.avatar.publicId);
      } catch (error) {
        console.error('Old avatar deletion error:', error);
      }
    }
    
    // Upload new avatar
    const result = await uploadImage(req.file);
    
    member.avatar = {
      url: result.url,
      publicId: result.publicId
    };
    
    await member.save();
    
    res.json({
      success: true,
      message: 'Avatar uploaded successfully',
      data: member
    });
  } catch (error) {
    console.error('Avatar upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to upload avatar'
    });
  }
});

module.exports = router;
