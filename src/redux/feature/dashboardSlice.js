import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apiClient from "../../api/api"


const getDataStatUi = createAsyncThunk("getDataStatUi", async (_, { rejectWithValue }) => {
    try {
        const response = await apiClient.get("/dashboard/stats-ui")
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const getFiveNewEvent = createAsyncThunk("getFiveNewEvent", async (_, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/dashboard/get-five-new-event`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const getNumberOfTransactionPerMonth = createAsyncThunk("getNumberOfTransactionPerMonth", async (_, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/dashboard/get-number-of-transaction-per-month`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const dashboardSlice = createSlice({
    name: "dashboardSlice",
    initialState: {
        message: "",
        dataStatUi: null,
        dataFiveNewEvent: null,
        dataNumberOfTransactionPerMonth: null,
        status: null,
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDataStatUi.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(getDataStatUi.fulfilled, (state, action) => {
            return (state = {
                ...state,
                dataStatUi: action.payload.data,
                status: "success"
            })
        }).addCase(getDataStatUi.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        }).addCase(getFiveNewEvent.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(getFiveNewEvent.fulfilled, (state, action) => {
            return (state = {
                ...state,
                dataFiveNewEvent: action.payload.data,
                status: "success"
            })
        }).addCase(getFiveNewEvent.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        }).addCase(getNumberOfTransactionPerMonth.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(getNumberOfTransactionPerMonth.fulfilled, (state, action) => {
            return (state = {
                ...state,
                dataNumberOfTransactionPerMonth: action.payload.data,
                status: "success"
            })
        }).addCase(getNumberOfTransactionPerMonth.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        })
    }
})

export {
    getDataStatUi,
    getFiveNewEvent,
    getNumberOfTransactionPerMonth
};
export default dashboardSlice.reducer