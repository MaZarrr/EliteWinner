'use client'

import { configureStore } from "@reduxjs/toolkit"
import { api } from '../Services/baseApi'
import apiSlice from "./Features/appSlice";

export const store = configureStore({
    reducer: {
        winners: apiSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(api.middleware)
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
