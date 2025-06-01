
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { BudgetTypeSelector } from '@/components/BudgetTypeSelector';
import { BudgetWizard } from '@/components/BudgetWizard';
import { BudgetList } from '@/components/BudgetList';
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
            <div className="max-w-4xl mx-auto p-6">
              <div className="mb-6">
                <button 
                  onClick={handleBackToHome}
                  className="text-blue-600 hover:text-blue-800 mb-4"
                >
                  ← Back to budgets
                </button>
                <h1 className="text-3xl font-bold">{selectedBudget.name}</h1>
              </div>
              {/* Budget view content will be implemented later */}
              <div className="bg-white rounded-lg p-6 shadow">
                <p className="text-gray-600">Budget details view - coming soon</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </LanguageProvider>
  );
};

export default Index;
