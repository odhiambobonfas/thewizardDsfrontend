const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const { authenticateAdmin } = require('../middleware/auth');
const cloudinaryService = require('../utils/cloudinaryService');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

// Public Routes

// Get all active clients (for home page)
router.get('/', async (req, res) => {
  try {
    const clients = await Client.getActive();
    
    res.json({
      success: true,
      data: clients
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch clients',
      error: error.message
    });
  }
});

// Get featured clients only
router.get('/featured', async (req, res) => {
  try {
    const clients = await Client.getFeatured();
    
    res.json({
      success: true,
      data: clients
    });
  } catch (error) {
    console.error('Error fetching featured clients:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured clients',
      error: error.message
    });
  }
});

// Admin Routes (Protected)

// Get all clients for admin
router.get('/admin/all', authenticateAdmin, async (req, res) => {
  try {
    const clients = await Client.find()
      .sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      data: clients
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch clients',
      error: error.message
    });
  }
});

// Get single client
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }
    
    res.json({
      success: true,
      data: client
    });
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch client',
      error: error.message
    });
  }
});

// Create new client
router.post('/', authenticateAdmin, upload.single('logo'), async (req, res) => {
  try {
    const clientData = {
      name: req.body.name,
      role: req.body.role,
      company: req.body.company,
      testimonial: req.body.testimonial,
      rating: req.body.rating || 5,
      featured: req.body.featured === 'true',
      order: req.body.order || 0,
      status: req.body.status || 'active'
    };

    // Handle logo upload
    if (req.file) {
      const logoResult = await cloudinaryService.uploadImage(req.file.buffer, 'clients');
      clientData.logo = {
        url: logoResult.url,
        publicId: logoResult.public_id
      };
    }

    const client = new Client(clientData);
    await client.save();

    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      data: client
    });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create client',
      error: error.message
    });
  }
});

// Update client
router.put('/:id', authenticateAdmin, upload.single('logo'), async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    // Update fields
    client.name = req.body.name || client.name;
    client.role = req.body.role || client.role;
    client.company = req.body.company || client.company;
    client.testimonial = req.body.testimonial || client.testimonial;
    client.rating = req.body.rating || client.rating;
    client.featured = req.body.featured === 'true';
    client.order = req.body.order !== undefined ? req.body.order : client.order;
    client.status = req.body.status || client.status;

    // Handle logo upload
    if (req.file) {
      // Delete old logo if exists
      if (client.logo?.publicId) {
        await cloudinaryService.deleteImage(client.logo.publicId);
      }
      
      const logoResult = await cloudinaryService.uploadImage(req.file.buffer, 'clients');
      client.logo = {
        url: logoResult.url,
        publicId: logoResult.public_id
      };
    }

    await client.save();

    res.json({
      success: true,
      message: 'Client updated successfully',
      data: client
    });
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update client',
      error: error.message
    });
  }
});

// Delete client
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    // Delete logo from cloudinary if exists
    if (client.logo?.publicId) {
      await cloudinaryService.deleteImage(client.logo.publicId);
    }

    await client.deleteOne();

    res.json({
      success: true,
      message: 'Client deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete client',
      error: error.message
    });
  }
});

// Toggle featured status
router.post('/:id/toggle-featured', authenticateAdmin, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    client.featured = !client.featured;
    await client.save();

    res.json({
      success: true,
      message: `Client ${client.featured ? 'featured' : 'unfeatured'} successfully`,
      data: client
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

module.exports = router;
