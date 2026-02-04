import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiHome, FiEye } from 'react-icons/fi';

const TestimonialSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 particle-bg flex items-center justify-center px-4">
      <div
        className="max-w-2xl w-full"
      >
        <div className="p-8 lg:p-12 text-center">
          {/* Success Icon */}
          <div
            className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <FiCheck className="w-12 h-12 text-white" />
          </div>

          {/* Success Message */}
          <div
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              Thank You for Your Testimonial!
            </h1>
            <p className="text-lg text-dark-600 dark:text-dark-300 mb-8 leading-relaxed">
              We truly appreciate you taking the time to share your experience with us. 
              Your feedback is invaluable and helps us continuously improve our services.
            </p>

            {/* What Happens Next */}
            <div className="bg-gray-50 dark:bg-blue-900/15 rounded-xl p-6 mb-8 text-left">
              <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">
                  ?
                </span>
                What Happens Next?
              </h2>
              <ul className="space-y-3 text-dark-600 dark:text-dark-300">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-primary-100 dark:bg-primary-900/40 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">1</span>
                  </span>
                  <span>Our team will review your testimonial within 1-2 business days</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-primary-100 dark:bg-primary-900/40 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">2</span>
                  </span>
                  <span>Once approved, it will be published on our portfolio and website</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-primary-100 dark:bg-primary-900/40 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">3</span>
                  </span>
                  <span>You'll receive an email notification when your testimonial is live</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-300/40 text-white font-semibold rounded-xl hover:bg-transparent hover:border-blue-400"
              >
                <FiHome className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-dark-700 border-2 border-blue-500 dark:border-blue-300 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-primary-50 dark:hover:bg-dark-600 duration-300"
              >
                <FiEye className="w-5 h-5 mr-2" />
                View Portfolio
              </Link>
            </div>
          </div>

          {/* Additional Info */}
          <div
            className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-700"
          >
            <p className="text-sm text-dark-500 dark:text-dark-400">
              Have questions about your submission? Contact us at{' '}
              <a
                href="mailto:support@thewizards.com"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                support@thewizards.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSuccess;
