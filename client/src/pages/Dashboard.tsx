import React from "react";
import UserWelcome from "@/components/dashboard/UserWelcome";
import DailyWisdom from "@/components/dashboard/DailyWisdom";
import ModuleCard from "@/components/dashboard/ModuleCard";
import PracticeCard from "@/components/dashboard/PracticeCard";
import TeamChallenge from "@/components/dashboard/TeamChallenge";
import SalesCallSimulator from "@/components/practice/SalesCallSimulator";
import JournalEntry from "@/components/practice/JournalEntry";
import { ChevronRightIcon } from "@/assets/icons";
import { Link } from "wouter";

const Dashboard: React.FC = () => {
  // In a real implementation, this user data would come from an API
  const userData = {
    username: "Marcus",
    points: 42,
    maxPoints: 100
  };
  
  const moduleData = [
    {
      id: 1,
      title: "Module 1: Introduction to Stoic Selling",
      description: "Understand the philosophy behind a more intentional approach to sales.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300",
      status: "completed" as const
    },
    {
      id: 2,
      title: "Module 2: Core Stoic Principles for Sales",
      description: "Master the four key stoic principles that transform how you approach sales conversations.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300",
      status: "in-progress" as const,
      completed: 2,
      total: 4
    },
    {
      id: 3,
      title: "Module 3: Human-Centered Sales Techniques",
      description: "Learn to sell with presence and permission rather than pressure and persuasion.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300",
      status: "not-started" as const
    }
  ];
  
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
      
      {/* Daily Wisdom */}
      <DailyWisdom />
      
      {/* Continue Learning */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-bold text-primary">Continue Learning</h2>
          <Link href="/modules">
            <a className="text-sm text-accent hover:text-accent-dark font-medium flex items-center">
              View all modules
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </a>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moduleData.map(module => (
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
          ))}
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
