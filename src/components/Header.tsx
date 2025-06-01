
import React from 'react';
import { Calculator } from 'lucide-react';
import { HamburgerMenu } from './HamburgerMenu';
import { useLanguage } from '@/contexts/LanguageContext';

export const Header: React.FC = () => {
  const { t } = useLanguage();

  return (
    <header className="bg-background shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.href = '/'}>
              <div className="bg-blue-600 p-2 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {t('app.title')} - By{' '}
                  <a 
                    href="https://delacasa.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    DeLaCasa
                  </a>
                </h1>
                <p className="text-sm text-muted-foreground">{t('app.subtitle')}</p>
              </div>
            </div>
          </div>
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
};
