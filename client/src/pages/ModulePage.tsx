import React, { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { Link } from "wouter";
import ModuleContent from "@/components/modules/ModuleContent";
import { Skeleton } from "@/components/ui/skeleton";
// Removed authentication - all modules accessible

interface Module {
  id: number;
  title: string;
  lessons: {
    id: string;
    title: string;
    content: string;
    assignment?: string;
    reflection?: string;
  }[];
}

const ModulePage: React.FC = () => {
  const [match, params] = useRoute("/modules/:id");
  const [loading, setLoading] = useState(true);
  const [module, setModule] = useState<Module | null>(null);
  // All modules accessible to everyone
  
  useEffect(() => {
    if (match && params?.id) {
      // Load module and lessons from API
      const loadModuleData = async () => {
        try {
          const moduleResponse = await fetch(`/api/modules/${params.id}`);
          const lessonsResponse = await fetch(`/api/modules/${params.id}/lessons`);
          
          if (moduleResponse.ok && lessonsResponse.ok) {
            const moduleData = await moduleResponse.json();
            const lessonsData = await lessonsResponse.json();
            
            setModule({
              id: moduleData.id,
              title: moduleData.title,
              lessons: lessonsData
            });
          } else {
            setModule(null);
          }
        } catch (error) {
          console.error('Failed to load module:', error);
          setModule(null);
        } finally {
          setLoading(false);
        }
      };
      
      loadModuleData();
    }
  }, [match, params?.id]);
  
  if (loading) {
    return (
      <div className="p-6 md:p-10 max-w-4xl mx-auto">
        <Skeleton className="h-8 w-64 mb-6" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-10" />
        
        <div className="flex mb-8">
          <div className="w-64 hidden md:block pr-6 border-r border-neutral-light">
            <Skeleton className="h-6 w-32 mb-6" />
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          
          <div className="flex-1 md:pl-8">
            <Skeleton className="h-8 w-3/4 mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!module) {
    return (
      <div className="p-6 md:p-10 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Module Not Found</h1>
        <p className="text-neutral-medium mb-6">
          The module you're looking for doesn't exist or isn't available.
        </p>
        <Link href="/">
          <a className="bg-primary hover:bg-primary-dark text-white rounded-lg px-6 py-3 text-sm font-medium transition duration-200">
            Return to Dashboard
          </a>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="p-6 md:p-10">
      <ModuleContent 
        moduleId={module.id}
        moduleTitle={module.title}
        lessons={module.lessons}
        isAuthenticated={true}
      />
    </div>
  );
};

export default ModulePage;