import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/api";




const getAllLineUpBySlug = createAsyncThunk("getAllLineUpBySlug", async ({ slug }, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/lineup/${slug}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const createLineUp = createAsyncThunk("createLineUp", async ({ slug, payload }, { rejectWithValue }) => {
    try {
        const response = await apiClient.post(`/lineup/${slug}`, payload)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})



const removeLineUp = createAsyncThunk("removeLineUp", async ({ id }, { rejectWithValue }) => {
    try {
        const response = await apiClient.delete(`/lineup/remove/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})



const lineUpSlice = createSlice({
    name: "lineUpSlice",
    initialState: {
        message: "",
        lineUpData: [],
        detailLineUp: null,
        status: null,
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllLineUpBySlug.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(getAllLineUpBySlug.fulfilled, (state, action) => {

            return (state = {
                ...state,
                lineUpData: action.payload.data,
                status: "success"
            })
        }).addCase(getAllLineUpBySlug.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        }).addCase(createLineUp.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(createLineUp.fulfilled, (state, action) => {

            return (state = {
                ...state,
                detailLineUp: action.payload.data,
                status: "success"
            })
        }).addCase(createLineUp.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        }).addCase(removeLineUp.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(removeLineUp.fulfilled, (state, action) => {
            return (state = {
                ...state,
                detailLineUp: action.payload.data,
                status: "success"
            })
        }).addCase(removeLineUp.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        })
    }
})


export {
    getAllLineUpBySlug,
    createLineUp,
    removeLineUp
};
export default lineUpSlice.reducer