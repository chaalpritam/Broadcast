import { Client, Conversation, DecodedMessage } from '@xmtp/react-native-sdk';
import { ethers } from 'ethers';
import { XMTPConversation } from '../types/models';

class XMTPService {
  private client: Client | null = null;

  async connect(signer: ethers.JsonRpcSigner): Promise<Client> {
    try {
      // Create XMTP client
      this.client = await Client.create(signer, { env: 'production' });
      return this.client;
    } catch (error) {
      console.error('XMTP connection error:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
    }
  }

  async getConversations(): Promise<XMTPConversation[]> {
    if (!this.client) {
      throw new Error('XMTP client not connected');
    }

    try {
      const conversations = await this.client.conversations.list();
      
      const xmtpConversations: XMTPConversation[] = await Promise.all(
        conversations.map(async (conversation) => {
          const messages = await conversation.messages();
          const lastMessage = messages[messages.length - 1];
          
          return {
            id: conversation.topic,
            peerAddress: conversation.peerAddress,
            lastMessage: lastMessage?.content || '',
            lastMessageTime: lastMessage?.sentAt?.toISOString() || '',
            unreadCount: 0, // XMTP doesn't have built-in unread count, would need custom implementation
          };
        })
      );

      return xmtpConversations;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  }

  async sendMessage(peerAddress: string, content: string): Promise<void> {
    if (!this.client) {
      throw new Error('XMTP client not connected');
    }

    try {
      const conversation = await this.client.conversations.newConversation(peerAddress);
      await conversation.send(content);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async getMessages(peerAddress: string, limit?: number): Promise<DecodedMessage[]> {
    if (!this.client) {
      throw new Error('XMTP client not connected');
    }

    try {
      const conversation = await this.client.conversations.newConversation(peerAddress);
      const messages = await conversation.messages({ limit });
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  async subscribeToMessages(peerAddress: string, callback: (message: DecodedMessage) => void): Promise<void> {
    if (!this.client) {
      throw new Error('XMTP client not connected');
    }

    try {
      const conversation = await this.client.conversations.newConversation(peerAddress);
      await conversation.streamMessages(callback);
    } catch (error) {
      console.error('Error subscribing to messages:', error);
      throw error;
    }
  }

  async subscribeToConversations(callback: (conversation: Conversation) => void): Promise<void> {
    if (!this.client) {
      throw new Error('XMTP client not connected');
    }

    try {
      await this.client.conversations.stream(callback);
    } catch (error) {
      console.error('Error subscribing to conversations:', error);
      throw error;
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

  async getClient(): Promise<Client | null> {
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