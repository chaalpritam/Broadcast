import { LinkingOptions } from '@react-navigation/native';

export const linking: LinkingOptions<any> = {
  prefixes: ['broadcast://', 'metamask://', 'wc://'],
  
  config: {
    screens: {
      // Add your screen configurations here
      Home: 'home',
      Wallets: 'wallets',
      Profile: 'profile',
      // Add more screens as needed
    },
  },
  
  // Handle custom deep links
  async getInitialURL() {
    // Handle initial URL when app is opened from a deep link
    return null;
  },
  
  // Subscribe to URL changes
  subscribe(listener) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);
    
    // Listen for incoming links from deep linking
    const subscription = require('react-native').Linking.addEventListener('url', onReceiveURL);
    
    return () => {
      subscription?.remove();
    };
  },
};

// Deep link handlers for wallet connections
export const handleDeepLink = (url: string) => {
  console.log('Deep link received:', url);
  
  // Handle MetaMask deep links
  if (url.startsWith('metamask://')) {
    console.log('MetaMask deep link:', url);
    // MetaMask SDK will handle this automatically
    return;
  }
  
  // Handle WalletConnect deep links
  if (url.startsWith('wc://')) {
    console.log('WalletConnect deep link:', url);
    // WalletConnect SDK will handle this automatically
    return;
  }
  
  // Handle custom app deep links
  if (url.startsWith('broadcast://')) {
    console.log('Broadcast app deep link:', url);
    // Handle custom app navigation
    return;
  }
};

// Test deep links (for development)
export const testDeepLinks = () => {
  const testUrls = [
    'metamask://',
    'wc://',
    'broadcast://home',
    'broadcast://wallets',
  ];
  
  testUrls.forEach(url => {
    console.log(`Testing deep link: ${url}`);
    handleDeepLink(url);
  });
}; 