import { useEffect, useState } from 'react'
import { findByIdEventWIthCategoryTickets, findEventById, getEventAdminPagination, getEventWithCategories } from '../api/event';

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

export const useEffectEventPagination = () => {
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [paginate, setPaginate] = useState({
        currentPage: 0,
        size: 5,
        totalPages: 0,
        offset: 0,
    })

    const fetchData = async (page, size) => {
        if (!size) {
            setError("Page and size is required");
            return;
        }

        try {
            const response = await getEventAdminPagination(page, size);
            setPaginate({ ...paginate, offset: response.data.pageable.offset, totalPages: response.data.totalPages })
            setResponseData(response.data);
        } catch (error) {
            setError(error);
        }
    }
    useEffect(() => {
        fetchData(paginate.currentPage, paginate.size)
    }, [paginate.currentPage])

    return { responseData, error, paginate, setPaginate }


}