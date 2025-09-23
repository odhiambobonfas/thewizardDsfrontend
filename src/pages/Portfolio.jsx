import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiShield, 
  FiCode, 
  FiLock, 
  FiGlobe, 
  FiExternalLink, 
  FiGithub,
  FiCheck,
  FiArrowRight,
  FiFilter,
  FiStar
} from 'react-icons/fi';
import { portfolioAPI } from '../services/api';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await portfolioAPI.getAll();
      if (response.success) {
        setProjects(response.data.projects);
        
        // Generate categories from projects
        const categoryMap = {};
        response.data.projects.forEach(project => {
          if (categoryMap[project.category]) {
            categoryMap[project.category]++;
          } else {
            categoryMap[project.category] = 1;
          }
        });

        const generatedCategories = [
          { id: 'all', label: 'All Projects', count: response.data.projects.length },
          ...Object.entries(categoryMap).map(([key, count]) => ({
            id: key,
            label: key.charAt(0).toUpperCase() + key.slice(1),
            count
          }))
        ];

        setCategories(generatedCategories);
      }
    } catch (err) {
      setError('Failed to load portfolio');
      console.error('Portfolio fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '100%', label: 'Client Satisfaction' },
    { number: '99.9%', label: 'Success Rate' },
    { number: '24/7', label: 'Support Available' }
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
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Portfolio</h2>
          <p className="text-dark-600 dark:text-dark-300 mb-4">{error}</p>
          <button 
            onClick={fetchPortfolio}
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-glow">Our Portfolio</h1>
            <p className="text-lg sm:text-xl text-primary-100 max-w-3xl mx-auto">
              Showcasing our successful projects that have helped businesses transform their digital presence and achieve their goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-white via-primary-50 to-cyber-50 dark:from-dark-800 dark:via-dark-700 dark:to-dark-800 py-12 sm:py-16 cyber-grid-bg">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center glow-card p-4 sm:p-6 floating-element"
              >
                <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2 text-glow">
                  {stat.number}
                </div>
                <div className="text-dark-600 dark:text-dark-300 text-xs sm:text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding bg-gradient-to-br from-dark-50 via-primary-50 to-cyber-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 particle-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-lg sm:text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto mb-8">
              Real-world solutions that demonstrate our expertise across different industries and technologies
            </p>

            {/* Filter Buttons */}
            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeFilter === category.id
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'bg-white/80 dark:bg-dark-800/80 text-dark-600 dark:text-dark-300 hover:bg-primary-50 dark:hover:bg-dark-700'
                    }`}
                ))}
              </div>
            )}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glow-container p-6 sm:p-8 hover:shadow-xl transition-all duration-300 floating-element group"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  {project.images && project.images.length > 0 ? (
                    <img 
                      src={project.images[0].url} 
                      alt={project.title}
                      className="w-full h-48 sm:h-64 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-primary-100 via-cyber-100 to-primary-200 dark:from-primary-900/20 dark:via-cyber-900/20 dark:to-primary-900/20 flex items-center justify-center glow-card">
                      {project.category === 'security' ? (
                        <FiShield className="w-12 sm:w-16 h-12 sm:h-16 text-primary-600 dark:text-primary-400 glow-icon" />
                      ) : (
                        <FiCode className="w-12 sm:w-16 h-12 sm:h-16 text-primary-600 dark:text-primary-400 glow-icon" />
                      )}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                      project.category === 'security' 
                        ? 'bg-red-100/90 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                        : project.category === 'development'
                        ? 'bg-blue-100/90 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                        : 'bg-green-100/90 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                    }`}>
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </span>
                    {project.featured && (
                      <span className="px-2 sm:px-3 py-1 bg-yellow-100/90 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300 rounded-full text-xs font-medium backdrop-blur-sm">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-dark-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    {project.client && (
                      <p className="text-dark-600 dark:text-dark-300 text-sm font-medium mb-3">
                        Client: {project.client.name} • Duration: {project.duration || 'N/A'}
                      </p>
                    )}
                    <p className="text-dark-600 dark:text-dark-300 mb-4 text-sm sm:text-base">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-primary-100/80 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-xs backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 6 && (
                        <span className="px-2 py-1 bg-dark-100/80 dark:bg-dark-700/80 text-dark-600 dark:text-dark-400 rounded text-xs backdrop-blur-sm">
                          +{project.technologies.length - 6} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Key Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="space-y-2 mb-6">
                      <h4 className="font-semibold text-dark-900 dark:text-white text-sm">Key Features:</h4>
                      <ul className="space-y-1">
                        {project.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-sm text-dark-600 dark:text-dark-300">
                            <FiCheck className="w-4 h-4 text-cyber-500 flex-shrink-0 glow-icon" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Project Links */}
                  <div className="flex items-center justify-between pt-4 border-t border-dark-200/50 dark:border-dark-600/50">
                    <div className="flex space-x-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 glow-icon"
                          title="View Live Project"
                        >
                          <FiExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 glow-icon"
                          title="View Source Code"
                        >
                          <FiGithub className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {project.analytics && project.analytics.views > 0 && (
                        <span className="text-xs text-dark-500 dark:text-dark-400">
                          {project.analytics.views} views
                        </span>
                      )}
                      <Link to={`/portfolio/${project.seo.slug}`} className="btn-primary text-sm">
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="glow-card p-8 max-w-md mx-auto">
                <p className="text-dark-600 dark:text-dark-300 text-lg">
                  No projects found in this category.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gradient-to-br from-white via-primary-50 to-cyber-50 dark:from-dark-800 dark:via-dark-700 dark:to-dark-800 cyber-grid-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-lg sm:text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              Trusted by businesses worldwide for our expertise and results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                quote: "TheWizarDs transformed our digital presence completely. Their expertise in both development and security is unmatched.",
                author: "Sarah Johnson",
                role: "CTO, TechMart Inc.",
                rating: 5
              },
              {
                quote: "Outstanding work on our web platform. The team delivered a secure, scalable solution that exceeded our expectations.",
                author: "Michael Chen",
                role: "CEO, InvestPro",
                rating: 5
              },
              {
                quote: "Professional, knowledgeable, and results-driven. TheWizarDs helped us achieve our goals ahead of schedule.",
                author: "Emily Rodriguez",
                role: "Director, SecureBank",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glow-card p-6 sm:p-8 floating-element"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400 fill-current glow-icon" />
                  ))}
                </div>
                <p className="text-dark-600 dark:text-dark-300 mb-6 italic text-sm sm:text-base">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-semibold text-dark-900 dark:text-white text-sm sm:text-base">
                    {testimonial.author}
                  </div>
                  <div className="text-dark-600 dark:text-dark-300 text-xs sm:text-sm">
                    {testimonial.role}
                  </div>
                </div>
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
              Ready to Start Your Project?
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-primary-100">
              Let's discuss how we can help transform your digital presence with our proven expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a href="/contact" className="glow-button">
                Start Your Project
              </a>
              <a href="/services" className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/50 text-white font-semibold rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300 glow-card">
                Our Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
