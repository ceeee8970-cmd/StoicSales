import React from 'react';
import { Button } from '@/components/ui/button';

interface EbookViewerProps {
  onClose: () => void;
}

const EbookViewer: React.FC<EbookViewerProps> = ({ onClose }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="text-accent hover:text-accent-dark transition-colors"
          onClick={onClose}
        >
          &larr; Back to Resources
        </Button>
        <h1 className="font-heading text-3xl font-bold text-primary mt-4 mb-2">
          The Stoic Seller Ebook
        </h1>
        <p className="text-neutral-medium mb-4">
          A comprehensive guide to applying Stoic philosophy to sales mastery
        </p>
      </div>
      
      <div className="w-full flex-grow bg-white rounded-lg shadow-lg overflow-hidden">
        <iframe 
          src="/src/assets/ebook/the-stoic-seller-ebook.html" 
          className="w-full h-[800px] border-0"
          title="The Stoic Seller Ebook"
        />
      </div>
    </div>
  );
};

export default EbookViewer;