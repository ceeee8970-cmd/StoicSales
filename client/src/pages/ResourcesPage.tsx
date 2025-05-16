import React from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResourcesIcon, BookIcon } from "@/assets/icons";

interface Resource {
  id: number;
  title: string;
  description: string;
  type: "article" | "book" | "video" | "podcast";
  url: string;
  author: string;
}

const RESOURCES: Resource[] = [
  {
    id: 1,
    title: "Meditations",
    description: "Marcus Aurelius's private notes to himself, now considered one of the most significant works of ancient Stoic philosophy.",
    type: "book",
    url: "#",
    author: "Marcus Aurelius"
  },
  {
    id: 2,
    title: "Letters from a Stoic",
    description: "Collection of moral letters written by Seneca to improve the character of his friend Lucilius.",
    type: "book",
    url: "#",
    author: "Seneca"
  },
  {
    id: 3,
    title: "The Obstacle Is the Way",
    description: "Modern guide on how to apply Stoic philosophy to overcome challenges in everyday life and business.",
    type: "book",
    url: "#",
    author: "Ryan Holiday"
  },
  {
    id: 4,
    title: "How to Think Like a Roman Emperor",
    description: "Modern retelling of the life of Marcus Aurelius and how to apply his stoic principles to modern challenges.",
    type: "book",
    url: "#",
    author: "Donald Robertson"
  },
  {
    id: 5,
    title: "The Daily Stoic Podcast",
    description: "Daily podcast featuring short lessons on Stoic wisdom and how to apply it to modern life.",
    type: "podcast",
    url: "#",
    author: "Ryan Holiday"
  },
  {
    id: 6,
    title: "Stoicism and Sales: The Unexpected Connection",
    description: "Article exploring how Stoic principles can transform your sales approach and resilience.",
    type: "article",
    url: "#",
    author: "Marcus Stoic Seller"
  }
];

const ResourceTypeIcon = ({ type }: { type: Resource['type'] }) => {
  switch (type) {
    case "book":
      return (
        <div className="w-10 h-10 rounded-full bg-primary-light bg-opacity-10 text-primary flex items-center justify-center mr-3">
          <BookIcon className="h-5 w-5" />
        </div>
      );
    default:
      return (
        <div className="w-10 h-10 rounded-full bg-primary-light bg-opacity-10 text-primary flex items-center justify-center mr-3">
          <ResourcesIcon className="h-5 w-5" />
        </div>
      );
  }
};

const ResourcesPage: React.FC = () => {
  return (
    <div className="p-6 md:p-10">
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

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESOURCES.map(resource => (
            <Card key={resource.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center mb-2">
                  <ResourceTypeIcon type={resource.type} />
                  <div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <p className="text-xs text-neutral-medium">{resource.author}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-medium text-sm mb-4">
                  {resource.description}
                </p>
                <div className="flex items-center">
                  <span className="bg-secondary bg-opacity-30 text-accent-dark rounded-full px-3 py-1 text-xs mr-auto">
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(resource.url, "_blank")}
                  >
                    Explore
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
    </div>
  );
};

export default ResourcesPage;