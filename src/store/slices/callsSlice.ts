import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Call } from '../../types/models';

interface CallsState {
    calls: Call[];
    isLoading: boolean;
    error: string | null;
}

const initialState: CallsState = {
    calls: [],
    isLoading: false,
    error: null,
};

const callsSlice = createSlice({
    name: 'calls',
    initialState,
    reducers: {
        setCalls: (state, action: PayloadAction<Call[]>) => {
            state.calls = action.payload;
        },
        addCall: (state, action: PayloadAction<Call>) => {
            state.calls.unshift(action.payload);
        },
        updateCall: (state, action: PayloadAction<{ id: string; updates: Partial<Call> }>) => {
            const { id, updates } = action.payload;
            const call = state.calls.find(c => c.id === id);
            if (call) {
                Object.assign(call, updates);
            }
        },
        deleteCall: (state, action: PayloadAction<string>) => {
            state.calls = state.calls.filter(call => call.id !== action.payload);
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
    setCalls,
    addCall,
    updateCall,
    deleteCall,
    setLoading,
    setError,
} = callsSlice.actions;

export default callsSlice.reducer;
