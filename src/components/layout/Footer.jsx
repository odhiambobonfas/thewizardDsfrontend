import React from 'react';
import { Link } from 'react-router-dom';
import { FiShield, FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Cybersecurity Audits', href: '/services#security-audits' },
    { name: 'Penetration Testing', href: '/services#penetration-testing' },
    { name: 'Web Development', href: '/services#web-development' },
    { name: 'Security Consulting', href: '/services#security-consulting' },
  ];

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about#team' },
    { name: 'Careers', href: '/about#careers' },
    { name: 'Contact', href: '/contact' },
  ];

  const resources = [
    { name: 'Blog', href: '/blog' },
    { name: 'Case Studies', href: '/portfolio' },
    { name: 'Security Tips', href: '/resources' },
    { name: 'Documentation', href: '/docs' },
  ];

  return (
    <footer className="bg-dark-900 text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-cyber-500 rounded-lg">
                <FiShield className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text">TheWizarDs</span>
                <p className="text-xs text-dark-400 -mt-1">Cybersecurity & Web Dev</p>
              </div>
            </Link>
            <p className="text-dark-300 mb-4 text-sm leading-relaxed">
              Professional cybersecurity software development and web engineering services. 
              Securing your digital presence with cutting-edge solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-dark-400 hover:text-primary-400 transition-colors duration-200">
                <FiGithub className="w-5 h-5" />
              </a>
              <a href="#" className="text-dark-400 hover:text-primary-400 transition-colors duration-200">
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-dark-400 hover:text-primary-400 transition-colors duration-200">
                <FiTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-dark-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-dark-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FiMail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@thewizards.dev" className="text-dark-300 hover:text-primary-400 transition-colors duration-200 text-sm">
                  info@thewizards.dev
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-dark-300 hover:text-primary-400 transition-colors duration-200 text-sm">
                  +1 (234) 567-8900
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <FiMapPin className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-dark-300 text-sm">
                  123 Cyber Street<br />
                  Security City, SC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-dark-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-dark-400 text-sm">
              {currentYear} TheWizarDs. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-dark-400 hover:text-primary-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-dark-400 hover:text-primary-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-dark-400 hover:text-primary-400 transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;