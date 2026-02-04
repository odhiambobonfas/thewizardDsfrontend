const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
    maxlength: [100, 'Role cannot exceed 100 characters']
  },
  expertise: {
    type: String,
    trim: true,
    maxlength: [200, 'Expertise cannot exceed 200 characters']
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [1000, 'Bio cannot exceed 1000 characters']
  },
  experience: {
    type: String,
    trim: true,
    maxlength: [50, 'Experience cannot exceed 50 characters']
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
  certifications: [{
    type: String,
    trim: true,
    maxlength: [100, 'Certification cannot exceed 100 characters']
  }],
  skills: [{
    type: String,
    trim: true,
    maxlength: [100, 'Skill cannot exceed 100 characters']
  }],
  social: {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    linkedin: {
      type: String,
      trim: true,
      match: [/^https?:\/\/(www\.)?linkedin\.com\/.+/, 'Please provide a valid LinkedIn URL']
    },
    github: {
      type: String,
      trim: true,
      match: [/^https?:\/\/(www\.)?github\.com\/.+/, 'Please provide a valid GitHub URL']
    },
    website: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, 'Please provide a valid URL']
    }
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

// Indexes
teamSchema.index({ order: 1 });
teamSchema.index({ status: 1 });
teamSchema.index({ name: 1 });

// Static method to get active team members
teamSchema.statics.getActive = function(limit = 50) {
  return this.find({ status: 'active' })
    .sort({ order: 1, createdAt: -1 })
    .limit(limit);
};

module.exports = mongoose.model('Team', teamSchema);
