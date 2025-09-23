import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useContactForm } from '../hooks/useContactForm';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock, 
  FiSend,
  FiCheck,
  FiAlertCircle,
  FiShield,
  FiCode,
  FiUsers,
  FiLinkedin,
  FiTwitter,
  FiGithub
} from 'react-icons/fi';

const Contact = () => {
  const { formData, errors, isSubmitting, isSuccess, handleChange, handleSubmit } = useContactForm();
  
  const [selectedService, setSelectedService] = useState('');

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email Us',
      details: 'info@thewizards.dev',
      link: 'mailto:info@thewizards.dev',
      description: 'Send us an email anytime'
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      details: '+1 (234) 567-8900',
      link: 'tel:+1234567890',
      description: 'Mon-Fri from 8am to 6pm'
    },
    {
      icon: FiMapPin,
      title: 'Visit Us',
      details: '123 Cyber Street, Security City, SC 12345',
      link: '#',
      description: 'Our main office location'
    },
    {
      icon: FiClock,
      title: 'Business Hours',
      details: 'Mon-Fri: 8:00 AM - 6:00 PM',
      link: '#',
      description: 'We\'re here to help'
    }
  ];

  const services = [
    { value: 'security-audit', label: 'Security Audit & Assessment', icon: FiShield },
    { value: 'penetration-testing', label: 'Penetration Testing', icon: FiShield },
    { value: 'web-development', label: 'Secure Web Development', icon: FiCode },
    { value: 'security-consulting', label: 'Security Consulting', icon: FiUsers },
    { value: 'vulnerability-management', label: 'Vulnerability Management', icon: FiShield },
    { value: 'other', label: 'Other / General Inquiry', icon: FiMail }
  ];

  const faqs = [
    {
      question: 'How long does a security audit take?',
      answer: 'Most security audits take 2-6 weeks depending on the scope and complexity of your systems. We provide a detailed timeline during our initial consultation.'
    },
    {
      question: 'Do you offer emergency security response?',
      answer: 'Yes, we provide 24/7 emergency security response for critical incidents. Contact us immediately if you suspect a security breach.'
    },
    {
      question: 'What industries do you work with?',
      answer: 'We work with businesses across all industries including healthcare, finance, e-commerce, SaaS, and more. Our solutions are tailored to each industry\'s specific requirements.'
    },
    {
      question: 'Do you provide ongoing security monitoring?',
      answer: 'Yes, we offer comprehensive security monitoring and maintenance services to ensure your systems remain secure over time.'
    }
  ];

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
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-glow">Get In Touch</h1>
            <p className="text-lg sm:text-xl text-primary-100 max-w-3xl mx-auto">
              Ready to secure your digital future? Let's discuss how we can help transform your business with cutting-edge cybersecurity and development solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-gradient-to-br from-white via-primary-50 to-cyber-50 dark:from-dark-800 dark:via-dark-700 dark:to-dark-800 cyber-grid-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glow-container p-6 sm:p-8 floating-element"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-dark-900 dark:text-white mb-6">
                Send Us a <span className="gradient-text">Message</span>
              </h2>
              
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
                      className="w-full px-4 py-3 bg-white/80 dark:bg-dark-800/80 border border-dark-200/50 dark:border-dark-600/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-dark-900 dark:text-white placeholder-dark-500 dark:placeholder-dark-400 backdrop-blur-sm glow-card"
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
                      className="w-full px-4 py-3 bg-white/80 dark:bg-dark-800/80 border border-dark-200/50 dark:border-dark-600/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-dark-900 dark:text-white placeholder-dark-500 dark:placeholder-dark-400 backdrop-blur-sm glow-card"
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
                    className="w-full px-4 py-3 bg-white/80 dark:bg-dark-800/80 border border-dark-200/50 dark:border-dark-600/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-dark-900 dark:text-white placeholder-dark-500 dark:placeholder-dark-400 backdrop-blur-sm glow-card"
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
                    className="w-full px-4 py-3 bg-white/80 dark:bg-dark-800/80 border border-dark-200/50 dark:border-dark-600/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-dark-900 dark:text-white placeholder-dark-500 dark:placeholder-dark-400 backdrop-blur-sm glow-card"
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
                    className="w-full px-4 py-3 bg-white/80 dark:bg-dark-800/80 border border-dark-200/50 dark:border-dark-600/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-dark-900 dark:text-white placeholder-dark-500 dark:placeholder-dark-400 backdrop-blur-sm glow-card"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Service Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/80 dark:bg-dark-800/80 border border-dark-200/50 dark:border-dark-600/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-dark-900 dark:text-white backdrop-blur-sm glow-card"
                  >
                    <option value="">Select a service</option>
                    <option value="cybersecurity">Cybersecurity Consulting</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-development">Mobile Development</option>
                    <option value="security-audit">Security Audit</option>
                    <option value="penetration-testing">Penetration Testing</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Project Budget
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/80 dark:bg-dark-800/80 border border-dark-200/50 dark:border-dark-600/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-dark-900 dark:text-white backdrop-blur-sm glow-card"
                  >
                    <option value="">Select budget range</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k+">$50,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/80 dark:bg-dark-800/80 border border-dark-200/50 dark:border-dark-600/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-dark-900 dark:text-white placeholder-dark-500 dark:placeholder-dark-400 resize-none backdrop-blur-sm glow-card"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full glow-button bg-gradient-to-r from-primary-600 to-cyber-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg hover:from-primary-700 hover:to-cyber-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FiSend className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-100/80 dark:bg-green-900/30 border border-green-200/50 dark:border-green-800/50 rounded-lg backdrop-blur-sm"
                >
                  <div className="flex items-center">
                    <FiCheck className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                    <p className="text-green-800 dark:text-green-200">
                      Thank you! Your message has been sent successfully. We'll get back to you soon.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <></>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="glow-card p-6 sm:p-8 floating-element">
                <h3 className="text-xl sm:text-2xl font-bold text-dark-900 dark:text-white mb-4 sm:mb-6">
                  Contact <span className="gradient-text">Information</span>
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-primary-500 to-cyber-500 rounded-lg flex items-center justify-center flex-shrink-0 glow-card">
                      <FiMail className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-900 dark:text-white mb-1">Email</h4>
                      <p className="text-dark-600 dark:text-dark-300 text-sm sm:text-base">contact@thewizards.dev</p>
                      <p className="text-dark-600 dark:text-dark-300 text-sm sm:text-base">security@thewizards.dev</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-primary-500 to-cyber-500 rounded-lg flex items-center justify-center flex-shrink-0 glow-card">
                      <FiPhone className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-900 dark:text-white mb-1">Phone</h4>
                      <p className="text-dark-600 dark:text-dark-300 text-sm sm:text-base">+1 (555) 123-4567</p>
                      <p className="text-dark-500 dark:text-dark-400 text-xs sm:text-sm">24/7 Emergency Support</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-primary-500 to-cyber-500 rounded-lg flex items-center justify-center flex-shrink-0 glow-card">
                      <FiMapPin className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-900 dark:text-white mb-1">Office</h4>
                      <p className="text-dark-600 dark:text-dark-300 text-sm sm:text-base">
                        123 Cyber Street<br />
                        Security District<br />
                        Tech City, TC 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-primary-500 to-cyber-500 rounded-lg flex items-center justify-center flex-shrink-0 glow-card">
                      <FiClock className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-900 dark:text-white mb-1">Business Hours</h4>
                      <p className="text-dark-600 dark:text-dark-300 text-sm sm:text-base">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Emergency Only
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="glow-card p-6 sm:p-8 floating-element">
                <h3 className="text-xl sm:text-2xl font-bold text-dark-900 dark:text-white mb-4 sm:mb-6">
                  Response <span className="gradient-text">Times</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-dark-600 dark:text-dark-300 text-sm sm:text-base">General Inquiries</span>
                    <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm sm:text-base">24 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-dark-600 dark:text-dark-300 text-sm sm:text-base">Security Emergencies</span>
                    <span className="text-cyber-600 dark:text-cyber-400 font-semibold text-sm sm:text-base">1 hour</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-dark-600 dark:text-dark-300 text-sm sm:text-base">Project Quotes</span>
                    <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm sm:text-base">48 hours</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="glow-card p-6 sm:p-8 floating-element">
                <h3 className="text-xl sm:text-2xl font-bold text-dark-900 dark:text-white mb-4 sm:mb-6">
                  Follow <span className="gradient-text">Us</span>
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-primary-500 to-cyber-500 rounded-lg flex items-center justify-center text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 glow-card"
                  >
                    <FiLinkedin className="w-5 sm:w-6 h-5 sm:h-6" />
                  </a>
                  <a
                    href="#"
                    className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-primary-500 to-cyber-500 rounded-lg flex items-center justify-center text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 glow-card"
                  >
                    <FiTwitter className="w-5 sm:w-6 h-5 sm:h-6" />
                  </a>
                  <a
                    href="#"
                    className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-primary-500 to-cyber-500 rounded-lg flex items-center justify-center text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 glow-card"
                  >
                    <FiGithub className="w-5 sm:w-6 h-5 sm:h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-lg sm:text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              Quick answers to common questions about our services
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {[
              {
                question: "How quickly can you start on a new project?",
                answer: "We typically begin new projects within 1-2 weeks of contract signing, depending on project complexity and our current workload. Emergency security projects can often start within 24-48 hours."
              },
              {
                question: "Do you provide ongoing support after project completion?",
                answer: "Yes, we offer comprehensive maintenance and support packages. All projects include a 30-day warranty period, and we provide various ongoing support options including 24/7 monitoring for security-critical systems."
              },
              {
                question: "What industries do you specialize in?",
                answer: "We work with clients across various industries including healthcare, finance, e-commerce, government, and technology startups. Our security expertise is particularly valuable for regulated industries with strict compliance requirements."
              },
              {
                question: "How do you ensure project security and confidentiality?",
                answer: "All team members sign comprehensive NDAs, we use secure development practices, encrypted communications, and can work within your existing security frameworks. We're also happy to sign additional security agreements as needed."
              },
              {
                question: "What's your typical project timeline?",
                answer: "Project timelines vary based on scope and complexity. Simple websites typically take 4-6 weeks, while complex applications or security audits can take 3-6 months. We provide detailed timelines during the proposal phase."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glow-card p-6 sm:p-8 floating-element"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-dark-900 dark:text-white mb-3 sm:mb-4">
                  {faq.question}
                </h3>
                <p className="text-dark-600 dark:text-dark-300 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
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
              Don't wait for a security breach or technical issue. Contact us today for a free consultation and discover how we can help secure and enhance your digital presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a href="tel:+15551234567" className="glow-button bg-white text-primary-600 hover:bg-primary-50">
                Call Now: (555) 123-4567
              </a>
              <a href="mailto:contact@thewizards.dev" className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/50 text-white font-semibold rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300 glow-card">
                Email Us Directly
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );

};

export default Contact;