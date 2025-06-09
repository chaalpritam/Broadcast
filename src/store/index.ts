import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatsSlice';
import statusReducer from './slices/statusSlice';
import callsReducer from './slices/callsSlice';
import communityReducer from './slices/communitySlice';
import agentReducer from './slices/agentSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    status: statusReducer,
    calls: callsReducer,
    community: communityReducer,
    agent: agentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
