export const WALLET_CONNECT_CONFIG = {
  projectId: '8431acb2ae237f09b196ac933c6b5837', // Replace with your actual WalletConnect project ID
  metadata: {
    name: 'Broadcast App',
    description: 'A community-focused messaging platform with Web3 features',
    url: 'https://broadcast.app',
    icons: ['https://broadcast.app/icon.png'],
  },
  requiredNamespaces: {
    eip155: {
      methods: [
        'eth_sendTransaction',
        'eth_signTransaction',
        'eth_sign',
        'personal_sign',
        'eth_signTypedData',
        'eth_signTypedData_v4',
      ],
      chains: [
        'eip155:1',    // Ethereum Mainnet
        'eip155:137',  // Polygon Mainnet
        'eip155:80001', // Mumbai Testnet
        'eip155:11155111', // Sepolia Testnet
      ],
      events: [
        'chainChanged',
        'accountsChanged',
      ],
    },
  },
  optionalNamespaces: {
    eip155: {
      methods: [
        'eth_getBalance',
        'eth_getTransactionCount',
        'eth_getTransactionReceipt',
        'eth_getBlockByNumber',
        'eth_getCode',
        'eth_getStorageAt',
        'eth_call',
        'eth_estimateGas',
      ],
      chains: [
        'eip155:1',
        'eip155:137',
        'eip155:80001',
        'eip155:11155111',
      ],
      events: [
        'chainChanged',
        'accountsChanged',
      ],
    },
  },
};

// RPC URLs for different networks
export const RPC_URLS = {
  1: 'https://eth-mainnet.g.alchemy.com/v2/demo', // Ethereum Mainnet
  137: 'https://polygon-rpc.com/', // Polygon Mainnet
  80001: 'https://rpc-mumbai.maticvigil.com/', // Mumbai Testnet
  11155111: 'https://rpc.sepolia.org/', // Sepolia Testnet
};

// Network names for display
export const NETWORK_NAMES = {
  1: 'Ethereum Mainnet',
  137: 'Polygon',
  80001: 'Mumbai Testnet',
  11155111: 'Sepolia Testnet',
};

// Network symbols
export const NETWORK_SYMBOLS = {
  1: 'ETH',
  137: 'MATIC',
  80001: 'MATIC',
  11155111: 'ETH',
}; 