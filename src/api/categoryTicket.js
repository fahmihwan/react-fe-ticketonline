import apiClient from './api'

export const createCategoryTicket = async (payload) => {

    try {
        const response = await apiClient.post("/cetegory-ticket", payload)
        return response.data;
    } catch (error) {
        return error
    }
}


// export const destroyCategoryTicket = async (eventId) => {
//     try {
//         const response = await apiClient.delete(`/event/destroy/${eventId}`)
//         return response.data;
//     } catch (error) {
//         return error
//     }
// }

export const removeCategoryTicket = async (categoryTicketId) => {
    try {
        const response = await apiClient.delete(`/cetegory-ticket/remove/${categoryTicketId}`)
        return response.data;
    } catch (error) {
        return error
    }
}
