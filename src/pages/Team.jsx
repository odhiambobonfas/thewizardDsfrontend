import React, { useState, useEffect } from 'react';
import { 
  FiUsers,
  FiAward,
  FiStar,
  FiHeart,
  FiMail,
  FiLinkedin,
  FiGithub,
  FiGlobe
} from 'react-icons/fi';



import CallToAction from '../sections/CallToAction';
import heroImage from '../assets/images/african-american-it-professional-managing-ai-system-machine-learning.jpg';
import teamBgImage from '../assets/images/procreator-global-ui-ux-design-agency-VzJjPuk53sk-unsplash.jpg';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const stats = [
    { number: '50+', label: 'Expert Team Members', icon: FiUsers },
    { number: '150+', label: 'Projects Completed', icon: FiAward },
    { number: '99.9%', label: 'Client Satisfaction', icon: FiHeart },
    { number: '2018', label: 'Year Founded', icon: FiStar }
  ];

  // Fetch team members from backend
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/team');
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        const result = await response.json();
        if (result.success) {
          setTeamMembers(result.data);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching team members:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Function to get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen particle-bg">
        <section className="section-padding relative text-white hero-glow overflow-hidden bg-gradient-to-br from-gray-800 via-blue-900/30 to-gray-800">
          {/* Hero Background Image */}
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Our Team" 
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchpriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-dark-900/93 via-primary-900/92 to-cyber-900/93"></div>
          </div>
          <div className="container-custom relative z-10">
            <div className="text-center">
              <div
                className="space-y-6"
              >
                <div className="inline-flex items-center px-4 py-2 rounded-full mb-8">
                  <FiUsers className="w-4 h-4 mr-2 text-cyber-400" />
                  <span className="text-sm font-medium text-gray-100">Meet Our Experts</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="block bg-gradient-to-r from-blue-300 via-gray-200 to-blue-300 bg-clip-text text-transparent">
                    Our Team
                  </span>
                </h1>
                <div className="flex justify-center">
                  <div className="rounded-full h-12 w-12 border-b-2 border-cyber-400"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen particle-bg">
        <section className="section-padding relative text-white hero-glow overflow-hidden bg-gradient-to-br from-gray-800 via-blue-900/30 to-gray-800">
          {/* Hero Background Image */}
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Our Team" 
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchpriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-dark-900/93 via-primary-900/92 to-cyber-900/93"></div>
          </div>
          <div className="container-custom relative z-10">
            <div className="text-center">
              <div
                className="space-y-6"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 break-words">Our Team</h1>
                <div className="p-8 max-w-2xl mx-auto">
                  <div className="text-cyber-400 text-6xl mb-4">⚠️</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Error Loading Team</h3>
                  <p className="text-gray-200 mb-6">{error}</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="border-2 border-blue-300/40 hover:bg-transparent hover:border-blue-400 text-white font-semibold py-3 px-6 rounded-xl"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen particle-bg">
      {/* Hero Section */}
      <section className="relative text-white section-padding hero-glow overflow-hidden bg-gradient-to-br from-gray-800 via-blue-900/30 to-gray-800">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Our Team" 
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900/93 via-primary-900/92 to-cyber-900/93"></div>
        </div>
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-gray-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-gray-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
          
          {/* Floating elements */}
          <div className="absolute top-20 left-20 w-8 h-8 bg-primary-500/30 rounded-full blur-xl" />
          <div className="absolute bottom-32 right-32 w-6 h-6 bg-cyber-500/30 rounded-full blur-lg" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full">
                <FiUsers className="w-4 h-4 mr-2 text-cyber-400" />
                <span className="text-sm font-medium text-gray-100">Meet Our Experts</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight break-words">
                <span className="block text-white break-words">Meet The</span>
                <span className="block bg-gradient-to-r from-blue-300 via-gray-200 to-blue-300 bg-clip-text text-transparent force-gradient break-words">
                  WizarDs Team
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed max-w-4xl mx-auto">
                Our world-class team combines decades of experience in artificial intelligence, 
                cybersecurity, and enterprise software development to deliver exceptional results.
              </p>

              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center p-4 rounded-xl">
                    <div className="text-2xl lg:text-3xl font-bold text-cyber-400 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-200">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="section-padding relative bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-dark-900 dark:to-dark-800 particle-bg overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={teamBgImage} 
            alt="Team Background" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white mb-6 break-words">
              Our <span className="bg-gradient-to-r from-blue-400 to-gray-400 bg-clip-text text-transparent force-gradient break-words">Team</span>
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              Meet the brilliant minds behind our innovative AI and cybersecurity solutions.
            </p>
          </div>

          {teamMembers.length === 0 ? (
            <div className="text-center p-12 max-w-2xl mx-auto">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">No Team Members Found</h3>
              <p className="text-dark-600 dark:text-dark-300">
                We're currently updating our team information. Please check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={member._id || index} className="hover:shadow-2xl duration-500 floating-element group cursor-pointer">
                  <div className="text-center p-6">
                    {/* Avatar */}
                    <div className="relative mb-6">
                      {member.avatar?.url ? (
                        <img 
                          src={member.avatar.url} 
                          alt={member.name}
                          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover group-hover:scale-110 duration-300"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-400/60 to-gray-400/60 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 duration-300">
                          <span className="text-white font-bold text-2xl">
                            {getInitials(member.name)}
                          </span>
                        </div>
                      )}
                      {member.experience && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-cyber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {member.experience}
                        </div>
                      )}
                    </div>
                    
                    {/* Name and Role */}
                    <h3 className="text-lg sm:text-xl font-bold text-dark-900 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-dark-600 dark:text-dark-300 font-semibold mb-3">
                      {member.role}
                    </p>
                    
                    {/* Expertise */}
                    {member.expertise && (
                      <p className="text-sm text-dark-600 dark:text-dark-300 mb-4 font-medium">
                        {member.expertise}
                      </p>
                    )}
                    
                    {/* Bio */}
                    {member.bio && (
                      <p className="text-xs text-dark-500 dark:text-dark-400 leading-relaxed mb-6">
                        {member.bio}
                      </p>
                    )}
                    
                    {/* Certifications */}
                    {member.certifications && member.certifications.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-1">
                        {member.certifications.map((cert, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-50 dark:bg-blue-900/15 text-blue-600 dark:text-blue-400 rounded text-xs">
                            {cert}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Departments/Teams Filter (Optional) */}
          <div className="text-center mt-16">
            <div className="p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">
                Join Our Growing Team
              </h3>
              <p className="text-dark-600 dark:text-dark-300 mb-6">
                We're always looking for talented individuals passionate about AI and cybersecurity.
              </p>
              <a
                href="/careers"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-300/40 text-white font-semibold rounded-xl hover:bg-transparent hover:border-blue-400"
              >
                <FiAward className="w-5 h-5 mr-2" />
                View Open Positions
              </a>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
};

export default Team;