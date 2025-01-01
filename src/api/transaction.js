import apiClient from './api'

export const getPaymentMethodDuitku = async (payload) => {
    try {
        const response = await apiClient.post(`/transaction/paymentgateway-get-payment-method`, payload)
        return response.data;
    } catch (error) {
        return error
    }
}

export const transactionRequestDuitku = async (payload) => {
    try {
        const response = await apiClient.post(`/transaction/paymentgateway-transaction-request`, payload)
        return response.data;
    } catch (error) {
        return error
    }
}

export const transaction = async (payload) => {
    try {
        const response = await apiClient.post(`/transaction/paymentgateway-callbackurl`, payload)
        return response.data;
    } catch (error) {
        return error
    }
}


