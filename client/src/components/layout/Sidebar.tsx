import React from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  BookIcon, 
  ResourcesIcon, 
  MicrophoneIcon, 
  ChallengesIcon, 
  JournalIcon, 
  ProgressIcon 
} from "@/assets/icons";
import { getRandomQuote } from "@/lib/utils";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [location] = useLocation();
  const { text, author } = getRandomQuote();

  const isActive = (path: string) => {
    if (path === '/' && location === path) return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  const NavItem = ({ 
    to, 
    icon: Icon, 
    children 
  }: { 
    to: string; 
    icon: React.FC<{ className?: string }>; 
    children: React.ReactNode 
  }) => (
    <li>
      <Link href={to} 
        onClick={onClose} // Close sidebar when navigating on mobile
        className={cn(
          "flex items-center hover:opacity-100 transition-opacity font-medium",
          isActive(to) ? "text-white font-bold" : "text-white opacity-80"
        )}>
          <Icon className="h-5 w-5 mr-3" />
          {children}
      </Link>
    </li>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary mr-3">
            <span className="text-sm font-bold">S</span>
          </div>
          <h1 className="font-heading text-xl font-bold">Stoic Seller</h1>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="md:hidden text-white hover:text-secondary transition-colors p-1"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      <nav className="space-y-6 flex-grow">
        <div>
          <p className="text-white text-xs font-bold uppercase tracking-wider mb-3">LEARN</p>
          <ul className="space-y-3">
            <NavItem to="/" icon={BookIcon}>
              Modules
            </NavItem>
            <NavItem to="/resources" icon={ResourcesIcon}>
              Resources
            </NavItem>
          </ul>
        </div>
        
        <div>
          <p className="text-white text-xs font-bold uppercase tracking-wider mb-3">PRACTICE</p>
          <ul className="space-y-3">
            <NavItem to="/sales-call-practice" icon={MicrophoneIcon}>
              Sales Calls
            </NavItem>
            <NavItem to="/sales-call-practice?tab=breathwork" icon={ChallengesIcon}>
              Breathwork
            </NavItem>
            <NavItem to="/practice/challenges" icon={ChallengesIcon}>
              Challenges
            </NavItem>
          </ul>
        </div>
        
        <div>
          <p className="text-white text-xs font-bold uppercase tracking-wider mb-3">REFLECT</p>
          <ul className="space-y-3">
            <NavItem to="/journal" icon={JournalIcon}>
              Journal
            </NavItem>
            <NavItem to="/progress" icon={ProgressIcon}>
              Progress
            </NavItem>
          </ul>
        </div>
      </nav>
      
      <div className="mt-auto">
        <div className="bg-primary-light rounded-lg p-4 text-sm">
          <p className="font-quote italic text-secondary mb-2">&ldquo;{text.length > 65 ? `${text.substring(0, 65)}...` : text}&rdquo;</p>
          <p className="text-white opacity-70 text-xs">— {author}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
