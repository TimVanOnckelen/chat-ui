import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatTheme, defaultTheme, appleTheme, fluentTheme, forestTheme } from './theme.types';

type ThemeType = 'default' | 'apple' | 'fluent' | 'forest' | 'custom';

const ThemeContext = createContext<{
  theme: ChatTheme;
  setThemeType: (themeType: ThemeType) => void;
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
  initialTheme?: ThemeType;
  children: React.ReactNode;
}

const getThemeByType = (themeType: ThemeType, customTheme?: Partial<ChatTheme>): ChatTheme => {
  switch (themeType) {
    case 'apple':
      return appleTheme;
    case 'fluent':
      return fluentTheme;
    case 'forest':
      return forestTheme;
    case 'custom':
      return {
        ...defaultTheme,
        ...customTheme
      };
    default:
      return defaultTheme;
  }
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  initialTheme = 'default',
  children 
}) => {
  const [currentTheme, setCurrentTheme] = useState(getThemeByType(initialTheme));

  const setThemeType = (themeType: ThemeType) => {
      setCurrentTheme(getThemeByType(themeType));
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setThemeType }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };