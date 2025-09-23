import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import CybersecurityLogo from '../ui/CybersecurityLogo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white/95 dark:bg-dark-900/95 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-all duration-200 border-b border-gray-200/20 dark:border-dark-700/50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo - Enhanced for mobile visibility */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group min-w-0 flex-shrink-0">
            <div className="relative flex-shrink-0">
              <CybersecurityLogo 
                size={32}
                primary="#2563eb" 
                accent="#8B5E3C"
                className="sm:w-10 sm:h-10 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col min-w-0">
              {/* Enhanced mobile-first TheWizarDs text */}
              <span className="text-lg sm:text-xl lg:text-2xl font-bold force-gradient leading-tight">
                TheWizarDs
              </span>
              {/* Hide subtitle on very small screens, show on sm+ */}
              <span className="hidden sm:block text-xs lg:text-sm text-dark-500 dark:text-dark-400 -mt-0.5 lg:-mt-1 font-medium leading-tight">
                Software Development & Cybersecurity
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive(item.href)
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-dark-700 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-800/50 hover:text-primary-600 dark:hover:text-primary-400'
                } px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 relative overflow-hidden group`}
              >
                <span className="relative z-10">{item.name}</span>
                {!isActive(item.href) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-cyber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button & Theme Toggle - Enhanced for mobile */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <Link 
              to="/contact" 
              className="bg-gradient-to-r from-primary-600 to-cyber-600 text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/25 transform hover:-translate-y-0.5 transition-all duration-200 text-sm lg:text-base glow-button"
            >
              Get Started
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 lg:p-2.5 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700 transition-all duration-200 hover:scale-105"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun className="w-4 h-4 lg:w-5 lg:h-5" /> : <FiMoon className="w-4 h-4 lg:w-5 lg:h-5" />}
            </button>
          </div>

          {/* Mobile Menu Controls - Enhanced */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors duration-200 glow-card"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors duration-200 glow-card"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 sm:py-6 border-t border-dark-200 dark:border-dark-700 bg-white/95 dark:bg-dark-900/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-1 sm:space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`${
                    isActive(item.href)
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 glow-card'
                      : 'text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-800 glow-card'
                  } px-4 py-3 rounded-lg text-base font-medium transition-all duration-200`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 sm:pt-4 border-t border-dark-200 dark:border-dark-700 mt-3 sm:mt-4">
                <Link 
                  to="/contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full bg-gradient-to-r from-primary-600 to-cyber-600 text-white px-4 py-3 rounded-lg font-semibold text-center glow-button transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;