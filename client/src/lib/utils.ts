import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomQuote(): { text: string; author: string } {
  const quotes = [
    {
      text: "Some things are up to us and some things are not. It is only after you have faced up to this fundamental rule and learned to distinguish between what you can and can't control that inner tranquility becomes possible.",
      author: "Epictetus"
    },
    {
      text: "The happiness of your life depends upon the quality of your thoughts.",
      author: "Marcus Aurelius"
    },
    {
      text: "It's not what happens to you, but how you react to it that matters.",
      author: "Epictetus"
    },
    {
      text: "You have power over your mind - not outside events. Realize this, and you will find strength.",
      author: "Marcus Aurelius"
    },
    {
      text: "We suffer more often in imagination than in reality.",
      author: "Seneca"
    },
    {
      text: "The obstacle is the way.",
      author: "Marcus Aurelius"
    },
    {
      text: "No person has the power to have everything they want, but it is in their power not to want what they don't have, and to cheerfully put to good use what they do have.",
      author: "Seneca"
    },
    {
      text: "He who fears death will never do anything worthy of a man who is alive.",
      author: "Seneca"
    },
    {
      text: "If you want to improve, be content to be thought foolish and stupid.",
      author: "Epictetus"
    },
    {
      text: "A blazing fire makes flame and brightness out of everything that is thrown into it.",
      author: "Marcus Aurelius"
    }
  ];
  
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function getModuleProgress(moduleId: number): {
  completed: number;
  total: number;
  status: "not-started" | "in-progress" | "completed";
} {
  // In a real implementation, this would fetch from an API
  const modules = [
    { id: 1, completed: 4, total: 4, status: "completed" },
    { id: 2, completed: 2, total: 4, status: "in-progress" },
    { id: 3, completed: 0, total: 4, status: "not-started" },
    { id: 4, completed: 0, total: 4, status: "not-started" },
    { id: 5, completed: 0, total: 4, status: "not-started" },
    { id: 6, completed: 0, total: 4, status: "not-started" },
  ];
  
  const module = modules.find(m => m.id === moduleId);
  
  if (!module) {
    return { completed: 0, total: 4, status: "not-started" };
  }
  
  return {
    completed: module.completed,
    total: module.total,
    status: module.status
  };
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
