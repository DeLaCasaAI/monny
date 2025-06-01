
import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface ImportDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ImportDialog: React.FC<ImportDialogProps> = ({ isOpen, onOpenChange }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [jsonInput, setJsonInput] = useState('');

  const processImportData = (data: string) => {
    try {
      const parsedData = JSON.parse(data);
      
      // Handle both single budget object and array of budgets
      let budgetsToImport;
      if (Array.isArray(parsedData)) {
        budgetsToImport = parsedData;
      } else if (parsedData && typeof parsedData === 'object' && parsedData.id) {
        // Single budget object, wrap it in an array
        budgetsToImport = [parsedData];
      } else {
        throw new Error('Invalid budget data format');
      }
      
      // Get existing budgets and ensure it's always an array
      let existingBudgets;
      try {
        const stored = localStorage.getItem('monny-budgets');
        const parsed = stored ? JSON.parse(stored) : [];
        existingBudgets = Array.isArray(parsed) ? parsed : [];
      } catch {
        existingBudgets = [];
      }
      
      const mergedBudgets = [...existingBudgets, ...budgetsToImport];
      
      localStorage.setItem('monny-budgets', JSON.stringify(mergedBudgets));
      
      toast({
        title: t('import.success.title'),
        description: t('import.success.description').replace('{count}', budgetsToImport.length.toString()),
      });
      
      onOpenChange(false);
      setJsonInput('');
      window.location.reload();
    } catch (error) {
      console.error('Error importing data:', error);
      toast({
        title: t('import.error.title'),
        description: t('import.error.description'),
        variant: 'destructive',
      });
    }
  };

  const handleFileImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target?.result as string;
          processImportData(data);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleJsonImport = () => {
    if (!jsonInput.trim()) {
      toast({
        title: t('import.error.title'),
        description: t('import.error.empty'),
        variant: 'destructive',
      });
      return;
    }
    
    processImportData(jsonInput);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('menu.import')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">{t('import.file.title')}</h3>
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2"
              onClick={handleFileImport}
            >
              <Upload className="h-4 w-4" />
              {t('import.file.button')}
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">{t('import.or')}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="json-input">{t('import.json.title')}</Label>
              <Textarea
                id="json-input"
                placeholder={t('import.json.placeholder')}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
            <Button 
              className="w-full flex items-center gap-2"
              onClick={handleJsonImport}
              disabled={!jsonInput.trim()}
            >
              <FileText className="h-4 w-4" />
              {t('import.json.button')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
