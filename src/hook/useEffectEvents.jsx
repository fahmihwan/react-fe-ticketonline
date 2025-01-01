import { useEffect, useState } from 'react'
import { findByIdEventWIthCategoryTickets, findEventById, getEventWithCategories } from '../api/event';

export const useEffectEvents = (total) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async (total) => {
        if (!total) {
            setError("Total is required");
            return;
        }
        try {
            const response = await getEventWithCategories(total);
            setData(response.data);
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        fetchData(total)
    }, [total])

    return { data, error }
}



export const useEffectDetailEvent = (eventId) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async (eventId) => {
        if (!eventId) {
            setError("Total is required");
            return;
        }
        try {
            const response = await findEventById(eventId);
            setData(response.data);
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        fetchData(eventId)
    }, [eventId])

    return { data, error }
}


export const useEffecEventWithCategoryTickets = (eventId) => {
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async (eventId) => {
        if (!eventId) {
            setError("Total is required");
            return;
        }
        try {
            const response = await findByIdEventWIthCategoryTickets(eventId);
            setResponseData(response.data);
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        fetchData(eventId)
    }, [eventId])

    return { responseData, error }
}