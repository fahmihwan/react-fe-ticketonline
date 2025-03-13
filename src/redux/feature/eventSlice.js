import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/api";


const fetchEventHome = createAsyncThunk("home/fetchEventsHome", async ({ total }, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/event/${total}/events`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const fetchEventBySlug = createAsyncThunk("home/fetchEventBySlug", async ({ slug }, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/event/${slug}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const getEventAdminPagination = createAsyncThunk(
    "home/fetchEventAdmin",
    async ({
        page, size
    }) => {
        let params = `?`;

        // Tambahkan parameter page jika ada
        if (page !== undefined) {
            params += `page=${page}&`;
        }

        // Tambahkan parameter size jika ada
        if (size !== undefined) {
            params += `size=${size}`;
        }

        // Hapus tanda '&' yang mungkin ada di akhir
        if (params.endsWith('&')) {
            params = params.slice(0, -1);
        }

        try {
            const response = await apiClient.get(`/event/admin/pagination${params}`)
            // const response = await apiClient.get(`/event/admin/pagination?page=0&size=5`)
            return response.data
        } catch (error) {
            return error.response.data
        }
    })



const findBySlugWithCategoryTickets = createAsyncThunk("home/findBySlugWithCategoryTickets", async ({ slug }, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/event/${slug}/with-category-tickets`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const eventSlice = createSlice({
    name: "eventSlice",
    initialState: {
        message: "",
        detailEvent: null,
        eventData: [],
        paging: null,
        status: null,
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEventHome.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(fetchEventHome.fulfilled, (state, action) => {

            return (state = {
                ...state,
                eventData: action.payload.data,
                status: "success"
            })
        }).addCase(fetchEventHome.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        }).addCase(getEventAdminPagination.pending, (state) => {
            return (state = {
                ...state,
                status: "loading"
            })
        }).addCase(getEventAdminPagination.fulfilled, (state, action) => {
            return (state = {
                ...state,
                eventData: action.payload.data,
                status: "success",
            })
        }).addCase(getEventAdminPagination.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        }).addCase(fetchEventBySlug.pending, (state) => {
            return (state = {
                ...state,
                status: "loading"
            })
        }).addCase(fetchEventBySlug.fulfilled, (state, action) => {
            return (state = {
                ...state,
                detailEvent: action.payload.data,
                status: "success",
            })
        }).addCase(fetchEventBySlug.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        }).addCase(findBySlugWithCategoryTickets.pending, (state) => {
            return (state = {
                ...state,
                status: "loading"
            })
        }).addCase(findBySlugWithCategoryTickets.fulfilled, (state, action) => {
            return (state = {
                ...state,
                detailEvent: action.payload.data,
                status: "success",
            })
        }).addCase(findBySlugWithCategoryTickets.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        })

    }
})


export {
    fetchEventHome,
    fetchEventBySlug,
    getEventAdminPagination,
    findBySlugWithCategoryTickets
};
export default eventSlice.reducer