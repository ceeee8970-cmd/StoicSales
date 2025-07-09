import React, { useState } from 'react';
import { useLanguage, languageNames, Language } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Globe } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:bg-white/10 flex items-center gap-2"
      >
        <Globe className="h-4 w-4" />
        {languageNames[language]}
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute top-full mt-2 right-0 z-50 w-48 max-h-64 overflow-y-auto">
            <CardContent className="p-2">
              <div className="grid gap-1">
                {Object.entries(languageNames).map(([code, name]) => (
                  <Button
                    key={code}
                    variant={language === code ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleLanguageChange(code as Language)}
                    className="justify-start w-full text-left"
                  >
                    {name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;