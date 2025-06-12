import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { XMTPState, XMTPConversation } from '../../types/models';

const initialState: XMTPState = {
  isConnected: false,
  client: null,
  conversations: [],
  isLoading: false,
  error: null,
  isConnecting: false,
};

// Async thunks
export const connectXMTP = createAsyncThunk(
  'xmtp/connectXMTP',
  async (signer: any, { rejectWithValue }) => {
    try {
      // This will be implemented with actual XMTP connection logic
      // For now, we'll simulate a connection
      const mockClient = {
        address: '0x1234567890123456789012345678901234567890',
        conversations: [],
      };
      
      return mockClient;
    } catch (error) {
      return rejectWithValue('Failed to connect to XMTP');
    }
  }
);

export const disconnectXMTP = createAsyncThunk(
  'xmtp/disconnectXMTP',
  async (_, { rejectWithValue }) => {
    try {
      // This will be implemented with actual XMTP disconnection logic
      return true;
    } catch (error) {
      return rejectWithValue('Failed to disconnect from XMTP');
    }
  }
);

export const fetchConversations = createAsyncThunk(
  'xmtp/fetchConversations',
  async (_, { rejectWithValue }) => {
    try {
      // This will be implemented with actual conversation fetching logic
      const mockConversations: XMTPConversation[] = [
        {
          id: '1',
          peerAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
          lastMessage: 'Hey, how are you?',
          lastMessageTime: '2024-03-15T10:30:00Z',
          unreadCount: 2,
        },
        {
          id: '2',
          peerAddress: '0xfedcba0987654321fedcba0987654321fedcba09',
          lastMessage: 'Thanks for the help!',
          lastMessageTime: '2024-03-15T09:15:00Z',
          unreadCount: 0,
        },
      ];
      
      return mockConversations;
    } catch (error) {
      return rejectWithValue('Failed to fetch conversations');
    }
  }
);

const xmtpSlice = createSlice({
  name: 'xmtp',
  initialState,
  reducers: {
    setClient: (state, action: PayloadAction<any>) => {
      state.client = action.payload;
      state.isConnected = true;
      state.error = null;
    },
    setConversations: (state, action: PayloadAction<XMTPConversation[]>) => {
      state.conversations = action.payload;
    },
    addConversation: (state, action: PayloadAction<XMTPConversation>) => {
      state.conversations.unshift(action.payload);
    },
    updateConversation: (state, action: PayloadAction<{ id: string; updates: Partial<XMTPConversation> }>) => {
      const index = state.conversations.findIndex(conv => conv.id === action.payload.id);
      if (index !== -1) {
        state.conversations[index] = { ...state.conversations[index], ...action.payload.updates };
      }
    },
    setConnecting: (state, action: PayloadAction<boolean>) => {
      state.isConnecting = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isConnecting = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectXMTP.pending, (state) => {
        state.isConnecting = true;
        state.error = null;
      })
      .addCase(connectXMTP.fulfilled, (state, action) => {
        state.isConnecting = false;
        state.isConnected = true;
        state.client = action.payload;
        state.error = null;
      })
      .addCase(connectXMTP.rejected, (state, action) => {
        state.isConnecting = false;
        state.error = action.payload as string;
      })
      .addCase(disconnectXMTP.fulfilled, (state) => {
        state.isConnected = false;
        state.client = null;
        state.conversations = [];
        state.error = null;
      })
      .addCase(fetchConversations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  setClient, 
  setConversations, 
  addConversation, 
  updateConversation, 
  setConnecting, 
  setError, 
  clearError 
} = xmtpSlice.actions;
export default xmtpSlice.reducer; 