import React, { createContext, useContext, useState } from 'react';
import { ChatTheme, defaultTheme, appleTheme, fluentTheme } from './theme.types';

const ThemeContext = createContext<{
  theme: ChatTheme;
  setThemeType: (themeType: string) => void;
}>({
  theme: defaultTheme,
  setThemeType: () => {},
});

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return {
    theme: context.theme,
    setThemeType: context.setThemeType
  };
};

interface ThemeProviderProps {
  initialTheme?: string;
  children: React.ReactNode;
}

const getThemeByType = (themeType: string): ChatTheme => {
  switch (themeType) {
    case 'apple':
      return appleTheme;
    case 'fluent':
      return fluentTheme;
    default:
      return defaultTheme;
  }
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  initialTheme = 'default',
  children 
}) => {
  const [currentTheme, setCurrentTheme] = useState(getThemeByType(initialTheme));

  const setThemeType = (themeType: string) => {
    setCurrentTheme(getThemeByType(themeType));
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setThemeType }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };