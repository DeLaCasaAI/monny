
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { BudgetTypeSelector } from '@/components/BudgetTypeSelector';
import { BudgetWizard } from '@/components/BudgetWizard';
import { BudgetList } from '@/components/BudgetList';
import { BudgetDetailsView } from '@/components/BudgetDetailsView';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Budget } from '@/types/budget';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'selector' | 'wizard' | 'view'>('home');
  const [selectedBudgetType, setSelectedBudgetType] = useState<'business' | 'trip' | 'scratch'>('business');
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [budgets, setBudgets] = useLocalStorage<Budget[]>('monny-budgets', []);

  const handleCreateNew = () => {
    setCurrentView('selector');
  };

  const handleBudgetTypeSelect = (type: 'business' | 'trip' | 'scratch') => {
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
    setSelectedBudget(null);
  };

  const handleBackToSelector = () => {
    setCurrentView('selector');
  };

  const handleDeleteBudget = (budgetId: string) => {
    setBudgets(budgets.filter(budget => budget.id !== budgetId));
  };

  const handleViewBudget = (budget: Budget) => {
    setSelectedBudget(budget);
    setCurrentView('view');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        
        <main className="py-8">
          {currentView === 'home' && (
            <BudgetList 
              budgets={budgets} 
              onCreateNew={handleCreateNew}
              onDeleteBudget={handleDeleteBudget}
              onViewBudget={handleViewBudget}
            />
          )}
          
          {currentView === 'selector' && (
            <BudgetTypeSelector 
              onSelect={handleBudgetTypeSelect}
              onBack={handleBackToHome}
            />
          )}
          
          {currentView === 'wizard' && (
            <BudgetWizard
              budgetType={selectedBudgetType}
              onComplete={handleBudgetComplete}
              onBack={selectedBudgetType === 'scratch' ? handleBackToSelector : handleBackToSelector}
            />
          )}
          
          {currentView === 'view' && selectedBudget && (
            <BudgetDetailsView
              budget={selectedBudget}
              onBack={handleBackToHome}
            />
          )}
        </main>
      </div>
    </LanguageProvider>
  );
};

export default Index;
