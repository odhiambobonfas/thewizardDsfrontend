import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiShield, 
  FiCode, 
  FiLock, 
  FiGlobe, 
  FiUsers, 
  FiTrendingUp,
  FiArrowRight,
  FiCheck,
  FiStar,
  FiAward,
  FiZap,
  FiEye,
  FiSmartphone,
  FiMonitor
} from 'react-icons/fi';

const Home = () => {
  const services = [
    {
      icon: FiCode,
      title: 'Web Development',
      description: 'Elegant, secure web applications built with privacy-by-design principles and enterprise-grade security.',
      features: ['React & Next.js', 'Secure APIs', 'Privacy-First Design', 'Enterprise Security'],
      color: 'from-primary-500 to-cyber-500'
    },
    {
      icon: FiSmartphone,
      title: 'Mobile Applications',
      description: 'Cross-platform mobile solutions with hardened security for real-world threats.',
      features: ['React Native', 'Flutter', 'Secure Authentication', 'Threat Protection'],
      color: 'from-cyber-500 to-primary-500'
    },
    {
      icon: FiMonitor,
      title: 'Desktop Software',
      description: 'Powerful desktop applications with advanced security features for enterprise environments.',
      features: ['Cross-Platform', 'System Integration', 'Advanced Security', 'Enterprise Ready'],
      color: 'from-primary-500 to-cyber-500'
    },
    {
      icon: FiShield,
      title: 'Cybersecurity',
      description: 'Comprehensive security assessments and hardening for organizations demanding the highest standards.',
      features: ['Penetration Testing', 'Security Audits', 'Threat Analysis', 'Compliance'],
      color: 'from-cyber-500 to-primary-500'
    },
    {
      icon: FiEye,
      title: 'Privacy Engineering',
      description: 'Privacy-by-design architecture ensuring your data remains secure and compliant.',
      features: ['Data Protection', 'Privacy Compliance', 'Secure Architecture', 'GDPR/CCPA Ready'],
      color: 'from-primary-500 to-cyber-500'
    },
    {
      icon: FiGlobe,
      title: 'Enterprise Solutions',
      description: 'Full-stack enterprise solutions trusted by organizations with critical security requirements.',
      features: ['Scalable Architecture', 'Enterprise Security', 'High Availability', '24/7 Support'],
      color: 'from-cyber-500 to-primary-500'
    }
  ];

  const stats = [
    { number: '100+', label: 'Secure Projects Delivered', icon: FiAward },
    { number: '99.9%', label: 'Security Success Rate', icon: FiShield },
    { number: '50+', label: 'Enterprise Clients', icon: FiUsers },
    { number: '24/7', label: 'Security Monitoring', icon: FiZap }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, SecureFinance Corp",
      company: "SecureFinance Corp",
      content: "TheWizarDs delivered beyond our expectations. Their security-first approach and elegant solutions have transformed our digital infrastructure.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "CISO, HealthTech Solutions",
      company: "HealthTech Solutions",
      content: "The team's expertise in privacy-by-design architecture helped us achieve compliance while maintaining exceptional user experience.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "VP Engineering, CyberDefense Inc",
      company: "CyberDefense Inc",
      content: "TheWizarDs's hardened solutions protect our critical systems against real-world threats. Their engineering excellence is unmatched.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark-900 via-primary-900 to-cyber-900 text-white section-padding hero-glow particle-bg">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-500/20 to-cyber-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyber-500/20 to-primary-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary-400/10 to-cyber-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 glow-container rounded-full"
              >
                <FiZap className="w-4 h-4 mr-2 text-cyber-400 glow-icon" />
                <span className="text-sm font-medium text-primary-100">Security & Innovation, Engineered</span>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block text-white">Secure</span>
                <span className="block bg-gradient-to-r from-primary-400 via-cyber-400 to-primary-400 bg-clip-text text-transparent text-glow">
                  Software
                </span>
                <span className="block text-white">Solutions</span>
              </h1>

              <p className="text-xl lg:text-2xl text-primary-100 leading-relaxed max-w-2xl">
                We design and deliver 
                <span className="font-semibold text-cyber-300"> elegant, privacy-by-design, and hardened software</span> 
                trusted by organizations with the most demanding security requirements.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="/contact"
                  className="glow-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Start Your Project</span>
                  <FiArrowRight className="ml-2 w-5 h-5" />
                </motion.a>
                
                <motion.a
                  href="/portfolio"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300 glow-card"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Our Work
                </motion.a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-6">
                <div className="flex items-center space-x-2 glow-card px-4 py-2 rounded-lg">
                  <FiShield className="w-5 h-5 text-cyber-400 glow-icon" />
                  <span className="text-sm text-primary-200">SOC 2 Certified</span>
                </div>
                <div className="flex items-center space-x-2 glow-card px-4 py-2 rounded-lg">
                  <FiLock className="w-5 h-5 text-primary-400 glow-icon" />
                  <span className="text-sm text-primary-200">ISO 27001</span>
                </div>
                <div className="flex items-center space-x-2 glow-card px-4 py-2 rounded-lg">
                  <FiEye className="w-5 h-5 text-cyber-400 glow-icon" />
                  <span className="text-sm text-primary-200">GDPR Ready</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative glow-container p-8 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-6">
                  <div className="glow-card p-6 text-center floating-element">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-cyber-500 rounded-xl mx-auto mb-4 flex items-center justify-center pulse-glow">
                      <FiShield className="w-8 h-8 text-white glow-icon" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Security First</h3>
                    <p className="text-sm text-primary-200">Every line of code crafted with security as foundation</p>
                  </div>
                  
                  <div className="glow-card p-6 text-center floating-element" style={{ animationDelay: '1s' }}>
                    <div className="w-16 h-16 bg-gradient-to-br from-cyber-500 to-primary-500 rounded-xl mx-auto mb-4 flex items-center justify-center pulse-glow">
                      <FiEye className="w-8 h-8 text-white glow-icon" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Privacy by Design</h3>
                    <p className="text-sm text-primary-200">Built-in privacy protection from ground up</p>
                  </div>
                  
                  <div className="glow-card p-6 text-center floating-element" style={{ animationDelay: '2s' }}>
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl mx-auto mb-4 flex items-center justify-center pulse-glow">
                      <FiZap className="w-8 h-8 text-white glow-icon" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Engineering Excellence</h3>
                    <p className="text-sm text-primary-200">Elegant solutions that exceed standards</p>
                  </div>
                  
                  <div className="glow-card p-6 text-center floating-element" style={{ animationDelay: '3s' }}>
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center pulse-glow">
                      <FiUsers className="w-8 h-8 text-white glow-icon" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Enterprise Trust</h3>
                    <p className="text-sm text-primary-200">Trusted by Fortune 500 companies</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white dark:bg-dark-800 cyber-grid-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white mb-6">
              Our <span className="bg-gradient-to-r from-primary-600 to-cyber-600 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              Comprehensive security solutions and software development services for organizations that demand excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group glow-container p-8 hover:shadow-xl transition-all duration-300 floating-element"
              >
                <div className="text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 pulse-glow`}>
                    <service.icon className="w-10 h-10 text-white glow-icon" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-dark-600 dark:text-dark-300">
                        <FiCheck className="w-4 h-4 text-primary-600 dark:text-primary-400 mr-2 glow-icon" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-br from-dark-50 to-primary-50 dark:from-dark-900 dark:to-dark-800 particle-bg">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center glow-card p-6 floating-element"
              >
                <div className="text-4xl lg:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2 text-glow">
                  {stat.number}
                </div>
                <div className="text-dark-600 dark:text-dark-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white dark:bg-dark-800 cyber-grid-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white mb-6">
              Trusted by <span className="bg-gradient-to-r from-primary-600 to-cyber-600 bg-clip-text text-transparent">Industry Leaders</span>
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              See what our clients say about our security-first approach and engineering excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glow-card p-8 floating-element"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current glow-icon" />
                  ))}
                </div>
                <blockquote className="text-dark-600 dark:text-dark-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-cyber-500 rounded-full flex items-center justify-center mr-4 pulse-glow">
                    <span className="text-white font-bold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-dark-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-dark-600 dark:text-dark-300">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 via-cyber-600 to-primary-700 text-white hero-glow">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-glow">
              Ready to Secure Your Future?
            </h2>
            <p className="text-xl lg:text-2xl mb-8 text-primary-100 leading-relaxed">
              Join the organizations who trust TheWizarDs to deliver secure, elegant, and privacy-focused software solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="glow-button"
              >
                <span>Start Your Secure Project</span>
                <FiZap className="ml-2 w-5 h-5" />
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300 glow-card"
              >
                Explore Our Portfolio
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;