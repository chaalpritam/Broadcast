export type AgentStatus = 'online' | 'offline' | 'busy';
export type AgentCategory = 'wallet' | 'transaction' | 'defi' | 'nft' | 'governance' | 'analytics';

export interface Agent {
    id: string;
    name: string;
    description: string;
    avatar?: string;
    category: AgentCategory;
    status: AgentStatus;
    capabilities: string[];
    blockchain: string[];
    lastActive: string;
    createdAt: string;
    createdBy: string;
    isActive: boolean;
    version: string;
    apiEndpoint?: string;
    config?: Record<string, any>;
}

export interface AgentChat {
    id: string;
    agentId: string;
    userId: string;
    messages: AgentMessage[];
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
}

export interface AgentMessage {
    id: string;
    chatId: string;
    content: string;
    sender: 'user' | 'agent';
    timestamp: string;
    metadata?: {
        transactionHash?: string;
        walletAddress?: string;
        blockchain?: string;
        amount?: string;
        token?: string;
    };
}

export interface AgentState {
    agents: {
        [key: string]: Agent;
    };
    chats: {
        [key: string]: AgentChat;
    };
    loading: {
        agents: boolean;
        chats: boolean;
    };
    error: {
        agents: string | null;
        chats: string | null;
    };
    selectedAgentId: string | null;
    selectedChatId: string | null;
} 