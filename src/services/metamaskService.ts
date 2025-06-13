import { ethers } from 'ethers';
import { MetaMaskSDK } from '@metamask/sdk-react-native';
import { WalletInfo } from '../types/models';
import { METAMASK_CONFIG, NETWORK_MAPPING, hexToChainId } from '../config/metamask';

class MetaMaskService {
  private sdk: MetaMaskSDK | null = null;
  private provider: ethers.JsonRpcProvider | null = null;
  private currentWalletInfo: WalletInfo | null = null;

  // Initialize MetaMask SDK
  async initialize(): Promise<void> {
    try {
      this.sdk = new MetaMaskSDK(METAMASK_CONFIG.sdkOptions);
      await this.sdk.init();
    } catch (error) {
      console.error('Failed to initialize MetaMask SDK:', error);
      throw new Error('Failed to initialize MetaMask');
    }
  }

  // Connect to MetaMask
  async connectWallet(): Promise<WalletInfo> {
    try {
      if (!this.sdk) {
        await this.initialize();
      }

      // Request accounts from MetaMask
      const accounts = await this.sdk.connect();
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const address = accounts[0];
      
      // Get current chain ID
      const chainId = await this.sdk.getChainId();
      const chainIdNumber = hexToChainId(chainId);

      // Create provider
      this.provider = new ethers.JsonRpcProvider(
        this.getRpcUrl(chainIdNumber)
      );

      // Get balance
      const balance = await this.provider.getBalance(address);
      const balanceInEth = ethers.formatEther(balance);

      // Try to get ENS name
      let ensName: string | undefined;
      try {
        if (chainIdNumber === 1) { // Only on Ethereum mainnet
          ensName = await this.provider.lookupAddress(address);
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
      throw new Error('Failed to connect to MetaMask. Please make sure MetaMask is installed and unlocked.');
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
      console.error('Error disconnecting from MetaMask:', error);
      throw new Error('Failed to disconnect from MetaMask');
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
      throw new Error('Failed to get balance');
    }
  }

  // Switch network
  async switchNetwork(chainId: number): Promise<void> {
    try {
      if (!this.sdk) {
        throw new Error('MetaMask not connected');
      }

      const hexChainId = `0x${chainId.toString(16)}`;
      await this.sdk.switchChain(hexChainId);

      // Update provider for new network
      this.provider = new ethers.JsonRpcProvider(this.getRpcUrl(chainId));

      // Update cached wallet info
      if (this.currentWalletInfo) {
        this.currentWalletInfo.chainId = chainId;
        // Refresh balance
        const balance = await this.getBalance(this.currentWalletInfo.address);
        this.currentWalletInfo.balance = balance;
      }
    } catch (error) {
      console.error('Error switching network:', error);
      throw new Error('Failed to switch network');
    }
  }

  // Sign a message
  async signMessage(message: string): Promise<string> {
    try {
      if (!this.sdk) {
        throw new Error('MetaMask not connected');
      }

      const signature = await this.sdk.signMessage(message);
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      throw new Error('Failed to sign message');
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
      if (!this.sdk || !this.provider) {
        return null;
      }

      // Create a signer that works with MetaMask
      const signer = new ethers.BrowserProvider(this.provider).getSigner();
      return signer;
    } catch (error) {
      console.error('Error getting signer:', error);
      return null;
    }
  }

  // Check if MetaMask is connected
  isConnected(): boolean {
    return this.sdk !== null && this.currentWalletInfo !== null;
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
    if (this.sdk) {
      this.sdk.on('accountsChanged', callback);
    }
  }

  // Listen for chain changes
  onChainChanged(callback: (chainId: string) => void): void {
    if (this.sdk) {
      this.sdk.on('chainChanged', callback);
    }
  }

  // Remove event listeners
  removeAllListeners(): void {
    if (this.sdk) {
      this.sdk.removeAllListeners();
    }
  }
}

export default new MetaMaskService(); 