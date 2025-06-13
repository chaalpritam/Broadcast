import { ethers } from 'ethers';
import { WalletInfo } from '../types/models';
import { SignClient } from '@walletconnect/sign-client';
import { WalletConnectModal } from '@walletconnect/modal-react-native';
import { WALLET_CONNECT_CONFIG, RPC_URLS } from '../config/walletConnect';
import metamaskService from './metamaskService';

// Wallet service that supports both MetaMask and WalletConnect
class WalletService {
  private provider: ethers.JsonRpcProvider | null = null;
  private signer: ethers.Wallet | null = null;
  private signClient: any = null; // Use any to avoid type issues
  private currentWalletInfo: WalletInfo | null = null;
  private walletType: 'metamask' | 'walletconnect' | null = null;

  async connectWallet(walletType: 'metamask' | 'walletconnect' = 'metamask'): Promise<WalletInfo> {
    try {
      this.walletType = walletType;

      if (walletType === 'metamask') {
        return await this.connectMetaMask();
      } else {
        return await this.connectWalletConnect();
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      throw new Error('Failed to connect wallet. Please try again.');
    }
  }

  private async connectMetaMask(): Promise<WalletInfo> {
    try {
      const walletInfo = await metamaskService.connectWallet();
      this.currentWalletInfo = walletInfo;
      
      // Set up event listeners
      metamaskService.onAccountsChanged(this.handleAccountsChanged.bind(this));
      metamaskService.onChainChanged(this.handleChainChanged.bind(this));
      
      return walletInfo;
    } catch (error) {
      console.error('MetaMask connection error:', error);
      throw error;
    }
  }

  private async connectWalletConnect(): Promise<WalletInfo> {
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
        console.log('WalletConnect URI:', uri);
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
      
      this.signer = new ethers.Wallet(
        '0x1234567890123456789012345678901234567890123456789012345678901234',
        this.provider
      );

      // Get balance
      const balance = await this.provider.getBalance(address);
      const balanceInEth = ethers.formatEther(balance);

      // Try to get ENS name
      let ensName: string | undefined;
      try {
        if (parseInt(chainId) === 1) {
          ensName = await this.provider.lookupAddress(address) || undefined;
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
      console.error('WalletConnect connection error:', error);
      throw error;
    }
  }

  async disconnectWallet(): Promise<void> {
    try {
      if (this.walletType === 'metamask') {
        await metamaskService.disconnectWallet();
        metamaskService.removeAllListeners();
      } else if (this.walletType === 'walletconnect' && this.signClient) {
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

      this.provider = null;
      this.signer = null;
      this.currentWalletInfo = null;
      this.walletType = null;
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      throw new Error('Failed to disconnect wallet');
    }
  }

  async getBalance(address: string): Promise<string> {
    try {
      if (this.walletType === 'metamask') {
        return await metamaskService.getBalance(address);
      } else if (this.provider) {
        const balance = await this.provider.getBalance(address);
        return ethers.formatEther(balance);
      } else {
        throw new Error('No provider available');
      }
    } catch (error) {
      console.error('Error getting balance:', error);
      throw new Error('Failed to get balance');
    }
  }

  async switchNetwork(chainId: number): Promise<void> {
    try {
      if (this.walletType === 'metamask') {
        await metamaskService.switchNetwork(chainId);
        this.currentWalletInfo = metamaskService.getWalletInfo();
      } else if (this.signClient) {
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

        if (this.currentWalletInfo) {
          this.currentWalletInfo.chainId = chainId;
        }

        const rpcUrl = this.getRpcUrl(chainId);
        this.provider = new ethers.JsonRpcProvider(rpcUrl);
        
        if (this.signer) {
          this.signer = this.signer.connect(this.provider);
        }
      }
    } catch (error) {
      console.error('Error switching network:', error);
      throw error;
    }
  }

  async signMessage(message: string): Promise<string> {
    try {
      if (this.walletType === 'metamask') {
        return await metamaskService.signMessage(message);
      } else if (this.signer) {
        return await this.signer.signMessage(message);
      } else {
        throw new Error('No signer available');
      }
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  }

  async getSigner(): Promise<ethers.Signer | null> {
    try {
      if (this.walletType === 'metamask') {
        return await metamaskService.getSigner();
      } else {
        return this.signer;
      }
    } catch (error) {
      console.error('Error getting signer:', error);
      return null;
    }
  }

  isConnected(): boolean {
    return this.currentWalletInfo !== null;
  }

  getWalletType(): 'metamask' | 'walletconnect' | null {
    return this.walletType;
  }

  getCurrentWalletInfo(): WalletInfo | null {
    return this.currentWalletInfo;
  }

  private handleAccountsChanged(accounts: string[]): void {
    if (accounts.length === 0) {
      this.currentWalletInfo = null;
    } else if (this.currentWalletInfo) {
      this.currentWalletInfo.address = accounts[0];
    }
  }

  private handleChainChanged(chainId: string): void {
    if (this.currentWalletInfo) {
      this.currentWalletInfo.chainId = parseInt(chainId);
    }
  }

  private getRpcUrl(chainId: number): string {
    const rpcUrls: { [key: number]: string } = RPC_URLS;
    return rpcUrls[chainId] || rpcUrls[1]; // Default to Ethereum mainnet
  }
}

export default new WalletService(); 