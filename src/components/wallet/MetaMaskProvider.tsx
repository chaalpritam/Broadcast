import React, { createContext, useContext, useEffect, useState } from 'react';
import { MetaMaskProvider as SDKProvider } from '@metamask/sdk-react-native';
import { METAMASK_CONFIG } from '../../config/metamask';

interface MetaMaskContextType {
  isInitialized: boolean;
  error: string | null;
}

const MetaMaskContext = createContext<MetaMaskContextType>({
  isInitialized: false,
  error: null,
});

export const useMetaMaskContext = () => {
  const context = useContext(MetaMaskContext);
  if (!context) {
    throw new Error('useMetaMaskContext must be used within a MetaMaskProvider');
  }
  return context;
};

interface MetaMaskProviderProps {
  children: React.ReactNode;
}

export const MetaMaskProvider: React.FC<MetaMaskProviderProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMetaMask = async () => {
      try {
        setIsInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize MetaMask');
        setIsInitialized(false);
      }
    };

    initializeMetaMask();
  }, []);

  const contextValue: MetaMaskContextType = {
    isInitialized,
    error,
  };

  return (
    <SDKProvider config={METAMASK_CONFIG.sdkOptions}>
      <MetaMaskContext.Provider value={contextValue}>
        {children}
      </MetaMaskContext.Provider>
    </SDKProvider>
  );
}; 