import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, User, BookOpen, Award } from "lucide-react";

interface PreviewBannerProps {
  onLogin: () => void;
}

const PreviewBanner: React.FC<PreviewBannerProps> = ({ onLogin }) => {
  return (
    <Card className="mb-6 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-blue-900">Preview Mode</h3>
              <p className="text-blue-700">You're viewing limited content. Sign in to unlock your personalized learning journey.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center space-x-2 text-sm text-blue-600">
              <BookOpen className="w-4 h-4" />
              <span>Full Modules</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-blue-600">
              <Award className="w-4 h-4" />
              <span>Progress Tracking</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-blue-600">
              <User className="w-4 h-4" />
              <span>Personal Journal</span>
            </div>
            <Button onClick={onLogin} className="ml-4">
              Sign In to Continue
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreviewBanner;