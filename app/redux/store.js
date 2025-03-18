
"use client"
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice"; // Fix: Change useReducer to authReducer

const store = configureStore({
    reducer: {
        auth: authReducer, // Fix: Ensure it matches the slice export
    },
});

export default store;
