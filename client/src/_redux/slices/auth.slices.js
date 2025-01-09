import { createSlice } from '@reduxjs/toolkit';
import { handleAuthentication, handleForgotPassword, handleGenerateNewAccessToken, handleLogout, handleResetPassword, loginUser, registerUser, verifyOTP } from '../actions/auth.actions.js';

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: false,
    message: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: () => { },
        clearState: (state) => {
            state.message = null;
            state.error = false;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.message = action.payload.message;
                state.user = null
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = true;
                state.loading = false;
                state.message = action.payload.message;
                state.user = null
                state.isAuthenticated = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.error = false;
                state.loading = false;
                state.message = action.payload.message;
                state.user = null;
                state.isAuthenticated = false
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = true;
                state.loading = false;
                state.message = action.payload.message;
                state.user = null;
                state.isAuthenticated = false
            })
            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.user = action.payload.data.user;
                state.isAuthenticated = true;
                state.loading = false;
                state.error = false;
                state.message = action.payload.message;
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = true;
                state.message = action.payload.message;
            })
            .addCase(handleLogout.pending, (state) => {
                state.loading = true;
            })
            .addCase(handleLogout.fulfilled, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = false;
                state.message = action.payload.message;
            })
            .addCase(handleLogout.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload.message;
            })
            .addCase(handleForgotPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(handleForgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.message = action.payload.message;
                state.user = null;
                state.isAuthenticated = null;
            })
            .addCase(handleForgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload.message;
                state.user = null;
                state.isAuthenticated = null;
            })
            .addCase(handleResetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(handleResetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.message = action.payload.message;
                state.user = null;
                state.isAuthenticated = null;
            })
            .addCase(handleResetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload.message;
                state.user = null;
                state.isAuthenticated = null;
            })
            .addCase(handleAuthentication.pending, (state) => {
                state.loading = true;
            })
            .addCase(handleAuthentication.fulfilled, (state, action) => {
                state.user = action.payload.data.user;
                state.isAuthenticated = true;
                state.loading = false;
                state.error = false;
                state.message = action.payload.message;
            })
            .addCase(handleAuthentication.rejected, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = true;
                state.message = action.payload.message;
            })
            .addCase(handleGenerateNewAccessToken.pending, (state) => {
                state.loading = true;
            })
            .addCase(handleGenerateNewAccessToken.fulfilled, (state, action) => {
                state.user = action.payload.data.user;
                state.isAuthenticated = true;
                state.loading = false;
                state.error = false;
                state.message = action.payload.message;
            })
            .addCase(handleGenerateNewAccessToken.rejected, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = true;
                state.message = action.payload.message;
            });
    }
});

export const { setUser, clearState } = authSlice.actions;
export default authSlice.reducer;
