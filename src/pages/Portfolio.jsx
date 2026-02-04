import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiShield, 
  FiCode, 
  FiGlobe, 
  FiExternalLink, 
  FiGithub,
  FiCheck,
  FiArrowRight,
  FiFilter,
  FiStar,
  FiEye,
  FiCalendar,
  FiUser,
  FiAward,
  FiZap,
  FiCpu,
  FiSmartphone,
  FiCloud
} from 'react-icons/fi';

import CallToAction from '../sections/CallToAction';
import heroImage from '../assets/images/3d-render-techno-background-with-male-figure-coding-design.jpg';
import aiProfessionalImage from '../assets/images/african-american-it-professional-managing-ai-system-machine-learning.jpg';
import devImage from '../assets/images/dev1.webp';
import techCodeImage from '../assets/images/3d-render-technology-background-with-code-male-head.jpg';
import cyberSecImage from '../assets/images/cyber.jpg';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testimonials, setTestimonials] = useState([]);

  // Fetch portfolio data from API
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all published projects
        const response = await fetch('http://localhost:5000/api/portfolio?status=published');
        const data = await response.json();
        
        if (data.success) {
          setProjects(data.data.projects || []);
          
          // Extract unique categories
          const uniqueCategories = [...new Set(data.data.projects.map(p => p.category))];
          setCategories(uniqueCategories);
          
          // Generate categories from actual projects data
          const categoryMap = {};
          data.data.projects.forEach(project => {
            if (categoryMap[project.category]) {
              categoryMap[project.category]++;
            } else {
              categoryMap[project.category] = 1;
            }
          });

          const generatedCategories = [
            { id: 'all', label: 'All Projects', count: data.data.projects.length, icon: FiGlobe },
            { id: 'cybersecurity', label: 'Cybersecurity', count: categoryMap['cybersecurity'] || 0, icon: FiShield },
            { id: 'ai-ml', label: 'AI & Machine Learning', count: categoryMap['ai-ml'] || 0, icon: FiCpu },
            { id: 'mobile-development', label: 'Mobile Development', count: categoryMap['mobile-development'] || 0, icon: FiSmartphone },
            { id: 'web-development', label: 'Web Development', count: categoryMap['web-development'] || 0, icon: FiCode },
            { id: 'cloud-solutions', label: 'Cloud Solutions', count: categoryMap['cloud-solutions'] || 0, icon: FiCloud }
          ].filter(cat => cat.id === 'all' || cat.count > 0); // Only show categories with projects

          setCategories(generatedCategories);
        } else {
          setError(data.message || 'Failed to fetch projects');
        }
        
        // Fetch testimonials
        const testimonialsResponse = await fetch('http://localhost:5000/api/testimonials?featured=true&limit=6');
        const testimonialsData = await testimonialsResponse.json();
        
        if (testimonialsData.success) {
          setTestimonials(testimonialsData.data || []);
        }
        
      } catch (err) {
        setError('Failed to load portfolio data');
        console.error('Portfolio fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const getCategoryIcon = (category) => {
    const icons = {
      'cybersecurity': FiShield,
      'ai-ml': FiCpu,
      'mobile-development': FiSmartphone,
      'web-development': FiCode,
      'cloud-solutions': FiCloud
    };
    return icons[category] || FiCode;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'cybersecurity': 'from-red-500 to-pink-500',
      'ai-ml': 'from-purple-500 to-blue-500',
      'mobile-development': 'from-green-500 to-teal-500',
      'web-development': 'from-blue-500 to-cyan-500',
      'cloud-solutions': 'from-orange-500 to-yellow-500'
    };
    return colors[category] || 'from-blue-400/60 to-gray-400/60';
  };

  const stats = [
    { number: '50+', label: 'Projects Completed', icon: FiAward },
    { number: '100%', label: 'Client Satisfaction', icon: FiStar },
    { number: '99.9%', label: 'Success Rate', icon: FiCheck },
    { number: '24/7', label: 'Support Available', icon: FiZap }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
        <div className="text-center">
          <div className="rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-dark-600 dark:text-dark-300 text-lg">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Portfolio</h2>
          <p className="text-dark-600 dark:text-dark-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
      {/* Enhanced Hero Section */}
      <section className="relative text-white section-padding hero-glow particle-bg overflow-hidden bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Portfolio Projects" 
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
        </div>

        <div className="container-custom text-center relative z-10">
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-6">
              <FiZap className="w-4 h-4 mr-2 text-cyber-400" />
              <span className="text-sm font-medium text-gray-100">We Engineer Beyond Magic</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 break-words">
              Our <span className="bg-gradient-to-r from-blue-200 via-gray-100 to-blue-200 bg-clip-text text-transparent force-gradient break-words">Portfolio</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed">
              Showcasing our successful <span className="font-semibold text-cyber-300">AI, cybersecurity, and software development</span> projects 
              that have helped businesses transform their digital presence and achieve remarkable results.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="section-padding -mt-8 relative z-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <img 
            src={techCodeImage} 
            alt="Technology Background" 
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

      {/* Enhanced Filter Section */}
      <section className="section-padding relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 particle-bg overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={aiProfessionalImage} 
            alt="Professional Background" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="container-custom relative z-10">
          <div
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-6 break-words">
              Featured <span className="gradient-text break-words">Projects</span>
            </h2>
            <p className="text-lg sm:text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto mb-8">
              Real-world solutions that demonstrate our expertise across different industries and cutting-edge technologies
            </p>

            {/* Enhanced Filter Buttons */}
            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {categories.map((category) => {
                  const CategoryIcon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveFilter(category.id)}
                      className={`flex items-center px-5 sm:px-6 py-3 sm:py-4 rounded-xl font-medium duration-300 ${
                        activeFilter === category.id
                          ? 'bg-gradient-to-r from-blue-400 to-gray-400 text-white shadow-lg shadow-primary-500/25'
                          : 'bg-transparent text-dark-600 dark:text-dark-300 hover:bg-primary-50 dark:hover:bg-dark-700 border border-dark-200/50 dark:border-dark-600/50'
                      }`}>
                      <CategoryIcon className="w-4 h-4 mr-2" />
                      {category.label} 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        activeFilter === category.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-primary-100 dark:bg-primary-900/30 text-blue-600 dark:text-blue-400'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Enhanced Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => {
              const CategoryIcon = getCategoryIcon(project.category);
              const categoryColor = getCategoryColor(project.category);
              
              return (
                <div key={project._id} className="p-6 sm:p-8 hover:shadow-2xl duration-500 floating-element group cursor-pointer">
                  {/* Project Image */}
                  <div className="relative overflow-hidden rounded-xl mb-6">
                    {project.images && project.images.length > 0 ? (
                      <img 
                        src={project.images[0].url} 
                        alt={project.title}
                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 duration-500"
                      />
                    ) : (
                      <div className={`w-full h-48 sm:h-56 bg-gradient-to-br ${categoryColor} flex items-center justify-center group-hover:scale-105 duration-500`}>
                        <CategoryIcon className="w-16 h-16 text-white" />
                      </div>
                    )}
                    
                    {/* Project Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        project.category === 'cybersecurity' 
                          ? 'bg-red-100/90 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-red-200/50'
                          : project.category === 'ai-ml'
                          ? 'bg-purple-100/90 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200/50'
                          : project.category === 'mobile-development'
                          ? 'bg-green-100/90 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-200/50'
                          : 'bg-blue-100/90 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200/50'
                      }`}>
                        {project.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                      {project.featured && (
                        <span className="px-3 py-1 bg-yellow-100/90 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300 rounded-full text-xs font-medium border border-yellow-200/50 flex items-center">
                          <FiStar className="w-3 h-3 mr-1" />
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Project Stats */}
                    <div className="absolute bottom-4 left-4 flex items-center space-x-3 text-white text-xs">
                      {project.analytics && (
                        <>
                          <span className="flex items-center bg-black/30 px-2 py-1 rounded-full">
                            <FiEye className="w-3 h-3 mr-1" />
                            {project.analytics.views}
                          </span>
                          <span className="flex items-center bg-black/30 px-2 py-1 rounded-full">
                            <FiStar className="w-3 h-3 mr-1" />
                            {project.analytics.likes}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      {project.client && (
                        <div className="flex items-center space-x-4 text-sm text-dark-600 dark:text-dark-300 mb-3">
                          <span className="flex items-center">
                            <FiUser className="w-4 h-4 mr-1" />
                            {project.client.name}
                          </span>
                          <span className="flex items-center">
                            <FiCalendar className="w-4 h-4 mr-1" />
                            {project.duration}
                          </span>
                        </div>
                      )}
                      
                      <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-blue-50/80 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-lg text-xs border border-blue-100/40 dark:border-blue-700/20"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="px-3 py-1 bg-dark-100/80 dark:bg-dark-700/80 text-dark-600 dark:text-dark-400 rounded-lg text-xs border border-dark-200/50">
                            +{project.technologies.length - 5}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Key Features */}
                    {project.features && project.features.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-dark-900 dark:text-white text-sm">Key Features:</h4>
                        <ul className="space-y-2">
                          {project.features.slice(0, 3).map((feature, idx) => (
                            <li 
                              key={idx}
                              className="flex items-center space-x-3 text-sm text-dark-600 dark:text-dark-300"
                            >
                              <div className="w-5 h-5 bg-gradient-to-br from-blue-400/60 to-gray-400/60 rounded-full flex items-center justify-center flex-shrink-0">
                                <FiCheck className="w-3 h-3 text-white" />
                              </div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Project Links */}
                    <div className="flex items-center justify-between pt-4 border-t border-dark-200/50 dark:border-dark-600/50">
                      <div className="flex space-x-3">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-gradient-to-br from-blue-400/60 to-gray-400/60 rounded-lg flex items-center justify-center text-white hover:shadow-lg hover:shadow-primary-500/25 duration-300"
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
                            className="w-10 h-10 bg-gradient-to-br from-blue-400/60 to-gray-400/60 rounded-lg flex items-center justify-center text-white hover:shadow-lg hover:shadow-primary-500/25 duration-300"
                            title="View Source Code"
                          >
                            <FiGithub className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                      <div>
                        <Link 
                          to={`/portfolio/${project.seo.slug}`} 
                          className="inline-flex items-center px-4 py-2 border-2 border-blue-300/40 text-white font-semibold rounded-lg hover:bg-transparent hover:border-blue-400 text-sm"
                        >
                          View Details
                          <FiArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="p-8 max-w-md mx-auto">
                <FiFilter className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">No Projects Found</h3>
                <p className="text-dark-600 dark:text-dark-300">
                  No projects match the selected filter. Try choosing a different category.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="section-padding relative bg-gradient-to-br from-white via-blue-50/20 to-white dark:from-dark-800 dark:via-dark-700 dark:to-dark-800 cyber-grid-bg overflow-hidden">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <img 
            src={devImage} 
            alt="Development Background" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="container-custom relative z-10">
          <div
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-4 break-words">
              Client <span className="gradient-text break-words">Testimonials</span>
            </h2>
            <p className="text-lg sm:text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto mb-8">
              Hear what our clients say about working with us and the results we've delivered
            </p>
            
            <Link
              to="/client/testimonial"
              className="inline-flex items-center px-6 py-3 border-2 border-blue-300/40 text-white font-semibold rounded-xl hover:bg-transparent hover:border-blue-400"
            >
              <FiAward className="w-5 h-5 mr-2" />
              Share Your Experience
            </Link>
          </div>

          {testimonials.length === 0 ? (
            <div className="text-center p-12 max-w-2xl mx-auto">
              <FiAward className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">No Testimonials Yet</h3>
              <p className="text-dark-600 dark:text-dark-300 mb-6">
                Be the first to share your experience working with us!
              </p>
              <Link
                to="/client/testimonial"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
              >
                <FiAward className="w-5 h-5 mr-2" />
                Submit Testimonial
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial._id} className="p-6 sm:p-8 floating-element group hover:shadow-xl duration-300">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-dark-600 dark:text-dark-300 mb-6 italic leading-relaxed">
                    "{testimonial.testimonial}"
                  </p>
                  <div className="border-t border-dark-200/50 dark:border-dark-600/50 pt-4">
                    <div className="font-semibold text-dark-900 dark:text-white text-lg">
                      {testimonial.clientName}
                    </div>
                    {testimonial.role && (
                      <div className="text-dark-600 dark:text-dark-300 text-sm mb-2">
                        {testimonial.role}{testimonial.company && `, ${testimonial.company}`}
                      </div>
                    )}
                    {testimonial.projectName && (
                      <div className="text-blue-600 dark:text-blue-400 text-xs font-medium">
                        Project: {testimonial.projectName}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CallToAction />
    </div>
  );
};

export default Portfolio;