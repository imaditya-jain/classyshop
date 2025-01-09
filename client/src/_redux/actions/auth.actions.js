import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk('/auth/register', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/v2/auth/register', data, { withCredentials: true });
        return response.data;
    } catch (error) {
        if (error.response) {
            return rejectWithValue({
                status: error.response.status,
                message: error.response.data.message || 'Registration failed.',
            })
        } else {
            return rejectWithValue({
                status: 500,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }
})

export const loginUser = createAsyncThunk('/auth/login', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/v2/auth/login', data, { withCredentials: true })
        return response.data
    } catch (error) {
        if (error.response) {
            return rejectWithValue({
                status: error.response.status,
                message: error.response.data.message || 'Login failed.',
            })
        } else {
            return rejectWithValue({
                status: 500,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }
})

export const verifyOTP = createAsyncThunk('/auth/verify-otp', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/v2/auth/verify-otp', data, { withCredentials: true })
        return response.data
    } catch (error) {
        if (error.response) {
            return rejectWithValue({
                status: error.response.status,
                message: error.response.data.message || 'OTP verification failed.',
            })
        } else {
            return rejectWithValue({
                status: 500,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }
})

export const handleLogout = createAsyncThunk('/auth/logout', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/v2/auth/logout', { withCredentials: true })
        return response.data
    } catch (error) {
        if (error.response) {
            return rejectWithValue({
                status: error.response.status,
                message: error.response.data.message || 'Failed to logout',
            })
        } else {
            return rejectWithValue({
                status: 500,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }
})

export const handleForgotPassword = createAsyncThunk('/auth/forgot-password', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/v2/auth/forgot-password', data, { withCredentials: true })
        return response.data
    } catch (error) {
        if (error.response) {
            return rejectWithValue({
                status: error.response.status,
                message: error.response.data.message || 'Password reset request failed.',
            })
        } else {
            return rejectWithValue({
                status: 500,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }
})

export const handleResetPassword = createAsyncThunk('/auth/reset-password', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.patch('/api/v2/auth/reset-password', data, { withCredentials: true })
        return response.data
    } catch (error) {
        if (error.response) {
            return rejectWithValue({
                status: error.response.status,
                message: error.response.data.message || 'Password reset failed.',
            })
        } else {
            return rejectWithValue({
                status: 500,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }
})

export const handleAuthentication = createAsyncThunk('/auth/auth-check', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/v2/auth/auth-check', { withCredentials: true });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return rejectWithValue({ status: 401, message: 'Refresh token' });
        }
        return rejectWithValue({ status: 500, message: 'Something went wrong. Please try again later.' });
    }
});

export const handleGenerateNewAccessToken = createAsyncThunk('/auth/generate-new-access-token', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/v2/auth/refresh-token', { withCredentials: true });
        return response.data;
    } catch (error) {
        if (error.response) {
            return rejectWithValue({
                status: error.response.status,
                message: error.response.data.message || 'Please make login again.',
            });
        }
        return rejectWithValue({ status: 500, message: 'Something went wrong. Please try again later.' });
    }
});
