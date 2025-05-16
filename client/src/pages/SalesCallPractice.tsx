import React, { useState } from "react";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalesCallSimulator from "@/components/practice/SalesCallSimulator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MicrophoneIcon, PlayIcon } from "@/assets/icons";

const PRACTICE_CATEGORIES = [
  { id: "objections", name: "Handling Objections" },
  { id: "closing", name: "Closing Techniques" },
  { id: "discovery", name: "Discovery Questions" }
];

// Simulating recordings data that would normally come from an API
const RECORDINGS = [
  { 
    id: "1", 
    title: "Budget Objection Practice", 
    date: "May 15, 2023", 
    category: "objections",
    duration: "1:42"
  },
  { 
    id: "2", 
    title: "Value Proposition Practice", 
    date: "May 12, 2023", 
    category: "closing",
    duration: "2:31"
  },
  { 
    id: "3", 
    title: "Needs Assessment", 
    date: "May 8, 2023", 
    category: "discovery",
    duration: "3:15"
  }
];

const SalesCallPractice: React.FC = () => {
  const [activeTab, setActiveTab] = useState("practice");

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <Link href="/" className="text-accent hover:text-accent-dark transition-colors">
          &larr; Back to Dashboard
        </Link>
        <h1 className="font-heading text-3xl font-bold text-primary mt-4 mb-2">
          Sales Call Practice
        </h1>
        <p className="text-neutral-medium">
          Practice handling different sales scenarios with stoic principles
        </p>
      </div>

      <Tabs defaultValue="practice" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="recordings">My Recordings</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="practice" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SalesCallSimulator />
            
            <Card>
              <CardHeader>
                <CardTitle>Practice Categories</CardTitle>
                <CardDescription>
                  Choose a specific area to focus your practice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {PRACTICE_CATEGORIES.map(category => (
                    <Button 
                      key={category.id}
                      variant="outline" 
                      className="w-full justify-start text-left"
                      onClick={() => {}}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary-light bg-opacity-10 text-primary flex items-center justify-center mr-3">
                        <MicrophoneIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-xs text-neutral-medium">10 scenarios</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Stoic Approach to Sales Calls</CardTitle>
              <CardDescription>
                Apply these principles to your practice sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-neutral-lightest p-4 rounded-lg">
                  <h3 className="font-heading font-bold mb-2">The Dichotomy of Control</h3>
                  <p className="text-sm text-neutral-medium">
                    Focus only on what you can control in the conversation: your questions, your responses, your presence. Let go of the outcome.
                  </p>
                </div>
                
                <div className="bg-neutral-lightest p-4 rounded-lg">
                  <h3 className="font-heading font-bold mb-2">Premeditatio Malorum</h3>
                  <p className="text-sm text-neutral-medium">
                    Anticipate objections in advance so you can respond with composure rather than surprise or defensiveness.
                  </p>
                </div>
                
                <div className="bg-neutral-lightest p-4 rounded-lg">
                  <h3 className="font-heading font-bold mb-2">Amor Fati</h3>
                  <p className="text-sm text-neutral-medium">
                    Whether the call goes well or poorly, embrace it as necessary for your growth. Every rejection is a teaching moment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recordings">
          <Card>
            <CardHeader>
              <CardTitle>My Practice Recordings</CardTitle>
              <CardDescription>
                Review and learn from your previous practice sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {RECORDINGS.length > 0 ? (
                <div className="space-y-4">
                  {RECORDINGS.map(recording => (
                    <div 
                      key={recording.id}
                      className="flex items-center justify-between border-b border-neutral-light pb-4 last:border-0"
                    >
                      <div className="flex items-center">
                        <Button size="sm" variant="outline" className="mr-4 rounded-full w-10 h-10 p-0">
                          <PlayIcon className="h-5 w-5" />
                        </Button>
                        <div>
                          <p className="font-medium">{recording.title}</p>
                          <p className="text-xs text-neutral-medium">
                            {recording.date} • {recording.duration}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-neutral-medium">
                        <span className="bg-secondary bg-opacity-30 text-accent-dark rounded-full px-3 py-1 text-xs">
                          {recording.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-lightest mb-4">
                    <MicrophoneIcon className="h-8 w-8 text-neutral-medium" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No recordings yet</h3>
                  <p className="text-neutral-medium text-sm mb-4">
                    Practice with the simulator to add recordings here
                  </p>
                  <Button onClick={() => setActiveTab("practice")}>
                    Start Practice
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Challenges</CardTitle>
              <CardDescription>
                Put your stoic sales practice to the test
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-6 border border-primary rounded-lg bg-primary bg-opacity-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-heading font-bold text-lg mb-1">The Dichotomy of Control Challenge</h3>
                      <p className="text-neutral-medium text-sm">
                        Complete 5 practice scenarios focusing only on what you can control in each conversation.
                      </p>
                    </div>
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-2">
                        <span className="text-sm font-bold">2/5</span>
                      </div>
                      <span className="text-sm">Completed</span>
                    </div>
                    <Button>
                      Continue Challenge
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 border border-neutral-light rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-heading font-bold text-lg mb-1">Amor Fati Challenge</h3>
                      <p className="text-neutral-medium text-sm">
                        Practice responding to rejections with acceptance and learning.
                      </p>
                    </div>
                    <span className="bg-neutral-light text-neutral-medium px-3 py-1 rounded-full text-xs font-medium">
                      Locked
                    </span>
                  </div>
                  <Button variant="outline" className="mt-6" disabled>
                    Start Challenge
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesCallPractice;
