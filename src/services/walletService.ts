import { ethers } from 'ethers';
import { WalletInfo } from '../types/models';

// Mock wallet service for React Native
// In a real app, you would integrate with WalletConnect, MetaMask Mobile, or other mobile wallet solutions
class WalletService {
  private provider: ethers.JsonRpcProvider | null = null;
  private signer: ethers.Wallet | null = null;
  private mockWalletInfo: WalletInfo | null = null;

  async connectWallet(): Promise<WalletInfo> {
    try {
      // For React Native, we'll use a mock implementation
      // In production, you would integrate with WalletConnect, MetaMask Mobile, etc.
      
      // Simulate wallet connection delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create mock wallet info
      const mockWalletInfo: WalletInfo = {
        address: '0x1234567890123456789012345678901234567890',
        chainId: 1,
        balance: '0.5',
        ensName: 'user.eth',
      };

      this.mockWalletInfo = mockWalletInfo;
      
      // Create a mock provider for Ethereum mainnet
      this.provider = new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/demo');
      
      // Create a mock signer (in real app, this would be from wallet connection)
      this.signer = new ethers.Wallet('0x1234567890123456789012345678901234567890123456789012345678901234', this.provider);

      return mockWalletInfo;
    } catch (error) {
      console.error('Wallet connection error:', error);
      throw new Error('Failed to connect wallet. Please try again.');
    }
  }

  async disconnectWallet(): Promise<void> {
    this.provider = null;
    this.signer = null;
    this.mockWalletInfo = null;
  }

  async getBalance(address: string): Promise<string> {
    try {
      if (this.mockWalletInfo) {
        // Return mock balance with some variation
        const baseBalance = parseFloat(this.mockWalletInfo.balance);
        const variation = (Math.random() - 0.5) * 0.1; // ±0.05 ETH variation
        return (baseBalance + variation).toFixed(4);
      }
      
      if (!this.provider) {
        throw new Error('Wallet not connected');
      }

      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      return '0.0000';
    }
  }

  async getSigner(): Promise<ethers.Wallet | null> {
    return this.signer;
  }

  async getProvider(): Promise<ethers.JsonRpcProvider | null> {
    return this.provider;
  }

  async switchNetwork(chainId: number): Promise<void> {
    try {
      // In React Native, network switching would be handled by the wallet app
      // For now, we'll just update our mock wallet info
      if (this.mockWalletInfo) {
        this.mockWalletInfo.chainId = chainId;
      }
      
      // Simulate network switch delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error switching network:', error);
      throw new Error('Failed to switch network');
    }
  }

  async signMessage(message: string): Promise<string> {
    try {
      if (!this.signer) {
        throw new Error('Wallet not connected');
      }

      return await this.signer.signMessage(message);
    } catch (error) {
      console.error('Error signing message:', error);
      throw new Error('Failed to sign message');
    }
  }

  async sendTransaction(transaction: ethers.TransactionRequest): Promise<ethers.TransactionResponse> {
    try {
      if (!this.signer) {
        throw new Error('Wallet not connected');
      }

      return await this.signer.sendTransaction(transaction);
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw new Error('Failed to send transaction');
    }
  }

  // Helper method to get current wallet info
  getCurrentWalletInfo(): WalletInfo | null {
    return this.mockWalletInfo;
  }
}

export const walletService = new WalletService();
export default walletService; 