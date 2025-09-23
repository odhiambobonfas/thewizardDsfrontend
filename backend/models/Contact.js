const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  phone: {
    type: String,
    trim: true,
    match: [
      /^[\+]?[1-9][\d]{0,15}$/,
      'Please provide a valid phone number'
    ]
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    enum: {
      values: [
        'web-development',
        'mobile-app',
        'desktop-app',
        'cybersecurity',
        'portfolio-website',
        'full-stack-solution',
        'consultation',
        'other'
      ],
      message: 'Please select a valid service type'
    }
  },
  budget: {
    type: String,
    enum: {
      values: [
        'under-5k',
        '5k-10k',
        '10k-25k',
        '25k-50k',
        'over-50k',
        'not-sure'
      ],
      message: 'Please select a valid budget range'
    }
  },
  timeline: {
    type: String,
    enum: {
      values: [
        'asap',
        '1-month',
        '2-3-months',
        '3-6-months',
        'flexible'
      ],
      message: 'Please select a valid timeline'
    }
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'completed', 'cancelled'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  source: {
    type: String,
    enum: ['website', 'referral', 'social-media', 'direct', 'other'],
    default: 'website'
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for faster queries
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ serviceType: 1 });
contactSchema.index({ createdAt: -1 });

// Virtual for full contact info
contactSchema.virtual('fullContactInfo').get(function() {
  return {
    name: this.name,
    email: this.email,
    phone: this.phone,
    company: this.company
  };
});

// Method to mark as contacted
contactSchema.methods.markAsContacted = function() {
  this.status = 'contacted';
  return this.save();
};

// Static method to get contacts by service type
contactSchema.statics.getByServiceType = function(serviceType) {
  return this.find({ serviceType }).sort({ createdAt: -1 });
};

// Static method to get recent contacts
contactSchema.statics.getRecent = function(limit = 10) {
  return this.find().sort({ createdAt: -1 }).limit(limit);
};

module.exports = mongoose.model('Contact', contactSchema);
