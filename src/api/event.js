import apiClient from './api'

export const getEventWithCategories = async (total) => {
    try {
        const response = await apiClient.get(`/event/${total}/events`)
        return response.data;
    } catch (error) {
        return error
    }
}

export const getEventAdminPagination = async (page, size) => {

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
        return response.data;
    } catch (error) {
        return error
    }
}




export const findEventBySlug = async (eventId) => {
    try {
        const response = await apiClient.get(`/event/${eventId}`)
        return response.data;
    } catch (error) {
        return error
    }
}


export const createEvent = async (payload) => {
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
        return response.data;
    } catch (error) {
        alert("terjadi kesalahan")
        return error
    }
}


export const updateEvent = async (payload) => {
    const formData = new FormData()

    formData.append('event_title', payload.event_title)
    formData.append('image', payload.image)
    formData.append('schedule', payload.schedule)
    formData.append('venue', payload.venue)
    formData.append('slug', payload.slug)
    formData.append('description', payload.description)
    formData.append('admin_id', payload.admin_id)

    try {
        const response = await apiClient.put(`/event/${payload?.paramsSlug}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data;
    } catch (error) {
        alert("terjadi kesalahan")
        return error
    }
}


export const destroyEvent = async (eventId) => {
    try {
        const response = await apiClient.delete(`/event/destroy/${eventId}`)
        return response.data;
    } catch (error) {
        return error
    }
}

export const removeEvent = async (eventId) => {
    try {
        const response = await apiClient.delete(`/event/remove/${eventId}`)
        return response.data;
    } catch (error) {
        return error
    }
}

export const findByIdEventWIthCategoryTickets = async (eventId) => {
    try {
        const response = await apiClient.get(`/event/${eventId}/with-category-tickets`)
        return response.data;
    } catch (error) {
        return error
    }
}


//=========================================================================================================

// export const findEventById = async (eventId) => {
//     try {
//         const response = await apiClient.get(`/event/${eventId}`)
//         return response.data;
//     } catch (error) {
//         return error
//     }
// }