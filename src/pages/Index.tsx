
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { BudgetTypeSelector } from '@/components/BudgetTypeSelector';
import { BudgetWizard } from '@/components/BudgetWizard';
import { BudgetList } from '@/components/BudgetList';
import { BudgetDetailsView } from '@/components/BudgetDetailsView';
import { EditBudgetView } from '@/components/EditBudgetView';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Budget } from '@/types/budget';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'selector' | 'wizard' | 'view' | 'edit'>('home');
  const [selectedBudgetType, setSelectedBudgetType] = useState<'business' | 'trip' | 'scratch'>('business');
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [budgetsData, setBudgetsData] = useLocalStorage<Budget[]>('monny-budgets', []);
  
  // Ensure budgets is always an array to prevent .map errors
  const budgets = Array.isArray(budgetsData) ? budgetsData : [];

  console.log('Budgets data:', budgetsData, 'Is array:', Array.isArray(budgetsData));

  const handleCreateNew = () => {
    setCurrentView('selector');
  };

  const handleBudgetTypeSelect = (type: 'business' | 'trip' | 'scratch') => {
    setSelectedBudgetType(type);
    setCurrentView('wizard');
  };

  const handleBudgetComplete = (budget: Budget) => {
    setBudgetsData([...budgets, budget]);
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
    setBudgetsData(budgets.filter(budget => budget.id !== budgetId));
  };

  const handleViewBudget = (budget: Budget) => {
    setSelectedBudget(budget);
    setCurrentView('view');
  };

  const handleEditBudget = () => {
    setCurrentView('edit');
  };

  const handleSaveBudget = (updatedBudget: Budget) => {
    setBudgetsData(budgets.map(budget => 
      budget.id === updatedBudget.id ? updatedBudget : budget
    ));
    setSelectedBudget(updatedBudget);
    setCurrentView('view');
    console.log('Budget updated:', updatedBudget);
  };

  const handleBackToView = () => {
    setCurrentView('view');
  };

  const handleDuplicateBudget = (duplicatedBudget: Budget) => {
    setBudgetsData([...budgets, duplicatedBudget]);
    setSelectedBudget(duplicatedBudget);
    console.log('Budget duplicated:', duplicatedBudget);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
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
              onEdit={handleEditBudget}
              onDuplicate={handleDuplicateBudget}
            />
          )}

          {currentView === 'edit' && selectedBudget && (
            <EditBudgetView
              budget={selectedBudget}
              onSave={handleSaveBudget}
              onBack={handleBackToView}
            />
          )}
        </main>
      </div>
    </LanguageProvider>
  );
};

export default Index;
