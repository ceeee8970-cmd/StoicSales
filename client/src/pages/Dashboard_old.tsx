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
import { useAuth } from "@/hooks/useAuth";
import PreviewBanner from "@/components/auth/PreviewBanner";
import { Button } from "@/components/ui/button";

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  
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

  const handleLogin = () => {
    window.location.href = '/api/login';
  };
  
  // Transform the API data to the format needed by ModuleCard
  const moduleData = modulesData?.map((module: any, index: number) => ({
    id: module.id,
    title: module.title,
    description: module.description,
    image: module.imageUrl || `https://images.unsplash.com/photo-${1506126613408 + index}-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300`,
    status: module.status || "not-started",
    completed: module.completedLessons || 0,
    total: module.totalLessons || 1,
    isLocked: module.isLocked || false
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
  
  if (authLoading) {
    return (
      <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

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
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Welcome, {user?.firstName || user?.email || 'User'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.points || 0} pts
                    </span>
                    <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div 
                        className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${((user?.points || 0) / 100) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.location.href = '/api/logout'}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button onClick={handleLogin}>
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="p-6 md:p-10">
        {/* User Welcome with custom message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome on the method of becoming a sales stoic
          </h1>
          {isAuthenticated && (
            <p className="text-gray-600 dark:text-gray-300">
              Hello, {user?.firstName || user?.email || 'User'} - {user?.points || 0} points earned
            </p>
          )}
        </div>

        {/* Preview Banner for non-authenticated users - after welcome */}
        {!isAuthenticated && (
          <PreviewBanner onLogin={handleLogin} />
        )}
      
        {/* Featured Ebook Banner */}
        <EbookBanner />
        
        {/* Daily Wisdom */}
        <DailyWisdom />
        
        {/* Six Module Preview Tabs */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-primary">The 6 Modules</h2>
              <p className="text-sm text-gray-600 mt-1">
                Complete interactive training modules. First module fully accessible - others require sign in.
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
            <p>Loading modules...</p>
          ) : error ? (
            <p>Error loading modules. Please try again.</p>
          ) : moduleData && moduleData.length > 0 ? (
            moduleData.map(module => (
              <div key={module.id} className="relative">
                <ModuleCard
                  id={module.id}
                  title={module.title}
                  description={module.description}
                  image={module.image}
                  status={module.status}
                  completed={module.completed}
                  total={module.total}
                />
                {/* Show lock overlay for locked modules */}
                {module.isLocked && (
                  <div className="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm font-medium">Sign in to unlock</p>
                      <Button 
                        size="sm" 
                        className="mt-2"
                        onClick={handleLogin}
                      >
                        Sign In
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No modules found.</p>
          )}
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
