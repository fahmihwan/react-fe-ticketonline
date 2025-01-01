import apiClient from "./api";

export const getEventWithCategories = async (total) => {
    // {
    //     "full_name": "John Doe",
    //     "email": "johndoe@example.com",
    //     "password": "password123",
    //     "role": "admin",
    //     "birth_date": "1990-05-15T10:30:00",
    //     "phone_number": "+621234567890"
    //   }

    try {
        const response = await apiClient.get(`/event/${total}/events`)
        return response.data;
    } catch (error) {
        return error
    }
}



export const createUser = async (payload) => {
    try {
        const response = await apiClient.post(`/user`, payload)
        return response.data;
    } catch (error) {
        return error
    }
}



export const findByIdUser = async (userId) => {
    try {
        const response = await apiClient.get(`/user/${userId}`)
        return response.data;
    } catch (error) {
        return error
    }
}
