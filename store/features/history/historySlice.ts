import { createSlice } from "@reduxjs/toolkit";

export type HistorySliceType = {
    history: string[]
}

const initialState: HistorySliceType = {
    history: []
}

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setHistory: (state, action) => {
            state.history = action.payload.history;
        },
        addQuery: (state, action) => {
            state.history = Array.from(new Set([action.payload.query, ...state.history]));
        },
        removeQuery: (state, action) => {
            state.history = [...state.history.filter(query => query !== action.payload.query)];
        },
        clearHistory: (state) => {
            state.history = []
        }
    }
});

export const { setHistory, addQuery, removeQuery, clearHistory } = historySlice.actions;
export default historySlice.reducer;