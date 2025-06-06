import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Chat, Message } from '../../types/models';

interface ChatsState {
    [x: string]: any;
    chats: Chat[];
    activeChat: string | null;
    messages: Record<string, Message[]>;
    isLoading: boolean;
    error: string | null;
}

const initialState: ChatsState = {
    chats: [],
    activeChat: null,
    messages: {},
    isLoading: false,
    error: null,
};

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats: (state, action: PayloadAction<Chat[]>) => {
            state.chats = action.payload;
        },
        addChat: (state, action: PayloadAction<Chat>) => {
            state.chats.push(action.payload);
        },
        setActiveChat: (state, action: PayloadAction<string>) => {
            state.activeChat = action.payload;
        },
        setMessages: (state, action: PayloadAction<{ chatId: string; messages: Message[] }>) => {
            const { chatId, messages } = action.payload;
            state.messages[chatId] = messages;
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            const message = action.payload;
            if (!state.messages[message.chatId]) {
                state.messages[message.chatId] = [];
            }
            state.messages[message.chatId].push(message);

            // Update last message in chat
            const chat = state.chats.find(c => c.id === message.chatId);
            if (chat) {
                chat.lastMessage = message;
                if (!message.isSent) {
                    chat.unreadCount += 1;
                }
            }
        },
        markChatAsRead: (state, action: PayloadAction<string>) => {
            const chat = state.chats.find(c => c.id === action.payload);
            if (chat) {
                chat.unreadCount = 0;
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const {
    setChats,
    addChat,
    setActiveChat,
    setMessages,
    addMessage,
    markChatAsRead,
    setLoading,
    setError,
} = chatsSlice.actions;

export default chatsSlice.reducer;
