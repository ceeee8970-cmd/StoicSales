import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Classical column design */}
      <rect x="20" y="15" width="60" height="8" fill="currentColor" />
      <rect x="25" y="23" width="50" height="54" fill="currentColor" />
      <rect x="20" y="77" width="60" height="8" fill="currentColor" />
      
      {/* Column details */}
      <rect x="30" y="30" width="2" height="40" fill="white" opacity="0.3" />
      <rect x="40" y="30" width="2" height="40" fill="white" opacity="0.3" />
      <rect x="50" y="30" width="2" height="40" fill="white" opacity="0.3" />
      <rect x="60" y="30" width="2" height="40" fill="white" opacity="0.3" />
      
      {/* Decorative scrolls */}
      <circle cx="15" cy="19" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M 11 19 Q 15 15 19 19" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="85" cy="19" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M 81 19 Q 85 15 89 19" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
};

export default Logo;