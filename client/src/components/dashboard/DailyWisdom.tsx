import React, { useState } from "react";
import { BookmarkIcon } from "@/assets/icons";
import { getRandomQuote } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const DailyWisdom: React.FC = () => {
  const [quote, setQuote] = useState(getRandomQuote());
  const { toast } = useToast();
  
  const handleSaveQuote = () => {
    // In a real implementation, this would save to a user's favorites
    toast({
      title: "Quote Saved",
      description: "This quote has been added to your favorites.",
    });
  };
  
  return (
    <div 
      className="bg-cover bg-center rounded-xl overflow-hidden mb-10"
      style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
      }}
    >
      <div className="bg-primary bg-opacity-80 text-white p-8 md:p-10">
        <div className="max-w-2xl">
          <p className="text-secondary-light text-sm font-medium uppercase tracking-wider mb-3">DAILY WISDOM</p>
          <div className="relative">
            <span className="quote-mark">"</span>
            <p className="font-quote italic text-xl md:text-2xl leading-relaxed mb-6">{quote.text}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">— {quote.author}</p>
            <button 
              className="bg-accent bg-opacity-20 hover:bg-opacity-30 text-secondary-light rounded-lg px-4 py-2 text-sm flex items-center transition duration-200"
              onClick={handleSaveQuote}
            >
              <BookmarkIcon className="h-4 w-4 mr-2" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyWisdom;
