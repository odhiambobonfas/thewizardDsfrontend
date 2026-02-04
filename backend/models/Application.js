const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  linkedIn: {
    type: String,
    trim: true
  },
  portfolio: {
    type: String,
    trim: true
  },
  coverLetter: {
    type: String,
    trim: true
  },
  cv: {
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      required: true
    }
  },
  experience: {
    type: Number,
    default: 0
  },
  currentCompany: {
    type: String,
    trim: true
  },
  currentPosition: {
    type: String,
    trim: true
  },
  availableFrom: {
    type: Date
  },
  expectedSalary: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'shortlisted', 'interviewed', 'offered', 'rejected', 'withdrawn'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
applicationSchema.index({ jobId: 1, email: 1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Application', applicationSchema);
