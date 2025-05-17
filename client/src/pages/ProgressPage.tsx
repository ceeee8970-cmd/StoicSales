import React from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Progress } from "@/components/ui/progress";

const ProgressPage: React.FC = () => {
  // Module progression data
  const moduleProgressData = [
    { name: 'Module 1', completed: 100, total: 100 },
    { name: 'Module 2', completed: 65, total: 100 },
    { name: 'Module 3', completed: 30, total: 100 },
    { name: 'Module 4', completed: 10, total: 100 },
    { name: 'Module 5', completed: 0, total: 100 },
    { name: 'Module 6', completed: 0, total: 100 },
  ];
  
  // Practice sessions data
  const practiceSessionsData = [
    { name: 'Week 1', coldOutreach: 4, objectionHandling: 2, closing: 1 },
    { name: 'Week 2', coldOutreach: 3, objectionHandling: 5, closing: 2 },
    { name: 'Week 3', coldOutreach: 2, objectionHandling: 4, closing: 6 },
    { name: 'Week 4', coldOutreach: 5, objectionHandling: 3, closing: 4 },
  ];
  
  // Resources completed data
  const resourcesCompletedData = [
    { name: 'Articles', value: 7, total: 12 },
    { name: 'Books', value: 2, total: 6 },
    { name: 'Videos', value: 4, total: 5 },
    { name: 'Podcasts', value: 3, total: 9 },
  ];
  
  // For the pie chart
  const COLORS = ['#40514e', '#c07a5d', '#96b4b1', '#506c6a'];
  
  // Daily activity data
  const dailyActivityData = [
    { name: 'Mon', practice: 2, resources: 3, journal: 1 },
    { name: 'Tue', practice: 3, resources: 1, journal: 2 },
    { name: 'Wed', practice: 1, resources: 4, journal: 0 },
    { name: 'Thu', practice: 4, resources: 2, journal: 1 },
    { name: 'Fri', practice: 2, resources: 0, journal: 3 },
    { name: 'Sat', practice: 0, resources: 5, journal: 2 },
    { name: 'Sun', practice: 1, resources: 2, journal: 4 },
  ];
  
  // Calculate total progress
  const totalCompleted = moduleProgressData.reduce((acc, curr) => acc + curr.completed, 0);
  const totalPossible = moduleProgressData.reduce((acc, curr) => acc + curr.total, 0);
  const overallProgress = Math.round((totalCompleted / totalPossible) * 100);
  
  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <Link href="/" className="text-accent hover:text-accent-dark transition-colors">
          &larr; Back to Dashboard
        </Link>
        <h1 className="font-heading text-3xl font-bold text-primary mt-4 mb-2">
          Your Progress
        </h1>
        <p className="text-neutral-medium">
          Track your learning journey and see how far you've come
        </p>
      </div>
      
      {/* Overall progress card */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>
              Your journey through the Stoic Seller curriculum
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3">
                <div className="text-center mb-4">
                  <span className="text-4xl font-bold text-primary">{overallProgress}%</span>
                  <p className="text-neutral-medium">Complete</p>
                </div>
                <Progress value={overallProgress} className="h-6 bg-neutral-light" />
              </div>
              
              <div className="w-full md:w-2/3 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={moduleProgressData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Completed']}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Legend />
                    <Bar dataKey="completed" fill="#c07a5d" name="Completion %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs for different progress metrics */}
      <Tabs defaultValue="activity">
        <TabsList className="mb-6">
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="practice">Practice Sessions</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Daily Activity</CardTitle>
              <CardDescription>
                Your learning activities over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dailyActivityData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="practice" stroke="#40514e" name="Practice Sessions" />
                    <Line type="monotone" dataKey="resources" stroke="#c07a5d" name="Resources Viewed" />
                    <Line type="monotone" dataKey="journal" stroke="#96b4b1" name="Journal Entries" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-neutral-bg p-4 rounded-lg text-center">
                  <p className="text-sm text-neutral-medium mb-1">Total Practice Sessions</p>
                  <p className="text-2xl font-bold text-primary">13</p>
                </div>
                <div className="bg-neutral-bg p-4 rounded-lg text-center">
                  <p className="text-sm text-neutral-medium mb-1">Resources Completed</p>
                  <p className="text-2xl font-bold text-primary">16</p>
                </div>
                <div className="bg-neutral-bg p-4 rounded-lg text-center">
                  <p className="text-sm text-neutral-medium mb-1">Journal Entries</p>
                  <p className="text-2xl font-bold text-primary">13</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="practice">
          <Card>
            <CardHeader>
              <CardTitle>Practice Session History</CardTitle>
              <CardDescription>
                Your practice activity across different skill areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={practiceSessionsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="coldOutreach" fill="#40514e" name="Cold Outreach" />
                    <Bar dataKey="objectionHandling" fill="#c07a5d" name="Objection Handling" />
                    <Bar dataKey="closing" fill="#96b4b1" name="Closing" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-8">
                <h3 className="font-heading text-lg font-bold mb-4">Skill Breakdown</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Cold Outreach</span>
                      <span className="text-sm font-medium">14 sessions</span>
                    </div>
                    <Progress value={70} className="h-2 bg-neutral-light" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Objection Handling</span>
                      <span className="text-sm font-medium">14 sessions</span>
                    </div>
                    <Progress value={70} className="h-2 bg-neutral-light" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Closing</span>
                      <span className="text-sm font-medium">13 sessions</span>
                    </div>
                    <Progress value={65} className="h-2 bg-neutral-light" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Resources Completed</CardTitle>
              <CardDescription>
                Track your progress through recommended resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={resourcesCompletedData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {resourcesCompletedData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name, props) => [`${value} of ${props.payload.total}`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-6">
                  <h3 className="font-heading text-lg font-bold">Resources By Type</h3>
                  
                  {resourcesCompletedData.map((resource, index) => (
                    <div key={resource.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{resource.name}</span>
                        <span className="text-sm font-medium">{resource.value} of {resource.total}</span>
                      </div>
                      <Progress value={(resource.value / resource.total) * 100} className="h-2 bg-neutral-light" />
                    </div>
                  ))}
                  
                  <div className="bg-neutral-bg p-4 rounded-lg mt-6">
                    <h4 className="font-medium mb-2">Next Recommended Resources</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center">
                        <span className="w-3 h-3 bg-accent rounded-full mr-2"></span>
                        <span>Meditations by Marcus Aurelius (Book)</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-3 h-3 bg-accent rounded-full mr-2"></span>
                        <span>Daily Stoic Podcast (Podcast)</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-3 h-3 bg-accent rounded-full mr-2"></span>
                        <span>The Stoic Seller Ebook (Ebook)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Stoic Wisdom Progress */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Wisdom Point Milestones</CardTitle>
          <CardDescription>
            Track your progress through wisdom levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-20 bg-neutral-lightest rounded-lg">
            <div className="absolute inset-0 px-4 flex items-center space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white">
                  <span className="font-bold">✓</span>
                </div>
                <span className="text-xs mt-1">Beginner</span>
              </div>
              <div className="flex-1 h-1 bg-accent"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white">
                  <span className="font-bold">✓</span>
                </div>
                <span className="text-xs mt-1">Novice</span>
              </div>
              <div className="flex-1 h-1 bg-neutral-light"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-neutral-light flex items-center justify-center">
                  <span className="font-bold">3</span>
                </div>
                <span className="text-xs mt-1">Student</span>
              </div>
              <div className="flex-1 h-1 bg-neutral-light"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-neutral-light flex items-center justify-center">
                  <span className="font-bold">4</span>
                </div>
                <span className="text-xs mt-1">Adept</span>
              </div>
              <div className="flex-1 h-1 bg-neutral-light"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-neutral-light flex items-center justify-center">
                  <span className="font-bold">5</span>
                </div>
                <span className="text-xs mt-1">Master</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-neutral-lightest p-4 rounded-lg">
            <h3 className="font-medium mb-2">Your Current Level: Novice</h3>
            <p className="text-sm text-neutral-medium">You're making great progress on your stoic journey. Keep practicing the principles and applying them to your sales approach.</p>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>42 Wisdom Points</span>
                <span>100 points to next level</span>
              </div>
              <Progress value={42} className="h-2 bg-neutral-light" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressPage;