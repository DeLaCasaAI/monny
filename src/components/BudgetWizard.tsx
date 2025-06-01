
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { FixedCostsStep } from './wizard/FixedCostsStep';
import { SalesStep } from './wizard/SalesStep';
import { ReviewStep } from './wizard/ReviewStep';
import { Budget, FixedCost, Product } from '@/types/budget';

interface BudgetWizardProps {
  budgetType: 'business' | 'trip';
  onComplete: (budget: Budget) => void;
  onBack: () => void;
}

export const BudgetWizard: React.FC<BudgetWizardProps> = ({ budgetType, onComplete, onBack }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [budgetName, setBudgetName] = useState(t('budget.type.business'));
  const [fixedCosts, setFixedCosts] = useState<FixedCost[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const steps = [
    { number: 1, title: t('wizard.step1.title') },
    { number: 2, title: t('wizard.step2.title') },
    { number: 3, title: t('wizard.step3.title') },
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleComplete = () => {
    const budget: Budget = {
      id: crypto.randomUUID(),
      name: budgetName,
      type: budgetType,
      period: 30,
      fixedCosts,
      products,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onComplete(budget);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <FixedCostsStep fixedCosts={fixedCosts} onUpdate={setFixedCosts} />;
      case 2:
        return <SalesStep products={products} onUpdate={setProducts} />;
      case 3:
        return (
          <ReviewStep
            budgetName={budgetName}
            setBudgetName={setBudgetName}
            fixedCosts={fixedCosts}
            products={products}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step.number
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step.number}
              </div>
              <span className={`ml-2 text-sm ${
                currentStep >= step.number ? 'text-blue-600 font-medium' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-4 ${
                currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {steps[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          className="flex items-center gap-2"
        >
          <ChevronLeft size={16} />
          {currentStep === 1 ? t('common.cancel') : t('wizard.back')}
        </Button>
        
        {currentStep < 3 ? (
          <Button
            onClick={handleNext}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            {t('wizard.next')}
            <ChevronRight size={16} />
          </Button>
        ) : (
          <Button
            onClick={handleComplete}
            className="bg-green-600 hover:bg-green-700"
          >
            {t('action.save')}
          </Button>
        )}
      </div>
    </div>
  );
};
