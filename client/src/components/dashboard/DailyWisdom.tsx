import React, { useState } from "react";
import { getRandomQuote } from "@/lib/utils";

const DailyWisdom: React.FC = () => {
  const [quote, setQuote] = useState(getRandomQuote());
  
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyWisdom;
