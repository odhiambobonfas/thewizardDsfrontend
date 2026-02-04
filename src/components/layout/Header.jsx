import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white/70 dark:bg-dark-900/70 fixed top-0 left-0 right-0 z-50 border-b border-gray-200/30 dark:border-dark-700/30">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20 sm:h-24">
          {/* Logo - Enhanced for mobile visibility */}
          <Link to="/" className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-shrink">
            <div className="relative flex-shrink-0">
              <img 
                src={logo}
                alt="TheWizarDs Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain drop-shadow-2xl"
              />
            </div>
            <div className="flex flex-col min-w-0">
              {/* Enhanced mobile-first TheWizarDs text with proper gradient rendering */}
              <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold force-gradient leading-tight break-words">
                TheWizarDs
              </span>
              {/* Show subtitle on all devices with proper wrapping */}
              <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-dark-500 dark:text-dark-400 -mt-0.5 lg:-mt-1 font-medium leading-tight break-words">
                AI, Cybersecurity & Software Engineering
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
                } px-4 py-2.5 rounded-lg text-sm font-semibold`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link 
              to="/contact" 
              className="border-2 border-blue-300/40 text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg font-semibold text-sm lg:text-base hover:bg-transparent hover:border-blue-400"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Control */}
          <div className="md:hidden flex items-center flex-shrink-0">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-dark-100/50 dark:bg-dark-800/50 text-dark-600 dark:text-dark-300 hover:bg-dark-200/70 dark:hover:bg-dark-700/70 flex-shrink-0"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX className="w-5 h-5 sm:w-6 sm:h-6" /> : <FiMenu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 sm:py-6 border-t border-dark-200/30 dark:border-dark-700/30 bg-white/70 dark:bg-dark-900/70">
            <nav className="flex flex-col space-y-1 sm:space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`${
                    isActive(item.href)
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-800'
                  } px-4 py-3 rounded-lg text-base font-medium`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 sm:pt-4 border-t border-dark-200 dark:border-dark-700 mt-3 sm:mt-4">
                <Link 
                  to="/contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full border-2 border-blue-300/40 text-white px-4 py-3 rounded-lg font-semibold text-center hover:bg-transparent hover:border-blue-400"
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