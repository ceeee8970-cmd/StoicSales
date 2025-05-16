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

const Sidebar: React.FC = () => {
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
        className={cn(
          "flex items-center text-white hover:opacity-100 transition-opacity",
          isActive(to) ? "opacity-90" : "opacity-70"
        )}>
          <Icon className="h-5 w-5 mr-3" />
          {children}
      </Link>
    </li>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-10">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary mr-3">
          <span className="text-sm font-bold">S</span>
        </div>
        <h1 className="font-heading text-xl font-bold">Stoic Seller</h1>
      </div>
      
      <nav className="space-y-6 flex-grow">
        <div>
          <p className="text-secondary-light text-xs font-medium uppercase tracking-wider mb-3">LEARN</p>
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
          <p className="text-secondary-light text-xs font-medium uppercase tracking-wider mb-3">PRACTICE</p>
          <ul className="space-y-3">
            <NavItem to="/practice/sales-calls" icon={MicrophoneIcon}>
              Sales Calls
            </NavItem>
            <NavItem to="/practice/challenges" icon={ChallengesIcon}>
              Challenges
            </NavItem>
          </ul>
        </div>
        
        <div>
          <p className="text-secondary-light text-xs font-medium uppercase tracking-wider mb-3">REFLECT</p>
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
