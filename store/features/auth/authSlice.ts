import { createSlice } from '@reduxjs/toolkit';

export type AuthSliceType = {
    access_token: string | null
    refresh_token: string | null
    isAuthenticated: boolean
}

const initialState: AuthSliceType = {
    access_token: null,
    refresh_token: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            state.isAuthenticated = action.payload.isAuthenticated;
        },
        refresh: (state, action) => {
            state.access_token = action.payload.access_token;
        },
        logout: (state) => {
            state.access_token = null;
            state.refresh_token = null;
            state.isAuthenticated = false;
        }
    }
});

export const { setUser, refresh, logout } = authSlice.actions;
export default authSlice.reducer;