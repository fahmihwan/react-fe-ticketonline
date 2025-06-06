import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/api";


const scanTicket = createAsyncThunk("cart/scanTicket", async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await apiClient.post(`/checker`, payload)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const listLogChecker = createAsyncThunk("listLogChecker", async ({ userId }, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/checker/${userId}/log-checker`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const checkerSlice = createSlice({
    name: "checkerSlice",
    initialState: {
        message: "",
        scanTicketStatus: false,
        logChecker: null,
        status: null,
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(scanTicket.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(scanTicket.fulfilled, (state, action) => {

            return (state = {
                ...state,
                scanTicketStatus: action.payload.data,
                status: "success"
            })
        }).addCase(scanTicket.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        }).addCase(listLogChecker.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(listLogChecker.fulfilled, (state, action) => {

            return (state = {
                ...state,
                logChecker: action.payload.data,
                status: "success"
            })
        }).addCase(listLogChecker.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        })
    }
})


export {
    scanTicket,
    listLogChecker
};
export default checkerSlice.reducer