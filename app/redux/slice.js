"use client";  // Add this at the top if using Next.js App Router

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
    isAuth: false,
    isLoading: false,
    user: null,
    error: null
};

// Register user
export const reg = createAsyncThunk("auth/reg", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, formData, {
            withCredentials: true,
        });
        console.log("response",response)
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Login user
export const login = createAsyncThunk("auth/login", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, formData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Create Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuth = false;
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login Cases
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = action.payload.success;
                state.user = action.payload.success ? action.payload.user : null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Register Cases
            .addCase(reg.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(reg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = action.payload.success;
                state.user = action.payload.success ? action.payload.user : null;
            })
            .addCase(reg.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions; // Export logout action
export default authSlice.reducer;
