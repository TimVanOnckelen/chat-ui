import React, { createContext, useContext, useState } from 'react';
import { ChatTheme, defaultTheme, fruitTheme, skylightTheme, forestTheme, twilightTheme, copilotTheme } from './theme.types';

export type ThemeType = 'default' | 'fruit' | 'skylight' | 'forest' | 'twilight' | 'copilot' | 'custom';

const ThemeContext = createContext<{
  theme: ChatTheme;
  setThemeType: (themeType: ThemeType) => void;
}>( {
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
    case 'fruit':
      return fruitTheme;
    case 'skylight':
      return skylightTheme;
    case 'forest':
      return forestTheme;
    case 'twilight':
      return twilightTheme;
    case 'copilot':
      return copilotTheme;
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