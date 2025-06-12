import { ethers } from 'ethers';
import { XMTPConversation } from '../types/models';

// Mock XMTP service for React Native
// In a real app, you would use the actual XMTP React Native SDK
class XMTPService {
  private client: any | null = null;
  private mockConversations: XMTPConversation[] = [];

  async connect(signer: ethers.Wallet): Promise<any> {
    try {
      // For React Native, we'll use a mock implementation
      // In production, you would use the actual XMTP React Native SDK
      
      // Simulate XMTP connection delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create mock client
      const mockClient = {
        address: signer.address,
        conversations: {
          list: async () => this.mockConversations,
          newConversation: async (peerAddress: string) => ({
            topic: `conversation_${peerAddress.slice(0, 8)}`,
            peerAddress,
            messages: async () => [],
            send: async (content: string) => {
              console.log('Mock XMTP message sent:', content);
            },
            streamMessages: async (callback: (message: any) => void) => {
              console.log('Mock XMTP message streaming started');
            },
          }),
          stream: async (callback: (conversation: any) => void) => {
            console.log('Mock XMTP conversation streaming started');
          },
        },
        canMessage: async (peerAddress: string) => true,
        close: async () => {
          this.client = null;
        },
      };

      this.client = mockClient;

      // Initialize mock conversations
      this.mockConversations = [
        {
          id: '1',
          peerAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
          lastMessage: 'Hey, how are you?',
          lastMessageTime: new Date().toISOString(),
          unreadCount: 2,
        },
        {
          id: '2',
          peerAddress: '0xfedcba0987654321fedcba0987654321fedcba09',
          lastMessage: 'Thanks for the help!',
          lastMessageTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          unreadCount: 0,
        },
      ];

      return mockClient;
    } catch (error) {
      console.error('XMTP connection error:', error);
      throw new Error('Failed to connect to XMTP');
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.mockConversations = [];
    }
  }

  async getConversations(): Promise<XMTPConversation[]> {
    if (!this.client) {
      throw new Error('XMTP client not connected');
    }

    try {
      // Return mock conversations
      return this.mockConversations;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw new Error('Failed to fetch conversations');
    }
  }

  async sendMessage(peerAddress: string, content: string): Promise<void> {
    if (!this.client) {
      throw new Error('XMTP client not connected');
    }

    try {
      const conversation = await this.client.conversations.newConversation(peerAddress);
      await conversation.send(content);
      
      // Update mock conversation
      const existingConversation = this.mockConversations.find(c => c.peerAddress === peerAddress);
      if (existingConversation) {
        existingConversation.lastMessage = content;
        existingConversation.lastMessageTime = new Date().toISOString();
      } else {
        this.mockConversations.unshift({
          id: `conversation_${peerAddress.slice(0, 8)}`,
          peerAddress,
          lastMessage: content,
          lastMessageTime: new Date().toISOString(),
          unreadCount: 0,
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  }

  async getMessages(peerAddress: string, limit?: number): Promise<any[]> {
    if (!this.client) {
      throw new Error('XMTP client not connected');
    }

    try {
      const conversation = await this.client.conversations.newConversation(peerAddress);
      const messages = await conversation.messages({ limit });
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw new Error('Failed to fetch messages');
    }
  }

  async subscribeToMessages(peerAddress: string, callback: (message: any) => void): Promise<void> {
    if (!this.client) {
      throw new Error('XMTP client not connected');
    }

    try {
      const conversation = await this.client.conversations.newConversation(peerAddress);
      await conversation.streamMessages(callback);
    } catch (error) {
      console.error('Error subscribing to messages:', error);
      throw new Error('Failed to subscribe to messages');
    }
  }

  async subscribeToConversations(callback: (conversation: any) => void): Promise<void> {
    if (!this.client) {
      throw new Error('XMTP client not connected');
    }

    try {
      await this.client.conversations.stream(callback);
    } catch (error) {
      console.error('Error subscribing to conversations:', error);
      throw new Error('Failed to subscribe to conversations');
    }
  }

  async canMessage(peerAddress: string): Promise<boolean> {
    if (!this.client) {
      throw new Error('XMTP client not connected');
    }

    try {
      return await this.client.canMessage(peerAddress);
    } catch (error) {
      console.error('Error checking if can message:', error);
      return false;
    }
  }

  async getClient(): Promise<any | null> {
    return this.client;
  }

  async isConnected(): Promise<boolean> {
    return this.client !== null;
  }

  async getAddress(): Promise<string | null> {
    if (!this.client) {
      return null;
    }
    return this.client.address;
  }
}

export const xmtpService = new XMTPService();
export default xmtpService; 