
import React, { useState } from 'react';
import { Calendar, Building2, Plane, FileText, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { Budget } from '@/types/budget';
import { calculateTotalExpenses, calculateTotalSales, calculateTotalProfit } from '@/utils/budgetCalculations';

interface BudgetCardProps {
  budget: Budget;
  onDeleteBudget: (budgetId: string) => void;
  onViewBudget?: (budget: Budget) => void;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({ 
  budget, 
  onDeleteBudget,
  onViewBudget 
}) => {
  const { t } = useLanguage();
  const [budgetToDelete, setBudgetToDelete] = useState<string | null>(null);

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

  const handleCardClick = () => {
    if (onViewBudget) {
      onViewBudget(budget);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBudgetToDelete(budget.id);
  };

  const confirmDelete = () => {
    if (budgetToDelete) {
      onDeleteBudget(budgetToDelete);
      setBudgetToDelete(null);
    }
  };

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
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
          <AlertDialog open={budgetToDelete === budget.id} onOpenChange={(open) => !open && setBudgetToDelete(null)}>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDeleteClick}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 size={16} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Budget</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{budget.name}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={14} />
            <span>{formatDate(budget.createdAt)}</span>
          </div>
          
          <div className="space-y-2">
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="text-sm text-red-600 mb-1">
                {t('budget.overview.expenses')}
              </div>
              <div className="text-lg font-semibold text-red-700">
                ${calculateTotalExpenses(budget).toLocaleString()}
              </div>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-sm text-green-600 mb-1">
                {t('budget.overview.sales')}
              </div>
              <div className="text-lg font-semibold text-green-700">
                ${calculateTotalSales(budget).toLocaleString()}
              </div>
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
          </div>
          
          <div className="flex justify-between text-sm text-gray-500 pt-2 border-t">
            <span>
              {budget.fixedCosts.length} expenses
            </span>
            <span>
              {budget.products.length} products
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
