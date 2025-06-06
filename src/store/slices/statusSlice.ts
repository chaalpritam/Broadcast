import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Status } from '../../types/models';

interface StatusState {
    statuses: Status[];
    myStatus: Status | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: StatusState = {
    statuses: [],
    myStatus: null,
    isLoading: false,
    error: null,
};

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setStatuses: (state, action: PayloadAction<Status[]>) => {
            state.statuses = action.payload;
        },
        setMyStatus: (state, action: PayloadAction<Status>) => {
            state.myStatus = action.payload;
        },
        addStatus: (state, action: PayloadAction<Status>) => {
            if (action.payload.userId === 'me') {
                state.myStatus = action.payload;
            } else {
                state.statuses.push(action.payload);
            }
        },
        updateStatus: (state, action: PayloadAction<{ id: string; updates: Partial<Status> }>) => {
            const { id, updates } = action.payload;
            if (state.myStatus?.id === id) {
                state.myStatus = { ...state.myStatus, ...updates };
            } else {
                const status = state.statuses.find(s => s.id === id);
                if (status) {
                    Object.assign(status, updates);
                }
            }
        },
        deleteStatus: (state, action: PayloadAction<string>) => {
            if (state.myStatus?.id === action.payload) {
                state.myStatus = null;
            } else {
                state.statuses = state.statuses.filter(status => status.id !== action.payload);
            }
        },
        markStatusAsViewed: (state, action: PayloadAction<{ statusId: string; userId: string }>) => {
            const { statusId, userId } = action.payload;
            const status = state.statuses.find(s => s.id === statusId);
            if (status && !status.viewedBy.includes(userId)) {
                status.viewedBy.push(userId);
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
    setStatuses,
    setMyStatus,
    addStatus,
    updateStatus,
    deleteStatus,
    markStatusAsViewed,
    setLoading,
    setError,
} = statusSlice.actions;

export default statusSlice.reducer;
