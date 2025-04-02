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
// export const getPaymentMethodDuitku = async (payload) => {
//     try {
//         const response = await apiClient.post(`/transaction/paymentgateway-get-payment-method`, payload)
//         return response.data;
//     } catch (error) {
//         return error
//     }
// }

const transactionSlice = createSlice({
    name: "transactionSlice",
    initialState: {
        message: "",
        detailEvent: null,
        paymentMethod: null,
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
        })


    }
})


export {
    getPaymentMethodDuitku
};
export default transactionSlice.reducer