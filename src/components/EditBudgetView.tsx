
import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { Budget, FixedCost, Product } from '@/types/budget';
import { FixedCostsStep } from './wizard/FixedCostsStep';
import { SalesStep } from './wizard/SalesStep';

interface EditBudgetViewProps {
  budget: Budget;
  onSave: (updatedBudget: Budget) => void;
  onBack: () => void;
}

export const EditBudgetView: React.FC<EditBudgetViewProps> = ({ budget, onSave, onBack }) => {
  const { t } = useLanguage();
  const [budgetName, setBudgetName] = useState(budget.name);
  const [fixedCosts, setFixedCosts] = useState<FixedCost[]>(budget.fixedCosts);
  const [products, setProducts] = useState<Product[]>(budget.products);

  const handleSave = () => {
    const updatedBudget: Budget = {
      ...budget,
      name: budgetName,
      fixedCosts,
      products,
      updatedAt: new Date().toISOString(),
    };
    onSave(updatedBudget);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Button 
          onClick={onBack}
          variant="ghost"
          className="text-blue-600 hover:text-blue-800 mb-4 p-0"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('common.back')}
        </Button>
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{t('action.edit')} {t('budget.name')}</h1>
          <Button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <Save className="h-4 w-4" />
            {t('action.save')}
          </Button>
        </div>
      </div>

      {/* Budget Name */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t('budget.name')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={budgetName}
            onChange={(e) => setBudgetName(e.target.value)}
            placeholder={t('budget.name')}
            className="text-lg"
          />
        </CardContent>
      </Card>

      {/* Fixed Costs Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-red-700">{t('wizard.step1.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <FixedCostsStep 
            fixedCosts={fixedCosts} 
            onUpdate={setFixedCosts} 
            budgetType={budget.type} 
          />
        </CardContent>
      </Card>

      {/* Sales/Income Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-green-700">{t('wizard.step2.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesStep 
            products={products} 
            onUpdate={setProducts} 
            budgetType={budget.type} 
          />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex-1"
        >
          {t('common.cancel')}
        </Button>
        <Button 
          onClick={handleSave}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          {t('action.save')}
        </Button>
      </div>
    </div>
  );
};
