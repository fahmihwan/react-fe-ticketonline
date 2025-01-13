import { useEffect, useState } from "react";
import { getAllLineUpBySlug } from "../api/lineUp";

export const useEffecLineUp = (slug) => {
    const [responseListLineUp, setResponseListLineUp] = useState(null);
    const [error, setError] = useState(null);

    const fetchDataLineUp = async (slug) => {
        if (!slug) {
            setError("Slug is not exists");
            return;
        }
        try {
            const response = await getAllLineUpBySlug(slug);
            setResponseListLineUp(response.data);
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        fetchDataLineUp(slug)
    }, [slug])

    return { responseListLineUp, error, fetchDataLineUp }
}
