export const METAMASK_CONFIG = {
  // MetaMask SDK configuration
  sdkOptions: {
    dappMetadata: {
      name: 'Broadcast App',
      url: 'https://broadcast.app',
      iconUrl: 'https://broadcast.app/icon.png',
    },
    // Enable logging for development
    logging: __DEV__ ? 'debug' : 'error',
    // Communication layer configuration
    communicationLayerPreference: 'socket',
    // Enable deep linking
    enableDebug: __DEV__,
  },
  // Supported networks
  supportedNetworks: [
    {
      chainId: '0x1', // Ethereum Mainnet
      chainName: 'Ethereum Mainnet',
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://eth-mainnet.g.alchemy.com/v2/demo'],
      blockExplorerUrls: ['https://etherscan.io'],
    },
    {
      chainId: '0x89', // Polygon Mainnet
      chainName: 'Polygon',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://polygon-rpc.com/'],
      blockExplorerUrls: ['https://polygonscan.com'],
    },
    {
      chainId: '0x13881', // Mumbai Testnet
      chainName: 'Mumbai Testnet',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
      blockExplorerUrls: ['https://mumbai.polygonscan.com'],
    },
    {
      chainId: '0xaa36a7', // Sepolia Testnet
      chainName: 'Sepolia Testnet',
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://rpc.sepolia.org/'],
      blockExplorerUrls: ['https://sepolia.etherscan.io'],
    },
  ],
};

// Network mapping for easy lookup
export const NETWORK_MAPPING = {
  '0x1': { name: 'Ethereum Mainnet', symbol: 'ETH' },
  '0x89': { name: 'Polygon', symbol: 'MATIC' },
  '0x13881': { name: 'Mumbai Testnet', symbol: 'MATIC' },
  '0xaa36a7': { name: 'Sepolia Testnet', symbol: 'ETH' },
};

// Convert chainId to hex string
export const chainIdToHex = (chainId: number): string => {
  return `0x${chainId.toString(16)}`;
};

// Convert hex chainId to number
export const hexToChainId = (hexChainId: string): number => {
  return parseInt(hexChainId, 16);
}; 