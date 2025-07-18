import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Eye, CheckCircle, Clock } from "lucide-react";

interface Module {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  order: number;
}

interface ModulePreviewProps {
  module: Module;
  isAuthenticated: boolean;
  isCompleted?: boolean;
  onLogin: () => void;
  onModuleClick: (moduleId: number) => void;
}

const ModulePreview: React.FC<ModulePreviewProps> = ({ 
  module, 
  isAuthenticated, 
  isCompleted = false,
  onLogin,
  onModuleClick 
}) => {
  const canAccess = isAuthenticated || module.order === 1; // First module always accessible as preview

  const handleClick = () => {
    if (!isAuthenticated && module.order > 1) {
      onLogin();
    } else {
      onModuleClick(module.id);
    }
  };

  const getStatusIcon = () => {
    if (!isAuthenticated && module.order > 1) {
      return <Lock className="w-5 h-5 text-gray-400" />;
    }
    if (isCompleted) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    if (canAccess) {
      return <Eye className="w-5 h-5 text-blue-500" />;
    }
    return <Clock className="w-5 h-5 text-gray-400" />;
  };

  const getStatusText = () => {
    if (!isAuthenticated && module.order > 1) {
      return "Sign in to unlock";
    }
    if (isCompleted) {
      return "Completed";
    }
    if (canAccess) {
      return module.order === 1 && !isAuthenticated ? "Preview Available" : "Available";
    }
    return "Locked";
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
        !canAccess ? 'opacity-75' : ''
      } ${isCompleted ? 'border-green-200 bg-green-50' : ''}`}
      onClick={handleClick}
    >
      {module.imageUrl && (
        <div className="relative">
          <img 
            src={module.imageUrl} 
            alt={module.title}
            className={`w-full h-48 object-cover rounded-t-lg ${
              !canAccess ? 'filter grayscale' : ''
            }`}
          />
          {!canAccess && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-t-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
          )}
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={`text-lg ${!canAccess ? 'text-gray-500' : ''}`}>
            {module.title}
          </CardTitle>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className={`text-sm ${
              isCompleted ? 'text-green-600' : 
              !canAccess ? 'text-gray-500' : 'text-blue-600'
            }`}>
              {getStatusText()}
            </span>
          </div>
        </div>
        <CardDescription className={!canAccess ? 'text-gray-400' : ''}>
          {module.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Module {module.order}</span>
          <Button 
            variant={canAccess ? "default" : "outline"}
            size="sm"
            className={!canAccess ? 'border-gray-300 text-gray-500' : ''}
          >
            {!isAuthenticated && module.order > 1 ? 'Sign In to Access' : 
             module.order === 1 && !isAuthenticated ? 'Preview' : 
             'Start Module'}
          </Button>
        </div>
        
        {!isAuthenticated && module.order === 1 && (
          <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
            <p className="text-xs text-blue-700">
              <Eye className="w-3 h-3 inline mr-1" />
              This is a preview. Sign in to save your progress and access all features.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ModulePreview;