import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/api";


const getPaymentMethodDuitku = createAsyncThunk("duitku/getPaymentMethodDuitku", async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await apiClient.post(`/transaction/paymentgateway-get-payment-method`, payload)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const checkoutTransaction = createAsyncThunk("duitku/checkout", async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await apiClient.post(`/transaction/checkout`, payload)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const checkIfCurrentTransactionEventForUserExists = createAsyncThunk("transaction/checkIfCurrentTransactionEventForUserExists", async ({ userId, slug }, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/transaction/check-transaction-exists/${userId}/${slug}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const cancelledTransaction = createAsyncThunk("transaction/cancelledTransaction", async ({ transactionCode }, { rejectWithValue }) => {
    try {
        const response = await apiClient.put(`/transaction/${transactionCode}/cancel`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})



const transactionSlice = createSlice({
    name: "transactionSlice",
    initialState: {
        message: "",
        detailEvent: null,
        paymentMethod: null,
        transactionExist: null,
        cancelledTransaction: null,
        checkout: null,
        status: null,
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPaymentMethodDuitku.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(getPaymentMethodDuitku.fulfilled, (state, action) => {
            return (state = {
                ...state,
                paymentMethod: action.payload.data,
                status: "success"
            })
        }).addCase(getPaymentMethodDuitku.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        }).addCase(checkoutTransaction.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(checkoutTransaction.fulfilled, (state, action) => {
            return (state = {
                ...state,
                checkout: action.payload.data,
                status: "success"
            })
        }).addCase(checkoutTransaction.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        }).addCase(cancelledTransaction.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(cancelledTransaction.fulfilled, (state, action) => {
            return (state = {
                ...state,
                cancelledTransaction: action.payload.data,
                status: "success"
            })
        }).addCase(cancelledTransaction.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        }).addCase(checkIfCurrentTransactionEventForUserExists.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(checkIfCurrentTransactionEventForUserExists.fulfilled, (state, action) => {
            return (state = {
                ...state,
                transactionExist: action.payload.data,
                status: "success"
            })
        }).addCase(checkIfCurrentTransactionEventForUserExists.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        })




    }
})


export {
    getPaymentMethodDuitku,
    checkoutTransaction,
    cancelledTransaction,
    checkIfCurrentTransactionEventForUserExists
};
export default transactionSlice.reducer