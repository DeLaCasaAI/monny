
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { FixedCost, Product } from '@/types/budget';

interface ReviewStepProps {
  budgetName: string;
  setBudgetName: (name: string) => void;
  fixedCosts: FixedCost[];
  products: Product[];
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  budgetName,
  setBudgetName,
  fixedCosts,
  products,
}) => {
  const { t } = useLanguage();

  const calculateTotalExpenses = () => {
    return fixedCosts.reduce((total, cost) => {
      return total + (cost.amount * (30 / cost.period));
    }, 0);
  };

  const calculateTotalIncome = () => {
    return products.reduce((total, product) => {
      const revenue = product.pricePerUnit * product.unitsSold * (30 / product.period);
      const costs = product.costPerUnit * product.unitsSold * (30 / product.period);
      return total + (revenue - costs);
    }, 0);
  };

  const totalExpenses = calculateTotalExpenses();
  const totalIncome = calculateTotalIncome();
  const profit = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium">{t('budget.name')}</Label>
        <Input
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">{t('budget.overview')}</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-red-600 mb-2">{t('budget.expenses')} 30 {t('fixed.days')}:</h4>
            <div className="space-y-1">
              {fixedCosts.filter(cost => cost.amount > 0 && cost.name).map((cost) => (
                <div key={cost.id} className="flex justify-between">
                  <span>{cost.name}:</span>
                  <span>${(cost.amount * (30 / cost.period)).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t pt-1 font-medium">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>${totalExpenses.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-green-600 mb-2">{t('budget.income')}:</h4>
            <div className="space-y-1">
              {products.filter(product => product.name && product.unitsSold > 0).map((product) => {
                const revenue = product.pricePerUnit * product.unitsSold * (30 / product.period);
                const costs = product.costPerUnit * product.unitsSold * (30 / product.period);
                const profit = revenue - costs;
                return (
                  <div key={product.id} className="flex justify-between">
                    <span>{product.name}:</span>
                    <span>${profit.toLocaleString()}</span>
                  </div>
                );
              })}
              <div className="border-t pt-1 font-medium">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>${totalIncome.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">{t('budget.result')}:</h4>
            <div className={`text-lg font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {profit >= 0 ? t('budget.profit') : t('budget.loss')}: ${Math.abs(profit).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" className="flex-1">
          {t('action.export')}
        </Button>
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          {t('budget.view')}
        </Button>
      </div>
    </div>
  );
};
