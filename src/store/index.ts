import { configureStore } from '@reduxjs/toolkit';
import chatsReducer from './slices/chatsSlice';
import callsReducer from './slices/callsSlice';
import statusReducer from './slices/statusSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    chats: chatsReducer,
    calls: callsReducer,
    status: statusReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 