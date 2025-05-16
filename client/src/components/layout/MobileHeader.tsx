import React from "react";
import { MenuIcon } from "@/assets/icons";

interface MobileHeaderProps {
  toggleSidebar: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ toggleSidebar }) => {
  return (
    <div className="md:hidden bg-primary text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary mr-3">
          <span className="text-sm font-bold">S</span>
        </div>
        <h1 className="font-heading text-xl font-bold">Stoic Seller</h1>
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
