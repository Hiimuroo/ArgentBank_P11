import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        email: '',
        firstName: '',
        lastName: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.fulfilled, (state, { payload }) => {
                state.username = payload.userName;
                state.email = payload.email;
                state.firstName = payload.firstName;
                state.lastName = payload.lastName;
            });
    },
});

export const fetchUserData = createAsyncThunk(
    'user/getUserData',
    async () => {
        const token = localStorage.getItem('token');
        const res = await axios({
            method: 'post',
            url: 'http://localhost:3001/api/v1/user/profile',
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.body;
    }
);

export default userSlice.reducer;
