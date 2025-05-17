import React, { useState } from "react";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalesCallSimulator from "@/components/practice/SalesCallSimulator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MicrophoneIcon, PlayIcon } from "@/assets/icons";

const PRACTICE_CATEGORIES = [
  { id: "cold-outreach", name: "Cold Outreach", description: "Practice engaging prospects professionally in initial contacts" },
  { id: "objections", name: "Handling Objections", description: "Master the art of addressing prospect concerns with stoic principles" },
  { id: "closing", name: "Closing Techniques", description: "Learn to close deals effectively with patience and wisdom" }
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
  // Check URL for tab parameter
  const getInitialTab = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam && ["practice", "recordings", "breathwork", "challenges"].includes(tabParam)) {
        return tabParam;
      }
    }
    return "practice";
  };
  
  const [activeTab, setActiveTab] = useState(getInitialTab());
  
  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Update URL without full page reload
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.pushState({}, "", url.toString());
  };
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <Link href="/" className="text-accent hover:text-accent-dark transition-colors">
          &larr; Back to Dashboard
        </Link>
        <h1 className="font-heading text-3xl font-bold text-primary mt-4 mb-2">
          {activeTab === "breathwork" ? "Breathwork Practice" : 
           activeTab === "recordings" ? "My Call Recordings" :
           activeTab === "challenges" ? "Practice Challenges" :
           "Sales Call Practice"}
        </h1>
        <p className="text-neutral-medium">
          {activeTab === "breathwork" ? "Breathing exercises to improve focus, composure, and sales performance" : 
           activeTab === "recordings" ? "Review and learn from your previous practice sessions" :
           activeTab === "challenges" ? "Put your stoic sales practice to the test" :
           "Practice handling different sales scenarios with stoic principles"}
        </p>
      </div>

      <Tabs defaultValue="practice" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="recordings">My Recordings</TabsTrigger>
          <TabsTrigger value="breathwork">Breathwork</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="practice" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {selectedCategory ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{PRACTICE_CATEGORIES.find(c => c.id === selectedCategory)?.name} Practice</CardTitle>
                      <CardDescription>
                        Practice your {selectedCategory === "cold-outreach" ? "opening calls" : selectedCategory === "closing" ? "closing techniques" : "objection handling"}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(null)}>
                      Back to All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-neutral-lightest p-4 rounded-lg mb-4">
                    <h3 className="font-heading font-bold mb-2">
                      Stoic Principle: {
                        selectedCategory === "cold-outreach" 
                          ? "Beginner's Mind (Shoshin)" 
                          : selectedCategory === "objections" 
                            ? "The Dichotomy of Control" 
                            : "Amor Fati (Love of Fate)"
                      }
                    </h3>
                    <p className="text-sm text-neutral-medium">
                      {selectedCategory === "cold-outreach" 
                        ? "Approach each prospect with genuine curiosity and without assumptions. Your goal is to learn, not just to sell."
                        : selectedCategory === "objections" 
                          ? "Focus only on what you can control in the conversation: your questions, your responses, your presence. Let go of the outcome." 
                          : "Whether the prospect decides to buy or not, embrace it as necessary for your growth. Every interaction has value."
                      }
                    </p>
                  </div>
                  
                  <div className="space-y-4 mt-6">
                    <div 
                      className="p-4 border border-neutral-light rounded-lg hover:border-primary transition-colors cursor-pointer"
                      onClick={() => alert("This practice scenario will be available soon!")}
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center mr-3">
                          <MicrophoneIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            Practice Scenario: {
                              selectedCategory === "cold-outreach" 
                                ? "Initial Contact" 
                                : selectedCategory === "objections" 
                                  ? "Price Objection" 
                                  : "Closing the Deal"
                            }
                          </h4>
                          <p className="text-xs text-neutral-medium">30-second response practice</p>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-medium mb-4">
                        {selectedCategory === "cold-outreach" 
                          ? "Hi, this is [prospect name] speaking. I received your message, but I'm not sure how your solution would help our company. We're already using several tools."
                          : selectedCategory === "objections" 
                            ? "I appreciate the presentation, but honestly, your solution is priced way above what we were expecting to invest. Can you do better on the price?"
                            : "Everything sounds good, but I'm still not sure if we're ready to make a decision right now. What would be the next steps if we were to move forward?"
                        }
                      </p>
                      <Button className="w-full">
                        Start Practice
                      </Button>
                    </div>
                    
                    <div className="p-4 border border-neutral-light rounded-lg opacity-60">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-neutral-light text-neutral-medium flex items-center justify-center mr-3">
                            <MicrophoneIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">Additional Scenarios</h4>
                            <p className="text-xs text-neutral-medium">Coming soon</p>
                          </div>
                        </div>
                        <span className="bg-neutral-light text-neutral-medium px-3 py-1 rounded-full text-xs">
                          Locked
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <SalesCallSimulator />
            )}
            
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
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      className="w-full justify-start text-left"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary-light bg-opacity-10 text-primary flex items-center justify-center mr-3">
                        <MicrophoneIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-xs text-neutral-medium">{category.description}</p>
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

        <TabsContent value="breathwork">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Box Breathing */}
              <Card>
                <CardHeader>
                  <CardTitle>Box Breathing</CardTitle>
                  <CardDescription>
                    A powerful technique to calm your nervous system before important calls
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h3 className="font-heading font-bold text-lg mb-2">Benefits</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-neutral-medium mb-4">
                      <li>Reduces stress and anxiety before high-stakes calls</li>
                      <li>Improves focus and mental clarity</li>
                      <li>Activates your parasympathetic nervous system</li>
                      <li>Helps maintain composure during difficult conversations</li>
                    </ul>
                    
                    <h3 className="font-heading font-bold text-lg mb-2">Instructions</h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-neutral-medium">
                      <li>Sit with your back straight, feet flat on the floor</li>
                      <li>Inhale slowly through your nose for 4 seconds</li>
                      <li>Hold your breath for 4 seconds</li>
                      <li>Exhale completely through your mouth for 4 seconds</li>
                      <li>Hold your empty lungs for 4 seconds</li>
                      <li>Repeat 4 times before a call, or whenever needed</li>
                    </ol>
                  </div>
                  
                  <div className="bg-neutral-lightest p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Stoic Connection</h4>
                    <p className="text-sm text-neutral-medium">
                      "We suffer more in imagination than in reality." - Seneca<br/><br/>
                      Box breathing embodies the Stoic principle of bringing your attention to the present moment, separating yourself from anxious thoughts about the future or ruminations about the past.
                    </p>
                  </div>
                  
                  <div className="w-full h-40 mt-4 flex items-center justify-center rounded-lg overflow-hidden bg-primary bg-opacity-5 border border-primary border-opacity-30">
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 border-2 border-primary animate-pulse rounded-sm"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-neutral-medium">
                        Follow the<br/>square
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* 4-7-8 Technique */}
              <Card>
                <CardHeader>
                  <CardTitle>4-7-8 Breathing Technique</CardTitle>
                  <CardDescription>
                    Perfect for quick regulation during challenging sales conversations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h3 className="font-heading font-bold text-lg mb-2">Benefits</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-neutral-medium mb-4">
                      <li>Quickly regulates emotional responses during difficult objections</li>
                      <li>Reduces reactivity to allow more thoughtful responses</li>
                      <li>Can be done subtly during active conversations</li>
                      <li>Creates a pause that prevents impulsive responses</li>
                    </ul>
                    
                    <h3 className="font-heading font-bold text-lg mb-2">Instructions</h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-neutral-medium">
                      <li>Close your mouth and inhale quietly through your nose for 4 seconds</li>
                      <li>Hold your breath for 7 seconds</li>
                      <li>Exhale completely through your mouth for 8 seconds, making a "whoosh" sound</li>
                      <li>Repeat the cycle up to 4 times</li>
                    </ol>
                  </div>
                  
                  <div className="bg-neutral-lightest p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Stoic Connection</h4>
                    <p className="text-sm text-neutral-medium">
                      "Between stimulus and response, there is a space. In that space is our power to choose our response." - Viktor Frankl<br/><br/>
                      This breathing technique creates that essential space between a customer's objection and your response, allowing you to respond with wisdom rather than react with emotion.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Daily Breathing Practice</CardTitle>
                <CardDescription>
                  Develop resilience through consistent practice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-neutral-lightest rounded-lg">
                  <h3 className="font-heading font-bold text-lg mb-4">3-Minute Mindful Breathing</h3>
                  <p className="text-sm text-neutral-medium mb-4">
                    Begin your day with this simple practice to build mental fortitude for sales challenges:
                  </p>
                  
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li className="p-3 rounded bg-white">
                      <span className="font-medium">Minute 1: Awareness</span>
                      <p className="text-neutral-medium mt-1">
                        Simply notice your natural breathing without changing it. Where do you feel the breath most prominently? Notice any tension in your body.
                      </p>
                    </li>
                    <li className="p-3 rounded bg-white">
                      <span className="font-medium">Minute 2: Focused Attention</span>
                      <p className="text-neutral-medium mt-1">
                        Focus completely on the sensation of air entering and leaving your nostrils. When your mind wanders (it will), gently return to this sensation.
                      </p>
                    </li>
                    <li className="p-3 rounded bg-white">
                      <span className="font-medium">Minute 3: Expansive Awareness</span>
                      <p className="text-neutral-medium mt-1">
                        Expand your awareness to your whole body breathing. Feel the subtle movements throughout your torso. Set an intention for handling any sales challenges today with equanimity.
                      </p>
                    </li>
                  </ol>
                  
                  <div className="mt-6 text-center">
                    <Button>
                      Start Guided Practice (3 min)
                    </Button>
                    <p className="text-xs text-neutral-medium mt-2">
                      When you practice mindful breathing regularly, your capacity to stay composed during stressful sales interactions grows significantly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
                    <Button onClick={() => alert("This challenge will be available in the next update!")}>
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
