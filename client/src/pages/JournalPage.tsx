import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, getRandomQuote } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { JournalIcon, CalendarIcon } from "@/assets/icons";

// Mock journal entries that would normally come from an API
const JOURNAL_ENTRIES = [
  {
    id: "1",
    date: new Date(2023, 4, 15),
    title: "Reflecting on a difficult client interaction",
    content: "Today I had a challenging call with a prospect who was very dismissive. Instead of getting defensive, I tried to practice the dichotomy of control by focusing only on my response, not their attitude. I found that by staying calm and genuinely curious, the conversation actually turned around halfway through."
  },
  {
    id: "2",
    date: new Date(2023, 4, 12),
    title: "Practicing premeditation before an important pitch",
    content: "I spent 10 minutes before my call with BigCorp visualizing what might go wrong and how I'd respond with composure. When they brought up concerns about implementation timelines, I was mentally prepared and didn't get flustered."
  },
  {
    id: "3",
    date: new Date(2023, 4, 8),
    title: "Amor Fati after losing a deal",
    content: "The FinTech deal I've been working on for 3 months fell through today. Though initially disappointed, I'm trying to embrace the Stoic concept of Amor Fati - loving what happens. What's the lesson here? I think I rushed the discovery process and missed some key decision criteria. This is an opportunity to refine my approach."
  }
];

const PROMPTS = [
  {
    title: "Reflect on Rejection",
    prompt: "Think about a recent rejection or 'no' you received from a prospect. How did you respond emotionally? How could the principle of Amor Fati (loving what happens) change your relationship with rejection?",
    quote: "The impediment to action advances action. What stands in the way becomes the way.",
    author: "Marcus Aurelius"
  },
  {
    title: "The Dichotomy of Control",
    prompt: "List three elements of your sales process that cause you stress. For each one, identify what aspects are within your control and what aspects aren't. How could you refocus your energy on the controllable elements?",
    quote: "Make the best use of what is in your power, and take the rest as it happens.",
    author: "Epictetus"
  },
  {
    title: "Premeditation of Difficulties",
    prompt: "Before your next important sales call, what are three challenging scenarios that might arise? How will you respond with composure rather than reaction?",
    quote: "He who suffers before it is necessary suffers more than is necessary.",
    author: "Seneca"
  }
];

const JournalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("entries");
  const [newEntryContent, setNewEntryContent] = useState("");
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null);
  const { toast } = useToast();
  
  const handleSaveEntry = () => {
    if (!newEntryTitle.trim() || !newEntryContent.trim()) {
      toast({
        title: "Cannot Save Entry",
        description: "Please add both a title and content for your journal entry.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real implementation, this would save to an API
    toast({
      title: "Journal Entry Saved",
      description: "Your reflection has been saved successfully."
    });
    
    // Reset form
    setNewEntryTitle("");
    setNewEntryContent("");
    setSelectedPrompt(null);
    
    // Switch to entries tab to see the "new" entry
    setActiveTab("entries");
  };
  
  const handleSelectPrompt = (index: number) => {
    setSelectedPrompt(index);
    setNewEntryTitle(PROMPTS[index].title);
    setActiveTab("new");
  };
  
  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <Link href="/" className="text-accent hover:text-accent-dark transition-colors">
          &larr; Back to Dashboard
        </Link>
        <h1 className="font-heading text-3xl font-bold text-primary mt-4 mb-2">
          Stoic Sales Journal
        </h1>
        <p className="text-neutral-medium">
          Reflect on your sales experiences through a stoic lens
        </p>
      </div>
      
      <Tabs defaultValue="entries" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="entries">My Entries</TabsTrigger>
            <TabsTrigger value="prompts">Prompts</TabsTrigger>
            <TabsTrigger value="new">New Entry</TabsTrigger>
          </TabsList>
          
          <Button 
            onClick={() => setActiveTab("new")}
            className="hidden md:flex"
          >
            <JournalIcon className="h-4 w-4 mr-2" />
            Write New Entry
          </Button>
        </div>
        
        <TabsContent value="entries">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {JOURNAL_ENTRIES.map(entry => (
              <Card key={entry.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="bg-secondary rounded-full px-3 py-1 text-xs text-primary font-medium">
                      {formatDate(entry.date)}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{entry.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-medium line-clamp-3">
                    {entry.content}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4"
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="prompts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROMPTS.map((prompt, index) => (
              <Card key={index} className="hover:border-accent transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">{prompt.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-neutral-lightest p-4 rounded-lg mb-4">
                    <p className="font-quote text-sm italic mb-2">"{prompt.quote}"</p>
                    <p className="text-right text-xs text-neutral-medium">— {prompt.author}</p>
                  </div>
                  <p className="text-sm text-neutral-medium mb-4 line-clamp-3">
                    {prompt.prompt}
                  </p>
                  <Button 
                    onClick={() => handleSelectPrompt(index)}
                    size="sm"
                  >
                    Use This Prompt
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>New Journal Entry</CardTitle>
              <CardDescription>
                Reflect on your sales experiences through stoic principles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="entry-title" className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <input
                    id="entry-title"
                    type="text"
                    className="w-full p-2 rounded-md border border-neutral-light focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Give your reflection a title..."
                    value={newEntryTitle}
                    onChange={(e) => setNewEntryTitle(e.target.value)}
                  />
                </div>
                
                {selectedPrompt !== null && (
                  <div className="bg-neutral-lightest p-4 rounded-lg">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <span className="inline-block text-4xl font-quote text-primary-light">"</span>
                      </div>
                      <div>
                        <p className="text-sm mb-2">{PROMPTS[selectedPrompt].prompt}</p>
                        <p className="text-xs text-neutral-medium italic">
                          — Inspired by {PROMPTS[selectedPrompt].author}'s stoic teaching
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <label htmlFor="entry-content" className="block text-sm font-medium mb-1">
                    Your Reflection
                  </label>
                  <Textarea
                    id="entry-content"
                    placeholder="Begin your reflection here..."
                    className="min-h-[200px]"
                    value={newEntryContent}
                    onChange={(e) => setNewEntryContent(e.target.value)}
                  />
                </div>
                
                <div className="pt-4 flex justify-between">
                  <div className="flex items-center text-neutral-medium text-sm">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>{formatDate(new Date())}</span>
                  </div>
                  
                  <Button onClick={handleSaveEntry}>
                    Save Entry
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

export default JournalPage;
