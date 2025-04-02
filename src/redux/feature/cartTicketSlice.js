import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/api";


const createCartTicket = createAsyncThunk("cart/createCartTicket", async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await apiClient.post(`/cart/cart-ticket`, payload)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const cartSlice = createSlice({
    name: "cartSlice",
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
        builder.addCase(createCartTicket.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(createCartTicket.fulfilled, (state, action) => {

            return (state = {
                ...state,
                detailEvent: action.payload.data,
                status: "success"
            })
        }).addCase(createCartTicket.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        })


    }
})


export {
    createCartTicket,
};
export default cartSlice.reducer