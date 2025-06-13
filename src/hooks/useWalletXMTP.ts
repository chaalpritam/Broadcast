import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './index';
import { 
  connectWallet, 
  disconnectWallet, 
  fetchWalletBalance,
  setWalletInfo,
  setError as setWalletError 
} from '../store/slices/walletSlice';
import { 
  connectXMTP, 
  disconnectXMTP, 
  fetchConversations,
  setClient,
  setError as setXmtpError 
} from '../store/slices/xmtpSlice';
import walletService from '../services/walletService';
import xmtpService from '../services/xmtpService';
import { WalletInfo } from '../types/models';

export const useWalletXMTP = () => {
  const dispatch = useAppDispatch();
  const wallet = useAppSelector(state => state.wallet);
  const xmtp = useAppSelector(state => state.xmtp);

  // Connect wallet with type selection
  const connectWalletHandler = useCallback(async (walletType: 'metamask' | 'walletconnect' = 'metamask') => {
    try {
      dispatch(setWalletError(''));
      const walletInfo = await walletService.connectWallet(walletType);
      dispatch(setWalletInfo(walletInfo));
      return walletInfo;
    } catch (error: any) {
      dispatch(setWalletError(error.message || 'Failed to connect wallet'));
      throw error;
    }
  }, [dispatch]);

  // Disconnect wallet
  const disconnectWalletHandler = useCallback(async () => {
    try {
      await walletService.disconnectWallet();
      await xmtpService.disconnect();
      dispatch(disconnectWallet());
      dispatch(disconnectXMTP());
    } catch (error: any) {
      console.error('Error disconnecting:', error);
    }
  }, [dispatch]);

  // Connect XMTP
  const connectXMTPhandler = useCallback(async () => {
    try {
      if (!wallet.isConnected) {
        throw new Error('Wallet must be connected before connecting to XMTP');
      }

      const signer = await walletService.getSigner();
      if (!signer) {
        throw new Error('No signer available');
      }

      dispatch(setXmtpError(''));
      const client = await xmtpService.connect(signer);
      dispatch(setClient(client));
      
      // Fetch conversations after connecting
      const conversations = await xmtpService.getConversations();
      dispatch(fetchConversations.fulfilled(conversations, '', undefined));
      
      return client;
    } catch (error: any) {
      dispatch(setXmtpError(error.message || 'Failed to connect to XMTP'));
      throw error;
    }
  }, [dispatch, wallet.isConnected]);

  // Auto-connect XMTP when wallet connects
  useEffect(() => {
    if (wallet.isConnected && !xmtp.isConnected && !xmtp.isConnecting) {
      connectXMTPhandler().catch(console.error);
    }
  }, [wallet.isConnected, xmtp.isConnected, xmtp.isConnecting, connectXMTPhandler]);

  // Fetch wallet balance
  const fetchBalance = useCallback(async () => {
    if (wallet.address) {
      try {
        const balance = await walletService.getBalance(wallet.address);
        dispatch(fetchWalletBalance.fulfilled(balance, '', wallet.address));
      } catch (error: any) {
        console.error('Error fetching balance:', error);
      }
    }
  }, [dispatch, wallet.address]);

  // Send XMTP message
  const sendMessage = useCallback(async (peerAddress: string, content: string) => {
    try {
      await xmtpService.sendMessage(peerAddress, content);
    } catch (error: any) {
      console.error('Error sending message:', error);
      throw error;
    }
  }, []);

  // Get messages for a conversation
  const getMessages = useCallback(async (peerAddress: string) => {
    try {
      return await xmtpService.getMessages(peerAddress);
    } catch (error: any) {
      console.error('Error getting messages:', error);
      throw error;
    }
  }, []);

  // Subscribe to new messages
  const subscribeToMessages = useCallback((peerAddress: string, callback: (message: any) => void) => {
    try {
      return xmtpService.subscribeToMessages(peerAddress, callback);
    } catch (error: any) {
      console.error('Error subscribing to messages:', error);
      throw error;
    }
  }, []);

  // Check if can message an address
  const canMessage = useCallback(async (address: string) => {
    try {
      return await xmtpService.canMessage(address);
    } catch (error: any) {
      console.error('Error checking if can message:', error);
      return false;
    }
  }, []);

  // Switch network
  const switchNetwork = useCallback(async (chainId: number) => {
    try {
      await walletService.switchNetwork(chainId);
      // Update wallet info after network switch
      const currentWalletInfo = walletService.getCurrentWalletInfo();
      if (currentWalletInfo) {
        dispatch(setWalletInfo(currentWalletInfo));
      }
    } catch (error: any) {
      console.error('Error switching network:', error);
      throw error;
    }
  }, [dispatch]);

  // Sign message
  const signMessage = useCallback(async (message: string) => {
    try {
      return await walletService.signMessage(message);
    } catch (error: any) {
      console.error('Error signing message:', error);
      throw error;
    }
  }, []);

  // Get wallet type
  const getWalletType = useCallback(() => {
    return walletService.getWalletType();
  }, []);

  return {
    // Wallet state
    wallet: {
      isConnected: wallet.isConnected,
      address: wallet.address,
      chainId: wallet.chainId,
      balance: wallet.balance,
      isLoading: wallet.isLoading,
      error: wallet.error,
      isConnecting: wallet.isConnecting,
    },
    // XMTP state
    xmtp: {
      isConnected: xmtp.isConnected,
      client: xmtp.client,
      conversations: xmtp.conversations,
      isLoading: xmtp.isLoading,
      error: xmtp.error,
      isConnecting: xmtp.isConnecting,
    },
    // Actions
    connectWallet: connectWalletHandler,
    disconnectWallet: disconnectWalletHandler,
    connectXMTP: connectXMTPhandler,
    disconnectXMTP: () => dispatch(disconnectXMTP()),
    fetchBalance,
    sendMessage,
    getMessages,
    subscribeToMessages,
    canMessage,
    switchNetwork,
    signMessage,
    getWalletType,
  };
}; 