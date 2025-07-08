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

const Dashboard: React.FC = () => {
  // In a real implementation, this user data would come from an API
  const userData = {
    username: "Marcus",
    points: 42,
    maxPoints: 100
  };
  
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
  
  // Transform the API data to the format needed by ModuleCard
  const moduleData = modulesData?.map((module: any, index: number) => ({
    id: module.id,
    title: module.title,
    description: module.description,
    image: module.imageUrl || `https://images.unsplash.com/photo-${1506126613408 + index}-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300`,
    status: index === 0 ? "completed" as const : 
            index === 1 ? "in-progress" as const : 
            "not-started" as const,
    completed: index === 1 ? 2 : undefined,
    total: index === 1 ? 4 : undefined
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
  
  return (
    <div className="p-6 md:p-10">
      {/* User Welcome */}
      <UserWelcome 
        username={userData.username}
        points={userData.points}
        maxPoints={userData.maxPoints}
      />
      
      {/* Featured Ebook Banner */}
      <EbookBanner />
      
      {/* Daily Wisdom */}
      <DailyWisdom />
      
      {/* Continue Learning */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading text-xl font-bold text-primary">Continue Learning</h2>
            <p className="text-sm text-gray-600 mt-1">
              Want the complete guide? 
              <button 
                onClick={() => window.location.href = '/ebook-checkout'} 
                className="text-accent hover:text-accent-dark font-medium ml-1"
              >
                Get the full ebook for $14
              </button>
            </p>
          </div>
          {/* Fixed link to existing route */}
          <Link href="/" className="text-sm text-accent hover:text-accent-dark font-medium flex items-center">
            View all modules
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <p>Loading modules...</p>
          ) : error ? (
            <p>Error loading modules. Please try again.</p>
          ) : moduleData && moduleData.length > 0 ? (
            moduleData.map(module => (
              <ModuleCard
                key={module.id}
                id={module.id}
                title={module.title}
                description={module.description}
                image={module.image}
                status={module.status}
                completed={module.completed}
                total={module.total}
              />
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
  );
};

export default Dashboard;
