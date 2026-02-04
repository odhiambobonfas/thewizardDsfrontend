const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
    maxlength: [100, 'Client name cannot exceed 100 characters']
  },
  clientEmail: {
    type: String,
    required: [true, 'Client email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  role: {
    type: String,
    trim: true,
    maxlength: [100, 'Role cannot exceed 100 characters']
  },
  projectName: {
    type: String,
    trim: true,
    maxlength: [200, 'Project name cannot exceed 200 characters']
  },
  testimonial: {
    type: String,
    required: [true, 'Testimonial text is required'],
    trim: true,
    minlength: [20, 'Testimonial must be at least 20 characters'],
    maxlength: [1000, 'Testimonial cannot exceed 1000 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  avatar: {
    url: {
      type: String,
      default: ''
    },
    publicId: {
      type: String,
      default: ''
    }
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  featured: {
    type: Boolean,
    default: false
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  adminNotes: {
    type: String,
    trim: true,
    maxlength: [500, 'Admin notes cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

// Indexes for better performance
testimonialSchema.index({ status: 1 });
testimonialSchema.index({ featured: 1 });
testimonialSchema.index({ displayOrder: 1 });
testimonialSchema.index({ createdAt: -1 });

// Static method to get approved testimonials
testimonialSchema.statics.getApproved = function(limit = 10) {
  return this.find({ status: 'approved' })
    .sort({ featured: -1, displayOrder: 1, createdAt: -1 })
    .limit(limit);
};

// Static method to get featured testimonials
testimonialSchema.statics.getFeatured = function(limit = 6) {
  return this.find({ status: 'approved', featured: true })
    .sort({ displayOrder: 1, createdAt: -1 })
    .limit(limit);
};

module.exports = mongoose.model('Testimonial', testimonialSchema);
