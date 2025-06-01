
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Reset = () => {
  const { t } = useLanguage();

  const handleReset = () => {
    // Clear all localStorage data
    localStorage.clear();
    
    // Show confirmation and reload
    alert('All data has been reset. The page will now reload.');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold text-foreground">
            Reset Application
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-center">
            This will permanently delete all your budgets, settings, and local data. 
            This action cannot be undone.
          </p>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">What will be reset:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• All saved budgets</li>
              <li>• Language preferences</li>
              <li>• Theme settings</li>
              <li>• All other app data</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button 
              onClick={handleReset}
              variant="destructive"
              className="w-full flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reset All Data
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="w-full"
            >
              Cancel - Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reset;
