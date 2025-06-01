
import React from 'react';
import { ArrowLeft, Building2, Plane, FileText, Calendar, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Budget } from '@/types/budget';

interface BudgetDetailsViewProps {
  budget: Budget;
  onBack: () => void;
}

export const BudgetDetailsView: React.FC<BudgetDetailsViewProps> = ({ budget, onBack }) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
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
          
          <Button variant="outline" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            {t('action.edit')}
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-red-700 text-lg">{t('budget.overview.expenses')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">
              ${totalExpenses.toLocaleString()}
            </div>
            <p className="text-sm text-red-600 mt-1">30 {t('fixed.days')}</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-700 text-lg">{t('budget.overview.sales')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              ${totalIncome.toLocaleString()}
            </div>
            <p className="text-sm text-green-600 mt-1">30 {t('fixed.days')}</p>
          </CardContent>
        </Card>

        <Card className={`${profit >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-lg ${profit >= 0 ? 'text-blue-700' : 'text-gray-700'}`}>
              {profit >= 0 ? t('budget.profit') : t('budget.loss')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${profit >= 0 ? 'text-blue-700' : 'text-gray-700'}`}>
              ${Math.abs(profit).toLocaleString()}
            </div>
            <p className={`text-sm mt-1 ${profit >= 0 ? 'text-blue-600' : 'text-gray-600'}`}>
              30 {t('fixed.days')}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Fixed Costs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-700">{t('budget.expenses')} ({budget.fixedCosts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {budget.fixedCosts.length === 0 ? (
              <p className="text-gray-500 text-center py-4">{t('budget.no.expenses')}</p>
            ) : (
              <div className="space-y-3">
                {budget.fixedCosts.filter(cost => cost.amount > 0 && cost.name).map((cost) => (
                  <div key={cost.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div>
                      <div className="font-medium">{cost.name}</div>
                      {cost.description && (
                        <div className="text-sm text-gray-600">{cost.description}</div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-700">
                        ${(cost.amount * (30 / cost.period)).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${cost.amount} per {cost.period} {t('fixed.days')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">{t('budget.income')} ({budget.products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {budget.products.length === 0 ? (
              <p className="text-gray-500 text-center py-4">{t('budget.no.products')}</p>
            ) : (
              <div className="space-y-3">
                {budget.products.filter(product => product.name && product.unitsSold > 0).map((product) => {
                  const revenue = product.pricePerUnit * product.unitsSold * (30 / product.period);
                  const costs = product.costPerUnit * product.unitsSold * (30 / product.period);
                  const productProfit = revenue - costs;
                  return (
                    <div key={product.id} className="p-3 bg-green-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium">{product.name}</div>
                          {product.description && (
                            <div className="text-sm text-gray-600">{product.description}</div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-700">
                            ${productProfit.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">30 {t('fixed.days')}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
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
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <Button variant="outline" className="flex-1">
          {t('action.export')}
        </Button>
        <Button variant="outline" className="flex-1">
          {t('action.duplicate')}
        </Button>
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          {t('action.edit')}
        </Button>
      </div>
    </div>
  );
};
