import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, { payload }) => {
            state.user = payload.user;
            state.token = payload.token;
            state.refreshToken = payload.refreshToken;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;