
import React from 'react';
import { Plus, Calendar, Building2, Plane, FileText, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Budget } from '@/types/budget';

interface BudgetListProps {
  budgets: Budget[];
  onCreateNew: () => void;
  onDeleteBudget: (budgetId: string) => void;
}

export const BudgetList: React.FC<BudgetListProps> = ({ budgets, onCreateNew, onDeleteBudget }) => {
  const { t } = useLanguage();

  const getBudgetIcon = (type: Budget['type']) => {
    switch (type) {
      case 'business':
        return <Building2 className="h-5 w-5" />;
      case 'trip':
        return <Plane className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const calculateTotalProfit = (budget: Budget) => {
    const totalFixedCosts = budget.fixedCosts.reduce((sum, cost) => sum + cost.amount, 0);
    const totalRevenue = budget.products.reduce((sum, product) => 
      sum + (product.pricePerUnit * product.unitsSold), 0
    );
    const totalProductCosts = budget.products.reduce((sum, product) => 
      sum + (product.costPerUnit * product.unitsSold), 0
    );
    
    return totalRevenue - totalFixedCosts - totalProductCosts;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('app.title')}</h1>
          <p className="text-gray-600 mt-2">{t('budget.list.subtitle')}</p>
        </div>
        <Button 
          onClick={onCreateNew}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Plus size={20} />
          {t('budget.create.new')}
        </Button>
      </div>

      {budgets.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('budget.list.empty.title')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('budget.list.empty.description')}
            </p>
            <Button 
              onClick={onCreateNew}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {t('budget.create.first')}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => (
            <Card key={budget.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      {getBudgetIcon(budget.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{budget.name}</CardTitle>
                      <p className="text-sm text-gray-500 capitalize">
                        {t(`budget.type.${budget.type}`)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteBudget(budget.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={14} />
                    <span>{formatDate(budget.createdAt)}</span>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      {t('budget.overview.profit')}
                    </div>
                    <div className={`text-lg font-semibold ${
                      calculateTotalProfit(budget) >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ${calculateTotalProfit(budget).toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {t('budget.overview.expenses')}: {budget.fixedCosts.length}
                    </span>
                    <span className="text-gray-600">
                      {t('budget.overview.products')}: {budget.products.length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
