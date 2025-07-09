import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookIcon } from "@/assets/icons";
import { useLanguage } from "@/lib/i18n";

const EbookBanner: React.FC = () => {
  const { t } = useLanguage();
  const handlePurchase = () => {
    window.location.href = '/ebook-checkout';
  };

  return (
    <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20 mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center">
              <BookIcon className="w-8 h-8 text-accent" />
            </div>
          </div>
          
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t.ebook.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {t.ebook.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {t.ebook.features.modules}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {t.ebook.features.scripts}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {t.ebook.features.exercises}
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0 text-center">
            <div className="mb-3">
              <div className="text-2xl font-bold text-accent">{t.ebook.price}</div>
              <div className="text-sm text-gray-500">One-time purchase</div>
            </div>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent-dark text-white font-semibold px-8"
              onClick={handlePurchase}
            >
              {t.ebook.purchaseButton}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EbookBanner;