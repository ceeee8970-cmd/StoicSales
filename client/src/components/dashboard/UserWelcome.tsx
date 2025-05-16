import React from "react";
import { Progress } from "@/components/ui/progress";

interface UserWelcomeProps {
  username: string;
  points: number;
  maxPoints: number;
}

const UserWelcome: React.FC<UserWelcomeProps> = ({ 
  username, 
  points, 
  maxPoints 
}) => {
  const progressPercentage = (points / maxPoints) * 100;
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-2">
          Welcome back, {username}
        </h1>
        <p className="text-neutral-medium">
          Continue your journey in stoic-centered sales
        </p>
      </div>
      
      <div className="mt-4 md:mt-0 flex items-center">
        <div className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center mr-3">
          <span className="text-primary font-medium">{points}</span>
        </div>
        <div>
          <p className="text-sm font-medium">Wisdom Points</p>
          <div className="w-36 h-2 bg-neutral-light rounded-full mt-1">
            <Progress value={progressPercentage} className="bg-accent h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWelcome;
