import React from 'react';

// Module 1: Foundations - Stoic philosopher with modern businessman
export const Module1Illustration = () => (
  <svg viewBox="0 0 400 240" className="w-full h-full">
    <defs>
      <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c7d2cc" />
        <stop offset="100%" stopColor="#b8c4a8" />
      </linearGradient>
    </defs>
    <rect width="400" height="240" fill="url(#bg1)" />
    
    {/* Background buildings */}
    <rect x="300" y="120" width="80" height="120" fill="#8b9b8b" opacity="0.3" />
    <rect x="320" y="100" width="40" height="140" fill="#a8b5a8" opacity="0.4" />
    
    {/* Trees */}
    <ellipse cx="80" cy="180" rx="25" ry="35" fill="#7a8a7a" opacity="0.6" />
    <ellipse cx="340" cy="160" rx="20" ry="28" fill="#6a7a6a" opacity="0.5" />
    
    {/* Stoic philosopher (left) */}
    <g transform="translate(60, 100)">
      {/* Toga/robe */}
      <path d="M20 70 Q40 50 60 70 L58 140 Q40 150 22 140 Z" fill="#8b9b8b" />
      {/* Body */}
      <circle cx="40" cy="40" r="18" fill="#d4a574" />
      {/* Beard */}
      <path d="M28 50 Q40 70 52 50 Q48 65 40 70 Q32 65 28 50" fill="#6b5b4f" />
      {/* Eyes */}
      <circle cx="36" cy="38" r="2" fill="#2d3748" />
      <circle cx="44" cy="38" r="2" fill="#2d3748" />
      {/* Hand gesture */}
      <circle cx="25" cy="90" r="8" fill="#d4a574" />
      <path d="M25 85 L28 88 L25 91 L22 88 Z" fill="#d4a574" />
    </g>
    
    {/* Modern businessman (right) */}
    <g transform="translate(220, 105)">
      {/* Suit */}
      <rect x="15" y="50" width="25" height="65" rx="12" fill="#2d5a3d" />
      {/* Shirt */}
      <rect x="22" y="52" width="11" height="40" fill="white" />
      {/* Tie */}
      <rect x="25" y="52" width="5" height="35" fill="#8b4513" />
      {/* Head */}
      <circle cx="27" cy="35" r="15" fill="#d4a574" />
      {/* Hair */}
      <path d="M15 30 Q27 20 39 30 Q35 25 27 25 Q19 25 15 30" fill="#4a4a4a" />
      {/* Beard */}
      <path d="M20 45 Q27 55 34 45 Q32 50 27 52 Q22 50 20 45" fill="#4a4a4a" />
      {/* Eyes */}
      <circle cx="24" cy="33" r="1.5" fill="#2d3748" />
      <circle cx="30" cy="33" r="1.5" fill="#2d3748" />
      {/* Laptop */}
      <rect x="10" y="85" width="35" height="25" rx="2" fill="#4a5568" />
      <rect x="12" y="87" width="31" height="18" fill="#e2e8f0" />
    </g>
    
    {/* Subtle decorative elements */}
    <circle cx="150" cy="50" r="3" fill="#8b9b8b" opacity="0.3" />
    <circle cx="180" cy="200" r="2" fill="#7a8a7a" opacity="0.4" />
  </svg>
);

// Module 2: Communication - Professional conversation with elegant styling
export const Module2Illustration = () => (
  <svg viewBox="0 0 400 240" className="w-full h-full">
    <defs>
      <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c7d2cc" />
        <stop offset="100%" stopColor="#b8c4a8" />
      </linearGradient>
    </defs>
    <rect width="400" height="240" fill="url(#bg2)" />
    
    {/* Background trees */}
    <ellipse cx="60" cy="180" rx="30" ry="40" fill="#7a8a7a" opacity="0.4" />
    <ellipse cx="340" cy="160" rx="25" ry="35" fill="#6a7a6a" opacity="0.3" />
    
    {/* Professional 1 (left) */}
    <g transform="translate(80, 90)">
      {/* Business suit */}
      <rect x="10" y="45" width="22" height="70" rx="11" fill="#2d5a3d" />
      {/* Shirt */}
      <rect x="16" y="47" width="10" height="35" fill="white" />
      {/* Tie */}
      <rect x="19" y="47" width="4" height="30" fill="#8b4513" />
      {/* Head */}
      <circle cx="21" cy="30" r="15" fill="#d4a574" />
      {/* Hair */}
      <path d="M10 25 Q21 18 32 25 Q28 22 21 22 Q14 22 10 25" fill="#4a4a4a" />
      {/* Eyes */}
      <circle cx="18" cy="28" r="1.5" fill="#2d3748" />
      <circle cx="24" cy="28" r="1.5" fill="#2d3748" />
      {/* Speaking gesture */}
      <circle cx="40" cy="65" r="6" fill="#d4a574" />
      
      {/* Speech elements */}
      <ellipse cx="60" cy="40" rx="30" ry="18" fill="white" stroke="#7a8a7a" strokeWidth="2" opacity="0.9" />
      <polygon points="35,50 45,55 35,60" fill="white" />
      <circle cx="50" cy="37" r="2" fill="#7a8a7a" />
      <circle cx="60" cy="37" r="2" fill="#7a8a7a" />
      <circle cx="70" cy="37" r="2" fill="#7a8a7a" />
    </g>
    
    {/* Professional 2 (right) */}
    <g transform="translate(240, 100)">
      {/* Business suit */}
      <rect x="15" y="40" width="22" height="70" rx="11" fill="#1a3a2e" />
      {/* Shirt */}
      <rect x="21" y="42" width="10" height="35" fill="white" />
      {/* Head */}
      <circle cx="26" cy="25" r="15" fill="#d4a574" />
      {/* Hair */}
      <path d="M15 20 Q26 13 37 20 Q33 17 26 17 Q19 17 15 20" fill="#6b5b4f" />
      {/* Beard */}
      <path d="M18 35 Q26 45 34 35 Q32 40 26 42 Q20 40 18 35" fill="#6b5b4f" />
      {/* Eyes */}
      <circle cx="23" cy="23" r="1.5" fill="#2d3748" />
      <circle cx="29" cy="23" r="1.5" fill="#2d3748" />
      {/* Laptop */}
      <rect x="20" y="75" width="30" height="22" rx="2" fill="#4a5568" />
      <rect x="22" y="77" width="26" height="16" fill="#e2e8f0" />
    </g>
    
    {/* Connection line */}
    <path d="M140 130 Q200 115 240 135" stroke="#7a8a7a" strokeWidth="2" fill="none" strokeDasharray="3,3" opacity="0.6" />
    
    {/* Decorative elements */}
    <circle cx="200" cy="60" r="3" fill="#8b9b8b" opacity="0.3" />
    <circle cx="150" cy="200" r="2" fill="#7a8a7a" opacity="0.4" />
  </svg>
);

// Module 3: Objection Handling - Professional defense and response
export const Module3Illustration = () => (
  <svg viewBox="0 0 400 240" className="w-full h-full">
    <defs>
      <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c7d2cc" />
        <stop offset="100%" stopColor="#b8c4a8" />
      </linearGradient>
    </defs>
    <rect width="400" height="240" fill="url(#bg3)" />
    
    {/* Background trees */}
    <ellipse cx="70" cy="180" rx="28" ry="38" fill="#7a8a7a" opacity="0.4" />
    <ellipse cx="330" cy="170" rx="22" ry="32" fill="#6a7a6a" opacity="0.3" />
    
    {/* Shield symbol (center) */}
    <g transform="translate(180, 70)">
      <path d="M20 10 Q35 15 35 30 L35 65 Q30 85 20 85 Q10 85 5 65 L5 30 Q5 15 20 10 Z" fill="#8b9b8b" />
      <path d="M20 20 Q30 22 30 32 L30 58 Q25 72 20 72 Q15 72 10 58 L10 32 Q10 22 20 20 Z" fill="#a8b5a8" />
      <circle cx="20" cy="42" r="8" fill="white" />
      <path d="M15 42 L18 45 L25 37" stroke="#8b9b8b" strokeWidth="2" fill="none" />
    </g>
    
    {/* Challenging client (left) */}
    <g transform="translate(60, 100)">
      {/* Business attire */}
      <rect x="10" y="40" width="20" height="60" rx="10" fill="#8b4513" />
      {/* Shirt */}
      <rect x="15" y="42" width="10" height="30" fill="white" />
      {/* Head */}
      <circle cx="20" cy="25" r="13" fill="#d4a574" />
      {/* Hair */}
      <path d="M10 20 Q20 14 30 20 Q26 18 20 18 Q14 18 10 20" fill="#4a4a4a" />
      {/* Eyes */}
      <circle cx="17" cy="23" r="1.5" fill="#2d3748" />
      <circle cx="23" cy="23" r="1.5" fill="#2d3748" />
      {/* Concerned expression */}
      <path d="M15 30 Q20 35 25 30" stroke="#8b4513" strokeWidth="1" fill="none" />
      
      {/* Objection bubble */}
      <ellipse cx="-15" cy="15" rx="25" ry="15" fill="white" stroke="#8b9b8b" strokeWidth="2" opacity="0.9" />
      <text x="-30" y="18" fontSize="8" fill="#8b4513" fontWeight="bold">BUT...</text>
      <polygon points="10,25 20,30 10,35" fill="white" />
    </g>
    
    {/* Confident salesperson (right) */}
    <g transform="translate(260, 110)">
      {/* Professional suit */}
      <rect x="15" y="35" width="22" height="65" rx="11" fill="#2d5a3d" />
      {/* Shirt */}
      <rect x="21" y="37" width="10" height="32" fill="white" />
      {/* Tie */}
      <rect x="24" y="37" width="4" height="28" fill="#8b4513" />
      {/* Head */}
      <circle cx="26" cy="22" r="13" fill="#d4a574" />
      {/* Hair */}
      <path d="M16 17 Q26 11 36 17 Q32 15 26 15 Q20 15 16 17" fill="#6b5b4f" />
      {/* Beard */}
      <path d="M19 30 Q26 38 33 30 Q31 34 26 36 Q21 34 19 30" fill="#6b5b4f" />
      {/* Eyes */}
      <circle cx="23" cy="20" r="1.5" fill="#2d3748" />
      <circle cx="29" cy="20" r="1.5" fill="#2d3748" />
      {/* Confident smile */}
      <path d="M20 25 Q26 30 32 25" stroke="#2d5a3d" strokeWidth="1" fill="none" />
      {/* Reassuring gesture */}
      <circle cx="45" cy="55" r="6" fill="#d4a574" />
      
      {/* Response bubble */}
      <ellipse cx="65" cy="10" rx="28" ry="16" fill="white" stroke="#7a8a7a" strokeWidth="2" opacity="0.9" />
      <text x="45" y="13" fontSize="7" fill="#2d5a3d">I understand</text>
      <polygon points="40,20 50,25 40,30" fill="white" />
    </g>
    
    {/* Connection showing resolution */}
    <path d="M120 140 Q200 125 260 145" stroke="#8b9b8b" strokeWidth="2" fill="none" strokeDasharray="4,4" opacity="0.5" />
    
    {/* Decorative elements */}
    <circle cx="200" cy="200" r="2" fill="#7a8a7a" opacity="0.4" />
    <circle cx="150" cy="50" r="3" fill="#8b9b8b" opacity="0.3" />
  </svg>
);

// Module 4: Closing - Professional handshake and agreement
export const Module4Illustration = () => (
  <svg viewBox="0 0 400 240" className="w-full h-full">
    <defs>
      <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c7d2cc" />
        <stop offset="100%" stopColor="#b8c4a8" />
      </linearGradient>
    </defs>
    <rect width="400" height="240" fill="url(#bg4)" />
    
    {/* Background trees */}
    <ellipse cx="80" cy="180" rx="30" ry="40" fill="#7a8a7a" opacity="0.4" />
    <ellipse cx="320" cy="170" rx="25" ry="35" fill="#6a7a6a" opacity="0.3" />
    
    {/* Professional handshake (center) */}
    <g transform="translate(160, 110)">
      {/* Left professional hand */}
      <path d="M0 15 L15 10 L25 15 L30 25 L25 35 L15 30 L0 35 Z" fill="#d4a574" />
      {/* Right professional hand */}
      <path d="M30 25 L45 20 L55 25 L60 15 L55 5 L45 10 L30 15 Z" fill="#d4a574" />
      {/* Left suit sleeve */}
      <rect x="-10" y="30" width="20" height="30" fill="#2d5a3d" />
      {/* Right suit sleeve */}
      <rect x="50" y="0" width="20" height="30" fill="#8b4513" />
      {/* Watch detail */}
      <rect x="5" y="32" width="8" height="6" fill="#4a5568" rx="1" />
    </g>
    
    {/* Contract document */}
    <g transform="translate(280, 70)">
      <rect x="0" y="0" width="45" height="60" fill="white" stroke="#8b9b8b" strokeWidth="2" />
      <line x1="5" y1="12" x2="40" y2="12" stroke="#8b9b8b" strokeWidth="2" />
      <line x1="5" y1="22" x2="35" y2="22" stroke="#7a8a7a" strokeWidth="1" />
      <line x1="5" y1="30" x2="37" y2="30" stroke="#7a8a7a" strokeWidth="1" />
      <line x1="5" y1="38" x2="33" y2="38" stroke="#7a8a7a" strokeWidth="1" />
      {/* Signature line */}
      <line x1="5" y1="48" x2="40" y2="48" stroke="#2d5a3d" strokeWidth="2" strokeDasharray="3,3" />
    </g>
    
    {/* Client (left) */}
    <g transform="translate(80, 90)">
      {/* Business suit */}
      <rect x="15" y="50" width="22" height="70" rx="11" fill="#8b4513" />
      {/* Shirt */}
      <rect x="21" y="52" width="10" height="35" fill="white" />
      {/* Head */}
      <circle cx="26" cy="35" r="15" fill="#d4a574" />
      {/* Hair */}
      <path d="M15 30 Q26 23 37 30 Q33 27 26 27 Q19 27 15 30" fill="#4a4a4a" />
      {/* Eyes */}
      <circle cx="23" cy="33" r="1.5" fill="#2d3748" />
      <circle cx="29" cy="33" r="1.5" fill="#2d3748" />
      {/* Satisfied smile */}
      <path d="M20 40 Q26 45 32 40" stroke="#8b4513" strokeWidth="1" fill="none" />
    </g>
    
    {/* Salesperson (right) */}
    <g transform="translate(240, 95)">
      {/* Professional suit */}
      <rect x="15" y="45" width="22" height="70" rx="11" fill="#2d5a3d" />
      {/* Shirt */}
      <rect x="21" y="47" width="10" height="35" fill="white" />
      {/* Tie */}
      <rect x="24" y="47" width="4" height="32" fill="#8b4513" />
      {/* Head */}
      <circle cx="26" cy="30" r="15" fill="#d4a574" />
      {/* Hair */}
      <path d="M15 25 Q26 18 37 25 Q33 22 26 22 Q19 22 15 25" fill="#6b5b4f" />
      {/* Beard */}
      <path d="M19 40 Q26 48 33 40 Q31 44 26 46 Q21 44 19 40" fill="#6b5b4f" />
      {/* Eyes */}
      <circle cx="23" cy="28" r="1.5" fill="#2d3748" />
      <circle cx="29" cy="28" r="1.5" fill="#2d3748" />
      {/* Confident smile */}
      <path d="M20 35 Q26 40 32 35" stroke="#2d5a3d" strokeWidth="1" fill="none" />
    </g>
    
    {/* Success indicator */}
    <circle cx="200" cy="60" r="12" fill="#10b981" opacity="0.8" />
    <path d="M195 60 L198 63 L205 55" stroke="white" strokeWidth="2" fill="none" />
    
    {/* Decorative elements */}
    <circle cx="60" cy="60" r="3" fill="#8b9b8b" opacity="0.3" />
    <circle cx="350" cy="50" r="2" fill="#7a8a7a" opacity="0.4" />
  </svg>
);

// Module 5: Relationships - Professional network building
export const Module5Illustration = () => (
  <svg viewBox="0 0 400 240" className="w-full h-full">
    <defs>
      <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c7d2cc" />
        <stop offset="100%" stopColor="#b8c4a8" />
      </linearGradient>
    </defs>
    <rect width="400" height="240" fill="url(#bg5)" />
    
    {/* Background trees */}
    <ellipse cx="70" cy="180" rx="28" ry="38" fill="#7a8a7a" opacity="0.4" />
    <ellipse cx="330" cy="170" rx="22" ry="32" fill="#6a7a6a" opacity="0.3" />
    
    {/* Network connection lines */}
    <line x1="120" y1="90" x2="200" y2="120" stroke="#8b9b8b" strokeWidth="2" opacity="0.5" />
    <line x1="200" y1="120" x2="280" y2="90" stroke="#8b9b8b" strokeWidth="2" opacity="0.5" />
    <line x1="120" y1="90" x2="280" y2="90" stroke="#8b9b8b" strokeWidth="2" opacity="0.5" />
    <line x1="200" y1="120" x2="200" y2="180" stroke="#8b9b8b" strokeWidth="2" opacity="0.5" />
    
    {/* Professional 1 (top left) */}
    <g transform="translate(110, 70)">
      <circle cx="10" cy="10" r="12" fill="#d4a574" />
      <rect x="3" y="22" width="14" height="35" rx="7" fill="#2d5a3d" />
      <rect x="6" y="24" width="8" height="20" fill="white" />
      <rect x="8" y="24" width="4" height="18" fill="#8b4513" />
    </g>
    
    {/* Professional 2 (center) - Main salesperson */}
    <g transform="translate(190, 100)">
      <circle cx="10" cy="10" r="15" fill="#d4a574" />
      <rect x="0" y="25" width="20" height="40" rx="10" fill="#1a3a2e" />
      <rect x="5" y="27" width="10" height="25" fill="white" />
      <rect x="8" y="27" width="4" height="22" fill="#8b4513" />
      {/* Confident gesture */}
      <circle cx="30" cy="35" r="6" fill="#d4a574" />
    </g>
    
    {/* Professional 3 (top right) */}
    <g transform="translate(270, 70)">
      <circle cx="10" cy="10" r="12" fill="#d4a574" />
      <rect x="3" y="22" width="14" height="35" rx="7" fill="#8b4513" />
      <rect x="6" y="24" width="8" height="20" fill="white" />
    </g>
    
    {/* Professional 4 (bottom) */}
    <g transform="translate(190, 170)">
      <circle cx="10" cy="10" r="12" fill="#d4a574" />
      <rect x="3" y="22" width="14" height="35" rx="7" fill="#2d5a3d" />
      <rect x="6" y="24" width="8" height="20" fill="white" />
    </g>
    
    {/* Success indicators showing strong relationships */}
    <circle cx="165" cy="105" r="8" fill="#10b981" opacity="0.8" />
    <path d="M160 105 L163 108 L170 100" stroke="white" strokeWidth="2" fill="none" />
    
    <circle cx="235" cy="105" r="8" fill="#10b981" opacity="0.8" />
    <path d="M230 105 L233 108 L240 100" stroke="white" strokeWidth="2" fill="none" />
    
    <circle cx="200" cy="150" r="8" fill="#10b981" opacity="0.8" />
    <path d="M195 150 L198 153 L205 145" stroke="white" strokeWidth="2" fill="none" />
    
    {/* Decorative elements */}
    <circle cx="350" cy="50" r="3" fill="#8b9b8b" opacity="0.3" />
    <circle cx="50" cy="50" r="2" fill="#7a8a7a" opacity="0.4" />
  </svg>
);

// Module 6: Strategy - Strategic planning and negotiation
export const Module6Illustration = () => (
  <svg viewBox="0 0 400 240" className="w-full h-full">
    <defs>
      <linearGradient id="bg6" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c7d2cc" />
        <stop offset="100%" stopColor="#b8c4a8" />
      </linearGradient>
    </defs>
    <rect width="400" height="240" fill="url(#bg6)" />
    
    {/* Background trees */}
    <ellipse cx="80" cy="180" rx="30" ry="40" fill="#7a8a7a" opacity="0.4" />
    <ellipse cx="320" cy="170" rx="25" ry="35" fill="#6a7a6a" opacity="0.3" />
    
    {/* Classical column (representing wisdom/strategy) */}
    <g transform="translate(180, 60)">
      {/* Column capital */}
      <ellipse cx="20" cy="10" rx="25" ry="6" fill="#8b9b8b" />
      <path d="M0 10 Q8 5 16 10 Q24 15 32 10 Q40 5 48 10" stroke="#8b9b8b" strokeWidth="2" fill="none" />
      {/* Column shaft */}
      <rect x="16" y="16" width="8" height="80" fill="#a8b5a8" />
      <rect x="14" y="16" width="12" height="6" fill="#8b9b8b" />
      <rect x="14" y="90" width="12" height="6" fill="#8b9b8b" />
      {/* Vertical lines */}
      <line x1="20" y1="22" x2="20" y2="90" stroke="#8b9b8b" strokeWidth="1" />
    </g>
    
    {/* Strategic planning session */}
    <g transform="translate(80, 100)">
      {/* Senior strategist */}
      <circle cx="20" cy="20" r="15" fill="#d4a574" />
      <rect x="10" y="35" width="20" height="50" rx="10" fill="#2d5a3d" />
      <rect x="15" y="37" width="10" height="30" fill="white" />
      <rect x="18" y="37" width="4" height="28" fill="#8b4513" />
      {/* Pointing gesture */}
      <circle cx="45" cy="50" r="6" fill="#d4a574" />
      <line x1="40" y1="50" x2="55" y2="45" stroke="#d4a574" strokeWidth="2" />
    </g>
    
    {/* Strategic board/chart */}
    <g transform="translate(260, 80)">
      {/* Board */}
      <rect x="0" y="0" width="60" height="80" fill="white" stroke="#8b9b8b" strokeWidth="2" />
      {/* Grid pattern */}
      <line x1="0" y1="20" x2="60" y2="20" stroke="#a8b5a8" strokeWidth="1" />
      <line x1="0" y1="40" x2="60" y2="40" stroke="#a8b5a8" strokeWidth="1" />
      <line x1="0" y1="60" x2="60" y2="60" stroke="#a8b5a8" strokeWidth="1" />
      <line x1="20" y1="0" x2="20" y2="80" stroke="#a8b5a8" strokeWidth="1" />
      <line x1="40" y1="0" x2="40" y2="80" stroke="#a8b5a8" strokeWidth="1" />
      
      {/* Strategic elements */}
      <circle cx="10" cy="10" r="4" fill="#2d5a3d" />
      <circle cx="30" cy="30" r="4" fill="#8b4513" />
      <circle cx="50" cy="50" r="4" fill="#2d5a3d" />
      
      {/* Connection lines showing strategy */}
      <line x1="10" y1="10" x2="30" y2="30" stroke="#8b9b8b" strokeWidth="2" />
      <line x1="30" y1="30" x2="50" y2="50" stroke="#8b9b8b" strokeWidth="2" />
    </g>
    
    {/* Young professional learning */}
    <g transform="translate(120, 150)">
      <circle cx="15" cy="15" r="12" fill="#d4a574" />
      <rect x="8" y="27" width="14" height="40" rx="7" fill="#8b4513" />
      <rect x="12" y="29" width="6" height="22" fill="white" />
      {/* Note-taking */}
      <rect x="0" y="45" width="12" height="8" fill="white" stroke="#8b9b8b" strokeWidth="1" />
      <line x1="2" y1="48" x2="10" y2="48" stroke="#8b9b8b" strokeWidth="1" />
      <line x1="2" y1="51" x2="8" y2="51" stroke="#8b9b8b" strokeWidth="1" />
    </g>
    
    {/* Strategic arrows */}
    <path d="M140 130 Q180 110 220 130" stroke="#8b9b8b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead6)" />
    <path d="M260 100 Q240 120 220 140" stroke="#8b9b8b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead6)" />
    
    {/* Arrow marker */}
    <defs>
      <marker id="arrowhead6" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#8b9b8b" />
      </marker>
    </defs>
    
    {/* Decorative elements */}
    <circle cx="60" cy="60" r="3" fill="#8b9b8b" opacity="0.3" />
    <circle cx="350" cy="50" r="2" fill="#7a8a7a" opacity="0.4" />
  </svg>
);