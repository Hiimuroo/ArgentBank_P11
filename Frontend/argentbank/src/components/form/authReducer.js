import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    credentials: '',
    token: '',
    connected: false,
    status: 'idle',
    error: null,
};

const BASE_URL = 'http://localhost:3001/api/v1/user/login';

export const getUserToken = createAsyncThunk(
    'auth/getUserToken',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(BASE_URL, credentials);
            const token = response.data.body.token;
            localStorage.setItem('token', token);
            return token;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : 'Network Problem');
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserToken.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserToken.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload;
                state.connected = true;
            })
            .addCase(getUserToken.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message || 'Network Problem'; // Transforme l'erreur en une chaîne de caractères
            });
    },
});

export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthToken = (state) => state.auth.token;

export const { clearError } = authSlice.actions; // Action creator pour effacer l'erreur

export default authSlice.reducer;
