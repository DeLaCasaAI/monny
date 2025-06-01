
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Budget } from '@/types/budget';

interface BudgetExpensesListProps {
  budget: Budget;
}

export const BudgetExpensesList: React.FC<BudgetExpensesListProps> = ({ budget }) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-red-700">{t('budget.expenses')} ({budget.fixedCosts.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {budget.fixedCosts.length === 0 ? (
          <p className="text-gray-500 text-center py-4">{t('budget.no.expenses')}</p>
        ) : (
          <div className="space-y-3">
            {budget.fixedCosts.filter(cost => cost.amount > 0 && cost.name).map((cost) => (
              <div key={cost.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <div>
                  <div className="font-medium">{cost.name}</div>
                  {cost.description && (
                    <div className="text-sm text-gray-600">{cost.description}</div>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-700">
                    ${(cost.amount * (30 / cost.period)).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    ${cost.amount} per {cost.period} {t('fixed.days')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
