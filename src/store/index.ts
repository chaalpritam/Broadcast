import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatsSlice';
import statusReducer from './slices/statusSlice';
import callsReducer from './slices/callsSlice';
import communityReducer from './slices/communitySlice';
import agentReducer from './slices/agentSlice';
import authReducer from './slices/authSlice';
import walletReducer from './slices/walletSlice';
import xmtpReducer from './slices/xmtpSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    status: statusReducer,
    calls: callsReducer,
    community: communityReducer,
    agent: agentReducer,
    auth: authReducer,
    wallet: walletReducer,
    xmtp: xmtpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
