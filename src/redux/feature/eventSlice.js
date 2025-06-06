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

const getEventAdminPagination = createAsyncThunk("home/fetchEventAdmin", async ({ page, size }, { rejectWithValue }) => {
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
        return response?.data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }
})



const getEventForTicketListPagination = createAsyncThunk("home/getEventForTicketListPagination", async ({ page, size }, { rejectWithValue }) => {
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
        const response = await apiClient.get(`/cetegory-ticket/admin/pagination${params}`)
        return response?.data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }
})



const getEventForCheckerList = createAsyncThunk("home/getEventForCheckerList", async ({ page, size }, { rejectWithValue }) => {
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
        const response = await apiClient.get(`/checker/pagination${params}`)
        return response?.data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
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


const removeEvent = createAsyncThunk("home/removeEvent", async ({ eventId }, { rejectWithValue }) => {
    try {
        const response = await apiClient.delete(`/event/remove/${eventId}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})



const createEvent = createAsyncThunk("home/createEvent", async ({ payload }, { rejectWithValue }) => {
    const formData = new FormData()
    formData.append('event_title', payload.event_title)
    formData.append('image', payload.image)
    formData.append('schedule', payload.schedule)
    formData.append('venue', payload.venue)
    formData.append('slug', payload.slug)
    formData.append('description', payload.description)
    formData.append('admin_id', payload.admin_id)
    try {
        const response = await apiClient.post("/event", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const updateEvent = createAsyncThunk("home/updateEvent", async ({ payload, slug }, { rejectWithValue }) => {
    console.log('asuu');
    const formData = new FormData()
    formData.append('event_title', payload.event_title)
    formData.append('image', payload.image)
    formData.append('schedule', payload.schedule)
    formData.append('venue', payload.venue)
    formData.append('slug', payload.slug)
    formData.append('description', payload.description)
    formData.append('admin_id', payload.admin_id)

    try {
        const response = await apiClient.put(`/event/${slug}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const getEventByCheckerUser = createAsyncThunk("home/getEventByCheckerUser", async ({ userId }, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/checker/${userId}/event`)
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
        }).addCase(getEventForCheckerList.pending, (state) => {
            return (state = {
                ...state,
                status: "loading"
            })
        }).addCase(getEventForCheckerList.fulfilled, (state, action) => {
            return (state = {
                ...state,
                eventData: action.payload.data,
                status: "success",
            })
        }).addCase(getEventForCheckerList.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        }).addCase(getEventForTicketListPagination.pending, (state) => {
            return (state = {
                ...state,
                status: "loading"
            })
        }).addCase(getEventForTicketListPagination.fulfilled, (state, action) => {
            return (state = {
                ...state,
                eventData: action.payload.data,
                status: "success",
            })
        }).addCase(getEventForTicketListPagination.rejected, (state, action) => {
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
        }).addCase(removeEvent.pending, (state) => {
            return (state = {
                ...state,
                status: "loading"
            })
        }).addCase(removeEvent.fulfilled, (state, action) => {
            return (state = {
                ...state,
                detailEvent: action.payload.data,
                status: "success",
            })
        }).addCase(removeEvent.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        }).addCase(createEvent.pending, (state) => {
            return (state = {
                ...state,
                status: "loading"
            })
        }).addCase(createEvent.fulfilled, (state, action) => {
            return (state = {
                ...state,
                detailEvent: action.payload.data,
                status: "success",
            })
        }).addCase(createEvent.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        }).addCase(updateEvent.pending, (state) => {
            return (state = {
                ...state,
                status: "loading"
            })
        }).addCase(updateEvent.fulfilled, (state, action) => {
            return (state = {
                ...state,
                detailEvent: action.payload.data,
                status: "success",
            })
        }).addCase(updateEvent.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        }).addCase(getEventByCheckerUser.pending, (state) => {
            return (state = {
                ...state,
                status: "loading"
            })
        }).addCase(getEventByCheckerUser.fulfilled, (state, action) => {
            return (state = {
                ...state,
                eventData: action.payload.data,
                status: "success",
            })
        }).addCase(getEventByCheckerUser.rejected, (state, action) => {
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
    findBySlugWithCategoryTickets,
    removeEvent,
    createEvent,
    updateEvent,
    getEventForCheckerList,
    getEventForTicketListPagination,
    getEventByCheckerUser
};
export default eventSlice.reducer