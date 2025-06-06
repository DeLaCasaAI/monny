
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Budget } from '@/types/budget';

interface BudgetIncomeListProps {
  budget: Budget;
}

export const BudgetIncomeList: React.FC<BudgetIncomeListProps> = ({ budget }) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700 dark:text-green-300 text-lg">{t('budget.income')} ({budget.products.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {budget.products.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">{t('budget.no.products')}</p>
        ) : (
          <div className="space-y-3">
            {budget.products.filter(product => product.name && product.unitsSold > 0).map((product) => {
              const revenue = product.pricePerUnit * product.unitsSold * (30 / product.period);
              const costs = product.costPerUnit * product.unitsSold * (30 / product.period);
              const productProfit = revenue - costs;
              return (
                <div key={product.id} className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{product.name}</div>
                      {product.description && (
                        <div className="text-sm text-gray-600 dark:text-gray-400">{product.description}</div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-700 dark:text-green-300">
                        ${productProfit.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">30 {t('fixed.days')}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <div>
                      <span className="font-medium">{t('sales.cost.ea')}:</span> ${product.costPerUnit}
                    </div>
                    <div>
                      <span className="font-medium">{t('sales.price.ea')}:</span> ${product.pricePerUnit}
                    </div>
                    <div>
                      <span className="font-medium">{t('sales.sales')}:</span> {product.unitsSold}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
