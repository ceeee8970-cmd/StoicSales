import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-32 h-20',
    md: 'w-48 h-30',
    lg: 'w-64 h-40'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 300 180" className="w-full h-full">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b8c4a8" />
            <stop offset="100%" stopColor="#a8b89c" />
          </linearGradient>
        </defs>
        
        {/* Background with subtle texture */}
        <rect width="300" height="180" fill="url(#logoGradient)" rx="8" />
        
        {/* Classical column detail */}
        <g transform="translate(195, 40)">
          {/* Column capital with scrolls */}
          <ellipse cx="15" cy="5" rx="20" ry="4" fill="#3a4a3a" />
          <path d="M0 5 Q5 0 10 5 Q15 10 20 5 Q25 0 30 5" stroke="#3a4a3a" strokeWidth="2" fill="none" />
          <path d="M0 8 Q5 3 10 8 Q15 13 20 8 Q25 3 30 8" stroke="#3a4a3a" strokeWidth="2" fill="none" />
          {/* Column shaft */}
          <rect x="12" y="12" width="6" height="60" fill="#3a4a3a" />
          <rect x="10" y="12" width="10" height="4" fill="#3a4a3a" />
          <rect x="10" y="68" width="10" height="4" fill="#3a4a3a" />
          {/* Vertical lines on column */}
          <line x1="15" y1="16" x2="15" y2="68" stroke="#2a3a2a" strokeWidth="1" />
        </g>
        
        {/* Main text */}
        <text x="30" y="60" fontFamily="serif" fontSize="28" fontWeight="bold" fill="#3a4a3a">
          The
        </text>
        <text x="30" y="100" fontFamily="serif" fontSize="42" fontWeight="bold" fill="#3a4a3a">
          STOIC
        </text>
        <text x="30" y="140" fontFamily="serif" fontSize="42" fontWeight="bold" fill="#3a4a3a">
          SELLER
        </text>
        
        {/* Decorative elements */}
        <circle cx="50" cy="25" r="2" fill="#3a4a3a" opacity="0.3" />
        <circle cx="250" cy="160" r="2" fill="#3a4a3a" opacity="0.3" />
        <path d="M20 165 Q30 160 40 165" stroke="#3a4a3a" strokeWidth="1" fill="none" opacity="0.4" />
      </svg>
    </div>
  );
};