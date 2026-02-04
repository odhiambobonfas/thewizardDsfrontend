import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiShield, 
  FiCode, 
  FiGlobe, 
  FiUsers, 
  FiArrowRight,
  FiCheck,
  FiStar,
  FiAward,
  FiZap,
  FiCpu,
  FiEye,
  FiGitBranch,
  FiBriefcase,
  FiTrendingUp,
  FiGithub,
  FiLinkedin,
  FiTwitter
} from 'react-icons/fi';
import { SiStackoverflow } from 'react-icons/si';

import CallToAction from '../sections/CallToAction';
import Loader from '../components/common/Loader';
import futuristicImage from '../assets/images/futuristic tec.jpg';
import cyberImage from '../assets/images/cyber.jpg';
import aiChipImage from '../assets/images/ai-chip-circuit-board.jpg';
import techBgImage from '../assets/images/3d-render-technology-background-with-code-male-head.jpg';
import codingBgImage from '../assets/images/altumcode-oZ61KFUQsus-unsplash.jpg';
import aiProfessionalImage from '../assets/images/african-american-it-professional-managing-ai-system-machine-learning.jpg';

const Home = () => {
  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/clients/featured');
      const data = await response.json();
      
      if (data.success) {
        setClients(data.data.slice(0, 3)); // Show only first 3
      }
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    } finally {
      setLoadingClients(false);
    }
  };
  const services = [
    {
      icon: FiCpu,
      title: 'AI Solutions',
      description: 'Intelligent software systems powered by cutting-edge artificial intelligence and machine learning.',
      features: ['Machine Learning', 'Neural Networks', 'Predictive Analytics', 'AI Integration'],
      color: 'from-blue-400/60 to-gray-400/60'
    },
    {
      icon: FiShield,
      title: 'Cybersecurity Software',
      description: 'Advanced security applications designed to protect against evolving digital threats and vulnerabilities.',
      features: ['Threat Detection', 'Security Monitoring', 'Vulnerability Assessment', 'Incident Response'],
      color: 'from-gray-400/60 to-blue-400/60'
    },
    {
      icon: FiCode,
      title: 'Custom Software Development',
      description: 'Tailored applications built with modern technologies and security-first principles.',
      features: ['Full-Stack Development', 'Cross-Platform', 'Scalable Architecture', 'Enterprise Ready'],
      color: 'from-blue-400/60 to-gray-400/60'
    },
    {
      icon: FiGitBranch,
      title: 'AI-Powered Applications',
      description: 'Smart applications enhanced with artificial intelligence capabilities for superior performance.',
      features: ['AI Integration', 'Smart Automation', 'Intelligent Features', 'Machine Learning'],
      color: 'from-gray-400/60 to-blue-400/60'
    },
    {
      icon: FiEye,
      title: 'Security Platforms',
      description: 'Comprehensive security solutions protecting digital assets and ensuring data privacy.',
      features: ['Real-time Monitoring', 'Advanced Analytics', 'Compliance Management', 'Threat Intelligence'],
      color: 'from-blue-400/60 to-gray-400/60'
    },
    {
      icon: FiGlobe,
      title: 'Enterprise AI & Security',
      description: 'End-to-end enterprise solutions combining AI innovation with robust cybersecurity.',
      features: ['Enterprise AI', 'Security Integration', 'Scalable Solutions', '24/7 Support'],
      color: 'from-gray-400/60 to-blue-400/60'
    }
  ];

  const stats = [
    { number: '100+', label: 'Secure Projects Delivered', icon: FiAward },
    { number: '99.9%', label: 'Security Success Rate', icon: FiShield },
    { number: '50+', label: 'Enterprise Clients', icon: FiUsers },
    { number: '24/7', label: 'Security Monitoring', icon: FiZap }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white section-padding hero-glow particle-bg overflow-hidden bg-gradient-to-br from-gray-800 via-blue-900/30 to-gray-800">
        {/* Futuristic Background Image */}
        <div className="absolute inset-0">
          <img 
            src={futuristicImage} 
            alt="Futuristic AI and Cybersecurity Technology Background" 
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchpriority="high"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-blue-900/40 to-gray-900/60"></div>
          {/* Animated glow elements */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-gray-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-gray-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-300/5 to-gray-300/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center min-h-[calc(100vh-5rem)]">
            <div className="space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 px-4 sm:px-0">
              <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full">
                <FiZap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3 text-blue-300 drop-shadow-lg flex-shrink-0" />
                <span className="text-xs sm:text-base md:text-lg lg:text-xl font-semibold text-white drop-shadow-lg whitespace-nowrap">We Engineer Beyond Magic</span>
              </div>

              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] sm:leading-tight break-words drop-shadow-2xl">
                <span className="block text-white drop-shadow-lg break-words mb-2 sm:mb-3">AI, Cybersecurity &</span>
                <span className="block bg-gradient-to-r from-blue-200 via-gray-100 to-blue-200 bg-clip-text text-transparent force-gradient break-words my-2 sm:my-3 md:my-4 drop-shadow-xl">
                  Software Engineering
                </span>
                <span className="block text-white drop-shadow-lg break-words mt-2 sm:mt-3">Redefined</span>
              </h1>

              <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed sm:leading-relaxed md:leading-relaxed max-w-full lg:max-w-2xl drop-shadow-lg">
                We specialize in{' '}
                <span className="font-semibold text-blue-200">AI-powered applications, enterprise cybersecurity, and intelligent software solutions</span>
                {' '}that go beyond expectations, engineered to protect, innovate, and transform.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 pt-2 sm:pt-3 w-full">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 border-2 border-blue-300/40 text-white rounded-lg hover:bg-transparent hover:border-blue-400 shadow-lg text-sm sm:text-base md:text-lg font-semibold w-full sm:w-auto"
                >
                  <span>Start Your Project</span>
                  <FiArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                </a>
                
                <a
                  href="/portfolio"
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 border-2 border-white/50 text-white font-semibold rounded-lg hover:border-white hover:bg-transparent text-sm sm:text-base md:text-lg w-full sm:w-auto"
                >
                  View Our Work
                </a>
              </div>

              {/* Partner Links */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4 pt-6 sm:pt-8 border-t border-white/10 w-full">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 sm:space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-lg hover:border-blue-400"
                >
                  <FiGithub className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-white whitespace-nowrap">GitHub</span>
                </a>
                
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 sm:space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-lg hover:border-blue-400"
                >
                  <FiLinkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-white whitespace-nowrap">LinkedIn</span>
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 sm:space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-lg hover:border-blue-400"
                >
                  <FiTwitter className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-white whitespace-nowrap">Twitter</span>
                </a>

                <a
                  href="https://stackoverflow.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 sm:space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-lg hover:border-blue-400"
                >
                  <SiStackoverflow className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-white whitespace-nowrap">Stack Overflow</span>
                </a>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              {/* Paragraph 1 */}
              <div className="p-6 sm:p-8">
                <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed drop-shadow-2xl">
                  <span className="font-bold text-blue-300 drop-shadow-lg">TheWizarDs</span> is a global AI-powered software and cybersecurity company, leading the world in intelligent digital innovation. We specialize in building next-generation applications—<span className="font-semibold text-white drop-shadow-md">AI-based mobile apps, AI-driven web platforms, intelligent automation tools, and enterprise-grade software</span> engineered for performance, security, and scale. With world-class expertise in artificial intelligence, machine learning, and modern development frameworks, we create solutions that adapt, learn, and evolve in real time.
                </p>
              </div>

              {/* Paragraph 2 */}
              <div className="p-6 sm:p-8">
                <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed drop-shadow-2xl">
                  Driven by our motto, <span className="font-bold text-blue-300 drop-shadow-lg">"We engineer beyond magic,"</span> TheWizarDs delivers <span className="font-semibold text-white drop-shadow-md">end-to-end cybersecurity and AI development under one roof.</span> From advanced threat detection, penetration testing, cloud security, and digital forensics to secure software development lifecycles (SSDLC), we ensure every product we build is protected from the ground up. Our mission is to craft intelligent, secure, and future-proof systems that empower businesses worldwide to innovate with confidence—<span className="font-semibold text-blue-200 drop-shadow-md">moving the world into a safer, smarter digital era.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding relative bg-white dark:bg-dark-800 cyber-grid-bg overflow-hidden">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <img 
            src={codingBgImage} 
            alt="Coding Background" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100/50 to-gray-100/50 border border-blue-300/30 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400">
                <FiZap className="w-4 h-4 mr-2" />
                What We Do Best
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-dark-900 dark:text-white mb-6 break-words">
              Our <span className="bg-gradient-to-r from-blue-400 to-gray-400 bg-clip-text text-transparent force-gradient break-words">Expertise</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto leading-relaxed">
              Specializing in AI and cybersecurity software development, we create intelligent, secure solutions for the modern digital landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.title} className="group p-8 hover:shadow-xl duration-300 floating-element">
                <div className="text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 duration-300`}>
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-dark-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-dark-600 dark:text-dark-300">
                        <FiCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding relative bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-dark-900 dark:to-dark-800 particle-bg overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img 
            src={aiChipImage} 
            alt="AI Technology Background" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center p-6 floating-element">
                <div className="text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-dark-600 dark:text-dark-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding relative bg-white dark:bg-dark-800 cyber-grid-bg overflow-hidden">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <img 
            src={aiProfessionalImage} 
            alt="Professional Background" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="container-custom relative z-10">
          <div
            className="text-center mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-dark-900 dark:text-white mb-6 break-words">
              Trusted by <span className="bg-gradient-to-r from-blue-400 to-gray-400 bg-clip-text text-transparent force-gradient break-words">Industry Leaders</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto leading-relaxed">
              See what our clients say about our AI and cybersecurity expertise and engineering excellence.
            </p>
          </div>

          {loadingClients ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center py-12">
              <FiAward className="w-16 h-16 text-dark-300 mx-auto mb-4" />
              <p className="text-xl text-dark-600 dark:text-dark-300">
                No client testimonials available yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clients.map((client, index) => (
                <div key={client._id} className="p-8 floating-element">
                  {client.logo?.url && (
                    <div className="mb-4 flex justify-center">
                      <img
                        src={client.logo.url}
                        alt={client.company}
                        className="h-12 object-contain opacity-70 dark:opacity-50"
                      />
                    </div>
                  )}
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={`w-5 h-5 ${i < client.rating ? 'text-yellow-400 fill-current' : 'text-dark-300'}`} />
                    ))}
                  </div>
                  <blockquote className="text-dark-600 dark:text-dark-300 mb-6 leading-relaxed">
                    "{client.testimonial}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400/60 to-gray-400/60 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-sm">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-dark-900 dark:text-white">
                        {client.name}
                      </div>
                      <div className="text-sm text-dark-600 dark:text-dark-300">
                        {client.role}
                      </div>
                      <div className="text-xs text-dark-500 dark:text-dark-400">
                        {client.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="section-padding bg-gradient-to-br from-gray-800 via-blue-900/30 to-gray-800 text-white hero-glow particle-bg relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={techBgImage} 
            alt="Technology Background" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-blue-900/40 to-gray-900/60"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-gray-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-gray-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-6">
              <FiBriefcase className="w-4 h-4 mr-2 text-cyber-400" />
              <span className="text-sm font-medium text-gray-100">Build Your Future With Us</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 break-words drop-shadow-2xl">
              Join Our <span className="bg-gradient-to-r from-blue-200 via-gray-100 to-blue-200 bg-clip-text text-transparent force-gradient break-words drop-shadow-xl">Growing Team</span>
            </h2>
            
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-white/95 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
              Be part of a team of innovators shaping the future of <span className="font-semibold text-cyber-200">AI and cybersecurity</span>. Discover exciting career opportunities to grow your skills and make an impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/careers"
                className="inline-flex items-center border-2 border-white/60 text-white hover:bg-transparent hover:border-white font-semibold text-lg py-4 px-8 rounded-lg"
              >
                <FiTrendingUp className="w-5 h-5 mr-2" />
                View Open Positions
              </Link>
              <Link
                to="/team"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-lg hover:border-white hover:bg-transparent duration-300 text-lg"
              >
                <FiUsers className="w-5 h-5 mr-2" />
                Meet Our Team
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
              <div className="p-6 bg-transparent">
                <FiZap className="w-12 h-12 text-blue-300 mx-auto mb-4 drop-shadow-lg" />
                <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-md">Innovation Culture</h3>
                <p className="text-white/90 drop-shadow-sm">Work with cutting-edge technologies and contribute to groundbreaking projects</p>
              </div>

              <div className="p-6 bg-transparent">
                <FiTrendingUp className="w-12 h-12 text-blue-300 mx-auto mb-4 drop-shadow-lg" />
                <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-md">Career Growth</h3>
                <p className="text-white/90 drop-shadow-sm">Continuous learning opportunities and clear paths for professional advancement</p>
              </div>

              <div className="p-6 bg-transparent">
                <FiAward className="w-12 h-12 text-blue-300 mx-auto mb-4 drop-shadow-lg" />
                <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-md">Competitive Benefits</h3>
                <p className="text-white/90 drop-shadow-sm">Attractive compensation packages with comprehensive health and wellness benefits</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
};

export default Home;