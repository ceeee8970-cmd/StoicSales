import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircleIcon } from "@/assets/icons";
import { useToast } from "@/hooks/use-toast";

interface ModuleLesson {
  id: string;
  title: string;
  content: string;
  assignment?: string;
  reflection?: string;
}

interface ModuleContentProps {
  moduleId: number;
  moduleTitle: string;
  lessons: ModuleLesson[];
}

const ModuleContent: React.FC<ModuleContentProps> = ({
  moduleId,
  moduleTitle,
  lessons
}) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const currentLesson = lessons[currentLessonIndex];
  
  const handleNextLesson = () => {
    // Mark current lesson as completed
    setCompletedLessons(prev => ({
      ...prev,
      [currentLesson.id]: true
    }));
    
    // Move to next lesson if available
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      window.scrollTo(0, 0);
    } else {
      // Module completed
      setModuleCompleted(true);
      toast({
        title: "Module Completed!",
        description: "You've completed this module. Great work!",
      });
    }
  };

  const handleNextModule = () => {
    const nextModuleId = moduleId + 1;
    // Check if next module exists (modules 1-6)
    if (nextModuleId <= 6) {
      setLocation(`/modules/${nextModuleId}`);
    } else {
      toast({
        title: "Congratulations!",
        description: "You've completed all available modules!",
      });
    }
  };
  
  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const allLessonsCompleted = lessons.every(lesson => completedLessons[lesson.id]);
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="text-accent hover:text-accent-dark transition-colors">
          &larr; Back to Modules
        </Link>
        <h1 className="font-heading text-3xl font-bold text-primary mt-4 mb-2">
          {moduleTitle}
        </h1>
        <div className="flex items-center">
          <div className="h-1 bg-neutral-light rounded-full flex-grow">
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ 
                width: `${(Object.keys(completedLessons).length / lessons.length) * 100}%` 
              }}
            />
          </div>
          <span className="text-sm text-neutral-medium ml-3">
            {Object.keys(completedLessons).length}/{lessons.length} completed
          </span>
        </div>
      </div>
      
      <div className="flex mb-8">
        <div className="w-64 hidden md:block pr-6 border-r border-neutral-light">
          <h3 className="font-medium text-lg mb-4">Lessons</h3>
          <ul className="space-y-3">
            {lessons.map((lesson, index) => (
              <li key={lesson.id}>
                <button
                  className={`flex items-center text-left w-full p-2 rounded-lg ${
                    currentLessonIndex === index
                      ? 'bg-primary text-white'
                      : completedLessons[lesson.id]
                        ? 'text-white bg-primary bg-opacity-80'
                        : 'text-neutral-medium hover:bg-neutral-lightest'
                  }`}
                  onClick={() => setCurrentLessonIndex(index)}
                >
                  {completedLessons[lesson.id] && (
                    <CheckCircleIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${!completedLessons[lesson.id] && 'ml-6'}`}>
                    {lesson.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex-1 md:pl-8">
          <div className="mb-6">
            <h2 className="font-heading text-2xl font-bold mb-6">
              {currentLesson.title}
            </h2>
            
            <div className="prose max-w-none">
              {currentLesson.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          {currentLesson.assignment && (
            <Card className="p-6 mb-6 bg-secondary bg-opacity-20 border-secondary">
              <h3 className="font-heading text-lg font-bold mb-3">Assignment</h3>
              <div className="prose max-w-none">
                {currentLesson.assignment.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Card>
          )}
          
          {currentLesson.reflection && (
            <Card className="p-6 mb-6" style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', color: '#14532d' }}>
              <h3 className="font-heading text-lg font-bold mb-3" style={{ color: '#166534' }}>Reflect</h3>
              <div className="prose max-w-none">
                {currentLesson.reflection.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 font-medium" style={{ color: '#14532d' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </Card>
          )}
          
          <div className="flex justify-between mt-10">
            <Button
              variant="outline"
              onClick={handlePreviousLesson}
              disabled={currentLessonIndex === 0}
            >
              Previous Lesson
            </Button>
            
            <div className="flex space-x-3">
              {moduleCompleted && moduleId < 6 && (
                <Button
                  onClick={handleNextModule}
                  className="bg-accent hover:bg-accent-dark text-white"
                >
                  Next Module
                </Button>
              )}
              
              <Button
                onClick={handleNextLesson}
                disabled={currentLessonIndex === lessons.length - 1 && allLessonsCompleted}
              >
                {currentLessonIndex < lessons.length - 1
                  ? "Next Lesson"
                  : completedLessons[currentLesson.id]
                    ? "Module Completed"
                    : "Complete Module"
                }
              </Button>
            </div>
          </div>
          
          {moduleCompleted && (
            <Card className="mt-8 p-6 bg-accent bg-opacity-10 border-accent">
              <h3 className="font-heading text-xl font-bold mb-3 text-accent">
                🎉 Module Completed!
              </h3>
              <p className="text-neutral-medium mb-4">
                Great work completing this module! You've made significant progress in your Stoic Seller journey.
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setLocation("/")}
                >
                  Back to Dashboard
                </Button>
                {moduleId < 6 && (
                  <Button
                    onClick={handleNextModule}
                    className="bg-accent hover:bg-accent-dark text-white"
                  >
                    Continue to Module {moduleId + 1}
                  </Button>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleContent;
