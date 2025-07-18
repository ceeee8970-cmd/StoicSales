import React, { useState, useEffect } from "react";
import UserWelcome from "@/components/dashboard/UserWelcome";
import DailyWisdom from "@/components/dashboard/DailyWisdom";
import ModuleCard from "@/components/dashboard/ModuleCard";
import PracticeCard from "@/components/dashboard/PracticeCard";
import TeamChallenge from "@/components/dashboard/TeamChallenge";
import SalesCallSimulator from "@/components/practice/SalesCallSimulator";
import JournalEntry from "@/components/practice/JournalEntry";
import EbookBanner from "@/components/dashboard/EbookBanner";
import { ChevronRightIcon } from "@/assets/icons";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
// Removed authentication - all modules now accessible
import PreviewBanner from "@/components/auth/PreviewBanner";
import { Button } from "@/components/ui/button";

const Dashboard: React.FC = () => {
  // Removed authentication - all content accessible to everyone
  
  // Fetch modules from the API
  const { data: modulesData, isLoading, error } = useQuery({
    queryKey: ['/api/modules'],
    queryFn: async () => {
      const response = await fetch('/api/modules');
      if (!response.ok) {
        throw new Error('Failed to fetch modules');
      }
      return response.json();
    }
  });

  // Login removed - all content is free
  
  // Transform the API data to the format needed by ModuleCard
  const moduleData = modulesData?.map((module: any, index: number) => ({
    id: module.id,
    title: module.title,
    description: module.description,
    image: module.imageUrl || `https://images.unsplash.com/photo-${1506126613408 + index}-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300`,
    status: module.status || "not-started",
    completed: module.completedLessons || 0,
    total: module.totalLessons || 1,
    isLocked: false
  })) || [];
  
  const teamChallenge = {
    title: "Dichotomy of Control Challenge",
    description: "Work with your team to apply the principle of focusing only on what you can control in your sales process.",
    daysRemaining: 2,
    teamMembers: 4,
    completion: 72,
    teamPoints: 210,
    rank: 2
  };
  
  // No loading state needed without authentication

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">The Stoic Seller</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Free Access to All Modules
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-6 md:p-10">
        {/* User Welcome with custom message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to The Stoic Seller
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Master the art of sales with ancient wisdom - All 6 modules completely free
          </p>
        </div>
        
        {/* Featured Ebook Banner */}
        <EbookBanner />
        
        {/* Daily Wisdom */}
        <DailyWisdom />
        
        {/* Six Module Preview Tabs */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-primary">The 6 Complete Modules</h2>
              <p className="text-sm text-gray-600 mt-1">
                All interactive training modules with complete lessons, assignments, and reflections - completely free.
              </p>
            </div>
            <Link href="/ebook-checkout" className="text-sm text-accent hover:text-accent-dark font-medium flex items-center">
              Get the full ebook for $14
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          {/* Module Tabs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-24"></div>
              ))
            ) : error ? (
              <div className="col-span-full text-center text-red-500">
                Error loading modules. Please try again.
              </div>
            ) : moduleData && moduleData.length > 0 ? (
              moduleData.slice(0, 6).map((module, index) => (
                <div key={module.id} className="relative">
                  <Link 
                    href={`/modules/${module.id}`}
                    className="block p-4 rounded-lg border-2 border-primary bg-white hover:bg-primary-50 hover:shadow-md transition-all duration-200"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-1 text-primary">
                        {index + 1}
                      </div>
                      <div className="text-xs font-medium text-gray-700">
                        {module.title}
                      </div>
                      
                      {/* Status indicator */}
                      <div className="mt-2">
                        <div className="text-xs text-green-600 font-medium">AVAILABLE</div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No modules found.
              </div>
            )}
          </div>
          
          {/* Info about free access */}
          <div className="text-center mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                All 6 Modules Are Completely Free
              </h3>
              <p className="text-green-800">
                Access all lessons, assignments, and reflections without any registration or payment required. Start your journey to sales excellence today.
              </p>
            </div>
          </div>
        </div>
        
        {/* Practice Areas */}
        <div className="mb-12">
          <h2 className="font-heading text-xl font-bold text-primary mb-6">Practice Your Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sales Call Simulator */}
            <SalesCallSimulator />
            
            {/* Journal Reflection */}
            <JournalEntry />
          </div>
        </div>
        
        {/* Team Challenge */}
        <TeamChallenge 
          title={teamChallenge.title}
          description={teamChallenge.description}
          daysRemaining={teamChallenge.daysRemaining}
          teamMembers={teamChallenge.teamMembers}
          completion={teamChallenge.completion}
          teamPoints={teamChallenge.teamPoints}
          rank={teamChallenge.rank}
        />
      </div>
    </div>
  );
};

export default Dashboard;