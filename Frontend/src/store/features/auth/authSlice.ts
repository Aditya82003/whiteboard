import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../lib/axios";


export type User={
    id:string
    email:string
    fullname:string
    profilePic?:string
    createdAt?:string
    updatedAt?:string
}

type AuthState = {
    user: User | null
    isSigningUp: boolean
    isSigingIn: boolean
    isCheckAuth: boolean
    isUpdatingProfile:boolean
    onlineUser: string[] | null
    error: string | null
}
const initialState: AuthState = {
    user:null,
    isSigingIn:false,
    isSigningUp:false,
    isCheckAuth:true,
    isUpdatingProfile:false,
    onlineUser:null,
    error:null
}

export const checkAuth=createAsyncThunk<User,void,{rejectValue:string}>("auth/check",async(_,thunkAPI)=>{
     try {
        const res = await axiosInstance.get('/auth/check');
        return res.data as User
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Authentication check failed");
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {}
})

export default authSlice.reducer