const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  testimonial: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },
  logo: {
    url: String,
    publicId: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Static method to get featured clients
clientSchema.statics.getFeatured = function() {
  return this.find({ featured: true, status: 'active' })
    .sort({ order: 1, createdAt: -1 });
};

// Static method to get all active clients
clientSchema.statics.getActive = function() {
  return this.find({ status: 'active' })
    .sort({ order: 1, createdAt: -1 });
};

module.exports = mongoose.model('Client', clientSchema);
