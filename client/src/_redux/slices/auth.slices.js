import { createSlice } from '@reduxjs/toolkit'
import { handleAuthentication, handleForgotPassword, handleGenerateNewAccessToken, handleLogout, handleResetPassword, loginUser, registerUser, verifyOTP } from '../actions/auth.actions.js'

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: false,
    message: null,
    token: null,
    status: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: () => { },
        clearState: (state) => {
            state.loading = false;
            state.error = false;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.message = null
        })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.error = false;
                state.loading = false;
                state.message = action?.payload?.message;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = true;
                state.loading = false;
                state.message = action?.payload?.message
            })
            .addCase(loginUser.pending, (state) => {
                state.error = false;
                state.loading = true;
                state.message = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.error = false;
                state.loading = false;
                state.message = action?.payload?.message;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = true;
                state.loading = false;
                state.message = action?.payload?.message;
            })
            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.message = null;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.user = action?.payload?.data?.user;
                state.isAuthenticated = true;
                state.loading = false;
                state.error = false;
                state.message = action?.payload?.message;
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = true;
                state.message = action?.payload?.message;
            })
            .addCase(handleLogout.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.message = null;
            })
            .addCase(handleLogout.fulfilled, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = false;
                state.message = action?.payload?.message;
                state.token = null
            })
            .addCase(handleLogout.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action?.payload?.message;
            })
            .addCase(handleForgotPassword.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.message = null;
            })
            .addCase(handleForgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.message = action?.payload?.message;
            })
            .addCase(handleForgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action?.payload?.message;
            })
            .addCase(handleResetPassword.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.message = null;
            })
            .addCase(handleResetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.message = action?.payload?.message;
            })
            .addCase(handleResetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action?.payload?.message;
            })
            .addCase(handleAuthentication.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.message = null
            })
            .addCase(handleAuthentication.fulfilled, (state, action) => {
                state.user = action?.payload?.data?.user;
                state.isAuthenticated = true;
                state.loading = false;
                state.error = false;
                state.message = action?.payload?.message;
            })
            .addCase(handleAuthentication.rejected, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = true;
                state.message = action?.payload?.message;
            })
            .addCase(handleGenerateNewAccessToken.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.message = null;
                state.token = null;
            })
            .addCase(handleGenerateNewAccessToken.fulfilled, (state, action) => {
                state.user = action?.payload?.data?.user;
                state.isAuthenticated = true;
                state.loading = false;
                state.error = false;
                state.message = action?.payload?.message;
                state.token = action?.payload?.data?.accessToken;
            })
            .addCase(handleGenerateNewAccessToken.rejected, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = true;
                state.message = action?.payload?.message;
                state.token = null;
            })
    }

})

export const { setUser, clearState } = authSlice.actions
export default authSlice.reducer