import React from 'react';

// Module 1: Foundations - Stoic philosopher with modern elements
export const Module1Illustration = () => (
  <svg viewBox="0 0 400 240" className="w-full h-full">
    <defs>
      <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f7f3e9" />
        <stop offset="100%" stopColor="#e8dcc6" />
      </linearGradient>
    </defs>
    <rect width="400" height="240" fill="url(#bg1)" />
    
    {/* Background elements */}
    <circle cx="320" cy="60" r="40" fill="#c7d2cc" opacity="0.6" />
    <circle cx="80" cy="180" r="30" fill="#a8b5a8" opacity="0.4" />
    
    {/* Stoic figure */}
    <g transform="translate(120, 80)">
      {/* Body */}
      <rect x="25" y="60" width="30" height="80" rx="15" fill="#8b9b8b" />
      {/* Toga */}
      <path d="M15 70 Q40 50 65 70 L65 140 Q40 150 15 140 Z" fill="#a8b5a8" />
      {/* Head */}
      <circle cx="40" cy="40" r="20" fill="#d4a574" />
      {/* Beard */}
      <path d="M25 45 Q40 65 55 45 Q50 60 40 65 Q30 60 25 45" fill="#8b7355" />
      {/* Eyes */}
      <circle cx="35" cy="38" r="2" fill="#2d3748" />
      <circle cx="45" cy="38" r="2" fill="#2d3748" />
    </g>
    
    {/* Modern elements */}
    <g transform="translate(240, 100)">
      {/* Laptop/tablet */}
      <rect x="0" y="20" width="60" height="40" rx="4" fill="#4a5568" />
      <rect x="2" y="22" width="56" height="30" fill="#e2e8f0" />
      {/* Screen content lines */}
      <line x1="8" y1="28" x2="50" y2="28" stroke="#a0aec0" strokeWidth="2" />
      <line x1="8" y1="35" x2="45" y2="35" stroke="#a0aec0" strokeWidth="1" />
      <line x1="8" y1="42" x2="40" y2="42" stroke="#a0aec0" strokeWidth="1" />
    </g>
    
    {/* Decorative elements */}
    <path d="M50 40 Q60 30 70 40" stroke="#8b9b8b" strokeWidth="2" fill="none" />
    <path d="M320 160 Q330 150 340 160" stroke="#8b9b8b" strokeWidth="2" fill="none" />
  </svg>
);

// Module 2: Communication - Two figures in conversation
export const Module2Illustration = () => (
  <svg viewBox="0 0 400 240" className="w-full h-full">
    <defs>
      <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f0f9f0" />
        <stop offset="100%" stopColor="#d4e6d4" />
      </linearGradient>
    </defs>
    <rect width="400" height="240" fill="url(#bg2)" />
    
    {/* Background shapes */}
    <circle cx="80" cy="80" r="35" fill="#a8c8a8" opacity="0.5" />
    <circle cx="320" cy="160" r="25" fill="#85a885" opacity="0.6" />
    
    {/* Figure 1 */}
    <g transform="translate(80, 100)">
      <circle cx="20" cy="20" r="15" fill="#d4a574" />
      <rect x="10" y="35" width="20" height="50" rx="10" fill="#2d5a3d" />
      {/* Speech bubble */}
      <ellipse cx="50" cy="10" rx="25" ry="15" fill="white" stroke="#85a885" strokeWidth="2" />
      <polygon points="25,15 35,20 25,25" fill="white" />
      <circle cx="40" cy="8" r="2" fill="#85a885" />
      <circle cx="50" cy="8" r="2" fill="#85a885" />
      <circle cx="60" cy="8" r="2" fill="#85a885" />
    </g>
    
    {/* Figure 2 */}
    <g transform="translate(260, 120)">
      <circle cx="20" cy="20" r="15" fill="#d4a574" />
      <rect x="10" y="35" width="20" height="50" rx="10" fill="#1a3a2e" />
      {/* Laptop */}
      <rect x="15" y="55" width="25" height="18" rx="2" fill="#4a5568" />
      <rect x="17" y="57" width="21" height="12" fill="#e2e8f0" />
    </g>
    
    {/* Connection lines */}
    <path d="M140 130 Q200 120 260 140" stroke="#85a885" strokeWidth="3" fill="none" strokeDasharray="5,5" />
  </svg>
);

// Module 3: Objection Handling - Shield and conversation
export const Module3Illustration = () => (
  <svg viewBox="0 0 400 240" className="w-full h-full">
    <defs>
      <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff5f0" />
        <stop offset="100%" stopColor="#fed7c7" />
      </linearGradient>
    </defs>
    <rect width="400" height="240" fill="url(#bg3)" />
    
    {/* Background elements */}
    <circle cx="100" cy="60" r="30" fill="#f4a57a" opacity="0.4" />
    <circle cx="300" cy="180" r="40" fill="#e8906a" opacity="0.3" />
    
    {/* Shield */}
    <g transform="translate(180, 80)">
      <path d="M20 0 Q40 10 40 30 L40 60 Q30 80 20 80 Q10 80 0 60 L0 30 Q0 10 20 0 Z" fill="#c97850" />
      <path d="M20 10 Q30 15 30 25 L30 50 Q25 65 20 65 Q15 65 10 50 L10 25 Q10 15 20 10 Z" fill="#e8906a" />
      <circle cx="20" cy="35" r="8" fill="white" />
      <path d="M15 35 L18 38 L25 30" stroke="#c97850" strokeWidth="2" fill="none" />
    </g>
    
    {/* Figure with objection */}
    <g transform="translate(80, 120)">
      <circle cx="15" cy="15" r="12" fill="#d4a574" />
      <rect x="8" y="27" width="14" height="40" rx="7" fill="#8b4513" />
      {/* Objection bubble */}
      <ellipse cx="-20" cy="0" rx="20" ry="12" fill="#ffcccc" stroke="#e8906a" strokeWidth="2" />
      <text x="-30" y="2" fontSize="10" fill="#8b4513">NO!</text>
      <polygon points="-5,8 5,12 -5,16" fill="#ffcccc" />
    </g>
    
    {/* Salesperson with response */}
    <g transform="translate(280, 130)">
      <circle cx="15" cy="15" r="12" fill="#d4a574" />
      <rect x="8" y="27" width="14" height="40" rx="7" fill="#2d5a3d" />
      {/* Response bubble */}
      <ellipse cx="40" cy="0" rx="25" ry="15" fill="#e6f7e6" stroke="#85a885" strokeWidth="2" />
      <circle cx="30" cy="-2" r="1.5" fill="#85a885" />
      <circle cx="40" cy="-2" r="1.5" fill="#85a885" />
      <circle cx="50" cy="-2" r="1.5" fill="#85a885" />
      <polygon points="20,8 30,12 20,16" fill="#e6f7e6" />
    </g>
  </svg>
);

// Module 4: Closing - Handshake and agreement
export const Module4Illustration = () => (
  <svg viewBox="0 0 400 240" className="w-full h-full">
    <defs>
      <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f7f0ff" />
        <stop offset="100%" stopColor="#e8d5ff" />
      </linearGradient>
    </defs>
    <rect width="400" height="240" fill="url(#bg4)" />
    
    {/* Background elements */}
    <circle cx="80" cy="80" r="35" fill="#c9a9dd" opacity="0.4" />
    <circle cx="320" cy="160" r="30" fill="#b399cc" opacity="0.5" />
    
    {/* Handshake in center */}
    <g transform="translate(160, 120)">
      {/* Left hand */}
      <path d="M0 0 L15 5 L25 0 L30 10 L25 20 L15 15 L0 20 Z" fill="#d4a574" />
      {/* Right hand */}
      <path d="M30 10 L45 5 L55 10 L60 0 L55 -10 L45 -5 L30 0 Z" fill="#d4a574" />
      {/* Sleeve 1 */}
      <rect x="-10" y="15" width="20" height="25" fill="#2d5a3d" />
      {/* Sleeve 2 */}
      <rect x="50" y="-15" width="20" height="25" fill="#8b4513" />
    </g>
    
    {/* Contract/document */}
    <g transform="translate(200, 60)">
      <rect x="0" y="0" width="40" height="50" fill="white" stroke="#c9a9dd" strokeWidth="2" />
      <line x1="5" y1="10" x2="35" y2="10" stroke="#c9a9dd" strokeWidth="2" />
      <line x1="5" y1="18" x2="30" y2="18" stroke="#b399cc" strokeWidth="1" />
      <line x1="5" y1="26" x2="32" y2="26" stroke="#b399cc" strokeWidth="1" />
      <line x1="5" y1="34" x2="28" y2="34" stroke="#b399cc" strokeWidth="1" />
      {/* Signature line */}
      <line x1="5" y1="42" x2="35" y2="42" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="2,2" />
    </g>
    
    {/* Success elements */}
    <circle cx="100" cy="180" r="15" fill="#10b981" opacity="0.6" />
    <path d="M95 180 L98 183 L105 175" stroke="white" strokeWidth="2" fill="none" />
  </svg>
);

// Module 5: Relationships - Network of connected people
export const Module5Illustration = () => (
  <svg viewBox="0 0 400 240" className="w-full h-full">
    <defs>
      <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f0f7ff" />
        <stop offset="100%" stopColor="#dbeafe" />
      </linearGradient>
    </defs>
    <rect width="400" height="240" fill="url(#bg5)" />
    
    {/* Network connections */}
    <line x1="120" y1="80" x2="200" y2="120" stroke="#60a5fa" strokeWidth="2" opacity="0.6" />
    <line x1="200" y1="120" x2="280" y2="80" stroke="#60a5fa" strokeWidth="2" opacity="0.6" />
    <line x1="120" y1="80" x2="280" y2="80" stroke="#60a5fa" strokeWidth="2" opacity="0.6" />
    <line x1="200" y1="120" x2="200" y2="180" stroke="#60a5fa" strokeWidth="2" opacity="0.6" />
    
    {/* Person 1 */}
    <g transform="translate(110, 70)">
      <circle cx="10" cy="10" r="12" fill="#d4a574" />
      <rect x="3" y="22" width="14" height="30" rx="7" fill="#1e40af" />
    </g>
    
    {/* Person 2 (center) */}
    <g transform="translate(190, 110)">
      <circle cx="10" cy="10" r="12" fill="#d4a574" />
      <rect x="3" y="22" width="14" height="30" rx="7" fill="#2d5a3d" />
    </g>
    
    {/* Person 3 */}
    <g transform="translate(270, 70)">
      <circle cx="10" cy="10" r="12" fill="#d4a574" />
      <rect x="3" y="22" width="14" height="30" rx="7" fill="#8b5cf6" />
    </g>
    
    {/* Person 4 */}
    <g transform="translate(190, 170)">
      <circle cx="10" cy="10" r="12" fill="#d4a574" />
      <rect x="3" y="22" width="14" height="30" rx="7" fill="#dc2626" />
    </g>
    
    {/* Relationship indicators */}
    <circle cx="165" cy="100" r="8" fill="#10b981" opacity="0.7" />
    <path d="M160 100 L163 103 L170 95" stroke="white" strokeWidth="2" fill="none" />
    
    <circle cx="235" cy="100" r="8" fill="#10b981" opacity="0.7" />
    <path d="M230 100 L233 103 L240 95" stroke="white" strokeWidth="2" fill="none" />
  </svg>
);

// Module 6: Strategy - Chess pieces and planning
export const Module6Illustration = () => (
  <svg viewBox="0 0 400 240" className="w-full h-full">
    <defs>
      <linearGradient id="bg6" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f0fdf4" />
        <stop offset="100%" stopColor="#d1fae5" />
      </linearGradient>
    </defs>
    <rect width="400" height="240" fill="url(#bg6)" />
    
    {/* Chess board pattern */}
    <g transform="translate(120, 140)">
      {/* Board squares */}
      <rect x="0" y="0" width="160" height="80" fill="#a3a3a3" opacity="0.3" />
      <rect x="0" y="0" width="20" height="20" fill="#10b981" opacity="0.4" />
      <rect x="40" y="0" width="20" height="20" fill="#10b981" opacity="0.4" />
      <rect x="80" y="0" width="20" height="20" fill="#10b981" opacity="0.4" />
      <rect x="120" y="0" width="20" height="20" fill="#10b981" opacity="0.4" />
      <rect x="20" y="20" width="20" height="20" fill="#10b981" opacity="0.4" />
      <rect x="60" y="20" width="20" height="20" fill="#10b981" opacity="0.4" />
      <rect x="100" y="20" width="20" height="20" fill="#10b981" opacity="0.4" />
      <rect x="140" y="20" width="20" height="20" fill="#10b981" opacity="0.4" />
    </g>
    
    {/* Chess pieces */}
    <g transform="translate(140, 110)">
      {/* King */}
      <circle cx="10" cy="20" r="6" fill="#374151" />
      <rect x="7" y="14" width="6" height="8" fill="#374151" />
      <polygon points="10,8 8,14 12,14" fill="#374151" />
      <line x1="6" y1="10" x2="14" y2="10" stroke="#374151" strokeWidth="2" />
      <line x1="10" y1="6" x2="10" y2="14" stroke="#374151" strokeWidth="2" />
    </g>
    
    <g transform="translate(180, 120)">
      {/* Queen */}
      <circle cx="8" cy="18" r="5" fill="#6b7280" />
      <rect x="6" y="13" width="4" height="6" fill="#6b7280" />
      <polygon points="8,7 6,13 10,13" fill="#6b7280" />
      <circle cx="6" cy="9" r="1" fill="#6b7280" />
      <circle cx="8" cy="7" r="1" fill="#6b7280" />
      <circle cx="10" cy="9" r="1" fill="#6b7280" />
    </g>
    
    {/* Strategy arrows */}
    <path d="M80 80 Q150 60 220 100" stroke="#059669" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" />
    <path d="M320 60 Q280 80 240 120" stroke="#059669" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" />
    
    {/* Arrow marker */}
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#059669" />
      </marker>
    </defs>
    
    {/* Strategic elements */}
    <circle cx="80" cy="80" r="25" fill="#34d399" opacity="0.3" />
    <circle cx="320" cy="60" r="20" fill="#22c55e" opacity="0.4" />
  </svg>
);