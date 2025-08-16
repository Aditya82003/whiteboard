import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice'
import boardReducer from './features/boards/boardSlice'
import messageReducer from "./features/Messages/messageSlice";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        board:boardReducer,
        message:messageReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch