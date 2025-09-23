import React from 'react';

/**
 * Enhanced CybersecurityLogo with improved structure and glowing effects
 * React logo component with advanced animations and better visual design.
 * Props:
 *  - size: number or string (default 48)
 *  - primary: main shield color
 *  - accent: accent color for highlights
 *  - title: accessible title for the SVG
 *  - className: additional CSS classes
 */

export default function CybersecurityLogo({
  size = 48,
  primary = '#3b82f6',
  accent = '#10b981',
  title = 'WizarD Security Logo: Advanced cybersecurity shield with magical elements',
  className = ''
}) {
  const numericSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <div className={`relative inline-block ${className}`}>
      <svg
        width={numericSize}
        height={numericSize}
        viewBox="0 0 100 100"
        role="img"
        aria-label={title}
        xmlns="http://www.w3.org/2000/svg"
        className="glow-icon"
      >
        <title>{title}</title>

        <defs>
          {/* Enhanced gradient definitions */}
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primary} stopOpacity="1" />
            <stop offset="50%" stopColor={accent} stopOpacity="0.8" />
            <stop offset="100%" stopColor={primary} stopOpacity="1" />
          </linearGradient>

          <radialGradient id="glowGradient" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.8" />
            <stop offset="70%" stopColor={primary} stopOpacity="0.4" />
            <stop offset="100%" stopColor={primary} stopOpacity="0" />
          </radialGradient>

          <linearGradient id="codeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accent} stopOpacity="1" />
            <stop offset="100%" stopColor={primary} stopOpacity="1" />
          </linearGradient>

          {/* Enhanced glow filter */}
          <filter id="enhancedGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix in="blur" values="1 0 0 0 0  0 0 1 0 0  0 0 0 1 0  0 0 0 1 0" result="blueGlow" />
            <feMerge>
              <feMergeNode in="blueGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Pulse animation */}
          <style>{`
            @keyframes shieldPulse {
              0%, 100% { 
                filter: drop-shadow(0 0 8px ${primary}40) drop-shadow(0 0 16px ${accent}30);
                transform: scale(1);
              }
              50% { 
                filter: drop-shadow(0 0 12px ${primary}60) drop-shadow(0 0 24px ${accent}50);
                transform: scale(1.05);
              }
            }
            @keyframes codeFlow {
              0% { opacity: 0.3; transform: translateX(-10px); }
              50% { opacity: 1; transform: translateX(0px); }
              100% { opacity: 0.3; transform: translateX(10px); }
            }
            @keyframes sparkle {
              0%, 100% { opacity: 0; transform: scale(0); }
              50% { opacity: 1; transform: scale(1); }
            }
            .shield-pulse {
              animation: shieldPulse 3s ease-in-out infinite;
              transform-origin: center;
            }
            .code-flow {
              animation: codeFlow 2s ease-in-out infinite;
            }
            .sparkle {
              animation: sparkle 1.5s ease-in-out infinite;
            }
            .sparkle:nth-child(2) { animation-delay: 0.3s; }
            .sparkle:nth-child(3) { animation-delay: 0.6s; }
            .sparkle:nth-child(4) { animation-delay: 0.9s; }
          `}</style>
        </defs>

        {/* Background glow */}
        <circle cx="50" cy="50" r="45" fill="url(#glowGradient)" opacity="0.3" />

        {/* Main shield body with enhanced design */}
        <g className="shield-pulse">
          {/* Shield outline */}
          <path
            d="M50 10 L20 25 L20 55 Q20 75 50 85 Q80 75 80 55 L80 25 Z"
            fill="url(#shieldGradient)"
            stroke={primary}
            strokeWidth="2"
            filter="url(#enhancedGlow)"
          />

          {/* Inner shield pattern */}
          <path
            d="M50 18 L28 30 L28 52 Q28 68 50 76 Q72 68 72 52 L72 30 Z"
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
            strokeOpacity="0.6"
            strokeDasharray="4,2"
          />

          {/* Central lock icon */}
          <g transform="translate(50,45)">
            {/* Lock body */}
            <rect x="-8" y="-2" width="16" height="12" rx="2" fill={primary} opacity="0.9" />
            
            {/* Lock shackle */}
            <path
              d="M-6 -2 L-6 -8 Q-6 -12 0 -12 Q6 -12 6 -8 L6 -2"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
            
            {/* Keyhole */}
            <circle cx="0" cy="3" r="2" fill="white" opacity="0.9" />
            <rect x="-0.5" y="4" width="1" height="3" fill="white" opacity="0.9" />
          </g>
        </g>

        {/* Code elements flowing around shield */}
        <g className="code-flow" opacity="0.7">
          <text x="15" y="35" fontSize="8" fill="url(#codeGradient)" fontFamily="monospace">&lt;/&gt;</text>
          <text x="75" y="45" fontSize="6" fill="url(#codeGradient)" fontFamily="monospace">{ }</text>
          <text x="25" y="70" fontSize="7" fill="url(#codeGradient)" fontFamily="monospace">0x</text>
          <text x="70" y="25" fontSize="6" fill="url(#codeGradient)" fontFamily="monospace">##</text>
        </g>

        {/* Magical sparkles */}
        <g>
          <circle className="sparkle" cx="25" cy="25" r="1.5" fill={accent} opacity="0.8" />
          <circle className="sparkle" cx="75" cy="35" r="1" fill={primary} opacity="0.8" />
          <circle className="sparkle" cx="30" cy="75" r="1.2" fill={accent} opacity="0.8" />
          <circle className="sparkle" cx="70" cy="70" r="1" fill={primary} opacity="0.8" />
        </g>

        {/* Corner decorative elements */}
        <g opacity="0.4">
          <path d="M15 15 L25 15 L15 25 Z" fill={accent} />
          <path d="M85 15 L75 15 L85 25 Z" fill={primary} />
          <path d="M15 85 L25 85 L15 75 Z" fill={primary} />
          <path d="M85 85 L75 85 L85 75 Z" fill={accent} />
        </g>

        {/* Central highlight */}
        <ellipse cx="45" cy="35" rx="8" ry="3" fill="white" opacity="0.2" />
      </svg>

      {/* Additional glow effect overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 to-cyber-500/20 blur-xl opacity-50 animate-pulse"></div>
    </div>
  );
}
