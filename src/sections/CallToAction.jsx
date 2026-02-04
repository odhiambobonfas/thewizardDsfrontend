import React from 'react';
import { FiPhone, FiMail, FiZap } from 'react-icons/fi';
import footerBgImage from '../assets/images/futuristic-ai-chip-circuit-board.jpg';

const CallToAction = () => {
  return (
    <section className="section-padding relative text-white hero-glow particle-bg overflow-hidden bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100">
      {/* Footer Background Image */}
      <div className="absolute inset-0">
        <img 
          src={footerBgImage} 
          alt="AI Technology" 
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-cyber-900/75 to-primary-900/80"></div>
      </div>

      <div className="container-custom text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-6">
            <FiZap className="w-4 h-4 mr-2 text-cyber-400" />
            <span className="text-sm font-medium text-gray-100">We Engineer Beyond Magic</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Engineer Your Success?
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-100 leading-relaxed">
            Join forward-thinking businesses who trust us to deliver <span className="font-semibold text-cyber-300">cutting-edge AI and cybersecurity solutions</span> that drive real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:+254742187929" 
              className="inline-flex items-center justify-center border-2 border-white/60 text-white hover:bg-transparent hover:border-white font-semibold text-lg py-4 px-8 rounded-lg"
            >
              <FiPhone className="inline w-5 h-5 mr-2" />
              Call +254 742 187 929
            </a>
            <a 
              href="mailto:TheWizards@gmail.com" 
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-lg hover:border-white hover:bg-transparent text-lg"
            >
              <FiMail className="w-5 h-5 mr-2" />
              Email TheWizards@gmail.com
            </a>
          </div>
          <p className="mt-6 text-gray-200 text-sm">
            24/7 Emergency Support Available • Based in Nairobi, Serving Globally
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
