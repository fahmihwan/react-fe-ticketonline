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


const findCartByUserId = createAsyncThunk("cart/findCartByUserId", async ({ userId }, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/cart/${userId}`)
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
        listCartUser: [],
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
        }).addCase(findCartByUserId.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(findCartByUserId.fulfilled, (state, action) => {

            return (state = {
                ...state,
                listCartUser: action.payload.data,
                status: "success"
            })
        }).addCase(findCartByUserId.rejected, (state, action) => {
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
    findCartByUserId
};
export default cartSlice.reducer