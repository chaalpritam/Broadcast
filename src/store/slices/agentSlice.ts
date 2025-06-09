import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AgentState, Agent, AgentChat, AgentMessage } from '../../types/agent';
import { getAgentAvatar } from '../../constants/images';

// Initial state
const initialState: AgentState = {
    agents: {},
    chats: {},
    loading: {
        agents: false,
        chats: false,
    },
    error: {
        agents: null,
        chats: null,
    },
    selectedAgentId: null,
    selectedChatId: null,
};

// Mock data for development
const mockAgents: Agent[] = [
    {
        id: '1',
        name: 'Transaction Agent',
        description: 'AI agent specialized in handling blockchain transactions, wallet management, and balance tracking.',
        avatar: getAgentAvatar('transaction', '1'),
        category: 'transaction',
        status: 'online',
        capabilities: [
            'Send and receive transactions',
            'Wallet balance monitoring',
            'Transaction history tracking',
            'Gas fee optimization',
            'Multi-chain support'
        ],
        blockchain: ['Ethereum', 'Polygon', 'BSC'],
        lastActive: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        createdBy: 'user1',
        isActive: true,
        version: '1.0.0',
    },
    {
        id: '2',
        name: 'DeFi Agent',
        description: 'Intelligent agent for DeFi protocol interactions, yield farming, and liquidity management.',
        avatar: getAgentAvatar('defi', '2'),
        category: 'defi',
        status: 'online',
        capabilities: [
            'Yield farming optimization',
            'Liquidity pool management',
            'DeFi protocol interactions',
            'APY monitoring',
            'Risk assessment'
        ],
        blockchain: ['Ethereum', 'Polygon', 'Arbitrum'],
        lastActive: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        createdBy: 'user1',
        isActive: true,
        version: '1.0.0',
    },
    {
        id: '3',
        name: 'NFT Agent',
        description: 'AI agent for NFT trading, collection management, and market analysis.',
        avatar: getAgentAvatar('nft', '3'),
        category: 'nft',
        status: 'busy',
        capabilities: [
            'NFT trading and listing',
            'Collection analysis',
            'Market trend monitoring',
            'Floor price tracking',
            'Rarity assessment'
        ],
        blockchain: ['Ethereum', 'Polygon', 'Solana'],
        lastActive: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        createdBy: 'user1',
        isActive: true,
        version: '1.0.0',
    },
    {
        id: '4',
        name: 'Wallet Agent',
        description: 'Comprehensive wallet management agent for multi-chain operations.',
        avatar: getAgentAvatar('wallet', '4'),
        category: 'wallet',
        status: 'offline',
        capabilities: [
            'Multi-wallet management',
            'Balance monitoring',
            'Security analysis',
            'Backup management',
            'Address book'
        ],
        blockchain: ['Ethereum', 'Bitcoin', 'Polygon', 'BSC'],
        lastActive: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        createdAt: new Date().toISOString(),
        createdBy: 'user1',
        isActive: true,
        version: '1.0.0',
    },
];

// Async thunks
export const fetchAgents = createAsyncThunk(
    'agent/fetchAgents',
    async (_, { rejectWithValue }) => {
        try {
            // TODO: Replace with actual API call
            const response = await new Promise<Agent[]>((resolve) =>
                setTimeout(() => resolve(mockAgents), 1000)
            );
            return response;
        } catch (error) {
            return rejectWithValue('Failed to fetch agents');
        }
    }
);

export const createAgent = createAsyncThunk(
    'agent/createAgent',
    async (agent: Omit<Agent, 'id' | 'createdAt' | 'lastActive' | 'isActive'>, { rejectWithValue }) => {
        try {
            // TODO: Replace with actual API call
            const response = await new Promise<Agent>((resolve) =>
                setTimeout(() => resolve({
                    ...agent,
                    id: Date.now().toString(),
                    createdAt: new Date().toISOString(),
                    lastActive: new Date().toISOString(),
                    isActive: true,
                }), 1000)
            );
            return response;
        } catch (error) {
            return rejectWithValue('Failed to create agent');
        }
    }
);

export const fetchAgentChats = createAsyncThunk(
    'agent/fetchAgentChats',
    async (agentId: string, { rejectWithValue }) => {
        try {
            // TODO: Replace with actual API call
            const response = await new Promise<AgentChat[]>((resolve) =>
                setTimeout(() => resolve([]), 1000)
            );
            return { agentId, chats: response };
        } catch (error) {
            return rejectWithValue('Failed to fetch agent chats');
        }
    }
);

export const sendMessageToAgent = createAsyncThunk(
    'agent/sendMessageToAgent',
    async ({ agentId, content }: { agentId: string; content: string }, { rejectWithValue }) => {
        try {
            // TODO: Replace with actual API call
            const response = await new Promise<AgentMessage>((resolve) =>
                setTimeout(() => resolve({
                    id: Date.now().toString(),
                    chatId: 'chat1',
                    content: `Agent response to: ${content}`,
                    sender: 'agent',
                    timestamp: new Date().toISOString(),
                }), 1000)
            );
            return response;
        } catch (error) {
            return rejectWithValue('Failed to send message to agent');
        }
    }
);

// Slice
const agentSlice = createSlice({
    name: 'agent',
    initialState,
    reducers: {
        setSelectedAgent: (state, action: PayloadAction<string | null>) => {
            state.selectedAgentId = action.payload;
        },
        setSelectedChat: (state, action: PayloadAction<string | null>) => {
            state.selectedChatId = action.payload;
        },
        updateAgentStatus: (state, action: PayloadAction<{ agentId: string; status: string }>) => {
            const agent = state.agents[action.payload.agentId];
            if (agent) {
                agent.status = action.payload.status as any;
                agent.lastActive = new Date().toISOString();
            }
        },
        addMessageToChat: (state, action: PayloadAction<{ chatId: string; message: AgentMessage }>) => {
            const chat = state.chats[action.payload.chatId];
            if (chat) {
                chat.messages.push(action.payload.message);
                chat.updatedAt = new Date().toISOString();
            }
        },
    },
    extraReducers: (builder) => {
        // Fetch Agents
        builder
            .addCase(fetchAgents.pending, (state) => {
                state.loading.agents = true;
                state.error.agents = null;
            })
            .addCase(fetchAgents.fulfilled, (state, action) => {
                state.loading.agents = false;
                action.payload.forEach((agent) => {
                    state.agents[agent.id] = agent;
                });
            })
            .addCase(fetchAgents.rejected, (state, action) => {
                state.loading.agents = false;
                state.error.agents = action.payload as string;
            });

        // Create Agent
        builder
            .addCase(createAgent.fulfilled, (state, action) => {
                state.agents[action.payload.id] = action.payload;
            });

        // Fetch Agent Chats
        builder
            .addCase(fetchAgentChats.pending, (state) => {
                state.loading.chats = true;
                state.error.chats = null;
            })
            .addCase(fetchAgentChats.fulfilled, (state, action) => {
                state.loading.chats = false;
                action.payload.chats.forEach((chat) => {
                    state.chats[chat.id] = chat;
                });
            })
            .addCase(fetchAgentChats.rejected, (state, action) => {
                state.loading.chats = false;
                state.error.chats = action.payload as string;
            });

        // Send Message to Agent
        builder
            .addCase(sendMessageToAgent.fulfilled, (state, action) => {
                // Add the response message to the appropriate chat
                const chatId = action.payload.chatId;
                if (state.chats[chatId]) {
                    state.chats[chatId].messages.push(action.payload);
                    state.chats[chatId].updatedAt = new Date().toISOString();
                }
            });
    },
});

export const {
    setSelectedAgent,
    setSelectedChat,
    updateAgentStatus,
    addMessageToChat,
} = agentSlice.actions;

export default agentSlice.reducer; 