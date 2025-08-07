import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../lib/axios";
import type { SignInState, SignUpState } from "../../../types/types";
import type { AxiosError } from "axios";


export type User = {
    id: string
    email: string
    fullname: string
    profilePic?: string
}

type SignIn_Up_Response = {
    user: User
}

type AuthState = {
    user: User | null
    isSigningUp: boolean
    isSigningIn: boolean
    isCheckAuth: boolean
    isUpdatingProfile: boolean
    onlineUser: string[] | null
    error: string | null
}
const initialState: AuthState = {
    user: null,
    isSigningIn: false,
    isSigningUp: false,
    isCheckAuth: true,
    isUpdatingProfile: false,
    onlineUser: null,
    error: null
}

export const checkAuthThunk = createAsyncThunk<User, void, { rejectValue: string }>("auth/check", async (_, thunkAPI) => {
    try {
        const res = await axiosInstance.get('/auth/check');
        return res.data as User
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Authentication check failed");
    }
})

export const signUpThunk = createAsyncThunk<SignIn_Up_Response, SignUpState, { rejectValue: string }>("auth/signup", async (SignUpFormData, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post('/auth/signup', SignUpFormData)
        return res.data as SignIn_Up_Response
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        const errorMsg = err.response?.data.message || "Signup failed. PLease try again"
        return rejectWithValue(errorMsg);
    }
})

export const signInThunk = createAsyncThunk<SignIn_Up_Response, SignInState, { rejectValue: string }>("auth/sigin", async (SignInFormData, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post('/auth/signin', SignInFormData)
        return res.data as SignIn_Up_Response
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        const errorMsg = err.response?.data.message || "Signin failed. PLease try again"
        return rejectWithValue(errorMsg);
    }
})

export const logOutThunk = createAsyncThunk<void, void, { rejectValue: string }>('auth/logout', async (_, { rejectWithValue }) => {
    try {
        await axiosInstance.post('/auth/signout', {}, { withCredentials: true })
        return
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const errorMsg = err.response?.data?.message || "upload failed";
        return rejectWithValue(errorMsg);
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //check auth
        builder.addCase(checkAuthThunk.pending, (state) => {
            state.isCheckAuth = true
        })
            .addCase(checkAuthThunk.fulfilled, (state, action) => {
                state.isCheckAuth = false,
                    state.user = action.payload
                state.error = null
            })
            .addCase(checkAuthThunk.rejected, (state, action) => {
                state.isCheckAuth = false
                state.error = action.payload || "Check Auth failed"
            })
            //Sign up
            .addCase(signUpThunk.pending, (state) => {
                state.isSigningUp = true
                state.error = null
            })
            .addCase(signUpThunk.fulfilled, (state, action) => {
                state.isSigningUp = false
                state.user = action.payload.user
                state.error = null
            })
            .addCase(signUpThunk.rejected, (state, action) => {
                state.isSigningUp = false
                state.error = action.payload || "Signup failed"
            })
            // sign in 
            .addCase(signInThunk.pending, (state) => {
                state.isSigningIn = true
                state.error = null
            })
            .addCase(signInThunk.fulfilled, (state, action) => {
                state.isSigningIn = false
                state.user = action.payload.user
            })
            .addCase(signInThunk.rejected, (state, action) => {
                state.isSigningIn = false
                state.error = action.payload || "Sign in failed"
            })
            .addCase(logOutThunk.fulfilled, (state) => {
                state.user = null
                state.error = null
            })
            .addCase(logOutThunk.rejected, (state, action) => {
                state.error = action.payload || "unavailable to logout"
            })
    }
})

export default authSlice.reducer