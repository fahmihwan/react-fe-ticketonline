import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/api";


const getListTransaction = createAsyncThunk("histories/listtransaction", async ({ userId }, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/transaction-histories/histories/${userId}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const getDetailHistoryTransaction = createAsyncThunk("histories/detail-transaction", async ({ transactionCode }, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/transaction-histories/histories-detail/${transactionCode}/detail-user`,)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const allOfTransactionFromUsersAdmin = createAsyncThunk("transaction-histories/admin", async ({ params }, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/transaction-histories/admin${params}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const historiesSlice = createSlice({
    name: "historiesSlice",
    initialState: {
        message: "",
        detailTransaction: null,
        historyTransaction: null,
        listTransactionAdmin: null,
        status: null,
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getListTransaction.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(getListTransaction.fulfilled, (state, action) => {
            return (state = {
                ...state,
                listHistoryTransaction: action.payload.data,
                status: "success"
            })
        }).addCase(getListTransaction.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        }).addCase(getDetailHistoryTransaction.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(getDetailHistoryTransaction.fulfilled, (state, action) => {
            return (state = {
                ...state,
                detailTransaction: action.payload.data,
                status: "success"
            })
        }).addCase(getDetailHistoryTransaction.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            })
        }).addCase(allOfTransactionFromUsersAdmin.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(allOfTransactionFromUsersAdmin.fulfilled, (state, action) => {
            return (state = {
                ...state,
                listTransactionAdmin: action.payload.data,
                status: "success"
            })
        }).addCase(allOfTransactionFromUsersAdmin.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        })
    }
})


export {
    getListTransaction,
    getDetailHistoryTransaction,
    allOfTransactionFromUsersAdmin
};
export default historiesSlice.reducer