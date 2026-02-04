import { useState, useEffect } from 'react';
import CallToAction from '../sections/CallToAction';
import { teamAPI } from '../services/api';
import Loader from '../components/common/Loader';
import { 
  FiShield, 
  FiUsers, 
  FiAward,
  FiTarget,
  FiEye,
  FiZap,
  FiLock,
  FiCpu,
  FiStar,
  FiTrendingUp,
  FiCode,
  FiHeart
} from 'react-icons/fi';
import heroImage from '../assets/images/ai-chip-artificial-intelligence-future-technology-innovation.jpg';
import footerBgImage from '../assets/images/ai-technology-microchip-background-futuristic-innovation-technology-remix.jpg';
import techCodeImage from '../assets/images/3d-render-technology-background-with-code-male-head.jpg';
import aiChipBoardImage from '../assets/images/futuristic-ai-chip-circuit-board.jpg';
import teamBgImage from '../assets/images/procreator-global-ui-ux-design-agency-VzJjPuk53sk-unsplash.jpg';
import aiImage from '../assets/images/ai22.jpg';

const About = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch team data from backend
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        const response = await teamAPI.getAll();
        if (response.success && response.data) {
          setTeam(response.data);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching team data:', err);
        setError('Failed to load team members');
        // Fallback to empty array if API fails
        setTeam([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  const values = [
    {
      icon: FiCpu,
      title: 'AI Innovation',
      description: 'Pioneering intelligent solutions that leverage cutting-edge artificial intelligence and machine learning.',
      color: 'from-purple-500 to-blue-500',
      features: ['Machine Learning', 'Neural Networks', 'Predictive Analytics']
    },
    {
      icon: FiShield,
      title: 'Security First',
      description: 'Every line of code we write is crafted with security as the foundation, not an afterthought.',
      color: 'from-blue-500 to-cyan-500',
      features: ['Zero Trust', 'Encryption', 'Threat Detection']
    },
    {
      icon: FiZap,
      title: 'Engineering Excellence',
      description: 'We engineer beyond magic, delivering elegant solutions that exceed the highest standards.',
      color: 'from-cyan-500 to-green-500',
      features: ['Best Practices', 'Code Quality', 'Performance']
    },
    {
      icon: FiEye,
      title: 'Privacy by Design',
      description: 'We architect solutions that protect user privacy from the ground up, ensuring compliance and trust.',
      color: 'from-green-500 to-emerald-500',
      features: ['GDPR Compliance', 'Data Protection', 'Privacy']
    },
    {
      icon: FiUsers,
      title: 'Enterprise Trust',
      description: 'Trusted by Fortune 500 companies for mission-critical AI and security projects.',
      color: 'from-emerald-500 to-teal-500',
      features: ['Enterprise Grade', 'Reliability', 'Support']
    },
    {
      icon: FiLock,
      title: 'Hardened Solutions',
      description: 'Battle-tested security measures designed to withstand real-world threats and attacks.',
      color: 'from-teal-500 to-blue-500',
      features: ['Penetration Testing', 'Security Audits', 'Hardening']
    }
  ];

  const achievements = [
    {
      icon: FiAward,
      title: 'AI & Security Certified',
      description: 'Expertise in both artificial intelligence implementation and enterprise-grade security standards.',
      count: '50+',
      metric: 'Certifications'
    },
    {
      icon: FiShield,
      title: 'Zero Security Breaches',
      description: 'Perfect security record across all AI and cybersecurity client engagements.',
      count: '100%',
      metric: 'Success Rate'
    },
    {
      icon: FiCpu,
      title: 'AI Projects Delivered',
      description: 'Successfully delivered intelligent solutions across various industries and use cases.',
      count: '150+',
      metric: 'Projects'
    },
    {
      icon: FiUsers,
      title: 'Enterprise Clients',
      description: 'Preferred AI and security partner for enterprise clients with critical requirements.',
      count: '75+',
      metric: 'Clients'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'AI Strategy & Security Assessment',
      description: 'Comprehensive analysis of AI opportunities combined with security audit and threat modeling.',
      icon: FiTarget,
      duration: '1-2 weeks'
    },
    {
      step: '02',
      title: 'Intelligent Architecture Design',
      description: 'Design AI-powered solutions with privacy-by-design and security-first architecture.',
      icon: FiCode,
      duration: '2-4 weeks'
    },
    {
      step: '03',
      title: 'AI Development & Integration',
      description: 'Secure development of machine learning models and AI integration with continuous security testing.',
      icon: FiCpu,
      duration: '4-12 weeks'
    },
    {
      step: '04',
      title: 'AI Security Testing',
      description: 'Rigorous testing of AI systems including model security and adversarial attack resistance.',
      icon: FiShield,
      duration: '2-6 weeks'
    },
    {
      step: '05',
      title: 'Continuous AI Monitoring',
      description: 'Ongoing monitoring of AI performance, security threats, and model drift detection.',
      icon: FiTrendingUp,
      duration: 'Ongoing'
    }
  ];

  const stats = [
    { number: '2018', label: 'Year Founded', icon: FiStar },
    { number: '50+', label: 'Expert Team Members', icon: FiUsers },
    { number: '150+', label: 'Projects Completed', icon: FiAward },
    { number: '99.9%', label: 'Client Satisfaction', icon: FiHeart }
  ];

  return (
    <div className="min-h-screen particle-bg">
      {/* Enhanced Hero Section */}
      <section className="relative text-white section-padding hero-glow overflow-hidden bg-gradient-to-br from-gray-800 via-blue-900/30 to-gray-800">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="AI and Cybersecurity Technology" 
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900/93 via-primary-900/92 to-cyber-900/93"></div>
        </div>
        {/* Advanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-gray-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-gray-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-300/5 to-gray-300/5 rounded-full blur-3xl"></div>
          
          {/* Floating elements */}
          <div className="absolute top-20 left-20 w-8 h-8 bg-primary-500/30 rounded-full blur-xl" />
          <div className="absolute bottom-32 right-32 w-6 h-6 bg-cyber-500/30 rounded-full blur-lg" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full">
                  <FiZap className="w-4 h-4 mr-2 text-cyber-400" />
                  <span className="text-sm font-medium text-gray-100">We Engineer Beyond Magic</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight break-words">
                  <span className="block text-white break-words">About</span>
                  <span className="block bg-gradient-to-r from-blue-300 via-gray-200 to-blue-300 bg-clip-text text-transparent force-gradient break-words">
                    TheWizarDs
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed">
                  We are a team of elite AI engineers, security specialists, and privacy experts who believe that 
                  <span className="font-semibold text-cyber-300"> intelligent software should be secure, innovative, and trusted</span> 
                  by organizations pushing the boundaries of technology.
                </p>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
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

            <div className="relative">
              <div className="relative p-8 rounded-2xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400/60 to-gray-400/60 rounded-xl flex items-center justify-center">
                      <FiTarget className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white">Our Mission</h3>
                  </div>
                  <p className="text-lg text-gray-100 leading-relaxed">
                    To design and deliver 
                    <span className="font-semibold text-cyber-300"> AI-powered solutions that are not just intelligent, but secure, ethical, and hardened for real-world deployment</span> — 
                    earning the trust of organizations who demand excellence in both innovation and security.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-4 rounded-xl group cursor-pointer">
                      <FiCpu className="w-8 h-8 mx-auto mb-2 text-cyber-400 group-hover:scale-110 duration-300" />
                      <div className="text-white font-medium">AI Innovation</div>
                      <div className="text-gray-200 text-sm mt-1">Cutting-edge Solutions</div>
                    </div>
                    <div className="text-center p-4 rounded-xl group cursor-pointer">
                      <FiShield className="w-8 h-8 mx-auto mb-2 text-blue-400 group-hover:scale-110 duration-300" />
                      <div className="text-white font-medium">Security First</div>
                      <div className="text-gray-200 text-sm mt-1">Enterprise Protection</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section className="section-padding relative bg-white dark:bg-dark-800 cyber-grid-bg overflow-hidden">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <img 
            src={techCodeImage} 
            alt="Technology Background" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="container-custom relative z-10">
          <div
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white mb-6 break-words">
              Our <span className="bg-gradient-to-r from-blue-400 to-gray-400 bg-clip-text text-transparent force-gradient break-words">Core Values</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              These fundamental principles guide every decision we make and every solution we engineer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={value.title} className="group p-8 hover:shadow-2xl duration-500 floating-element cursor-pointer">
                <div className="text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 duration-300 shadow-lg`}>
                    <value.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-dark-900 dark:text-white mb-4 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-6">
                    {value.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {value.features.map((feature, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section className="section-padding relative bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-dark-900 dark:to-dark-800 particle-bg overflow-hidden">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <img 
            src={teamBgImage} 
            alt="Team Background" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="container-custom relative z-10">
          <div
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white mb-6 break-words">
              Meet Our <span className="bg-gradient-to-r from-blue-400 to-gray-400 bg-clip-text text-transparent force-gradient break-words">Expert Team</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              Our world-class team combines decades of experience in artificial intelligence, cybersecurity, and enterprise software development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-12">
                <Loader />
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
                <p className="text-dark-600 dark:text-dark-300">Please try refreshing the page.</p>
              </div>
            ) : team.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-dark-600 dark:text-dark-300">No team members found.</p>
              </div>
            ) : (
              team.map((member, index) => {
                // Generate avatar initials from name if not provided
                const avatarInitials = member.avatar || 
                  member.name
                    .split(' ')
                    .map(word => word[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2);

                return (
                  <div key={member._id || index} className="hover:shadow-2xl duration-500 floating-element group cursor-pointer">
                    <div className="text-center p-6">
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
                              {avatarInitials}
                            </span>
                          </div>
                        )}
                        {member.experience && (
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-cyber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {member.experience}
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-dark-900 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-dark-600 dark:text-dark-300 font-semibold mb-3">
                        {member.role}
                      </p>
                      {member.expertise && (
                        <p className="text-sm text-dark-600 dark:text-dark-300 mb-4 font-medium">
                          {member.expertise}
                        </p>
                      )}
                      {member.bio && (
                        <p className="text-xs text-dark-500 dark:text-dark-400 leading-relaxed mb-6">
                          {member.bio}
                        </p>
                      )}
                      
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
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Achievements Section */}
      <section className="section-padding relative bg-white dark:bg-dark-800 cyber-grid-bg overflow-hidden">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <img 
            src={aiChipBoardImage} 
            alt="AI Chip Background" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="container-custom relative z-10">
          <div
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white mb-6">
              Our <span className="bg-gradient-to-r from-blue-400 to-gray-400 bg-clip-text text-transparent">Achievements</span>
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              Quantifiable results that demonstrate our commitment to excellence in AI and cybersecurity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={achievement.title} className="text-center group floating-element cursor-pointer">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400/60 to-gray-400/60 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 duration-300 shadow-lg">
                    <achievement.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {achievement.count}
                </div>
                <div className="text-sm text-dark-500 dark:text-dark-400 font-medium mb-3">
                  {achievement.metric}
                </div>
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {achievement.title}
                </h3>
                <p className="text-dark-600 dark:text-dark-300 leading-relaxed text-sm">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Process Section */}
      <section className="section-padding relative bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-dark-900 dark:to-dark-800 particle-bg overflow-hidden">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <img 
            src={aiImage} 
            alt="AI Technology Background" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="container-custom relative z-10">
          <div
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white mb-6">
              Our <span className="bg-gradient-to-r from-blue-400 to-gray-400 bg-clip-text text-transparent">Development Process</span>
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              A meticulously crafted methodology that ensures successful delivery of AI-powered cybersecurity solutions.
            </p>
          </div>

          <div className="space-y-8">
            {process.map((step, index) => (
              <div key={step.step} className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0 relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400/60 to-gray-400/60 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-cyber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {step.duration}
                  </div>
                </div>
                <div className="flex-1 p-8 shadow-xl hover:shadow-2xl duration-500">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {step.step}
                    </span>
                    <h3 className="text-2xl font-bold text-dark-900 dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-dark-600 dark:text-dark-300 leading-relaxed text-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
};

export default About;