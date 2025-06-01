
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // App General
    'app.title': 'Monny',
    'app.subtitle': 'Budget Planning Tool',
    'language.switch': 'Español',
    
    // Home Page
    'home.welcome': 'Welcome to Monny',
    'home.description': 'Simple budgeting and planning tool for individuals and small businesses',
    'home.create.budget': 'Create New Budget',
    'home.import.data': 'Import Data',
    'home.export.data': 'Export Data',
    
    // Budget Types
    'budget.type.business': 'Business Monthly Budget',
    'budget.type.trip': 'Trip Budget',
    'budget.select.type': 'Select Budget Type',
    
    // Wizard Steps
    'wizard.step1.title': 'Fixed Costs',
    'wizard.step2.title': 'Sales & Products',
    'wizard.step3.title': 'Review & Save',
    'wizard.next': 'Next',
    'wizard.back': 'Back',
    'wizard.skip': 'Skip',
    'wizard.add.new': 'Add New',
    
    // Fixed Costs
    'fixed.rent': 'Rent',
    'fixed.electricity': 'Electricity',
    'fixed.salaries': 'Salaries',
    'fixed.per': 'Per',
    'fixed.days': 'Days',
    
    // Sales
    'sales.title': 'Sales',
    'sales.cost.ea': 'Cost/ea',
    'sales.price.ea': 'Price/ea',
    'sales.sales': 'Sales',
    'sales.product': 'Product',
    
    // Budget Overview
    'budget.overview': 'Budget Overview',
    'budget.expenses': 'Expenses per',
    'budget.income': 'Income',
    'budget.result': 'Result',
    'budget.profit': 'Profit',
    'budget.loss': 'Loss',
    'budget.view': 'View Budget',
    'budget.name': 'Budget Name',
    
    // Actions
    'action.save': 'Save',
    'action.export': 'Export',
    'action.import': 'Import',
    'action.edit': 'Edit',
    'action.delete': 'Delete',
    
    // Common
    'common.description': 'Description',
    'common.amount': 'Amount',
    'common.total': 'Total',
    'common.cancel': 'Cancel',
  },
  es: {
    // App General
    'app.title': 'Monny',
    'app.subtitle': 'Herramienta de Planificación Presupuestaria',
    'language.switch': 'English',
    
    // Home Page
    'home.welcome': 'Bienvenido a Monny',
    'home.description': 'Herramienta simple de presupuestos para individuos y pequeñas empresas',
    'home.create.budget': 'Crear Nuevo Presupuesto',
    'home.import.data': 'Importar Datos',
    'home.export.data': 'Exportar Datos',
    
    // Budget Types
    'budget.type.business': 'Presupuesto Mensual de Negocio',
    'budget.type.trip': 'Presupuesto de Viaje',
    'budget.select.type': 'Seleccionar Tipo de Presupuesto',
    
    // Wizard Steps
    'wizard.step1.title': 'Costos Fijos',
    'wizard.step2.title': 'Ventas y Productos',
    'wizard.step3.title': 'Revisar y Guardar',
    'wizard.next': 'Siguiente',
    'wizard.back': 'Atrás',
    'wizard.skip': 'Omitir',
    'wizard.add.new': 'Agregar Nuevo',
    
    // Fixed Costs
    'fixed.rent': 'Arriendo',
    'fixed.electricity': 'Electricidad',
    'fixed.salaries': 'Salarios',
    'fixed.per': 'Por',
    'fixed.days': 'Días',
    
    // Sales
    'sales.title': 'Ventas',
    'sales.cost.ea': 'Costo/c.u.',
    'sales.price.ea': 'Precio/c.u.',
    'sales.sales': 'Ventas',
    'sales.product': 'Producto',
    
    // Budget Overview
    'budget.overview': 'Resumen del Presupuesto',
    'budget.expenses': 'Gastos por',
    'budget.income': 'Ingresos',
    'budget.result': 'Resultado',
    'budget.profit': 'Ganancia',
    'budget.loss': 'Pérdida',
    'budget.view': 'Ver Presupuesto',
    'budget.name': 'Nombre del Presupuesto',
    
    // Actions
    'action.save': 'Guardar',
    'action.export': 'Exportar',
    'action.import': 'Importar',
    'action.edit': 'Editar',
    'action.delete': 'Eliminar',
    
    // Common
    'common.description': 'Descripción',
    'common.amount': 'Cantidad',
    'common.total': 'Total',
    'common.cancel': 'Cancelar',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('monny-language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('monny-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
