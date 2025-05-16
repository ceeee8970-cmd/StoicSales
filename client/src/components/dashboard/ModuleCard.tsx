import React from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { 
  CheckCircleIcon, 
  CheckIcon, 
  LockIcon 
} from "@/assets/icons";

interface ModuleCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  status: "completed" | "in-progress" | "not-started";
  completed?: number;
  total?: number;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  id,
  title,
  description,
  image,
  status,
  completed = 0,
  total = 0
}) => {
  const isLocked = status === "not-started";
  
  const statusBadge = {
    "completed": { 
      text: "Completed", 
      bg: "bg-secondary",
      textColor: "text-primary" 
    },
    "in-progress": { 
      text: "In Progress", 
      bg: "bg-white bg-opacity-90", 
      textColor: "text-primary" 
    },
    "not-started": { 
      text: "Upcoming", 
      bg: "bg-white bg-opacity-90", 
      textColor: "text-neutral-medium" 
    }
  };
  
  const badge = statusBadge[status];
  
  return (
    <div className="module-card bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-light">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <div className={cn(
          "absolute top-3 right-3 rounded-lg px-3 py-1 text-xs font-medium",
          badge.bg,
          badge.textColor
        )}>
          {badge.text}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-heading text-lg font-bold mb-1">{title}</h3>
        <p className="text-neutral-medium text-sm mb-4">{description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {status === "completed" && (
              <>
                <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center mr-2">
                  <CheckIcon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">Completed</span>
              </>
            )}
            
            {status === "in-progress" && (
              <>
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-2">
                  <CheckCircleIcon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{completed}/{total} Completed</span>
              </>
            )}
            
            {status === "not-started" && (
              <>
                <div className="w-8 h-8 rounded-full bg-neutral-light text-neutral-medium flex items-center justify-center mr-2">
                  <LockIcon className="h-4 w-4" />
                </div>
                <span className="text-sm text-neutral-medium">Locked</span>
              </>
            )}
          </div>
          
          <Link href={isLocked ? "#" : `/modules/${id}`}>
            <a>
              <button 
                className={cn(
                  "rounded-lg px-4 py-2 text-sm transition duration-200",
                  status === "completed" 
                    ? "border border-primary text-primary hover:bg-primary hover:text-white" 
                    : status === "in-progress"
                      ? "bg-primary hover:bg-primary-dark text-white" 
                      : "bg-neutral-light text-neutral-medium cursor-not-allowed"
                )}
                disabled={isLocked}
              >
                {status === "completed" ? "Review" : status === "in-progress" ? "Continue" : "Start"}
              </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
