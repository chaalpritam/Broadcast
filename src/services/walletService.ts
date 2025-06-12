import { ethers } from 'ethers';
import { WalletInfo } from '../types/models';

class WalletService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;

  async connectWallet(): Promise<WalletInfo> {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask to use this feature.');
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];

      if (!account) {
        throw new Error('No account selected');
      }

      // Create provider and signer
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();

      // Get network info
      const network = await this.provider.getNetwork();
      const chainId = Number(network.chainId);

      // Get balance
      const balance = await this.provider.getBalance(account);
      const balanceInEth = ethers.formatEther(balance);

      // Try to get ENS name
      let ensName: string | undefined;
      try {
        ensName = await this.provider.lookupAddress(account);
      } catch (error) {
        console.log('ENS lookup failed:', error);
      }

      const walletInfo: WalletInfo = {
        address: account,
        chainId,
        balance: balanceInEth,
        ensName,
      };

      return walletInfo;
    } catch (error) {
      console.error('Wallet connection error:', error);
      throw error;
    }
  }

  async disconnectWallet(): Promise<void> {
    this.provider = null;
    this.signer = null;
  }

  async getBalance(address: string): Promise<string> {
    if (!this.provider) {
      throw new Error('Wallet not connected');
    }

    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  async getSigner(): Promise<ethers.JsonRpcSigner | null> {
    return this.signer;
  }

  async getProvider(): Promise<ethers.BrowserProvider | null> {
    return this.provider;
  }

  async switchNetwork(chainId: number): Promise<void> {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error: any) {
      // If the network doesn't exist, add it
      if (error.code === 4902) {
        await this.addNetwork(chainId);
      } else {
        throw error;
      }
    }
  }

  private async addNetwork(chainId: number): Promise<void> {
    const networkConfigs: { [key: number]: any } = {
      137: {
        chainId: '0x89',
        chainName: 'Polygon Mainnet',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18,
        },
        rpcUrls: ['https://polygon-rpc.com/'],
        blockExplorerUrls: ['https://polygonscan.com/'],
      },
      80001: {
        chainId: '0x13881',
        chainName: 'Mumbai Testnet',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18,
        },
        rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
        blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
      },
    };

    const config = networkConfigs[chainId];
    if (!config) {
      throw new Error(`Network configuration not found for chainId: ${chainId}`);
    }

    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [config],
    });
  }

  async signMessage(message: string): Promise<string> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    return await this.signer.signMessage(message);
  }

  async sendTransaction(transaction: ethers.TransactionRequest): Promise<ethers.TransactionResponse> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    return await this.signer.sendTransaction(transaction);
  }
}

export const walletService = new WalletService();
export default walletService; 