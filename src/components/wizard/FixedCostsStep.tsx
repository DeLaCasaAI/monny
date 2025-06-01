
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { FixedCost } from '@/types/budget';

interface FixedCostsStepProps {
  fixedCosts: FixedCost[];
  onUpdate: (costs: FixedCost[]) => void;
  budgetType: 'business' | 'trip' | 'scratch';
}

export const FixedCostsStep: React.FC<FixedCostsStepProps> = ({ fixedCosts, onUpdate, budgetType }) => {
  const { t } = useLanguage();

  const addFixedCost = () => {
    const newCost: FixedCost = {
      id: crypto.randomUUID(),
      name: '',
      amount: 0,
      period: 30,
      description: '',
    };
    onUpdate([...fixedCosts, newCost]);
  };

  const updateFixedCost = (id: string, field: keyof FixedCost, value: string | number) => {
    onUpdate(fixedCosts.map(cost => 
      cost.id === id ? { ...cost, [field]: value } : cost
    ));
  };

  const removeFixedCost = (id: string) => {
    onUpdate(fixedCosts.filter(cost => cost.id !== id));
  };

  const defaultCosts = [
    { name: t('fixed.rent'), amount: 0 },
    { name: t('fixed.electricity'), amount: 0 },
    { name: t('fixed.salaries'), amount: 0 },
  ];

  // Initialize with default costs if empty
  React.useEffect(() => {
    if (fixedCosts.length === 0) {
      const initialCosts = defaultCosts.map(cost => ({
        id: crypto.randomUUID(),
        name: cost.name,
        amount: cost.amount,
        period: 30,
        description: '',
      }));
      onUpdate(initialCosts);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Add your monthly fixed costs. These are expenses that remain constant regardless of sales.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="text-blue-600 border-blue-600 hover:bg-blue-50"
        >
          {t('wizard.skip')}
        </Button>
      </div>

      <div className="space-y-4">
        {fixedCosts.map((cost) => (
          <div key={cost.id} className="grid grid-cols-12 gap-4 items-end p-4 border rounded-lg bg-gray-50">
            <div className="col-span-3">
              <Label className="text-sm font-medium">{cost.name || 'Cost Name'}</Label>
              <Input
                placeholder="e.g., Rent"
                value={cost.name}
                onChange={(e) => updateFixedCost(cost.id, 'name', e.target.value)}
              />
            </div>
            
            <div className="col-span-3">
              <Label className="text-sm font-medium">{t('common.amount')}</Label>
              <Input
                type="number"
                placeholder="0"
                value={cost.amount || ''}
                onChange={(e) => updateFixedCost(cost.id, 'amount', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="col-span-1">
              <Label className="text-sm font-medium">{t('fixed.per')}</Label>
              <div className="text-sm text-gray-500 pt-2">Per</div>
            </div>
            
            <div className="col-span-2">
              <Label className="text-sm font-medium">{t('fixed.days')}</Label>
              <Input
                type="number"
                value={cost.period}
                onChange={(e) => updateFixedCost(cost.id, 'period', parseInt(e.target.value) || 30)}
              />
            </div>
            
            <div className="col-span-2">
              <Label className="text-sm font-medium">{t('common.description')}</Label>
              <Input
                placeholder="Optional"
                value={cost.description || ''}
                onChange={(e) => updateFixedCost(cost.id, 'description', e.target.value)}
              />
            </div>
            
            <div className="col-span-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFixedCost(cost.id)}
                className="text-red-600 hover:text-red-800 hover:bg-red-50"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={addFixedCost}
        className="flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50"
      >
        <Plus size={16} />
        {t('wizard.add.new')}
      </Button>
    </div>
  );
};
