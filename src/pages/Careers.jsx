import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
  FiAward,
  FiStar,
  FiX,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';
import Loader from '../components/common/Loader';
import CallToAction from '../sections/CallToAction';
import heroImage from '../assets/images/dev1.webp';
import aiBgImage from '../assets/images/self-aware-artificial-intelligence-becoming-alive-saluting-it-professional.jpg';

const Careers = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [filterExperience, setFilterExperience] = useState('all');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs');
      const data = await response.json();
      
      if (data.success) {
        setJobs(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeLabel = (type) => {
    const labels = {
      'full-time': 'Full Time',
      'part-time': 'Part Time',
      'contract': 'Contract',
      'remote': 'Remote',
      'hybrid': 'Hybrid'
    };
    return labels[type] || type;
  };

  const getExperienceLabel = (level) => {
    const labels = {
      'entry': 'Entry Level',
      'mid': 'Mid Level',
      'senior': 'Senior',
      'lead': 'Lead',
      'executive': 'Executive'
    };
    return labels[level] || level;
  };

  const filteredJobs = jobs.filter(job => {
    if (filterType !== 'all' && job.type !== filterType) return false;
    if (filterExperience !== 'all' && job.experienceLevel !== filterExperience) return false;
    return true;
  });

  const jobTypes = ['all', 'full-time', 'part-time', 'contract', 'remote', 'hybrid'];
  const experienceLevels = ['all', 'entry', 'mid', 'senior', 'lead', 'executive'];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white section-padding overflow-hidden bg-gradient-to-br from-gray-800 via-blue-900/30 to-gray-800">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Career Opportunities" 
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900/93 via-primary-900/92 to-cyber-900/93"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 break-words">
              Join Our <span className="bg-gradient-to-r from-primary-400 to-cyber-400 bg-clip-text text-transparent force-gradient break-words">Growing Team</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-100 leading-relaxed mb-8">
              Be part of a team that's shaping the future of AI and cybersecurity. 
              We're always looking for talented individuals who are passionate about innovation and excellence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6">
                <FiAward className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <h3 className="text-2xl font-bold mb-2">{jobs.filter(j => j.status === 'active').length}+</h3>
                <p className="text-gray-200">Open Positions</p>
              </div>
              <div className="p-6">
                <FiStar className="w-12 h-12 text-cyber-400 mx-auto mb-3" />
                <h3 className="text-2xl font-bold mb-2">100%</h3>
                <p className="text-gray-200">Remote Friendly</p>
              </div>
              <div className="p-6">
                <FiBriefcase className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <h3 className="text-2xl font-bold mb-2">50+</h3>
                <p className="text-gray-200">Team Members</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="section-padding relative bg-white dark:bg-dark-800 overflow-hidden">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <img 
            src={aiBgImage} 
            alt="AI Background" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="container-custom relative z-10">
          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-200 mb-2">
                Job Type
              </label>
              <div className="flex flex-wrap gap-2">
                {jobTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-4 py-2 rounded-lg font-medium duration-200 ${
                      filterType === type
                        ? 'bg-gradient-to-r from-blue-400/60 to-gray-400/60 text-white'
                        : 'bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-200 hover:bg-dark-200 dark:hover:bg-dark-600'
                    }`}
                  >
                    {type === 'all' ? 'All Types' : getTypeLabel(type)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-200 mb-2">
                Experience Level
              </label>
              <div className="flex flex-wrap gap-2">
                {experienceLevels.map(level => (
                  <button
                    key={level}
                    onClick={() => setFilterExperience(level)}
                    className={`px-4 py-2 rounded-lg font-medium duration-200 ${
                      filterExperience === level
                        ? 'bg-gradient-to-r from-blue-400/60 to-gray-400/60 text-white'
                        : 'bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-200 hover:bg-dark-200 dark:hover:bg-dark-600'
                    }`}
                  >
                    {level === 'all' ? 'All Levels' : getExperienceLabel(level)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Jobs List */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <FiAlertCircle className="w-16 h-16 text-dark-300 mx-auto mb-4" />
              <p className="text-xl text-dark-600 dark:text-dark-300">
                No job openings match your filters at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map((job, index) => (
                <div key={job._id} onClick={() => setSelectedJob(job)} className="bg-white dark:bg-dark-700 rounded-lg shadow-md hover:shadow-xl duration-300 cursor-pointer overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-xl sm:text-2xl font-bold text-dark-900 dark:text-white">
                            {job.title}
                          </h3>
                          {job.featured && (
                            <span className="inline-flex items-center px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded text-xs font-medium">
                              <FiStar className="w-3 h-3 mr-1" />
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-base sm:text-lg text-dark-600 dark:text-dark-300 mb-3">
                          {job.department}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center text-dark-600 dark:text-dark-300">
                        <FiMapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center text-dark-600 dark:text-dark-300">
                        <FiClock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{getTypeLabel(job.type)}</span>
                      </div>
                      <div className="flex items-center text-dark-600 dark:text-dark-300">
                        <FiBriefcase className="w-4 h-4 mr-2" />
                        <span className="text-sm">{getExperienceLabel(job.experienceLevel)}</span>
                      </div>
                      {job.salary?.visible && job.salary?.min && (
                        <div className="flex items-center text-dark-600 dark:text-dark-300">
                          <FiDollarSign className="w-4 h-4 mr-2" />
                          <span className="text-sm">
                            {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {job.applicationDeadline && (
                        <div className="flex items-center text-dark-600 dark:text-dark-300">
                          <FiCalendar className="w-4 h-4 mr-2" />
                          <span className="text-sm">
                            Apply by {new Date(job.applicationDeadline).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-dark-600 dark:text-dark-300 line-clamp-2 mb-4">
                      {job.description}
                    </p>

                    {job.skills && job.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {job.skills.slice(0, 5).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-blue-400 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 5 && (
                          <span className="px-3 py-1 bg-dark-100 dark:bg-dark-600 text-dark-700 dark:text-dark-300 rounded-full text-xs font-medium">
                            +{job.skills.length - 5} more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-dark-200 dark:border-dark-600 flex gap-2">
                      <button 
                        onClick={() => setSelectedJob(job)}
                        className="flex-1 text-blue-600 dark:text-blue-400 font-semibold hover:underline text-left"
                      >
                        View Details →
                      </button>
                      <button
                        onClick={() => navigate(`/careers/apply/${job._id}`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-sm"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setSelectedJob(null)}>
          <div className="bg-white dark:bg-dark-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white dark:bg-dark-800 border-b border-dark-200 dark:border-dark-700 p-6 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-dark-900 dark:text-white mb-2">
                    {selectedJob.title}
                  </h2>
                  <p className="text-base sm:text-lg text-dark-600 dark:text-dark-300">
                    {selectedJob.department}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-2 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
                >
                  <FiX className="w-6 h-6 text-dark-600 dark:text-dark-300" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Job Meta */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-dark-600 dark:text-dark-300">
                    <FiMapPin className="w-5 h-5 mr-2" />
                    <span>{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center text-dark-600 dark:text-dark-300">
                    <FiClock className="w-5 h-5 mr-2" />
                    <span>{getTypeLabel(selectedJob.type)}</span>
                  </div>
                  <div className="flex items-center text-dark-600 dark:text-dark-300">
                    <FiBriefcase className="w-5 h-5 mr-2" />
                    <span>{getExperienceLabel(selectedJob.experienceLevel)}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3">
                    About the Role
                  </h3>
                  <p className="text-dark-600 dark:text-dark-300 leading-relaxed whitespace-pre-wrap">
                    {selectedJob.description}
                  </p>
                </div>

                {/* Responsibilities */}
                {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3">
                      Responsibilities
                    </h3>
                    <ul className="space-y-2">
                      {selectedJob.responsibilities.map((item, idx) => (
                        <li key={idx} className="flex items-start text-dark-600 dark:text-dark-300">
                          <FiCheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3">
                      Requirements
                    </h3>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((item, idx) => (
                        <li key={idx} className="flex items-start text-dark-600 dark:text-dark-300">
                          <FiCheckCircle className="w-5 h-5 text-cyber-600 dark:text-cyber-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills */}
                {selectedJob.skills && selectedJob.skills.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3">
                      Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-blue-400 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Benefits */}
                {selectedJob.benefits && selectedJob.benefits.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3">
                      Benefits
                    </h3>
                    <ul className="space-y-2">
                      {selectedJob.benefits.map((item, idx) => (
                        <li key={idx} className="flex items-start text-dark-600 dark:text-dark-300">
                          <FiCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Salary */}
                {selectedJob.salary?.visible && selectedJob.salary?.min && (
                  <div className="bg-gray-50 dark:bg-blue-900/15 rounded-lg p-4">
                    <div className="flex items-center text-primary-900 dark:text-gray-100">
                      <FiDollarSign className="w-6 h-6 mr-2" />
                      <div>
                        <p className="font-semibold">Salary Range</p>
                        <p className="text-lg">
                          {selectedJob.salary.currency} {selectedJob.salary.min.toLocaleString()} - {selectedJob.salary.max.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Application Deadline */}
                {selectedJob.applicationDeadline && (
                  <div className="bg-cyber-50 dark:bg-cyber-900/20 rounded-lg p-4">
                    <div className="flex items-center text-cyber-900 dark:text-cyber-100">
                      <FiCalendar className="w-6 h-6 mr-2" />
                      <div>
                        <p className="font-semibold">Application Deadline</p>
                        <p className="text-lg">
                          {new Date(selectedJob.applicationDeadline).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Apply Button */}
                <div className="pt-6 border-t border-dark-200 dark:border-dark-700">
                  <button
                    onClick={() => navigate(`/careers/apply/${selectedJob._id}`)}
                    className="block w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 text-center transition-colors"
                  >
                    Apply for this Position
                  </button>
                  <p className="text-center text-sm text-dark-500 dark:text-dark-400 mt-3">
                    Or send your resume to careers@thewizards.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      <CallToAction />
    </div>
  );
};

export default Careers;
