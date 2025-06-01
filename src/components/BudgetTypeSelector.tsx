
import React from 'react';
import { Building2, Plane } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface BudgetTypeSelectorProps {
  onSelect: (type: 'business' | 'trip') => void;
}

export const BudgetTypeSelector: React.FC<BudgetTypeSelectorProps> = ({ onSelect }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
        {t('budget.select.type')}
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300">
          <CardHeader className="text-center">
            <div className="mx-auto bg-blue-100 p-4 rounded-full w-fit mb-4">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-xl">{t('budget.type.business')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-center mb-6">
              Plan monthly expenses, revenue, and profit for your business.
            </p>
            <Button 
              onClick={() => onSelect('business')} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {t('home.create.budget')}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-300">
          <CardHeader className="text-center">
            <div className="mx-auto bg-green-100 p-4 rounded-full w-fit mb-4">
              <Plane className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-xl">{t('budget.type.trip')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-center mb-6">
              Plan your trip expenses and budget for travel costs.
            </p>
            <Button 
              onClick={() => onSelect('trip')} 
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {t('home.create.budget')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
