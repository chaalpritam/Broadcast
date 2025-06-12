import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WalletState, WalletInfo } from '../../types/models';

const initialState: WalletState = {
  isConnected: false,
  address: null,
  chainId: null,
  balance: null,
  isLoading: false,
  error: null,
  isConnecting: false,
};

// Async thunks
export const connectWallet = createAsyncThunk(
  'wallet/connectWallet',
  async (_, { rejectWithValue }) => {
    try {
      // This will be implemented with actual wallet connection logic
      // For now, we'll simulate a connection
      const mockWalletInfo: WalletInfo = {
        address: '0x1234567890123456789012345678901234567890',
        chainId: 1,
        balance: '0.5',
        ensName: 'user.eth',
      };
      
      return mockWalletInfo;
    } catch (error) {
      return rejectWithValue('Failed to connect wallet');
    }
  }
);

export const disconnectWallet = createAsyncThunk(
  'wallet/disconnectWallet',
  async (_, { rejectWithValue }) => {
    try {
      // This will be implemented with actual wallet disconnection logic
      return true;
    } catch (error) {
      return rejectWithValue('Failed to disconnect wallet');
    }
  }
);

export const fetchWalletBalance = createAsyncThunk(
  'wallet/fetchWalletBalance',
  async (address: string, { rejectWithValue }) => {
    try {
      // This will be implemented with actual balance fetching logic
      const balance = '0.5'; // Mock balance
      return balance;
    } catch (error) {
      return rejectWithValue('Failed to fetch wallet balance');
    }
  }
);

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletInfo: (state, action: PayloadAction<WalletInfo>) => {
      state.address = action.payload.address;
      state.chainId = action.payload.chainId;
      state.balance = action.payload.balance;
      state.isConnected = true;
      state.error = null;
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
      .addCase(connectWallet.pending, (state) => {
        state.isConnecting = true;
        state.error = null;
      })
      .addCase(connectWallet.fulfilled, (state, action) => {
        state.isConnecting = false;
        state.isConnected = true;
        state.address = action.payload.address;
        state.chainId = action.payload.chainId;
        state.balance = action.payload.balance;
        state.error = null;
      })
      .addCase(connectWallet.rejected, (state, action) => {
        state.isConnecting = false;
        state.error = action.payload as string;
      })
      .addCase(disconnectWallet.fulfilled, (state) => {
        state.isConnected = false;
        state.address = null;
        state.chainId = null;
        state.balance = null;
        state.error = null;
      })
      .addCase(fetchWalletBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWalletBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance = action.payload;
      })
      .addCase(fetchWalletBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setWalletInfo, setConnecting, setError, clearError } = walletSlice.actions;
export default walletSlice.reducer; 