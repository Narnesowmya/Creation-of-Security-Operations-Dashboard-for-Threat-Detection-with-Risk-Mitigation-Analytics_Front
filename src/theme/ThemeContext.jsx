import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from './themeConfig';

export const ThemeModeContext = createContext({
  mode: 'dark',
  toggleTheme: () => {},
  setMode: () => {},
});

export const useThemeMode = () => useContext(ThemeModeContext);

const STORAGE_KEY = 'app_theme_mode';

export const ThemeModeProvider = ({ children }) => {
  const [mode, setModeState] = useState(() => {
    try {
      const savedMode = localStorage.getItem(STORAGE_KEY);
      return savedMode === 'light' || savedMode === 'dark' ? savedMode : 'dark';
    } catch {
      return 'dark';
    }
  });

  const setMode = (newMode) => {
    if (newMode === 'dark' || newMode === 'light') {
      setModeState(newMode);
      try {
        localStorage.setItem(STORAGE_KEY, newMode);
      } catch (e) {
        console.error('Failed to save theme mode to localStorage:', e);
      }
    }
  };

  const toggleTheme = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (e) {
      console.error('Failed to save theme mode to localStorage:', e);
    }
  }, [mode]);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const contextValue = useMemo(
    () => ({
      mode,
      toggleTheme,
      setMode,
    }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
