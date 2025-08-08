'use client';

import React, { createContext, useState, useContext, ReactNode, useRef } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

interface LoadingContextType {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const loadingStartTime = useRef<number | null>(null);

  const showLoading = () => {
    console.log('Showing loading screen');
    loadingStartTime.current = Date.now();
    setIsLoading(true);
  };

  const hideLoading = () => {
    console.log('Attempting to hide loading screen');
    if (loadingStartTime.current) {
      const elapsedTime = Date.now() - loadingStartTime.current;
      const minimumDisplayTime = 1000; // 1 second

      if (elapsedTime < minimumDisplayTime) {
        const delay = minimumDisplayTime - elapsedTime;
        setTimeout(() => {
          console.log('Hiding loading screen after delay');
          setIsLoading(false);
        }, delay);
      } else {
        console.log('Hiding loading screen immediately');
        setIsLoading(false);
      }
    } else {
        setIsLoading(false);
    }
  };

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      <LoadingScreen isLoading={isLoading} />
      {children}
    </LoadingContext.Provider>
  );
};