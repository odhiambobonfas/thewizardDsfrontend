import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiShield, 
  FiLock, 
  FiCode, 
  FiGlobe, 
  FiSearch, 
  FiUsers, 
  FiTool, 
  FiCheck,
  FiArrowRight,
  FiSmartphone,
  FiMessageCircle,
  FiCpu,
  FiGitBranch,
  FiCloud,
  FiDatabase,
  FiBarChart,
  FiZap,
  FiAward,
  FiTarget,
  FiEye,
  FiTrendingUp,
  FiHeart,
  FiDollarSign,
  FiHome,
  FiTruck,
  FiBook,
  FiShoppingCart,
  FiFilm,
  FiWifi,
  FiVideo,
  FiStar,
  FiLayers
} from 'react-icons/fi';

import CallToAction from '../sections/CallToAction';
import heroImage from '../assets/images/cybernetic-being-interacting-with-digital-interface.jpg';
import aiTechImage from '../assets/images/ai-technology-microchip-background-futuristic-innovation-technology-remix.jpg';
import codingBgImage from '../assets/images/altumcode-oZ61KFUQsus-unsplash.jpg';
import aiChipImage from '../assets/images/ai-chip-circuit-board.jpg';
import cyberBgImage from '../assets/images/cyber.jpg';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Comprehensive service categories
  const categories = [
    { id: 'all', name: 'All Services', count: 28, icon: FiLayers },
    { id: 'ai', name: 'Artificial Intelligence', count: 8, icon: FiGitBranch },
    { id: 'cybersecurity', name: 'Cybersecurity', count: 7, icon: FiShield },
    { id: 'development', name: 'Development', count: 6, icon: FiCode },
    { id: 'emerging', name: 'Emerging Tech', count: 4, icon: FiZap },
    { id: 'industry', name: 'Industry Solutions', count: 7, icon: FiTarget }
  ];

  // Comprehensive services data
  const services = [
    // AI Services
    {
      id: 'ai-strategy',
      title: 'AI Strategy & Consulting',
      category: 'ai',
      icon: FiGitBranch,
      shortDescription: 'Transform your business with intelligent AI solutions',
      description: 'Comprehensive AI strategy development and implementation consulting to drive innovation and competitive advantage.',
      features: [
        'AI Readiness Assessment',
        'Machine Learning Roadmap',
        'Data Strategy Development',
        'ROI Analysis & Planning',
        'Implementation Framework'
      ],
      popular: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning Solutions',
      category: 'ai',
      icon: FiCpu,
      shortDescription: 'Custom ML models for predictive analytics',
      description: 'End-to-end machine learning solutions including model development, training, and deployment.',
      features: [
        'Predictive Analytics',
        'Custom Model Development',
        'Data Preprocessing',
        'Model Training & Tuning',
        'MLOps Implementation'
      ],
      popular: true,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'computer-vision',
      title: 'Computer Vision',
      category: 'ai',
      icon: FiEye,
      shortDescription: 'Advanced image and video analysis',
      description: 'Cutting-edge computer vision solutions for object detection, facial recognition, and visual analytics.',
      features: [
        'Object Detection & Recognition',
        'Facial Recognition Systems',
        'Image Classification',
        'Video Analytics',
        'Real-time Processing'
      ],
      popular: false,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'nlp-solutions',
      title: 'Natural Language Processing',
      category: 'ai',
      icon: FiMessageCircle,
      shortDescription: 'Intelligent text and speech processing',
      description: 'Advanced NLP solutions including chatbots, sentiment analysis, and language translation.',
      features: [
        'Chatbot Development',
        'Sentiment Analysis',
        'Text Classification',
        'Language Translation',
        'Speech Recognition'
      ],
      popular: true,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'ai-analytics',
      title: 'AI-Powered Analytics',
      category: 'ai',
      icon: FiBarChart,
      shortDescription: 'Intelligent business intelligence',
      description: 'Transform your data into actionable insights with AI-driven analytics and visualization.',
      features: [
        'Predictive Analytics',
        'Anomaly Detection',
        'Pattern Recognition',
        'Automated Reporting',
        'Real-time Dashboards'
      ],
      popular: false,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'generative-ai',
      title: 'Generative AI Solutions',
            icon: FiZap,      shortDescription: 'Creative AI for content generation',
      description: 'Leverage generative AI for content creation, code generation, and creative applications.',
      features: [
        'Content Generation',
        'Code Generation & Assistance',
        'Image & Video Creation',
        'Creative Design',
        'Personalized Content'
      ],
      popular: true,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'ai-integration',
      title: 'AI Integration & Engineering',
                category: 'ai',
                icon: FiTool,      shortDescription: 'Seamless AI system integration',
      description: 'MLOps implementation, data pipeline development, and edge AI deployment for scalable solutions.',
      features: [
        'MLOps Implementation',
        'Data Pipeline Development',
        'Edge AI Deployment',
        'Cloud AI Infrastructure',
        'Model Monitoring'
      ],
      popular: false,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'secure-ai-chatbots',
      title: 'Secure AI Chatbots',
      category: 'ai',
      icon: FiShield,
      shortDescription: 'AI chatbots with enterprise-grade security',
      description: 'Intelligent chatbots with built-in security features, privacy protection, and compliance.',
      features: [
        'Encrypted Conversations',
        'Privacy Compliance',
        'Threat Detection',
        'Access Control',
        'Audit Logging'
      ],
      popular: true,
      color: 'from-green-500 to-blue-500'
    },

    // Cybersecurity Services
    {
      id: 'security-audit',
      title: 'Security Audits & Assessments',
      category: 'cybersecurity',
      icon: FiShield,
      shortDescription: 'Comprehensive security vulnerability assessment',
      description: 'Thorough security audits and penetration testing to identify and mitigate vulnerabilities.',
      features: [
        'Vulnerability Assessment',
        'Penetration Testing',
        'Security Architecture Review',
        'Compliance Auditing',
        'Risk Assessment'
      ],
      popular: true,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'ai-security',
      title: 'AI Security & Ethics',
      category: 'cybersecurity',
      icon: FiLock,
      shortDescription: 'Secure and ethical AI implementation',
      description: 'Specialized security services for AI systems including adversarial testing and ethical compliance.',
      features: [
        'AI Model Security',
        'Adversarial Testing',
        'Ethical AI Compliance',
        'Bias Detection',
        'Privacy-Preserving AI'
      ],
      popular: true,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'threat-intelligence',
      title: 'Threat Intelligence',
      category: 'cybersecurity',
      icon: FiSearch,
      shortDescription: 'Proactive threat detection and monitoring',
      description: 'Advanced threat intelligence and monitoring services to protect against emerging cyber threats.',
      features: [
        'Threat Monitoring',
        'Incident Response',
        'Security Analytics',
        'Threat Hunting',
        '24/7 SOC Services'
      ],
      popular: false,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'compliance',
      title: 'Compliance & Governance',
      category: 'cybersecurity',
      icon: FiAward,
      shortDescription: 'Regulatory compliance and security governance',
      description: 'Ensure compliance with global regulations and implement robust security governance frameworks.',
      features: [
        'GDPR/CCPA Compliance',
        'ISO 27001 Implementation',
        'Security Policy Development',
        'Risk Management',
        'Compliance Reporting'
      ],
      popular: false,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'emergency-response',
      title: 'Emergency Response',
      category: 'cybersecurity',
      icon: FiZap,
      shortDescription: '24/7 critical incident response',
      description: 'Rapid response services for security incidents and emergencies with guaranteed response times.',
      features: [
        '24/7 Emergency Support',
        'Incident Containment',
        'Forensic Analysis',
        'Recovery Services',
        'Post-Incident Review'
      ],
      popular: true,
      color: 'from-red-600 to-orange-500'
    },
    {
      id: 'cloud-security',
      title: 'Cloud Security',
      category: 'cybersecurity',
      icon: FiCloud,
      shortDescription: 'Enterprise cloud security solutions',
      description: 'Comprehensive cloud security management for AWS, Azure, and Google Cloud environments.',
      features: [
        'Cloud Security Architecture',
        'Data Encryption',
        'Access Control',
        'API Security',
        'Compliance Management'
      ],
      popular: true,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'zero-trust',
      title: 'Zero Trust Architecture',
      category: 'cybersecurity',
      icon: FiLock,
      shortDescription: 'Modern security architecture implementation',
      description: 'Implement zero trust security models with identity and access management solutions.',
      features: [
        'Identity Management',
        'Access Control',
        'Network Segmentation',
        'Device Security',
        'Continuous Monitoring'
      ],
      popular: false,
      color: 'from-indigo-500 to-purple-500'
    },

    // Development Services
    {
      id: 'web-development',
      title: 'Web Development',
      category: 'development',
      icon: FiGlobe,
      shortDescription: 'Modern, scalable web applications',
      description: 'Full-stack web development with cutting-edge technologies and security-first approach.',
      features: [
        'React/Next.js Development',
        'Node.js Backend',
        'Cloud Deployment',
        'Progressive Web Apps',
        'API Development'
      ],
      popular: true,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'mobile-development',
      title: 'Mobile App Development',
      category: 'development',
      icon: FiSmartphone,
      shortDescription: 'Cross-platform mobile solutions',
      description: 'Native and cross-platform mobile app development with AI integration capabilities.',
      features: [
        'iOS & Android Development',
        'React Native/Flutter',
        'AI Integration',
        'App Store Deployment',
        'Performance Optimization'
      ],
      popular: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'cloud-solutions',
      title: 'Cloud Solutions',
      category: 'development',
      icon: FiCloud,
      shortDescription: 'Scalable cloud infrastructure',
      description: 'End-to-end cloud solutions including migration, architecture, and managed services.',
      features: [
        'Cloud Architecture',
        'AWS/Azure/GCP Migration',
        'Serverless Solutions',
        'DevOps Implementation',
        'Cost Optimization'
      ],
      popular: false,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'enterprise-software',
      title: 'Enterprise Software',
      category: 'development',
      icon: FiDatabase,
      shortDescription: 'Custom enterprise solutions',
      description: 'Robust enterprise software development tailored to your business processes and requirements.',
      features: [
        'Custom ERP/CRM Systems',
        'Workflow Automation',
        'Integration Services',
        'Scalable Architecture',
        'Enterprise Security'
      ],
      popular: false,
      color: 'from-gray-600 to-blue-600'
    },
    {
      id: 'devops',
      title: 'DevOps & CI/CD',
      category: 'development',
      icon: FiTool,
      shortDescription: 'Automated development pipelines',
      description: 'Implement DevOps practices and continuous integration/deployment pipelines.',
      features: [
        'CI/CD Pipeline Setup',
        'Containerization',
        'Infrastructure as Code',
        'Monitoring & Logging',
        'Performance Optimization'
      ],
      popular: true,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'api-development',
      title: 'API Development',
      category: 'development',
      icon: FiCode,
      shortDescription: 'Secure and scalable APIs',
      description: 'Design and develop robust APIs with security, documentation, and scalability.',
      features: [
        'REST/GraphQL APIs',
        'API Security',
        'Documentation',
        'Rate Limiting',
        'Microservices'
      ],
      popular: false,
      color: 'from-green-500 to-teal-500'
    },

    // Emerging Technologies
    {
      id: 'blockchain',
      title: 'Blockchain Solutions',
      category: 'emerging',
      icon: 'FiLock',
      shortDescription: 'Secure blockchain applications',
      description: 'Blockchain development including smart contracts, DeFi, and enterprise blockchain solutions.',
      features: [
        'Smart Contract Development',
        'DeFi Applications',
        'NFT Platforms',
        'Enterprise Blockchain',
        'Crypto Integration'
      ],
      popular: true,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'iot-solutions',
      title: 'IoT Solutions',
      category: 'emerging',
      icon: FiWifi,
      shortDescription: 'Internet of Things integration',
      description: 'End-to-end IoT solutions including device development, connectivity, and data analytics.',
      features: [
        'IoT Device Development',
        'Sensor Integration',
        'Real-time Analytics',
        'Edge Computing',
        'Predictive Maintenance'
      ],
      popular: false,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'ar-vr',
      title: 'AR/VR Development',
      category: 'emerging',
      icon: FiVideo,
      shortDescription: 'Immersive reality experiences',
      description: 'Cutting-edge augmented and virtual reality solutions for training, visualization, and entertainment.',
      features: [
        '3D Modeling & Animation',
        'Interactive Experiences',
        'Mobile AR Development',
        'VR Training Simulations',
        'Cross-platform Deployment'
      ],
      popular: false,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'quantum-research',
      title: 'Quantum Computing Research',
      category: 'emerging',
      icon: FiZap,
      shortDescription: 'Next-generation computing solutions',
      description: 'Research and development in quantum computing algorithms and quantum-safe encryption.',
      features: [
        'Quantum Algorithm Research',
        'Quantum-Safe Encryption',
        'Simulation Tools',
        'Research Partnerships',
        'Future Tech Consulting'
      ],
      popular: false,
      color: 'from-indigo-500 to-purple-500'
    },

    // Industry-Specific Solutions
    {
      id: 'healthcare-ai',
      title: 'Healthcare AI Solutions',
      category: 'industry',
      icon: FiHeart,
      shortDescription: 'AI-powered healthcare applications',
      description: 'Specialized AI solutions for healthcare including diagnostics, patient care, and medical research.',
      features: [
        'Medical Image Analysis',
        'Patient Risk Prediction',
        'Drug Discovery AI',
        'Telemedicine Platforms',
        'Health Data Security'
      ],
      popular: true,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'fintech-solutions',
      title: 'FinTech Solutions',
      category: 'industry',
      icon: FiDollarSign,
      shortDescription: 'Financial technology applications',
      description: 'Secure fintech solutions including banking apps, payment systems, and financial analytics.',
      features: [
        'Digital Banking Platforms',
        'Payment Processing',
        'Fraud Detection',
        'Investment Analytics',
        'Regulatory Compliance'
      ],
      popular: true,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'real-estate-tech',
      title: 'Real Estate Technology',
      category: 'industry',
      icon: FiHome,
      shortDescription: 'Property technology solutions',
      description: 'Innovative real estate technology including virtual tours, property management, and market analytics.',
      features: [
        'Virtual Property Tours',
        'Property Management Systems',
        'Market Analysis AI',
        'Smart Home Integration',
        'Transaction Platforms'
      ],
      popular: false,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'logistics-ai',
      title: 'Logistics & Supply Chain AI',
      category: 'industry',
      icon: FiTruck,
      shortDescription: 'Intelligent logistics solutions',
      description: 'AI-powered logistics and supply chain optimization for efficient operations.',
      features: [
        'Route Optimization',
        'Inventory Management',
        'Demand Forecasting',
        'Fleet Management',
        'Supply Chain Analytics'
      ],
      popular: false,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'edtech-solutions',
      title: 'EdTech Solutions',
      category: 'industry',
      icon: FiBook,
      shortDescription: 'Educational technology platforms',
      description: 'Modern educational technology solutions for learning management and student engagement.',
      features: [
        'Learning Management Systems',
        'AI Tutoring',
        'Student Analytics',
        'Virtual Classrooms',
        'Assessment Tools'
      ],
      popular: false,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'ecommerce-ai',
      title: 'E-commerce AI Solutions',
      category: 'industry',
      icon: FiShoppingCart,
      shortDescription: 'Intelligent e-commerce platforms',
      description: 'AI-powered e-commerce solutions for personalized shopping experiences and operations.',
      features: [
        'Product Recommendation Engines',
        'Personalized Marketing',
        'Inventory Optimization',
        'Customer Service AI',
        'Sales Forecasting'
      ],
      popular: true,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'entertainment-tech',
      title: 'Entertainment Technology',
      category: 'industry',
      icon: FiFilm,
      shortDescription: 'Media and entertainment solutions',
      description: 'Cutting-edge technology for media, entertainment, and content creation industries.',
      features: [
        'Content Recommendation',
        'Streaming Platforms',
        'Interactive Media',
        'Content Creation Tools',
        'Audience Analytics'
      ],
      popular: false,
      color: 'from-pink-500 to-purple-500'
    }
  ];





  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const process = [
    {
      step: '01',
      title: 'Discovery & Strategy',
      description: 'Deep dive into your business needs and develop comprehensive AI/security strategy',
      icon: FiTarget
    },
    {
      step: '02',
      title: 'Architecture & Planning',
      description: 'Design scalable architecture and create detailed project roadmap with milestones',
      icon: FiCode
    },
    {
      step: '03',
      title: 'Development & Implementation',
      description: 'Agile development with continuous integration and regular progress demonstrations',
      icon: FiTool
    },
    {
      step: '04',
      title: 'Testing & Security',
      description: 'Comprehensive testing including security audits, penetration testing, and AI model validation',
      icon: FiShield
    },
    {
      step: '05',
      title: 'Deployment & Optimization',
      description: 'Seamless deployment with ongoing monitoring, optimization, and performance tuning',
      icon: FiTrendingUp
    }
  ];

  const stats = [
    { number: '100+', label: 'AI Projects Delivered', icon: FiGitBranch },
    { number: '99.9%', label: 'Security Success Rate', icon: FiShield },
    { number: '50+', label: 'Enterprise Clients', icon: FiUsers },
    { number: '24/7', label: 'Security Monitoring', icon: FiZap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
      {/* Hero Section */}
      <section className="relative text-white section-padding hero-glow particle-bg overflow-hidden bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Cybersecurity Services" 
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-blue-900/40 to-gray-900/60"></div>
        </div>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-gray-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-gray-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-300/5 to-gray-300/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom text-center relative z-10">
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-6">
              <FiZap className="w-4 h-4 mr-2 text-cyber-400" />
              <span className="text-sm font-medium text-gray-100">We Engineer Beyond Magic</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 break-words">
              Our <span className="bg-gradient-to-r from-blue-200 via-gray-100 to-blue-200 bg-clip-text text-transparent force-gradient break-words">Expert Services</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed">
              Comprehensive <span className="font-semibold text-cyber-300">AI, cybersecurity, and software development</span> solutions 
              engineered to transform your business and secure your digital future.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding -mt-8 relative z-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <img 
            src={aiChipImage} 
            alt="AI Chip Background" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center p-6 floating-element">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400/60 to-gray-400/60 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-dark-600 dark:text-dark-300 font-medium text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="section-padding relative bg-gradient-to-br from-white via-blue-50/20 to-white dark:from-dark-800 dark:via-dark-700 dark:to-dark-800 cyber-grid-bg overflow-hidden">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <img 
            src={aiTechImage} 
            alt="AI Technology Background" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="container-custom relative z-10">
          <div
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-6 sm:mb-8 break-words">
              Explore Our <span className="gradient-text break-words">Service Categories</span>
            </h2>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
              {categories.map((category) => {
                const CategoryIcon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center px-5 sm:px-6 py-3 sm:py-4 rounded-xl font-medium duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-400 to-gray-400 text-white shadow-lg shadow-primary-500/25'
                        : 'bg-transparent text-dark-600 dark:text-dark-300 hover:bg-primary-50 dark:hover:bg-dark-700 border border-dark-200/50 dark:border-dark-600/50'
                    }`}>
                    <CategoryIcon className="w-4 h-4 mr-2" />
                    {category.name} 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      selectedCategory === category.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-primary-100 dark:bg-primary-900/30 text-blue-600 dark:text-blue-400'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={service.id} className="p-6 sm:p-8 hover:shadow-2xl duration-500 floating-element group cursor-pointer">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center group-hover:scale-110 duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    {service.popular && (
                      <span className="inline-flex items-center px-3 py-1 bg-cyber-100/80 dark:bg-cyber-900/30 text-cyber-700 dark:text-cyber-300 text-xs font-medium rounded-full">
                        <FiStar className="w-3 h-3 mr-1" />
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-dark-900 dark:text-white mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-dark-600 dark:text-dark-300 mb-4 text-sm leading-relaxed">
                    {service.shortDescription}
                  </p>
                  
                  <p className="text-dark-500 dark:text-dark-400 mb-6 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <li key={feature} className="flex items-center space-x-3 text-sm text-dark-600 dark:text-dark-300">
                        <div className="w-5 h-5 bg-gradient-to-br from-blue-400/60 to-gray-400/60 rounded-full flex items-center justify-center flex-shrink-0">
                          <FiCheck className="w-3 h-3 text-white" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {service.features.length > 4 && (
                      <li className="text-xs text-dark-500 dark:text-dark-400 pl-8">
                        +{service.features.length - 4} more features
                      </li>
                    )}
                  </ul>
                  
                  <div className="flex justify-center pt-4 border-t border-dark-200/50 dark:border-dark-600/50">
                    <div>
                      <Link 
                        to={`/services/${service.id}`} 
                        className="inline-flex items-center px-6 py-3 border-2 border-blue-300/40 text-white font-semibold rounded-lg hover:bg-transparent hover:border-blue-400"
                      >
                        Learn More
                        <FiArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 particle-bg overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={codingBgImage} 
            alt="Coding Background" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="container-custom relative z-10">
          <div
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-4 break-words">
              Our <span className="gradient-text break-words">Development Process</span>
            </h2>
            <p className="text-lg sm:text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              A proven methodology that ensures successful delivery of AI and cybersecurity projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {process.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={step.step} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400/60 to-gray-400/60 rounded-2xl flex items-center justify-center text-white font-bold text-lg mx-auto group-hover:scale-110 duration-300">
                      <StepIcon className="w-6 h-6" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {step.step}
                    </div>
                    {index < process.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-cyber-300 transform -translate-x-8"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-dark-600 dark:text-dark-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
};

export default Services;