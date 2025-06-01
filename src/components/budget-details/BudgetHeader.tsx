
import React from 'react';
import { ArrowLeft, Building2, Plane, FileText, Calendar, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Budget } from '@/types/budget';

interface BudgetHeaderProps {
  budget: Budget;
  onBack: () => void;
  onEdit: () => void;
}

export const BudgetHeader: React.FC<BudgetHeaderProps> = ({ budget, onBack, onEdit }) => {
  const { t } = useLanguage();

  const getBudgetIcon = (type: Budget['type']) => {
    switch (type) {
      case 'business':
        return <Building2 className="h-6 w-6" />;
      case 'trip':
        return <Plane className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
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
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            {getBudgetIcon(budget.type)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{budget.name}</h1>
            <div className="flex items-center gap-4 text-gray-600 mt-2">
              <span className="capitalize">{t(`budget.type.${budget.type}`)}</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(budget.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={onEdit}
        >
          <Edit className="h-4 w-4" />
          {t('action.edit')}
        </Button>
      </div>
    </div>
  );
};
