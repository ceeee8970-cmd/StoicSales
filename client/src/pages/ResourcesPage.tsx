import React, { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ResourcesIcon, BookIcon } from "@/assets/icons";
import { Search } from "lucide-react";
import ArticleView from "@/components/resources/ArticleView";
import StoicSellerEbook from "@/components/resources/StoicSellerEbook";

import EbookBanner from "@/components/dashboard/EbookBanner";

interface Resource {
  id: number;
  title: string;
  description: string;
  type: "article" | "book" | "video" | "podcast";
  url: string;
  author: string;
}

const RESOURCES: Resource[] = [
  // Ebook (featured)
  {
    id: 17,
    title: "The Stoic Seller Ebook",
    description: "Our comprehensive guide to applying Stoic philosophy to sales. Learn practical techniques for staying grounded, building authentic connections, and finding meaning in your work.",
    type: "book",
    url: "/src/assets/ebook/the-stoic-seller-ebook.html",
    author: "The Stoic Seller Team"
  },
  
  // Community
  {
    id: 16,
    title: "The Stoic Seller LinkedIn Group",
    description: "Join our weekly discussions on applying Stoic principles to sales challenges. Network with other sales professionals who use philosophy to improve their approach.",
    type: "article",
    url: "https://www.linkedin.com/groups/10116099/",
    author: "The Stoic Seller Team"
  },
  
  // Classic Stoic Texts
  {
    id: 1,
    title: "Meditations",
    description: "Marcus Aurelius's private notes to himself, now considered one of the most significant works of ancient Stoic philosophy.",
    type: "book",
    url: "https://www.amazon.com/Meditations-New-Translation-Marcus-Aurelius/dp/0812968255",
    author: "Marcus Aurelius"
  },
  {
    id: 2,
    title: "Letters from a Stoic",
    description: "Collection of moral letters written by Seneca to improve the character of his friend Lucilius.",
    type: "book",
    url: "https://www.amazon.com/Letters-Penguin-Classics-Lucius-Annaeus/dp/0140442103",
    author: "Seneca"
  },
  {
    id: 3,
    title: "Discourses and Selected Writings",
    description: "Epictetus's teachings on Stoic philosophy that emphasize self-control as a means to overcome destructive emotions.",
    type: "book",
    url: "https://www.amazon.com/Discourses-Selected-Writings-Penguin-Classics/dp/0140449469",
    author: "Epictetus"
  },
  
  // Modern Stoic Books
  {
    id: 4,
    title: "The Obstacle Is the Way",
    description: "Modern guide on how to apply Stoic philosophy to overcome challenges in everyday life and business.",
    type: "book",
    url: "https://www.amazon.com/Obstacle-Way-Timeless-Turning-Triumph/dp/1591846358",
    author: "Ryan Holiday"
  },
  {
    id: 5,
    title: "How to Think Like a Roman Emperor",
    description: "Modern retelling of the life of Marcus Aurelius and how to apply his stoic principles to modern challenges.",
    type: "book",
    url: "https://www.amazon.com/How-Think-Like-Roman-Emperor/dp/1250196620",
    author: "Donald Robertson"
  },
  {
    id: 6,
    title: "A Guide to the Good Life: The Ancient Art of Stoic Joy",
    description: "A practical guide to using ancient Stoic techniques and wisdom to find tranquility and joy in modern life.",
    type: "book",
    url: "https://www.amazon.com/Guide-Good-Life-Ancient-Stoic/dp/0195374614",
    author: "William B. Irvine"
  },
  
  // Podcasts
  {
    id: 7,
    title: "The Daily Stoic Podcast",
    description: "Daily podcast featuring short lessons on Stoic wisdom and how to apply it to modern life.",
    type: "podcast",
    url: "https://dailystoic.com/podcast/",
    author: "Ryan Holiday"
  },
  {
    id: 8,
    title: "Stoic Solutions Podcast",
    description: "Practical wisdom from Stoic philosophy for everyday challenges, including discussions with Stoicism experts.",
    type: "podcast",
    url: "https://anchor.fm/stoicsolutions",
    author: "Justin Vacula"
  },
  {
    id: 9,
    title: "Practical Stoicism",
    description: "Explores practical applications of Stoic philosophy, with episodes on specific techniques and exercises.",
    type: "podcast",
    url: "https://anchor.fm/practicalstoicism",
    author: "Simon Drew"
  },
  
  // Articles - Original Content
  {
    id: 10,
    title: "The Stoic Seller: Applying Ancient Wisdom to Modern Sales",
    description: "An in-depth exploration of how the four Stoic virtues can be applied directly to sales challenges.",
    type: "article",
    url: "#stoic-seller-article",
    author: "The Stoic Seller Team"
  },
  {
    id: 11,
    title: "Handling Rejection Like a Stoic: A Sales Professional's Guide",
    description: "Learn practical techniques for developing resilience to rejection using Stoic principles.",
    type: "article",
    url: "#rejection-resilience",
    author: "The Stoic Seller Team"
  },
  {
    id: 12,
    title: "The Dichotomy of Control in Sales: Focus on What You Can Change",
    description: "How to identify what's in your control during sales processes and let go of the rest.",
    type: "article",
    url: "#dichotomy-of-control",
    author: "The Stoic Seller Team"
  },
  
  // Videos - From Reliable Sources
  {
    id: 13,
    title: "Ryan Holiday: Stoicism in Business and Sales",
    description: "Ryan Holiday discusses how Stoic principles like focusing on what you can control apply to modern business challenges.",
    type: "video",
    url: "https://www.youtube.com/watch?v=gIP9_j6eTnA",
    author: "London Real"
  },
  {
    id: 14,
    title: "Stoicism & The Art of Not Caring",
    description: "TED Talk on applying Stoic philosophy to overcome anxiety about outcomes beyond your control.",
    type: "video",
    url: "https://www.youtube.com/watch?v=uLOB6hj3M_Q",
    author: "William Irvine | TEDxIthacaCollege"
  },
  {
    id: 15,
    title: "The Philosophy of Stoicism",
    description: "Animated introduction to Stoic philosophy and its practical applications in modern life.",
    type: "video",
    url: "https://www.youtube.com/watch?v=R9OCA6UFE-0",
    author: "TED-Ed"
  }
];

const ResourceTypeIcon = ({ type }: { type: Resource['type'] }) => {
  let icon;
  let bgColor = "bg-primary-light";
  
  switch (type) {
    case "book":
      icon = <BookIcon className="h-5 w-5" />;
      bgColor = "bg-emerald-100";
      break;
    case "podcast":
      icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>;
      bgColor = "bg-blue-100";
      break;
    case "video":
      icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>;
      bgColor = "bg-red-100";
      break;
    case "article":
      icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>;
      bgColor = "bg-purple-100";
      break;
    default:
      icon = <ResourcesIcon className="h-5 w-5" />;
      break;
  }
  
  return (
    <div className={`w-10 h-10 rounded-full ${bgColor} text-primary flex items-center justify-center mr-3`}>
      {icon}
    </div>
  );
};

const ResourcesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [viewingArticle, setViewingArticle] = useState<string | null>(null);
  const [viewingEbook, setViewingEbook] = useState<boolean>(false);

  
  // Filter resources based on search term and active tab
  const filteredResources = RESOURCES.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesTab = activeTab === "all" || resource.type === activeTab;
    
    return matchesSearch && matchesTab;
  });
  
  const resourceStats = {
    all: RESOURCES.length,
    book: RESOURCES.filter(r => r.type === "book").length,
    article: RESOURCES.filter(r => r.type === "article").length,
    podcast: RESOURCES.filter(r => r.type === "podcast").length,
    video: RESOURCES.filter(r => r.type === "video").length
  };
  
  const handleResourceClick = (resource: Resource) => {
    // If it's one of our internal articles, show the article view
    if (resource.url.startsWith('#')) {
      setViewingArticle(resource.url.substring(1)); // Remove the # prefix
    } 
    // If it's our ebook, show the ebook viewer
    else if (resource.id === 17) {
      setViewingEbook(true);
    }
    else {
      // Otherwise, open the external URL
      window.open(resource.url, "_blank");
    }
  };
  
  return (
    <div className="p-6 md:p-10">
      {viewingArticle ? (
        <>
          <div className="mb-8">
            <Button
              variant="ghost"
              className="text-accent hover:text-accent-dark transition-colors"
              onClick={() => setViewingArticle(null)}
            >
              &larr; Back to Resources
            </Button>
          </div>
          <ArticleView articleId={viewingArticle} onClose={() => setViewingArticle(null)} />
        </>
      ) : viewingEbook ? (
        <StoicSellerEbook onClose={() => setViewingEbook(false)} />
      ) : (
        <>
          <div className="mb-8">
            <Link href="/" className="text-accent hover:text-accent-dark transition-colors">
              &larr; Back to Dashboard
            </Link>
            <h1 className="font-heading text-3xl font-bold text-primary mt-4 mb-2">
              Stoic Resources
            </h1>
            <p className="text-neutral-medium">
              Explore these resources to deepen your understanding of Stoic philosophy and its application to sales
            </p>
          </div>
          
          {/* Featured Ebook Banner */}
          <EbookBanner />
          
          {/* Search and filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-medium" />
                </div>
                <Input
                  type="text"
                  placeholder="Search resources..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All ({resourceStats.all})</TabsTrigger>
                <TabsTrigger value="book">Books ({resourceStats.book})</TabsTrigger>
                <TabsTrigger value="article">Articles ({resourceStats.article})</TabsTrigger>
                <TabsTrigger value="podcast">Podcasts ({resourceStats.podcast})</TabsTrigger>
                <TabsTrigger value="video">Videos ({resourceStats.video})</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-6">
            {filteredResources.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-neutral-medium">No resources found matching your search.</p>
                <Button variant="outline" className="mt-4" onClick={() => { setSearchTerm(""); setActiveTab("all"); }}>
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map(resource => (
                  <Card key={resource.id} className="overflow-hidden h-full flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex items-center mb-2">
                        <ResourceTypeIcon type={resource.type} />
                        <div>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                          <p className="text-xs text-neutral-medium">{resource.author}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3 flex-grow">
                      <p className="text-neutral-medium text-sm mb-3">
                        {resource.description}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="flex items-center w-full">
                        <span className={`
                          rounded-full px-3 py-1 text-xs mr-auto
                          ${resource.type === "book" ? "bg-emerald-100 text-emerald-800" : ""}
                          ${resource.type === "article" ? "bg-purple-100 text-purple-800" : ""}
                          ${resource.type === "podcast" ? "bg-blue-100 text-blue-800" : ""}
                          ${resource.type === "video" ? "bg-red-100 text-red-800" : ""}
                        `}>
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleResourceClick(resource)}
                        >
                          {resource.url.startsWith('#') ? 'Read Article' : 'Explore'}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            <Card className="mt-10">
              <CardHeader>
                <CardTitle>Want to suggest a resource?</CardTitle>
                <CardDescription>
                  Help improve our library of Stoic sales resources by recommending your favorites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button>
                  Suggest a Resource
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default ResourcesPage;