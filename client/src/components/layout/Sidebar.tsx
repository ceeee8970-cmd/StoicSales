import React from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { 
  BookIcon, 
  ResourcesIcon, 
  MicrophoneIcon, 
  ChallengesIcon, 
  JournalIcon, 
  ProgressIcon 
} from "@/assets/icons";
import { getRandomQuote } from "@/lib/utils";
import LanguageSelector from "./LanguageSelector";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [location] = useLocation();
  const { text, author } = getRandomQuote();
  const { t } = useLanguage();

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
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-3 text-white">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="15" width="60" height="8" fill="currentColor" />
              <rect x="25" y="23" width="50" height="54" fill="currentColor" />
              <rect x="20" y="77" width="60" height="8" fill="currentColor" />
              <rect x="30" y="30" width="2" height="40" fill="white" opacity="0.3" />
              <rect x="40" y="30" width="2" height="40" fill="white" opacity="0.3" />
              <rect x="50" y="30" width="2" height="40" fill="white" opacity="0.3" />
              <rect x="60" y="30" width="2" height="40" fill="white" opacity="0.3" />
              <circle cx="15" cy="19" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M 11 19 Q 15 15 19 19" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="85" cy="19" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M 81 19 Q 85 15 89 19" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <h1 className="font-heading text-xl font-bold">The Stoic Seller</h1>
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
      
      {/* Language Selector */}
      <div className="mb-6">
        <LanguageSelector />
      </div>
      
      <nav className="space-y-6 flex-grow">
        <div>
          <p className="text-white text-xs font-bold uppercase tracking-wider mb-3">LEARN</p>
          <ul className="space-y-3">
            <NavItem to="/" icon={BookIcon}>
              {t.nav.modules}
            </NavItem>
            <NavItem to="/resources" icon={ResourcesIcon}>
              {t.nav.resources}
            </NavItem>
          </ul>
        </div>
        
        <div>
          <p className="text-white text-xs font-bold uppercase tracking-wider mb-3">{t.dashboard.practiceSection.toUpperCase()}</p>
          <ul className="space-y-3">
            <NavItem to="/practice" icon={ChallengesIcon}>
              Practice Hub
            </NavItem>
            <NavItem to="/sales-call-practice" icon={MicrophoneIcon}>
              {t.nav.salesCalls}
            </NavItem>
            <NavItem to="/practice/quiz" icon={BookIcon}>
              Stoic Seller Quiz
            </NavItem>
          </ul>
        </div>
        
        <div>
          <p className="text-white text-xs font-bold uppercase tracking-wider mb-3">{t.dashboard.reflectSection.toUpperCase()}</p>
          <ul className="space-y-3">
            <NavItem to="/journal" icon={JournalIcon}>
              {t.nav.journal}
            </NavItem>
            <NavItem to="/progress" icon={ProgressIcon}>
              {t.nav.progress}
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
