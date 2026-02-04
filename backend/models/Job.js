const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'remote', 'hybrid'],
    default: 'full-time'
  },
  experienceLevel: {
    type: String,
    enum: ['entry', 'mid', 'senior', 'lead', 'executive'],
    default: 'mid'
  },
  description: {
    type: String,
    required: true
  },
  responsibilities: [{
    type: String,
    trim: true
  }],
  requirements: [{
    type: String,
    trim: true
  }],
  benefits: [{
    type: String,
    trim: true
  }],
  skills: [{
    type: String,
    trim: true
  }],
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  applicationDeadline: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active'
  },
  featured: {
    type: Boolean,
    default: false
  },
  applicationsCount: {
    type: Number,
    default: 0
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Static method to get active jobs
jobSchema.statics.getActive = function() {
  return this.find({ status: 'active' })
    .sort({ featured: -1, order: 1, createdAt: -1 });
};

// Static method to get featured jobs
jobSchema.statics.getFeatured = function() {
  return this.find({ status: 'active', featured: true })
    .sort({ order: 1, createdAt: -1 });
};

// Check if application deadline has passed
jobSchema.methods.isExpired = function() {
  if (!this.applicationDeadline) return false;
  return new Date() > this.applicationDeadline;
};

module.exports = mongoose.model('Job', jobSchema);
