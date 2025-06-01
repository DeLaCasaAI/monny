
import React from 'react';
import { Building2, Plane, FileText, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface BudgetTypeSelectorProps {
  onSelect: (type: 'business' | 'trip' | 'scratch') => void;
  onBack: () => void;
}

export const BudgetTypeSelector: React.FC<BudgetTypeSelectorProps> = ({ onSelect, onBack }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft size={16} />
          {t('common.back')}
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">
          {t('budget.select.type')}
        </h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300">
          <CardHeader className="text-center">
            <div className="mx-auto bg-blue-100 p-4 rounded-full w-fit mb-4">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-xl">{t('budget.type.business')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-center mb-6">
              {t('budget.type.business.description')}
            </p>
            <Button 
              onClick={() => onSelect('business')} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {t('budget.create.use')}
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
              {t('budget.type.trip.description')}
            </p>
            <Button 
              onClick={() => onSelect('trip')} 
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {t('budget.create.use')}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-300">
          <CardHeader className="text-center">
            <div className="mx-auto bg-purple-100 p-4 rounded-full w-fit mb-4">
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-xl">{t('budget.type.scratch')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-center mb-6">
              {t('budget.type.scratch.description')}
            </p>
            <Button 
              onClick={() => onSelect('scratch')} 
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {t('budget.create.use')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
