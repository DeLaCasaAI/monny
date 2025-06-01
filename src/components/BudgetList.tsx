
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Budget } from '@/types/budget';
import { BudgetCard } from '@/components/BudgetCard';
import { EmptyBudgetState } from '@/components/EmptyBudgetState';

interface BudgetListProps {
  budgets: Budget[];
  onCreateNew: () => void;
  onDeleteBudget: (budgetId: string) => void;
  onViewBudget?: (budget: Budget) => void;
}

export const BudgetList: React.FC<BudgetListProps> = ({ 
  budgets, 
  onCreateNew, 
  onDeleteBudget,
  onViewBudget 
}) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('app.title')}</h1>
          <p className="text-muted-foreground mt-2">{t('budget.list.subtitle')}</p>
        </div>
        <Button 
          onClick={onCreateNew}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Plus size={20} />
          {t('budget.create.new')}
        </Button>
      </div>

      {budgets.length === 0 ? (
        <EmptyBudgetState onCreateNew={onCreateNew} />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              onDeleteBudget={onDeleteBudget}
              onViewBudget={onViewBudget}
            />
          ))}
        </div>
      )}
    </div>
  );
};
