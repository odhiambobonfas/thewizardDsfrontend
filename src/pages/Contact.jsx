import React, { useState } from 'react';
import CallToAction from '../sections/CallToAction';
import { useContactForm } from '../hooks/useContactForm';
import heroImage from '../assets/images/aidev.webp';
import cyberSecImage from '../assets/images/cyber.jpg';
import aiChipImage from '../assets/images/ai-chip-circuit-board.jpg';
import aiTechImage from '../assets/images/ai-technology-microchip-background-futuristic-innovation-technology-remix.jpg';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend,
  FiCheck,
  FiShield,
  FiCode,
  FiUsers,
  FiMessageCircle,
  FiVideo,
  FiCalendar,
  FiCpu,
  FiGitBranch,
  FiZap,
  FiAward,
  FiGlobe
} from 'react-icons/fi';

const Contact = () => {
  const { formData, isSubmitting, isSuccess, handleChange, handleSubmit } = useContactForm();
  

  const [activeFAQ, setActiveFAQ] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email Us',
      details: 'TheWizards@gmail.com',
      link: 'mailto:TheWizards@gmail.com',
      description: 'Direct line to our team',
      badge: 'Fast Response'
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      details: '+254 742 187 929',
      link: 'tel:+254742187929',
      description: '24/7 Emergency Support',
      badge: 'Priority'
    },
    {
      icon: FiMapPin,
      title: 'Visit Our HQ',
      details: 'Westlands, Nairobi, Kenya',
      link: 'https://maps.google.com/?q=Westlands+Nairobi+Kenya',
      description: 'Technology Hub',
      badge: 'Africa HQ'
    },
    {
      icon: FiVideo,
      title: 'Video Call',
      details: 'Schedule Meeting',
      link: '#',
      description: 'Virtual Consultation',
      badge: 'Global'
    }
  ];

  const services = [
    { 
      value: 'ai-solutions', 
      label: 'AI & Machine Learning',
      icon: FiGitBranch,
      description: 'Intelligent systems and predictive analytics'
    },
    { 
      value: 'cybersecurity', 
      label: 'Cybersecurity Solutions', 
      icon: FiShield,
      description: 'Advanced threat protection and security'
    },
    { 
      value: 'custom-software', 
      label: 'Custom Software Development', 
      icon: FiCode,
      description: 'Tailored applications for your needs'
    },
    { 
      value: 'ai-security', 
      label: 'AI Security & Ethics', 
      icon: FiCpu,
      description: 'Secure and ethical AI implementation'
    },
    { 
      value: 'enterprise-ai', 
      label: 'Enterprise AI Integration', 
      icon: FiUsers,
      description: 'Scale AI across your organization'
    },
    { 
      value: 'emergency-response', 
      label: 'Emergency Security Response', 
      icon: FiZap,
      description: '24/7 critical incident response'
    }
  ];

  const expertiseAreas = [
    {
      icon: FiGitBranch,
      title: 'AI & Machine Learning',
      description: 'Custom AI solutions, predictive analytics, and intelligent automation'
    },
    {
      icon: FiShield,
      title: 'Cybersecurity',
      description: 'Enterprise security, threat intelligence, and compliance'
    },
    {
      icon: FiCpu,
      title: 'Software Engineering',
      description: 'Full-stack development with security-first approach'
    },
    {
      icon: FiGlobe,
      title: 'Global Deployment',
      description: 'Worldwide solutions with local expertise'
    }
  ];

  const faqs = [
    {
      question: 'How quickly can you start on AI projects?',
      answer: 'We can initiate AI projects within 1-2 weeks. For urgent security matters, we provide 24/7 emergency response with immediate engagement.'
    },
    {
      question: 'Do you offer AI model security auditing?',
      answer: 'Yes, we specialize in AI security auditing, including adversarial testing, model robustness assessment, and ethical AI compliance checks.'
    },
    {
      question: 'What industries do you specialize in for AI solutions?',
      answer: 'We deliver AI solutions across healthcare, finance, e-commerce, agriculture, and enterprise sectors with industry-specific expertise.'
    },
    {
      question: 'Do you provide ongoing AI model monitoring?',
      answer: 'Absolutely. We offer continuous AI monitoring, model performance tracking, and automated retraining services to maintain optimal performance.'
    },
    {
      question: 'How do you handle data privacy in AI projects?',
      answer: 'We implement privacy-preserving AI techniques including federated learning, differential privacy, and secure multi-party computation.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
      {/* Hero Section */}
      <section className="relative text-white section-padding hero-glow particle-bg overflow-hidden bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Contact Us" 
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-blue-900/40 to-gray-900/60"></div>
        </div>

        <div className="container-custom text-center relative z-10">
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-6">
              <FiZap className="w-4 h-4 mr-2 text-cyber-400" />
              <span className="text-sm font-medium text-gray-100">We Engineer Beyond Magic</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 break-words">
              Let's Build The <span className="bg-gradient-to-r from-blue-200 via-gray-100 to-blue-200 bg-clip-text text-transparent force-gradient break-words">Future</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed">
              Ready to transform your business with cutting-edge <span className="font-semibold text-cyber-300">AI and cybersecurity solutions</span>? 
              Let's discuss how we can engineer intelligent, secure systems that drive your success.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="section-padding -mt-16 relative z-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <img 
            src={aiTechImage} 
            alt="Technology Background" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: FiPhone,
                title: 'Emergency Support',
                description: '24/7 Critical Response',
                action: 'Call Now',
                link: 'tel:+254742187929',
                color: 'from-red-400/70 to-gray-400/60',
                urgent: true
              },
              {
                icon: FiVideo,
                title: 'Book Consultation',
                description: 'Free Strategy Session',
                action: 'Schedule',
                link: '#',
                color: 'from-blue-400/60 to-gray-400/60',
                onClick: () => setShowBookingModal(true)
              },
              {
                icon: FiMail,
                title: 'Quick Quote',
                description: 'Project Estimation',
                action: 'Email Us',
                link: 'mailto:TheWizards@gmail.com',
                color: 'from-gray-400/60 to-blue-400/60'
              }
            ].map((action, index) => (
              <div
                key={action.title}
                className="p-6 text-center floating-element cursor-pointer"
                onClick={action.onClick}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl mx-auto mb-4 flex items-center justify-center`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">
                  {action.title}
                </h3>
                <p className="text-dark-600 dark:text-dark-300 mb-4">
                  {action.description}
                </p>
                {action.urgent && (
                  <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-medium mb-4">
                    Urgent
                  </span>
                )}
                <a
                  href={action.link}
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-300/40 text-white rounded-lg hover:bg-transparent hover:border-blue-400 font-semibold"
                >
                  {action.action}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding relative bg-gradient-to-br from-white via-blue-50/20 to-white dark:from-dark-800 dark:via-dark-700 dark:to-dark-800 cyber-grid-bg overflow-hidden">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <img 
            src={cyberSecImage} 
            alt="Cybersecurity Background" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form */}
            <div
              className="p-6 sm:p-8 floating-element"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400/60 to-gray-400/60 rounded-xl flex items-center justify-center mr-4">
                  <FiMessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-dark-900 dark:text-white">
                    Start Your <span className="gradient-text">Project</span>
                  </h2>
                  <p className="text-dark-600 dark:text-dark-300 text-sm">
                    Tell us about your AI or security needs
                  </p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-transparent border border-dark-200/50 dark:border-dark-600/50 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-dark-900 dark:text-white placeholder-dark-500 dark:placeholder-dark-400"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-transparent border border-dark-200/50 dark:border-dark-600/50 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-dark-900 dark:text-white placeholder-dark-500 dark:placeholder-dark-400"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-transparent border border-dark-200/50 dark:border-dark-600/50 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-dark-900 dark:text-white placeholder-dark-500 dark:placeholder-dark-400"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border border-dark-200/50 dark:border-dark-600/50 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-dark-900 dark:text-white placeholder-dark-500 dark:placeholder-dark-400"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border border-dark-200/50 dark:border-dark-600/50 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-dark-900 dark:text-white placeholder-dark-500 dark:placeholder-dark-400"
                    placeholder="+254 742 187 929"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Service Interest *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-transparent border border-dark-200/50 dark:border-dark-600/50 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-dark-900 dark:text-white"
                  >
                    <option value="">Select your project type</option>
                    <option value="ai-solutions">AI & Machine Learning Solutions</option>
                    <option value="cybersecurity">Cybersecurity & Threat Protection</option>
                    <option value="custom-software">Custom Software Development</option>
                    <option value="ai-security">AI Security & Ethical AI</option>
                    <option value="enterprise-ai">Enterprise AI Integration</option>
                    <option value="emergency-response">Emergency Security Response</option>
                    <option value="other">Other / General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Project Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border border-dark-200/50 dark:border-dark-600/50 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-dark-900 dark:text-white"
                  >
                    <option value="">Select timeline</option>
                    <option value="urgent">Urgent (1-2 weeks)</option>
                    <option value="short-term">Short-term (1 month)</option>
                    <option value="medium-term">Medium-term (1-3 months)</option>
                    <option value="long-term">Long-term (3+ months)</option>
                    <option value="flexible">Flexible timeline</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-transparent border border-dark-200/50 dark:border-dark-600/50 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-dark-900 dark:text-white placeholder-dark-500 dark:placeholder-dark-400 resize-none"
                    placeholder="Describe your project requirements, goals, and any specific AI or security needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full border-2 border-blue-300/40 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg hover:bg-transparent hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span>Launch Your Project</span>
                      <FiSend className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {isSuccess ? (
                <div
                  className="mt-4 p-4 bg-transparent dark:bg-transparent border border-green-200/50 dark:border-green-800/50 rounded-lg"
                >
                  <div className="flex items-center">
                    <FiCheck className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                    <p className="text-green-800 dark:text-green-200">
                      Thank you! Your project inquiry has been received. We'll contact you within 2 hours.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Contact Information & Expertise */}
            <div
              className="space-y-6 sm:space-y-8"
            >
              {/* Contact Information */}
              <div className="p-6 sm:p-8 floating-element">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400/60 to-gray-400/60 rounded-xl flex items-center justify-center mr-4">
                    <FiAward className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-dark-900 dark:text-white">
                      Contact <span className="gradient-text">Information</span>
                    </h3>
                    <p className="text-dark-600 dark:text-dark-300 text-sm">
                      Direct access to our expert team
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  {contactInfo.map((info, index) => (
                    <div
                      key={info.title}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-dark-700/50 cursor-pointer group"
                      onClick={() => window.open(info.link, '_blank')}
                    >
                      <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-blue-400/60 to-gray-400/60 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-dark-900 dark:text-white">{info.title}</h4>
                          <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
                            {info.badge}
                          </span>
                        </div>
                        <p className="text-dark-600 dark:text-dark-300 text-sm sm:text-base font-medium mb-1">
                          {info.details}
                        </p>
                        <p className="text-dark-500 dark:text-dark-400 text-xs sm:text-sm">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Our Expertise */}
              <div className="p-6 sm:p-8 floating-element">
                <h3 className="text-xl sm:text-2xl font-bold text-dark-900 dark:text-white mb-6">
                  Our <span className="gradient-text">Expertise</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {expertiseAreas.map((area, index) => (
                    <div
                      key={area.title}
                      className="text-center p-4 rounded-lg bg-white/50 dark:bg-dark-700/50 hover:bg-white/80 dark:hover:bg-dark-600/50"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400/60 to-gray-400/60 rounded-xl mx-auto mb-3 flex items-center justify-center">
                        <area.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-dark-900 dark:text-white text-sm mb-2">
                        {area.title}
                      </h4>
                      <p className="text-dark-600 dark:text-dark-300 text-xs leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Times */}
              <div className="p-6 sm:p-8 floating-element">
                <h3 className="text-xl sm:text-2xl font-bold text-dark-900 dark:text-white mb-6">
                  Response <span className="gradient-text">Times</span>
                </h3>
                <div className="space-y-4">
                  {[
                    { service: 'Emergency Security', time: '15-30 mins', color: 'text-red-500' },
                    { service: 'AI Project Inquiries', time: '2 hours', color: 'text-blue-500' },
                    { service: 'General Consulting', time: '4 hours', color: 'text-cyber-500' },
                    { service: 'Project Proposals', time: '24 hours', color: 'text-green-500' }
                  ].map((item, index) => (
                    <div
                      key={item.service}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-dark-700/50 hover:bg-white/80 dark:hover:bg-dark-600/50"
                    >
                      <span className="text-dark-700 dark:text-dark-300 text-sm font-medium">
                        {item.service}
                      </span>
                      <span className={`${item.color} font-bold text-sm`}>
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 particle-bg overflow-hidden">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <img 
            src={aiChipImage} 
            alt="FAQ Background" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="container-custom relative z-10">
          <div
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-4 break-words">
              Frequently Asked <span className="gradient-text break-words">Questions</span>
            </h2>
            <p className="text-lg sm:text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              Everything you need to know about working with us
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg sm:text-xl font-semibold text-dark-900 dark:text-white pr-4">
                      {faq.question}
                    </h3>
                    <div
                      className="flex-shrink-0"
                    >
                      <FiZap className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                  {activeFAQ === index && (
                    <div className="mt-4">
                      <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />

      {/* Booking Modal */}
      {showBookingModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowBookingModal(false)}
        >
          <div
            className="bg-white dark:bg-dark-800 rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">
              Schedule Consultation
            </h3>
            <p className="text-dark-600 dark:text-dark-300 mb-6">
              Book a free 30-minute strategy session with our experts.
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 bg-transparent border border-dark-200/50 dark:border-dark-600/50 rounded-lg focus:ring-2 focus:ring-blue-400 text-dark-900 dark:text-white"
              />
              <button className="w-full border-2 border-blue-300/40 text-white font-semibold py-3 rounded-lg hover:bg-transparent hover:border-blue-400">
                <FiCalendar className="inline w-5 h-5 mr-2" />
                View Available Slots
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;