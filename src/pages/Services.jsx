import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiShield, 
  FiLock, 
  FiCode, 
  FiGlobe, 
  FiSearch, 
  FiUsers, 
  FiTool, 
  FiMonitor,
  FiCheck,
  FiArrowRight,
  FiSmartphone,
  FiMessageCircle
} from 'react-icons/fi';
import { servicesAPI } from '../services/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await servicesAPI.getAll();
      if (response.success) {
        setServices(response.data.services);
        setCategories([
          { id: 'all', name: 'All Services', count: response.data.services.length },
          ...response.data.categories
        ]);
      }
    } catch (err) {
      setError('Failed to load services');
      console.error('Services fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName) => {
    const icons = {
      FiCode,
      FiSmartphone,
      FiMonitor,
      FiShield,
      FiUser: FiUsers,
      FiGlobe,
      FiMessageCircle
    };
    return icons[iconName] || FiCode;
  };

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const process = [
    {
      step: '01',
      title: 'Discovery & Assessment',
      description: 'We analyze your current needs and business requirements to understand your unique challenges.'
    },
    {
      step: '02',
      title: 'Strategy & Planning',
      description: 'Develop a comprehensive strategy and project plan tailored to your organization.'
    },
    {
      step: '03',
      title: 'Implementation',
      description: 'Execute the development work with regular progress updates and milestone reviews.'
    },
    {
      step: '04',
      title: 'Testing & Validation',
      description: 'Thorough testing to ensure all features are working effectively and meet requirements.'
    },
    {
      step: '05',
      title: 'Deployment & Support',
      description: 'Deploy solutions and establish ongoing support and maintenance procedures.'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Services</h2>
          <p className="text-dark-600 dark:text-dark-300 mb-4">{error}</p>
          <button 
            onClick={fetchServices}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 via-primary-50 to-cyber-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-cyber-600 to-primary-700 text-white section-padding hero-glow particle-bg">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-glow">Our Services</h1>
            <p className="text-lg sm:text-xl text-primary-100 max-w-3xl mx-auto">
              Comprehensive software development and cybersecurity services designed to transform your digital presence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="section-padding bg-gradient-to-br from-white via-primary-50 to-cyber-50 dark:from-dark-800 dark:via-dark-700 dark:to-dark-800 cyber-grid-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-6 sm:mb-8">
              Choose Your <span className="gradient-text">Service Category</span>
            </h2>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white/80 dark:bg-dark-800/80 text-dark-600 dark:text-dark-300 hover:bg-primary-50 dark:hover:bg-dark-700'
                  }`}
              ))}
            </div>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service, index) => {
              const IconComponent = getIconComponent(service.icon);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glow-container p-6 sm:p-8 hover:shadow-xl transition-all duration-300 floating-element group"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-cyber-500 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300 glow-card">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-dark-900 dark:text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-dark-600 dark:text-dark-300 text-sm mb-3">
                        {service.shortDescription}
                      </p>
                      {service.popular && (
                        <span className="inline-block px-2 py-1 bg-cyber-100/80 text-cyber-700 dark:bg-cyber-900/30 dark:text-cyber-300 text-xs font-medium rounded-full backdrop-blur-sm">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-dark-600 dark:text-dark-300 mb-4 text-sm">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-center space-x-2 text-sm text-dark-600 dark:text-dark-300">
                        <FiCheck className="w-4 h-4 text-cyber-500 flex-shrink-0 glow-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {service.features.length > 4 && (
                      <li className="text-xs text-dark-500 dark:text-dark-400">
                        +{service.features.length - 4} more features
                      </li>
                    )}
                  </ul>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-dark-200/50 dark:border-dark-600/50">
                    <div>
                      <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                        ${service.pricing.starting.toLocaleString()}
                      </span>
                      <span className="text-sm text-dark-500 dark:text-dark-400 ml-1">
                        {service.pricing.currency === 'USD/hour' ? '/hr' : ''}
                      </span>
                      <div className="text-xs text-dark-500 dark:text-dark-400">
                        {service.pricing.timeline}
                      </div>
                    </div>
                    <Link to={`/services/${service.id}`} className="btn-primary text-sm">
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gradient-to-br from-dark-50 via-primary-50 to-cyber-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 particle-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-lg sm:text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              A proven methodology to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-br from-primary-500 to-cyber-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto glow-card">
                    {step.step}
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-7 sm:top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-cyber-300 transform -translate-x-7 sm:-translate-x-8"></div>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-dark-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-dark-600 dark:text-dark-300 text-xs sm:text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 via-cyber-600 to-primary-700 text-white hero-glow particle-bg">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-glow">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-primary-100">
              Contact us today for a free consultation and discover how we can help transform your digital presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a href="/contact" className="glow-button">
                Get Free Consultation
              </a>
              <a href="/portfolio" className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/50 text-white font-semibold rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300 glow-card">
                View Our Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );

};

export default Services;