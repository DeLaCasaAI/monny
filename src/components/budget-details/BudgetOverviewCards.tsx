
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Budget } from '@/types/budget';

interface BudgetOverviewCardsProps {
  budget: Budget;
}

export const BudgetOverviewCards: React.FC<BudgetOverviewCardsProps> = ({ budget }) => {
  const { t } = useLanguage();

  const calculateTotalExpenses = () => {
    return budget.fixedCosts.reduce((total, cost) => {
      return total + (cost.amount * (30 / cost.period));
    }, 0);
  };

  const calculateTotalIncome = () => {
    return budget.products.reduce((total, product) => {
      const revenue = product.pricePerUnit * product.unitsSold * (30 / product.period);
      const costs = product.costPerUnit * product.unitsSold * (30 / product.period);
      return total + (revenue - costs);
    }, 0);
  };

  const totalExpenses = calculateTotalExpenses();
  const totalIncome = calculateTotalIncome();
  const profit = totalIncome - totalExpenses;

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-red-700 dark:text-red-300 text-lg">{t('budget.overview.expenses')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-700 dark:text-red-300">
            ${totalExpenses.toLocaleString()}
          </div>
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">30 {t('fixed.days')}</p>
        </CardContent>
      </Card>

      <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-green-700 dark:text-green-300 text-lg">{t('budget.overview.sales')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700 dark:text-green-300">
            ${totalIncome.toLocaleString()}
          </div>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">30 {t('fixed.days')}</p>
        </CardContent>
      </Card>

      <Card className={`${profit >= 0 ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-gray-950/30 border-gray-200 dark:border-gray-800'}`}>
        <CardHeader className="pb-3">
          <CardTitle className={`text-lg ${profit >= 0 ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
            {profit >= 0 ? t('budget.profit') : t('budget.loss')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${profit >= 0 ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
            ${Math.abs(profit).toLocaleString()}
          </div>
          <p className={`text-sm mt-1 ${profit >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
            30 {t('fixed.days')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
