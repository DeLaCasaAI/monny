
import React from 'react';
import { Copy, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Budget } from '@/types/budget';

interface BudgetActionButtonsProps {
  budget: Budget;
  onEdit: () => void;
  onDuplicate: (budget: Budget) => void;
}

export const BudgetActionButtons: React.FC<BudgetActionButtonsProps> = ({ budget, onEdit, onDuplicate }) => {
  const { t } = useLanguage();

  const handleDuplicate = () => {
    const duplicatedBudget: Budget = {
      ...budget,
      id: crypto.randomUUID(),
      name: `${budget.name} (Copy)`,
      fixedCosts: budget.fixedCosts.map(cost => ({
        ...cost,
        id: crypto.randomUUID()
      })),
      products: budget.products.map(product => ({
        ...product,
        id: crypto.randomUUID()
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onDuplicate(duplicatedBudget);
  };

  return (
    <div className="flex gap-4 mt-8">
      <Button variant="outline" className="flex-1">
        {t('action.export')}
      </Button>
      <Button 
        variant="outline" 
        className="flex-1 flex items-center gap-2"
        onClick={handleDuplicate}
      >
        <Copy className="h-4 w-4" />
        {t('action.duplicate')}
      </Button>
      <Button 
        className="flex-1 bg-blue-600 hover:bg-blue-700"
        onClick={onEdit}
      >
        {t('action.edit')}
      </Button>
    </div>
  );
};
