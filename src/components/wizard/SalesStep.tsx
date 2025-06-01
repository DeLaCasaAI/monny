
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { Product } from '@/types/budget';

interface SalesStepProps {
  products: Product[];
  onUpdate: (products: Product[]) => void;
  budgetType: 'business' | 'trip' | 'scratch';
}

export const SalesStep: React.FC<SalesStepProps> = ({ products, onUpdate, budgetType }) => {
  const { t } = useLanguage();

  const addProduct = () => {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: '',
      costPerUnit: 0,
      pricePerUnit: 0,
      unitsSold: 0,
      period: 30,
      description: '',
    };
    onUpdate([...products, newProduct]);
  };

  const updateProduct = (id: string, field: keyof Product, value: string | number) => {
    onUpdate(products.map(product => 
      product.id === id ? { ...product, [field]: value } : product
    ));
  };

  const removeProduct = (id: string) => {
    onUpdate(products.filter(product => product.id !== id));
  };

  // Initialize with one empty product if none exist
  React.useEffect(() => {
    if (products.length === 0) {
      addProduct();
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Add your products or services. Include cost per unit, selling price, and expected sales volume.
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
        {products.map((product, index) => (
          <div key={product.id} className="grid grid-cols-12 gap-4 items-end p-4 border rounded-lg bg-gray-50">
            <div className="col-span-2">
              <Label className="text-sm font-medium">{t('sales.product')} {index + 1}</Label>
              <Input
                placeholder="e.g., Cookies"
                value={product.name}
                onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
              />
            </div>
            
            <div className="col-span-2">
              <Label className="text-sm font-medium">{t('sales.cost.ea')}</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={product.costPerUnit || ''}
                onChange={(e) => updateProduct(product.id, 'costPerUnit', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="col-span-2">
              <Label className="text-sm font-medium">{t('sales.price.ea')}</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={product.pricePerUnit || ''}
                onChange={(e) => updateProduct(product.id, 'pricePerUnit', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="col-span-2">
              <Label className="text-sm font-medium">{t('sales.sales')}</Label>
              <Input
                type="number"
                placeholder="0"
                value={product.unitsSold || ''}
                onChange={(e) => updateProduct(product.id, 'unitsSold', parseInt(e.target.value) || 0)}
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
                value={product.period}
                onChange={(e) => updateProduct(product.id, 'period', parseInt(e.target.value) || 30)}
              />
            </div>
            
            <div className="col-span-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProduct(product.id)}
                className="text-red-600 hover:text-red-800 hover:bg-red-50"
                disabled={products.length === 1}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={addProduct}
        className="flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50"
      >
        <Plus size={16} />
        {t('wizard.add.new')}
      </Button>
    </div>
  );
};
