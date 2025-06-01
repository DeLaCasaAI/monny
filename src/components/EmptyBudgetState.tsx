
import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface EmptyBudgetStateProps {
  onCreateNew: () => void;
}

export const EmptyBudgetState: React.FC<EmptyBudgetStateProps> = ({ onCreateNew }) => {
  const { t } = useLanguage();

  return (
    <Card className="text-center py-12">
      <CardContent>
        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {t('budget.list.empty.title')}
        </h3>
        <p className="text-muted-foreground mb-6">
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
  );
};
