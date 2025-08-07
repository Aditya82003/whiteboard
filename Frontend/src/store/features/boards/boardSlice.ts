import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../lib/axios";
import type { AxiosError } from "axios";

type BoardUser = {
    id: string
    fullname: string
}
type Board = {
    id: string
    ownerId: string
    owner?: Board
    collaborators?: BoardUser[]
    createdAt: string
    updatedAt: string
}
type BoardState = {
    boards: Board[]
    currentBoard: Board | null
    isBoardLoading: boolean
    error: string | null
}

const initialState: BoardState = {
    boards: [],
    currentBoard: null,
    isBoardLoading: false,
    error: null
}

export const fetchBoardsThunk = createAsyncThunk<Board[], void, { rejectValue: string }>("board/fetchBoards", async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get('/board')
        return res.data.boards
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(error.response?.data.message || "Unavailable to fetch boards")
    }
})
export const createBoardThunk = createAsyncThunk<Board, void, { rejectValue: string }>("board/createBoard", async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post('/board')
        return res.data.board
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(error.response?.data.message || "Unavailable to create boards")
    }
})

export const joinBoardThunk = createAsyncThunk<Board, { id: string }, { rejectValue: string }>("board/joinBoard", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post(`/board/${id}/join`)
        return res.data.board as Board
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(error.response?.data.message || "Unavailable to join boards")
    }
})

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //fetch boards
        builder.addCase(fetchBoardsThunk.pending, (state) => {
            state.isBoardLoading = true
        })
            .addCase(fetchBoardsThunk.fulfilled, (state, action) => {
                state.isBoardLoading = false,
                    state.boards = action.payload
                state.error = null
            })
            .addCase(fetchBoardsThunk.rejected, (state, action) => {
                state.isBoardLoading = false
                state.error = action.payload || "Can't fetch board"
            })
            //create board
            .addCase(createBoardThunk.pending, (state) => {
                state.isBoardLoading = true
            })
            .addCase(createBoardThunk.fulfilled, (state, action) => {
                state.isBoardLoading = false
                state.boards.push(action.payload)
                state.currentBoard = action.payload
                state.error = null
            })
            .addCase(createBoardThunk.rejected, (state, action) => {
                state.isBoardLoading = false
                state.error = action.payload || "Can't create board"
            })
            //join board
            .addCase(joinBoardThunk.pending, (state) => {
                state.isBoardLoading = true
            })
            .addCase(joinBoardThunk.fulfilled, (state, action) => {
                state.isBoardLoading = false
                const exists = state.boards.find(board => board.id === action.payload.id);
                if (!exists) {
                    state.boards.push(action.payload);
                }
                state.currentBoard = action.payload
                state.error = null
            })
            .addCase(joinBoardThunk.rejected, (state, action) => {
                state.isBoardLoading = false
                state.error = action.payload || "Can't join board"
            })
    }
})

export default boardSlice.reducer