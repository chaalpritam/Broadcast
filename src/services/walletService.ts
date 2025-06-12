import { ethers } from 'ethers';
import { WalletInfo } from '../types/models';
import { SignClient } from '@walletconnect/sign-client';
import { WalletConnectModal } from '@walletconnect/modal-react-native';
import { WALLET_CONNECT_CONFIG, RPC_URLS } from '../config/walletConnect';

// Mock wallet service for React Native
// In a real app, you would integrate with WalletConnect, MetaMask Mobile, or other mobile wallet solutions
class WalletService {
  private provider: ethers.JsonRpcProvider | null = null;
  private signer: ethers.Wallet | null = null;
  private signClient: SignClient | null = null;
  private currentWalletInfo: WalletInfo | null = null;

  async connectWallet(): Promise<WalletInfo> {
    try {
      // Initialize WalletConnect Sign Client
      this.signClient = await SignClient.init({
        projectId: WALLET_CONNECT_CONFIG.projectId,
        metadata: WALLET_CONNECT_CONFIG.metadata,
      });

      // Connect to wallet
      const { uri, approval } = await this.signClient.connect({
        requiredNamespaces: WALLET_CONNECT_CONFIG.requiredNamespaces,
        optionalNamespaces: WALLET_CONNECT_CONFIG.optionalNamespaces,
      });

      // Show QR code or deep link
      if (uri) {
        // In a real app, you would show the QR code or deep link
        console.log('WalletConnect URI:', uri);
        
        // For now, we'll simulate the connection
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Wait for user approval
      const session = await approval();

      if (!session) {
        throw new Error('User rejected the connection');
      }

      // Get the first account
      const accounts = Object.values(session.namespaces)
        .flat()
        .map((namespace: any) => namespace.accounts)
        .flat();

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const account = accounts[0];
      const [chainId, address] = account.split(':');

      // Create provider and signer
      const rpcUrl = this.getRpcUrl(parseInt(chainId));
      this.provider = new ethers.JsonRpcProvider(rpcUrl);
      
      // Create a signer that can work with WalletConnect
      this.signer = new ethers.Wallet(
        '0x1234567890123456789012345678901234567890123456789012345678901234', // Mock private key
        this.provider
      );

      // Get balance
      const balance = await this.provider.getBalance(address);
      const balanceInEth = ethers.formatEther(balance);

      // Try to get ENS name
      let ensName: string | undefined;
      try {
        if (parseInt(chainId) === 1) { // Only on Ethereum mainnet
          ensName = await this.provider.lookupAddress(address);
        }
      } catch (error) {
        console.log('ENS lookup failed:', error);
      }

      const walletInfo: WalletInfo = {
        address,
        chainId: parseInt(chainId),
        balance: balanceInEth,
        ensName,
      };

      this.currentWalletInfo = walletInfo;
      return walletInfo;
    } catch (error) {
      console.error('Wallet connection error:', error);
      throw new Error('Failed to connect wallet. Please try again.');
    }
  }

  async disconnectWallet(): Promise<void> {
    try {
      if (this.signClient) {
        const sessions = this.signClient.session.getAll();
        for (const session of sessions) {
          await this.signClient.disconnect({
            topic: session.topic,
            reason: {
              code: 6000,
              message: 'User disconnected',
            },
          });
        }
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    } finally {
      this.provider = null;
      this.signer = null;
      this.signClient = null;
      this.currentWalletInfo = null;
    }
  }

  async getBalance(address: string): Promise<string> {
    try {
      if (this.currentWalletInfo) {
        // Return cached balance with some variation to simulate real updates
        const baseBalance = parseFloat(this.currentWalletInfo.balance);
        const variation = (Math.random() - 0.5) * 0.01; // ±0.005 ETH variation
        const newBalance = (baseBalance + variation).toFixed(4);
        this.currentWalletInfo.balance = newBalance;
        return newBalance;
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
      if (!this.signClient) {
        throw new Error('Wallet not connected');
      }

      const sessions = this.signClient.session.getAll();
      if (sessions.length === 0) {
        throw new Error('No active session');
      }

      const session = sessions[0];
      const chainIdHex = `eip155:${chainId}`;

      await this.signClient.update({
        topic: session.topic,
        namespaces: {
          eip155: {
            ...session.namespaces.eip155,
            chains: [chainIdHex],
          },
        },
      });

      // Update our cached wallet info
      if (this.currentWalletInfo) {
        this.currentWalletInfo.chainId = chainId;
      }

      // Update provider for new network
      const rpcUrl = this.getRpcUrl(chainId);
      this.provider = new ethers.JsonRpcProvider(rpcUrl);
      
      if (this.signer) {
        this.signer = new ethers.Wallet(this.signer.privateKey, this.provider);
      }
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
    return this.currentWalletInfo;
  }

  // Helper method to get RPC URL for different chains
  private getRpcUrl(chainId: number): string {
    return RPC_URLS[chainId as keyof typeof RPC_URLS] || RPC_URLS[1];
  }

  // Helper method to check if wallet is connected
  isConnected(): boolean {
    return this.signClient !== null && this.currentWalletInfo !== null;
  }
}

export const walletService = new WalletService();
export default walletService; 