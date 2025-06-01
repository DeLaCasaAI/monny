import React, { createContext, useContext, useState, useCallback } from 'react';

interface LanguageContextProps {
  language: 'en' | 'es';
  setLanguage: (lang: 'en' | 'es') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

const translations = {
  en: {
    'app.title': 'Monny',
    'app.subtitle': 'Budget Calculator',
    'budget.create.new': 'Create New Budget',
    'budget.create.first': 'Create Your First Budget',
    'budget.list.subtitle': 'Manage and track your budgets',
    'budget.list.empty.title': 'No budgets yet',
    'budget.list.empty.description': 'Create your first budget to get started with financial planning',
    'budget.select.type': 'Select Budget Type',
    'budget.type.business': 'Business',
    'budget.type.business.description': 'Create a budget for your business with fixed costs, products, and revenue projections',
    'budget.type.trip': 'Trip',
    'budget.type.trip.description': 'Plan your travel expenses and budget for an upcoming trip or vacation',
    'budget.type.scratch': 'From Scratch',
    'budget.type.scratch.description': 'Start with a blank budget and customize it completely to your needs',
    'budget.create.use': 'Use Template',
    'budget.name': 'Budget Name',
    'budget.overview': 'Budget Overview',
    'budget.overview.expenses': 'Expenses',
    'budget.overview.sales': 'Sales',
    'budget.overview.profit': 'Profit',
    'budget.expenses': 'Fixed Costs',
    'budget.income': 'Products & Services',
    'budget.result': 'Net Result',
    'budget.profit': 'Profit',
    'budget.loss': 'Loss',
    'budget.view': 'View Budget',
    'budget.no.expenses': 'No expenses added',
    'budget.no.products': 'No products added',
    'wizard.step1.title': 'Fixed Costs',
    'wizard.step2.title': 'Sales & Revenue',
    'wizard.step3.title': 'Review & Save',
    'wizard.next': 'Next Step',
    'wizard.back': 'Previous',
    'wizard.skip': 'Skip',
    'wizard.add.new': 'Add New Item',
    'fixed.rent': 'Rent',
    'fixed.electricity': 'Electricity',
    'fixed.salaries': 'Salaries',
    'fixed.per': 'Per',
    'fixed.days': 'days',
    'sales.product': 'Product',
    'sales.cost.ea': 'Cost/Unit',
    'sales.price.ea': 'Price/Unit',
    'sales.sales': 'Units Sold',
    'common.amount': 'Amount',
    'common.description': 'Description',
    'common.cancel': 'Cancel',
    'common.back': 'Back to budgets',
    'action.save': 'Save Budget',
    'action.export': 'Export',
    'action.import': 'Import',
    'action.edit': 'Edit',
    'action.duplicate': 'Duplicate',
    'action.copy': 'Copy',
    'action.download': 'Download',
    'export.title': 'Export Budget',
    'export.copied': 'Copied to clipboard',
    'export.copiedDescription': 'Budget data has been copied to your clipboard',
    'menu.export': 'Export Data',
    'menu.import': 'Import Data',
    'menu.language': 'Switch Language',
    'menu.darkMode': 'Dark Mode',
    'import.error': 'Error importing data. Please check the file format.',
    'import.file.title': 'Import from File',
    'import.file.button': 'Choose JSON File',
    'import.json.title': 'Paste JSON Data',
    'import.json.placeholder': 'Paste your budget JSON data here...',
    'import.json.button': 'Import JSON Data',
    'import.or': 'Or',
    'import.success.title': 'Import Successful',
    'import.success.description': 'Imported {count} budget(s) successfully.',
    'import.error.title': 'Import Error',
    'import.error.description': 'Failed to import budget data. Please check the JSON format.',
    'import.error.empty': 'Please enter JSON data to import.',
  },
  es: {
    'app.title': 'Monny',
    'app.subtitle': 'Calculadora de Presupuestos',
    'budget.create.new': 'Crear Nuevo Presupuesto',
    'budget.create.first': 'Crea Tu Primer Presupuesto',
    'budget.list.subtitle': 'Gestiona y rastrea tus presupuestos',
    'budget.list.empty.title': 'Aún no hay presupuestos',
    'budget.list.empty.description': 'Crea tu primer presupuesto para comenzar con la planificación financiera',
    'budget.select.type': 'Seleccionar Tipo de Presupuesto',
    'budget.type.business': 'Negocio',
    'budget.type.business.description': 'Crea un presupuesto para tu negocio con costos fijos, productos y proyecciones de ingresos',
    'budget.type.trip': 'Viaje',
    'budget.type.trip.description': 'Planifica tus gastos de viaje y presupuesto para un próximo viaje o vacaciones',
    'budget.type.scratch': 'Desde Cero',
    'budget.type.scratch.description': 'Comienza con un presupuesto en blanco y personalízalo completamente según tus necesidades',
    'budget.create.use': 'Usar Plantilla',
    'budget.name': 'Nombre del Presupuesto',
    'budget.overview': 'Resumen del Presupuesto',
    'budget.overview.expenses': 'Gastos',
    'budget.overview.sales': 'Ventas',
    'budget.overview.profit': 'Ganancia',
    'budget.expenses': 'Costos Fijos',
    'budget.income': 'Productos y Servicios',
    'budget.result': 'Resultado Neto',
    'budget.profit': 'Ganancia',
    'budget.loss': 'Pérdida',
    'budget.view': 'Ver Presupuesto',
    'budget.no.expenses': 'No se agregaron gastos',
    'budget.no.products': 'No se agregaron productos',
    'wizard.step1.title': 'Costos Fijos',
    'wizard.step2.title': 'Ventas e Ingresos',
    'wizard.step3.title': 'Revisar y Guardar',
    'wizard.next': 'Siguiente Paso',
    'wizard.back': 'Anterior',
    'wizard.skip': 'Omitir',
    'wizard.add.new': 'Agregar Nuevo Elemento',
    'fixed.rent': 'Alquiler',
    'fixed.electricity': 'Electricidad',
    'fixed.salaries': 'Salarios',
    'fixed.per': 'Por',
    'fixed.days': 'días',
    'sales.product': 'Producto',
    'sales.cost.ea': 'Costo/Unidad',
    'sales.price.ea': 'Precio/Unidad',
    'sales.sales': 'Unidades Vendidas',
    'common.amount': 'Cantidad',
    'common.description': 'Descripción',
    'common.cancel': 'Cancelar',
    'common.back': 'Volver a presupuestos',
    'action.save': 'Guardar Presupuesto',
    'action.export': 'Exportar',
    'action.import': 'Importar',
    'action.edit': 'Editar',
    'action.duplicate': 'Duplicar',
    'action.copy': 'Copiar',
    'action.download': 'Descargar',
    'export.title': 'Exportar Presupuesto',
    'export.copied': 'Copiado al portapapeles',
    'export.copiedDescription': 'Los datos del presupuesto han sido copiados al portapapeles',
    'menu.export': 'Exportar Datos',
    'menu.import': 'Importar Datos',
    'menu.language': 'Cambiar Idioma',
    'menu.darkMode': 'Modo Oscuro',
    'import.error': 'Error al importar datos. Por favor, verifica el formato del archivo.',
    'import.file.title': 'Importar desde Archivo',
    'import.file.button': 'Elegir Archivo JSON',
    'import.json.title': 'Pegar Datos JSON',
    'import.json.placeholder': 'Pega aquí los datos JSON de tu presupuesto...',
    'import.json.button': 'Importar Datos JSON',
    'import.or': 'O',
    'import.success.title': 'Importación Exitosa',
    'import.success.description': 'Se importaron {count} presupuesto(s) exitosamente.',
    'import.error.title': 'Error de Importación',
    'import.error.description': 'Error al importar datos del presupuesto. Por favor, verifica el formato JSON.',
    'import.error.empty': 'Por favor, ingresa datos JSON para importar.',
  },
};

const detectBrowserLanguage = (): 'en' | 'es' => {
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith('es') ? 'es' : 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'es'>(() => {
    const saved = localStorage.getItem('language');
    return (saved as 'en' | 'es') || detectBrowserLanguage();
  });

  const handleSetLanguage = (lang: 'en' | 'es') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = useCallback((key: string) => {
    return translations[language][key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
