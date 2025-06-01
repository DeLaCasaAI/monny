
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { BudgetTypeSelector } from '@/components/BudgetTypeSelector';
import { BudgetWizard } from '@/components/BudgetWizard';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Budget } from '@/types/budget';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'wizard'>('home');
  const [selectedBudgetType, setSelectedBudgetType] = useState<'business' | 'trip'>('business');
  const [budgets, setBudgets] = useLocalStorage<Budget[]>('monny-budgets', []);

  const handleBudgetTypeSelect = (type: 'business' | 'trip') => {
    setSelectedBudgetType(type);
    setCurrentView('wizard');
  };

  const handleBudgetComplete = (budget: Budget) => {
    setBudgets([...budgets, budget]);
    setCurrentView('home');
    console.log('Budget saved:', budget);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        
        <main className="py-8">
          {currentView === 'home' && (
            <BudgetTypeSelector onSelect={handleBudgetTypeSelect} />
          )}
          
          {currentView === 'wizard' && (
            <BudgetWizard
              budgetType={selectedBudgetType}
              onComplete={handleBudgetComplete}
              onBack={handleBackToHome}
            />
          )}
        </main>
      </div>
    </LanguageProvider>
  );
};

export default Index;
