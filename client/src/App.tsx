import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/i18n";
import Dashboard from "@/pages/Dashboard";
import ModulePage from "@/pages/ModulePage";
import SalesCallPractice from "@/pages/SalesCallPractice";
import JournalPage from "@/pages/JournalPage";
import ResourcesPage from "@/pages/ResourcesPage";
import ProgressPage from "@/pages/ProgressPage";
import EbookCheckout from "@/pages/EbookCheckout";
import NotFound from "@/pages/not-found";
import Sidebar from "@/components/layout/Sidebar";
import MobileHeader from "@/components/layout/MobileHeader";

function Router() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false); // Reset state when switching to desktop view
      }
    };

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const sidebar = document.getElementById("mobile-sidebar");
      const toggleButton = document.getElementById("sidebar-toggle");
      
      if (sidebar && 
          !sidebar.contains(e.target as Node) && 
          toggleButton && 
          !toggleButton.contains(e.target as Node) && 
          isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // Add touch support
    
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block bg-primary p-6 text-white">
        <Sidebar />
      </div>
      
      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div 
          id="mobile-sidebar" 
          className="fixed inset-0 z-50 md:hidden"
        >
          <div 
            className="absolute inset-0 bg-neutral-dark bg-opacity-50" 
            onClick={closeSidebar}
          />
          <div className="absolute left-0 top-0 h-full w-64 bg-primary p-6 text-white">
            <Sidebar onClose={closeSidebar} />
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <MobileHeader toggleSidebar={toggleSidebar} />
        
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/modules/:id" component={ModulePage} />
          <Route path="/practice/sales-calls" component={SalesCallPractice} /> 
          <Route path="/sales-practice" component={SalesCallPractice} />
          <Route path="/sales-call-practice" component={SalesCallPractice} />
          <Route path="/journal" component={JournalPage} />
          <Route path="/resources" component={ResourcesPage} />
          <Route path="/progress" component={ProgressPage} />
          <Route path="/ebook-checkout" component={EbookCheckout} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
