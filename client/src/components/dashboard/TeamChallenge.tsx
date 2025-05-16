import React from "react";
import { Link } from "wouter";

interface TeamChallengeProps {
  title: string;
  description: string;
  daysRemaining: number;
  teamMembers: number;
  completion: number;
  teamPoints: number;
  rank: number;
}

const TeamChallenge: React.FC<TeamChallengeProps> = ({
  title,
  description,
  daysRemaining,
  teamMembers,
  completion,
  teamPoints,
  rank
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-bold text-primary">Team Challenge</h2>
        <span className="text-sm text-neutral-medium">{daysRemaining} days remaining</span>
      </div>
      
      <div 
        className="bg-cover bg-center rounded-xl overflow-hidden"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&h=400')`
        }}
      >
        <div className="bg-neutral-dark bg-opacity-75 p-6 md:p-8 text-white">
          <div className="max-w-4xl">
            <h3 className="font-heading text-lg md:text-xl font-bold mb-2">{title}</h3>
            <p className="text-neutral-lightest text-sm md:text-base mb-6">{description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">{teamMembers}</p>
                <p className="text-xs">Team Members</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">{completion}%</p>
                <p className="text-xs">Completion</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">{teamPoints}</p>
                <p className="text-xs">Team Points</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">#{rank}</p>
                <p className="text-xs">Leaderboard</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/practice/challenges/team" className="bg-primary hover:bg-primary-dark text-white rounded-lg px-6 py-3 text-sm font-medium transition duration-200 text-center">
                Continue Challenge
              </Link>
              <Link href="/progress/team" className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg px-6 py-3 text-sm font-medium transition duration-200 text-center">
                View Team Progress
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamChallenge;
