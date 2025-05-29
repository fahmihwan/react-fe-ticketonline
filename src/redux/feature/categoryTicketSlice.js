import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/api";




const getAllCategoryTicketBySlug = createAsyncThunk("getAllLineUpBySlug", async ({ slug }, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/cetegory-ticket/${slug}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

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
        listCategoryTicket: [],
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
        }).addCase(getAllCategoryTicketBySlug.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(getAllCategoryTicketBySlug.fulfilled, (state, action) => {
            return (state = {
                ...state,
                listCategoryTicket: action.payload.data,
                status: "success"
            })
        }).addCase(getAllCategoryTicketBySlug.rejected, (state, action) => {
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
    removeCategoryTicket,
    getAllCategoryTicketBySlug
};
export default categoryTicketSlice.reducer