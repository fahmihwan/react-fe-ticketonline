import apiClient from "./api";


export const getAllLineUpBySlug = async (slug) => {
    try {
        const response = await apiClient.get(`/lineup/${slug}`)
        return response.data;
    } catch (error) {
        return error
    }
}

export const createLineUp = async (payload, slug) => {
    try {
        const response = await apiClient.post(`/lineup/${slug}`, payload)
        return response.data;
    } catch (error) {
        return error
    }
}


export const removeLineUp = async (id) => {
    try {
        const response = await apiClient.delete(`/lineup/remove/${id}`)
        return response.data;
    } catch (error) {
        return error
    }
}
