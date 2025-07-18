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
// Removed module illustrations and logo as per user preference

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
        {/* User Welcome */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to The Stoic Seller
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
          
          {/* Module Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-t-xl"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))
            ) : error ? (
              <div className="col-span-full text-center text-red-500">
                Error loading modules. Please try again.
              </div>
            ) : moduleData && moduleData.length > 0 ? (
              moduleData.slice(0, 6).map((module, index) => {
                // Define module-specific configurations
                const moduleConfig = {
                  1: {
                    description: "Master the fundamentals of ethical selling and build unshakeable confidence",
                    lessons: "3 comprehensive lessons",
                    color: "from-blue-500 to-purple-600"
                  },
                  2: {
                    description: "Develop persuasive communication skills and master the art of influence",
                    lessons: "3 comprehensive lessons",
                    color: "from-green-500 to-teal-600"
                  },
                  3: {
                    description: "Transform objections into opportunities with proven handling techniques",
                    lessons: "3 comprehensive lessons",
                    color: "from-orange-500 to-red-600"
                  },
                  4: {
                    description: "Learn advanced closing techniques and decision psychology",
                    lessons: "3 comprehensive lessons",
                    color: "from-purple-500 to-pink-600"
                  },
                  5: {
                    description: "Build lasting relationships and create sustainable revenue through referrals",
                    lessons: "3 comprehensive lessons",
                    color: "from-indigo-500 to-blue-600"
                  },
                  6: {
                    description: "Master strategic account planning and advanced negotiation tactics",
                    lessons: "3 comprehensive lessons",
                    color: "from-teal-500 to-green-600"
                  }
                };

                const config = moduleConfig[module.id as keyof typeof moduleConfig];
                
                return (
                  <div key={module.id} className="group">
                    <Link href={`/modules/${module.id}`}>
                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] overflow-hidden">
                        {/* Header with gradient */}
                        <div className={`relative h-32 overflow-hidden bg-gradient-to-br ${config.color}`}>
                          <div className="absolute top-4 left-4">
                            <div className="bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-full text-sm font-bold border border-slate-200">
                              Module {index + 1}
                            </div>
                          </div>
                          <div className="absolute top-4 right-4">
                            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                              FREE
                            </div>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                            {module.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            {config.description}
                          </p>
                          
                          {/* Footer */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-500 text-xs">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {config.lessons}
                            </div>
                            <div className="flex items-center text-primary group-hover:translate-x-1 transition-transform">
                              <span className="text-sm font-medium mr-1">Start Learning</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
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