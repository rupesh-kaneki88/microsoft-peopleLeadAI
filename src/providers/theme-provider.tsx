'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { theme } from '../theme';

type Theme = typeof theme;

const ThemeContext = createContext<Theme | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
