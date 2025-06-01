
import React from 'react';
import { Budget } from '@/types/budget';
import { BudgetHeader } from './budget-details/BudgetHeader';
import { BudgetOverviewCards } from './budget-details/BudgetOverviewCards';
import { BudgetExpensesList } from './budget-details/BudgetExpensesList';
import { BudgetIncomeList } from './budget-details/BudgetIncomeList';
import { BudgetActionButtons } from './budget-details/BudgetActionButtons';

interface BudgetDetailsViewProps {
  budget: Budget;
  onBack: () => void;
  onEdit: () => void;
  onDuplicate: (budget: Budget) => void;
}

export const BudgetDetailsView: React.FC<BudgetDetailsViewProps> = ({ budget, onBack, onEdit, onDuplicate }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <BudgetHeader budget={budget} onBack={onBack} onEdit={onEdit} />
      
      <BudgetOverviewCards budget={budget} />

      <div className="grid md:grid-cols-2 gap-8">
        <BudgetExpensesList budget={budget} />
        <BudgetIncomeList budget={budget} />
      </div>

      <BudgetActionButtons budget={budget} onEdit={onEdit} onDuplicate={onDuplicate} />
    </div>
  );
};
