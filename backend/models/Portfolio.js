const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [300, 'Short description cannot exceed 300 characters']
  },
  category: {
    type: String,
    required: [true, 'Project category is required'],
    enum: {
      values: [
        'web-development',
        'mobile-app',
        'desktop-app',
        'cybersecurity',
        'portfolio-website',
        'full-stack',
        'ui-ux-design',
        'other'
      ],
      message: 'Please select a valid category'
    }
  },
  technologies: [{
    type: String,
    trim: true
  }],
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  liveUrl: {
    type: String,
    trim: true,
    match: [
      /^https?:\/\/.+/,
      'Please provide a valid URL'
    ]
  },
  githubUrl: {
    type: String,
    trim: true,
    match: [
      /^https?:\/\/(www\.)?github\.com\/.+/,
      'Please provide a valid GitHub URL'
    ]
  },
  client: {
    name: {
      type: String,
      trim: true,
      maxlength: [100, 'Client name cannot exceed 100 characters']
    },
    company: {
      type: String,
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    testimonial: {
      type: String,
      trim: true,
      maxlength: [500, 'Testimonial cannot exceed 500 characters']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  features: [{
    type: String,
    trim: true,
    maxlength: [200, 'Feature description cannot exceed 200 characters']
  }],
  challenges: [{
    problem: {
      type: String,
      required: true,
      trim: true
    },
    solution: {
      type: String,
      required: true,
      trim: true
    }
  }],
  duration: {
    type: String,
    trim: true
  },
  teamSize: {
    type: Number,
    min: 1,
    max: 50
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  seo: {
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [60, 'Meta title cannot exceed 60 characters']
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description cannot exceed 160 characters']
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
    }
  },
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Indexes for better performance
portfolioSchema.index({ category: 1 });
portfolioSchema.index({ status: 1 });
portfolioSchema.index({ featured: 1 });
portfolioSchema.index({ priority: -1 });
portfolioSchema.index({ createdAt: -1 });
portfolioSchema.index({ 'seo.slug': 1 });
portfolioSchema.index({ tags: 1 });

// Virtual for primary image
portfolioSchema.virtual('primaryImage').get(function() {
  const primary = this.images.find(img => img.isPrimary);
  return primary || this.images[0];
});

// Virtual for formatted duration
portfolioSchema.virtual('formattedDuration').get(function() {
  if (!this.duration) return null;
  return this.duration.replace(/(\d+)/, '$1');
});

// Pre-save middleware to generate slug
portfolioSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.seo.slug) {
    this.seo.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  next();
});

// Static method to get featured projects
portfolioSchema.statics.getFeatured = function(limit = 6) {
  return this.find({ status: 'published', featured: true })
    .sort({ priority: -1, createdAt: -1 })
    .limit(limit);
};

// Static method to get projects by category
portfolioSchema.statics.getByCategory = function(category, limit = 10) {
  return this.find({ status: 'published', category })
    .sort({ priority: -1, createdAt: -1 })
    .limit(limit);
};

// Static method to search projects
portfolioSchema.statics.search = function(query, options = {}) {
  const searchRegex = new RegExp(query, 'i');
  const filter = {
    status: 'published',
    $or: [
      { title: searchRegex },
      { description: searchRegex },
      { technologies: { $in: [searchRegex] } },
      { tags: { $in: [searchRegex] } }
    ]
  };
  
  return this.find(filter)
    .sort({ priority: -1, createdAt: -1 })
    .limit(options.limit || 20);
};

// Method to increment views
portfolioSchema.methods.incrementViews = function() {
  this.analytics.views += 1;
  return this.save();
};

// Method to toggle featured status
portfolioSchema.methods.toggleFeatured = function() {
  this.featured = !this.featured;
  return this.save();
};

module.exports = mongoose.model('Portfolio', portfolioSchema);
