import React from "react";
import { Link } from "wouter";

interface PracticeCardProps {
  title: string;
  description: string;
  type: "practice" | "reflect";
  to: string;
  children: React.ReactNode;
}

const PracticeCard: React.FC<PracticeCardProps> = ({
  title,
  description,
  type,
  to,
  children
}) => {
  return (
    <div className="practice-card bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-light">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-heading text-lg font-bold">{title}</h3>
          <div 
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              type === "practice" 
                ? "bg-primary-light bg-opacity-10 text-primary" 
                : "bg-secondary bg-opacity-30 text-accent-dark"
            }`}
          >
            {type === "practice" ? "Practice" : "Reflect"}
          </div>
        </div>
        
        <p className="text-neutral-medium text-sm mb-5">{description}</p>
        
        {children}
        
        <div className="flex justify-between">
          <Link href={to}>
            <a className="bg-primary hover:bg-primary-dark text-white rounded-lg px-5 py-2 text-sm font-medium transition duration-200 flex items-center">
              {type === "practice" ? "Practice Now" : "Reflect Now"}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PracticeCard;
