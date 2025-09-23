import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiShield, 
  FiCode, 
  FiUsers, 
  FiAward,
  FiTarget,
  FiEye,
  FiZap,
  FiHeart,
  FiGlobe,
  FiTrendingUp,
  FiCheck,
  FiUser,
  FiCloud,
  FiClock,
  FiLock
} from 'react-icons/fi';

const About = () => {
  const values = [
    {
      icon: FiShield,
      title: 'Security First',
      description: 'Every line of code we write is crafted with security as the foundation, not an afterthought.',
      color: 'from-primary-500 to-cyber-500'
    },
    {
      icon: FiEye,
      title: 'Privacy by Design',
      description: 'We architect solutions that protect user privacy from the ground up, ensuring compliance and trust.',
      color: 'from-cyber-500 to-primary-500'
    },
    {
      icon: FiZap,
      title: 'Engineering Excellence',
      description: 'We engineer beyond magic, delivering elegant solutions that exceed the highest standards.',
      color: 'from-primary-500 to-cyber-500'
    },
    {
      icon: FiUsers,
      title: 'Enterprise Trust',
      description: 'Trusted by Fortune 500 companies for mission-critical security and development projects.',
      color: 'from-cyber-500 to-primary-500'
    },
    {
      icon: FiLock,
      title: 'Hardened Solutions',
      description: 'Battle-tested security measures designed to withstand real-world threats and attacks.',
      color: 'from-primary-500 to-cyber-500'
    },
    {
      icon: FiGlobe,
      title: 'Global Compliance',
      description: 'GDPR, CCPA, SOC 2, and ISO 27001 compliant solutions for worldwide deployment.',
      color: 'from-cyber-500 to-primary-500'
    }
  ];

  const team = [
    {
      name: 'Alex Thompson',
      role: 'Chief Security Officer',
      expertise: 'Cybersecurity Architecture & Threat Analysis',
      bio: '15+ years securing enterprise systems for Fortune 500 companies. Expert in zero-trust architecture and advanced persistent threat detection.',
      certifications: ['CISSP', 'CISM', 'CEH']
    },
    {
      name: 'Sarah Chen',
      role: 'Lead Privacy Engineer',
      expertise: 'Privacy-by-Design & Compliance',
      bio: 'Privacy law expert with deep technical knowledge. Architect of GDPR-compliant systems processing billions of records.',
      certifications: ['CIPP/E', 'CIPM', 'FIP']
    },
    {
      name: 'Michael Rodriguez',
      role: 'Principal Software Architect',
      expertise: 'Secure Software Development',
      bio: 'Full-stack security expert specializing in hardened applications. Pioneer in secure coding practices and threat modeling.',
      certifications: ['CSSLP', 'SABSA', 'TOGAF']
    },
    {
      name: 'Emily Johnson',
      role: 'Penetration Testing Lead',
      expertise: 'Offensive Security & Red Team Operations',
      bio: 'Elite penetration tester with government and private sector experience. Expert in advanced attack techniques and defense strategies.',
      certifications: ['OSCP', 'GPEN', 'GCIH']
    }
  ];

  const achievements = [
    {
      icon: FiAward,
      title: 'SOC 2 Type II Certified',
      description: 'Independently verified security controls and processes meeting the highest industry standards.'
    },
    {
      icon: FiShield,
      title: 'ISO 27001 Certified',
      description: 'International standard for information security management systems implementation and maintenance.'
    },
    {
      icon: FiLock,
      title: 'Zero Security Breaches',
      description: 'Perfect security record across all client engagements with continuous monitoring and threat detection.'
    },
    {
      icon: FiUsers,
      title: 'Fortune 500 Trusted',
      description: 'Trusted security partner for enterprise clients with the most demanding security requirements.'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Security Assessment',
      description: 'Comprehensive security audit and threat modeling to identify vulnerabilities and attack vectors.'
    },
    {
      step: '02',
      title: 'Secure Architecture',
      description: 'Design privacy-by-design architecture with defense-in-depth security controls and zero-trust principles.'
    },
    {
      step: '03',
      title: 'Hardened Development',
      description: 'Secure coding practices with continuous security testing and vulnerability scanning throughout development.'
    },
    {
      step: '04',
      title: 'Penetration Testing',
      description: 'Rigorous security testing by certified ethical hackers to validate security controls and identify weaknesses.'
    },
    {
      step: '05',
      title: 'Continuous Monitoring',
      description: 'Ongoing security monitoring, threat detection, and incident response to maintain security posture.'
    }
  ];

  return (
    <div className="min-h-screen particle-bg">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark-900 via-primary-900 to-cyber-900 text-white section-padding hero-glow">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-500/20 to-cyber-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyber-500/20 to-primary-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 glow-container rounded-full"
                >
                  <FiZap className="w-4 h-4 mr-2 text-cyber-400 glow-icon" />
                  <span className="text-sm font-medium text-primary-100">Security & Innovation, Engineered</span>
                </motion.div>

                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-white">About</span>
                  <span className="block bg-gradient-to-r from-primary-400 via-cyber-400 to-primary-400 bg-clip-text text-transparent text-glow">
                    TheWizarDs
                  </span>
                </h1>

                <p className="text-xl text-primary-100 leading-relaxed">
                  We are a team of elite engineers, security specialists, and privacy experts who believe that 
                  <span className="font-semibold text-cyber-300"> exceptional software should be elegant, secure, and trusted</span> 
                  by organizations with the most demanding requirements.
                </p>

                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="text-center glow-card">
                    <div className="text-3xl font-bold text-cyber-400 text-glow">2018</div>
                    <div className="text-sm text-primary-200">Founded</div>
                  </div>
                  <div className="text-center glow-card">
                    <div className="text-3xl font-bold text-primary-400 text-glow">50+</div>
                    <div className="text-sm text-primary-200">Team Members</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative glow-container p-8 backdrop-blur-sm">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6 text-glow">Our Mission</h3>
                  <p className="text-primary-100 leading-relaxed">
                    To design and deliver software solutions that are not just functional, but 
                    <span className="font-semibold text-cyber-300"> elegant, privacy-by-design, and hardened for real-world threats</span> — 
                    earning the trust of organizations who demand the highest standard of security.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-4 glow-card rounded-xl">
                      <FiTarget className="w-8 h-8 mx-auto mb-2 text-cyber-400 glow-icon" />
                      <div className="text-white font-medium">Precision</div>
                    </div>
                    <div className="text-center p-4 glow-card rounded-xl">
                      <FiGlobe className="w-8 h-8 mx-auto mb-2 text-primary-400 glow-icon" />
                      <div className="text-white font-medium">Global Impact</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white dark:bg-dark-800 cyber-grid-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white mb-6">
              Our <span className="bg-gradient-to-r from-primary-600 to-cyber-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              These core principles guide every decision we make and every line of code we write.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group glow-container p-8 hover:shadow-xl transition-all duration-300 floating-element"
              >
                <div className="text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 pulse-glow`}>
                    <value.icon className="w-10 h-10 text-white glow-icon" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gradient-to-br from-dark-50 to-primary-50 dark:from-dark-900 dark:to-dark-800 particle-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white mb-6">
              Meet Our <span className="bg-gradient-to-r from-primary-600 to-cyber-600 bg-clip-text text-transparent">Experts</span>
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              Our team combines decades of experience in cybersecurity, software engineering, and privacy protection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glow-card hover:shadow-xl transition-all duration-300 floating-element"
              >
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-cyber-500 rounded-full mx-auto mb-4 flex items-center justify-center pulse-glow">
                    <span className="text-white font-bold text-2xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-dark-600 dark:text-dark-300 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-dark-600 dark:text-dark-300 mb-4">
                    {member.expertise}
                  </p>
                  <p className="text-xs text-dark-500 dark:text-dark-400 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section-padding bg-white dark:bg-dark-800 cyber-grid-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white mb-6">
              Proven <span className="bg-gradient-to-r from-primary-600 to-cyber-600 bg-clip-text text-transparent">Excellence</span>
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              Our certifications and achievements demonstrate our commitment to the highest standards of security and quality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group floating-element"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-cyber-500 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 pulse-glow">
                  <achievement.icon className="w-10 h-10 text-white glow-icon" />
                </div>
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3">
                  {achievement.title}
                </h3>
                <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gradient-to-br from-dark-50 to-primary-50 dark:from-dark-900 dark:to-dark-800 particle-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white mb-6">
              Our <span className="bg-gradient-to-r from-primary-600 to-cyber-600 bg-clip-text text-transparent">Approach</span>
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              Every project follows our proven methodology that prioritizes security, privacy, and excellence at every step.
            </p>
          </motion.div>

          <div className="space-y-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-cyber-500 rounded-full flex items-center justify-center text-white font-bold text-xl pulse-glow">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1 glow-card p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 via-cyber-600 to-primary-700 text-white hero-glow">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-glow">
              Ready to Work with the Best?
            </h2>
            <p className="text-xl lg:text-2xl mb-8 text-primary-100 leading-relaxed">
              Join the organizations who trust TheWizarDs to secure their most critical systems and deliver exceptional software solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="glow-button"
              >
                <span>Start Your Project</span>
                <FiZap className="ml-2 w-5 h-5" />
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300 glow-card"
              >
                See Our Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );

};

export default About;