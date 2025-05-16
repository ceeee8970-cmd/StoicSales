import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "@/assets/icons";
import { useToast } from "@/hooks/use-toast";

interface JournalPrompt {
  id: string;
  quote: {
    text: string;
    author: string;
  };
  prompt: string;
}

const prompts: JournalPrompt[] = [
  {
    id: "1",
    quote: {
      text: "If you want to improve, be content to be thought foolish and stupid.",
      author: "Epictetus"
    },
    prompt: "Reflect on a recent sales call where you felt uncomfortable asking questions because you didn't want to appear uninformed. How might embracing the beginner's mindset have changed the conversation?"
  },
  {
    id: "2",
    quote: {
      text: "Make the best use of what is in your power, and take the rest as it happens.",
      author: "Epictetus"
    },
    prompt: "Think about a deal that fell through recently. What aspects were in your control, and what aspects weren't? How could you adjust your approach next time?"
  },
  {
    id: "3",
    quote: {
      text: "How much more grievous are the consequences of anger than the causes of it.",
      author: "Marcus Aurelius"
    },
    prompt: "Recall a time when you reacted emotionally to a difficult client or prospect. How did that reaction affect the outcome? How might you respond differently now?"
  }
];

const JournalEntry: React.FC = () => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [journalEntry, setJournalEntry] = useState("");
  const [savedEntries, setSavedEntries] = useState<Record<string, string>>({});
  const { toast } = useToast();
  
  const currentPrompt = prompts[currentPromptIndex];
  
  const handlePreviousPrompt = () => {
    if (currentPromptIndex > 0) {
      // Save current entry before switching
      saveCurrentEntry();
      setCurrentPromptIndex(currentPromptIndex - 1);
      // Restore previous entry if it exists
      setJournalEntry(savedEntries[prompts[currentPromptIndex - 1].id] || "");
    }
  };
  
  const handleNextPrompt = () => {
    if (currentPromptIndex < prompts.length - 1) {
      // Save current entry before switching
      saveCurrentEntry();
      setCurrentPromptIndex(currentPromptIndex + 1);
      // Restore next entry if it exists
      setJournalEntry(savedEntries[prompts[currentPromptIndex + 1].id] || "");
    }
  };
  
  const saveCurrentEntry = () => {
    if (journalEntry.trim()) {
      setSavedEntries(prev => ({
        ...prev,
        [currentPrompt.id]: journalEntry
      }));
    }
  };
  
  const handleSaveEntry = () => {
    saveCurrentEntry();
    toast({
      title: "Journal Entry Saved",
      description: "Your reflection has been saved successfully.",
    });
  };
  
  return (
    <Card className="practice-card bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-light">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-heading text-lg font-bold">Journal Reflection</h3>
          <div className="bg-secondary bg-opacity-30 text-accent-dark rounded-full px-3 py-1 text-xs font-medium">
            Reflect
          </div>
        </div>
        
        <p className="text-neutral-medium text-sm mb-5">
          Use journaling to apply stoic principles to your recent sales experiences.
        </p>
        
        {/* Journal Interface */}
        <div className="bg-neutral-lightest rounded-lg p-5 mb-5">
          <h4 className="font-medium mb-3 text-primary">Today's Prompt</h4>
          <div className="bg-white p-4 rounded-lg border border-neutral-light mb-4">
            <p className="text-sm italic mb-2">
              "{currentPrompt.quote.text}"
            </p>
            <p className="text-sm text-neutral-medium mb-1">
              — {currentPrompt.quote.author}
            </p>
            <p className="text-sm mt-3">
              {currentPrompt.prompt}
            </p>
          </div>
          
          <Textarea
            className="w-full p-3 border border-neutral-light rounded-lg h-28 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Begin your reflection here..."
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPrompt}
            disabled={currentPromptIndex === 0}
            className="flex items-center"
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button 
            onClick={handleSaveEntry}
            disabled={!journalEntry.trim()}
          >
            Save Entry
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPrompt}
            disabled={currentPromptIndex === prompts.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default JournalEntry;
