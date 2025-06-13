import { ethers } from 'ethers';
import { MetaMaskSDK } from '@metamask/sdk-react-native';
import { WalletInfo } from '../types/models';
import { METAMASK_CONFIG, NETWORK_MAPPING, hexToChainId } from '../config/metamask';

class MetaMaskService {
  private sdk: any = null; // Use any type to avoid import issues
  private provider: ethers.JsonRpcProvider | null = null;
  private currentWalletInfo: WalletInfo | null = null;
  private accountsChangedCallback: ((accounts: string[]) => void) | null = null;
  private chainChangedCallback: ((chainId: string) => void) | null = null;

  // Initialize MetaMask SDK
  async initialize(): Promise<void> {
    try {
      // Initialize MetaMask SDK - using dynamic import to avoid type issues
      const { MetaMaskSDK } = await import('@metamask/sdk-react-native');
      
      this.sdk = new MetaMaskSDK({
        dappMetadata: {
          name: 'Broadcast',
          url: 'https://broadcast.app',
          iconUrl: 'https://broadcast.app/icon.png',
        },
        logging: 'debug',
        communicationLayerPreference: 'socket',
        enableDebug: true,
      });

      // Set up event listeners
      this.sdk.on('accountsChanged', this.handleAccountsChanged.bind(this));
      this.sdk.on('chainChanged', this.handleChainChanged.bind(this));
    } catch (error) {
      console.error('Error initializing MetaMask SDK:', error);
      throw error;
    }
  }

  // Connect to MetaMask
  async connectWallet(): Promise<WalletInfo> {
    try {
      if (!this.sdk) {
        await this.initialize();
      }

      // Request accounts
      const accounts = await this.sdk.connect();
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const address = accounts[0];
      
      // Get chain ID
      const chainId = await this.sdk.chainId;
      const chainIdNumber = parseInt(chainId, 16);

      // Create provider
      this.provider = new ethers.JsonRpcProvider(this.sdk.provider);

      // Get balance
      const balance = await this.provider.getBalance(address);
      const balanceInEth = ethers.formatEther(balance);

      // Try to get ENS name
      let ensName: string | undefined;
      try {
        if (chainIdNumber === 1) {
          ensName = await this.provider.lookupAddress(address) || undefined;
        }
      } catch (error) {
        console.log('ENS lookup failed:', error);
      }

      const walletInfo: WalletInfo = {
        address,
        chainId: chainIdNumber,
        balance: balanceInEth,
        ensName,
      };

      this.currentWalletInfo = walletInfo;
      return walletInfo;
    } catch (error) {
      console.error('MetaMask connection error:', error);
      throw error;
    }
  }

  // Disconnect from MetaMask
  async disconnectWallet(): Promise<void> {
    try {
      if (this.sdk) {
        await this.sdk.disconnect();
      }
      this.provider = null;
      this.currentWalletInfo = null;
    } catch (error) {
      console.error('Error disconnecting MetaMask:', error);
      throw error;
    }
  }

  // Get current wallet info
  getWalletInfo(): WalletInfo | null {
    return this.currentWalletInfo;
  }

  // Get balance for a specific address
  async getBalance(address: string): Promise<string> {
    try {
      if (!this.provider) {
        throw new Error('Provider not initialized');
      }
      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }

  // Switch network
  async switchNetwork(chainId: number): Promise<void> {
    try {
      if (!this.sdk) {
        throw new Error('SDK not initialized');
      }
      
      const chainIdHex = `0x${chainId.toString(16)}`;
      await this.sdk.switchChain(chainIdHex);
      
      // Update current wallet info
      if (this.currentWalletInfo) {
        this.currentWalletInfo.chainId = chainId;
      }
    } catch (error) {
      console.error('Error switching network:', error);
      throw error;
    }
  }

  // Sign a message
  async signMessage(message: string): Promise<string> {
    try {
      if (!this.sdk) {
        throw new Error('SDK not initialized');
      }
      return await this.sdk.signMessage(message);
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  }

  // Send transaction
  async sendTransaction(transaction: ethers.TransactionRequest): Promise<string> {
    try {
      if (!this.sdk) {
        throw new Error('MetaMask not connected');
      }

      const hash = await this.sdk.sendTransaction(transaction);
      return hash;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw new Error('Failed to send transaction');
    }
  }

  // Get signer for XMTP integration
  async getSigner(): Promise<ethers.Signer | null> {
    try {
      if (!this.provider) {
        throw new Error('Provider not initialized');
      }
      
      // Create a signer using the provider
      const signer = new ethers.BrowserProvider(this.provider as any).getSigner();
      return signer;
    } catch (error) {
      console.error('Error getting signer:', error);
      return null;
    }
  }

  // Check if MetaMask is connected
  isConnected(): boolean {
    return this.currentWalletInfo !== null;
  }

  // Get current chain ID
  async getCurrentChainId(): Promise<number> {
    try {
      if (!this.sdk) {
        throw new Error('MetaMask not connected');
      }
      const chainId = await this.sdk.getChainId();
      return hexToChainId(chainId);
    } catch (error) {
      console.error('Error getting chain ID:', error);
      throw new Error('Failed to get chain ID');
    }
  }

  // Get network info
  getNetworkInfo(chainId: number) {
    const hexChainId = `0x${chainId.toString(16)}`;
    return NETWORK_MAPPING[hexChainId as keyof typeof NETWORK_MAPPING];
  }

  // Helper method to get RPC URL
  private getRpcUrl(chainId: number): string {
    switch (chainId) {
      case 1:
        return 'https://eth-mainnet.g.alchemy.com/v2/demo';
      case 137:
        return 'https://polygon-rpc.com/';
      case 80001:
        return 'https://rpc-mumbai.maticvigil.com/';
      case 11155111:
        return 'https://rpc.sepolia.org/';
      default:
        return 'https://eth-mainnet.g.alchemy.com/v2/demo';
    }
  }

  // Listen for account changes
  onAccountsChanged(callback: (accounts: string[]) => void): void {
    this.accountsChangedCallback = callback;
  }

  // Listen for chain changes
  onChainChanged(callback: (chainId: string) => void): void {
    this.chainChangedCallback = callback;
  }

  // Remove event listeners
  removeAllListeners(): void {
    this.accountsChangedCallback = null;
    this.chainChangedCallback = null;
  }

  private handleAccountsChanged(accounts: string[]): void {
    if (this.accountsChangedCallback) {
      this.accountsChangedCallback(accounts);
    }
  }

  private handleChainChanged(chainId: string): void {
    if (this.chainChangedCallback) {
      this.chainChangedCallback(chainId);
    }
  }
}

export default new MetaMaskService(); 