
import React from 'react';
import { Menu, Globe, Download, Upload, Moon, Sun, RefreshCw } from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ImportDialog } from './ImportDialog';

export const HamburgerMenu: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const handleLanguageSwitch = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const handleExport = () => {
    const budgets = localStorage.getItem('monny-budgets');
    if (budgets) {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(budgets);
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "monny-budgets.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="p-2">
          <Menu className="h-5 w-5" />
        </MenubarTrigger>
        <MenubarContent className="bg-background border border-border shadow-lg z-50">
          <MenubarItem onClick={handleExport} className="flex items-center gap-2 cursor-pointer">
            <Download className="h-4 w-4" />
            {t('menu.export')}
          </MenubarItem>
          <ImportDialog>
            <MenubarItem className="flex items-center gap-2 cursor-pointer">
              <Upload className="h-4 w-4" />
              {t('menu.import')}
            </MenubarItem>
          </ImportDialog>
          <MenubarItem onClick={handleLanguageSwitch} className="flex items-center gap-2 cursor-pointer">
            <Globe className="h-4 w-4" />
            {t('menu.language')}
          </MenubarItem>
          <MenubarItem className="flex items-center justify-between gap-2 cursor-pointer" onClick={toggleTheme}>
            <div className="flex items-center gap-2">
              {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              {t('menu.darkMode')}
            </div>
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
          </MenubarItem>
          <MenubarItem onClick={() => window.location.href = '/reset'} className="flex items-center gap-2 cursor-pointer text-orange-600">
            <RefreshCw className="h-4 w-4" />
            Reset App
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
