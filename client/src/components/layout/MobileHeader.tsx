import React from "react";
import { MenuIcon } from "@/assets/icons";

interface MobileHeaderProps {
  toggleSidebar: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ toggleSidebar }) => {
  return (
    <div className="md:hidden bg-primary text-white p-4 flex items-center justify-between">
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
      <button 
        id="sidebar-toggle"
        className="p-1"
        onClick={toggleSidebar}
        aria-label="Toggle Navigation Menu"
      >
        <MenuIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default MobileHeader;
