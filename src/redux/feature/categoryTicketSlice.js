import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/api";



const createCategoryTicket = createAsyncThunk("createCategoryTicket", async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await apiClient.post("/cetegory-ticket", payload)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const removeCategoryTicket = createAsyncThunk("removeCategoryTicket", async ({ categoryTicketId }, { rejectWithValue }) => {
    try {
        const response = await apiClient.delete(`/cetegory-ticket/remove/${categoryTicketId}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const categoryTicketSlice = createSlice({
    name: "categoryTicketSlice",
    initialState: {
        message: "",
        detailCategoryTicket: null,
        status: null,
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createCategoryTicket.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(createCategoryTicket.fulfilled, (state, action) => {
            return (state = {
                ...state,
                detailCategoryTicket: action.payload.data,
                status: "success"
            })
        }).addCase(createCategoryTicket.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        }).addCase(removeCategoryTicket.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(removeCategoryTicket.fulfilled, (state, action) => {
            return (state = {
                ...state,
                detailCategoryTicket: action.payload.data,
                status: "success"
            })
        }).addCase(removeCategoryTicket.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        })
    }
})


export {
    createCategoryTicket,
    removeCategoryTicket
};
export default categoryTicketSlice.reducer