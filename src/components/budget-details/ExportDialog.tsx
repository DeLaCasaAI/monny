
import React, { useState } from 'react';
import { Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { Budget } from '@/types/budget';
import { useToast } from '@/hooks/use-toast';

interface ExportDialogProps {
  budget: Budget;
  children: React.ReactNode;
}

export const ExportDialog: React.FC<ExportDialogProps> = ({ budget, children }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const budgetJson = JSON.stringify(budget, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(budgetJson);
      toast({
        title: t('export.copied'),
        description: t('export.copiedDescription'),
      });
    } catch (error) {
      console.error('Failed to copy:', error);
      toast({
        title: 'Error',
        description: 'Failed to copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(budgetJson);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${budget.name}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{t('export.title')} - {budget.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4" />
              {t('action.copy')}
            </Button>
            <Button 
              className="flex items-center gap-2"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              {t('action.download')}
            </Button>
          </div>
          <div className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
            <pre className="text-sm whitespace-pre-wrap font-mono">
              {budgetJson}
            </pre>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
