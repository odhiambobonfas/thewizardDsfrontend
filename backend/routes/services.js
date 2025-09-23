const express = require('express');
const router = express.Router();

// @route   GET /api/services
// @desc    Get all available services
// @access  Public
router.get('/', async (req, res) => {
  try {
    const services = [
      {
        id: 'web-development',
        title: 'Web Development',
        shortDescription: 'Modern, responsive websites and web applications',
        description: 'We create cutting-edge web applications using the latest technologies like React, Next.js, Node.js, and MongoDB. Our websites are fast, secure, and optimized for all devices.',
        features: [
          'React & Next.js Development',
          'Node.js Backend APIs',
          'MongoDB Database Integration',
          'Responsive Design',
          'SEO Optimization',
          'Performance Optimization',
          'Security Implementation',
          'Progressive Web Apps (PWA)'
        ],
        technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind CSS'],
        pricing: {
          starting: 2500,
          currency: 'USD',
          timeline: '2-8 weeks'
        },
        category: 'development',
        icon: 'FiCode',
        popular: true
      },
      {
        id: 'mobile-app',
        title: 'Mobile App Development',
        shortDescription: 'Native and cross-platform mobile applications',
        description: 'Build powerful mobile applications for iOS and Android using React Native and Flutter. We create apps that provide seamless user experiences across all mobile devices.',
        features: [
          'React Native Development',
          'Flutter Development',
          'iOS & Android Apps',
          'Cross-Platform Solutions',
          'App Store Deployment',
          'Push Notifications',
          'Offline Functionality',
          'API Integration'
        ],
        technologies: ['React Native', 'Flutter', 'Dart', 'Swift', 'Kotlin', 'Firebase'],
        pricing: {
          starting: 5000,
          currency: 'USD',
          timeline: '3-12 weeks'
        },
        category: 'development',
        icon: 'FiSmartphone',
        popular: true
      },
      {
        id: 'desktop-app',
        title: 'Desktop Applications',
        shortDescription: 'Cross-platform desktop software solutions',
        description: 'Develop powerful desktop applications for Windows, macOS, and Linux using Electron and native technologies. Perfect for business tools and productivity software.',
        features: [
          'Electron Applications',
          'Native Development',
          'Cross-Platform Support',
          'System Integration',
          'Auto-Updates',
          'Offline Functionality',
          'File System Access',
          'Hardware Integration'
        ],
        technologies: ['Electron', 'Node.js', 'C++', 'Python', 'Qt', 'Tauri'],
        pricing: {
          starting: 4000,
          currency: 'USD',
          timeline: '4-10 weeks'
        },
        category: 'development',
        icon: 'FiMonitor',
        popular: false
      },
      {
        id: 'cybersecurity',
        title: 'Cybersecurity Services',
        shortDescription: 'Comprehensive security assessments and protection',
        description: 'Protect your digital assets with our comprehensive cybersecurity services including penetration testing, security audits, and vulnerability assessments.',
        features: [
          'Security Audits',
          'Penetration Testing',
          'Vulnerability Assessment',
          'Compliance Review',
          'Security Consulting',
          'Incident Response',
          'Security Training',
          'Risk Analysis'
        ],
        technologies: ['Kali Linux', 'Metasploit', 'Burp Suite', 'Nmap', 'Wireshark', 'OWASP'],
        pricing: {
          starting: 1500,
          currency: 'USD',
          timeline: '1-4 weeks'
        },
        category: 'security',
        icon: 'FiShield',
        popular: true
      },
      {
        id: 'portfolio-website',
        title: 'Portfolio Websites',
        shortDescription: 'Professional portfolio websites that showcase your work',
        description: 'Create stunning portfolio websites that highlight your skills and projects. Perfect for freelancers, artists, developers, and creative professionals.',
        features: [
          'Custom Design',
          'CMS Integration',
          'SEO Optimization',
          'Performance Tuned',
          'Mobile Responsive',
          'Contact Forms',
          'Gallery Management',
          'Blog Integration'
        ],
        technologies: ['React', 'Next.js', 'Gatsby', 'WordPress', 'Strapi', 'Contentful'],
        pricing: {
          starting: 1200,
          currency: 'USD',
          timeline: '1-3 weeks'
        },
        category: 'design',
        icon: 'FiUser',
        popular: false
      },
      {
        id: 'full-stack-solution',
        title: 'Full-Stack Solutions',
        shortDescription: 'Complete end-to-end software development',
        description: 'Comprehensive software solutions from concept to deployment. We handle everything including frontend, backend, database, hosting, and ongoing maintenance.',
        features: [
          'Complete Development',
          'Cloud Deployment',
          'DevOps Integration',
          'Database Design',
          'API Development',
          'Third-party Integrations',
          'Monitoring & Analytics',
          '24/7 Support'
        ],
        technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'Kubernetes'],
        pricing: {
          starting: 8000,
          currency: 'USD',
          timeline: '6-16 weeks'
        },
        category: 'development',
        icon: 'FiGlobe',
        popular: true
      },
      {
        id: 'consultation',
        title: 'Technical Consultation',
        shortDescription: 'Expert guidance for your technology decisions',
        description: 'Get expert advice on technology stack selection, architecture design, security best practices, and project planning from our experienced team.',
        features: [
          'Technology Assessment',
          'Architecture Design',
          'Security Review',
          'Performance Analysis',
          'Code Review',
          'Team Training',
          'Project Planning',
          'Technology Migration'
        ],
        technologies: ['Various', 'Best Practices', 'Industry Standards'],
        pricing: {
          starting: 150,
          currency: 'USD/hour',
          timeline: 'Flexible'
        },
        category: 'consulting',
        icon: 'FiMessageCircle',
        popular: false
      }
    ];

    // Filter by category if provided
    const { category, popular } = req.query;
    let filteredServices = services;

    if (category) {
      filteredServices = filteredServices.filter(service => service.category === category);
    }

    if (popular === 'true') {
      filteredServices = filteredServices.filter(service => service.popular);
    }

    res.json({
      success: true,
      data: {
        services: filteredServices,
        categories: [
          { id: 'development', name: 'Development', count: services.filter(s => s.category === 'development').length },
          { id: 'security', name: 'Security', count: services.filter(s => s.category === 'security').length },
          { id: 'design', name: 'Design', count: services.filter(s => s.category === 'design').length },
          { id: 'consulting', name: 'Consulting', count: services.filter(s => s.category === 'consulting').length }
        ]
      }
    });

  } catch (error) {
    console.error('Services fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch services'
    });
  }
});

// @route   GET /api/services/:id
// @desc    Get single service by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const services = [
      // Same services array as above - in a real app, this would be in a database
    ];

    const service = services.find(s => s.id === req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: service
    });

  } catch (error) {
    console.error('Service fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch service'
    });
  }
});

// @route   GET /api/services/popular/list
// @desc    Get popular services
// @access  Public
router.get('/popular/list', async (req, res) => {
  try {
    const services = [
      // Same services array as above
    ];

    const popularServices = services.filter(service => service.popular);

    res.json({
      success: true,
      data: popularServices
    });

  } catch (error) {
    console.error('Popular services fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch popular services'
    });
  }
});

module.exports = router;
