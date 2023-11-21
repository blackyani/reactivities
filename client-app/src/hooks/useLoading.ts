import { useState } from "react"

export const useLoading = (initialState = true) => {
    const [loading, setLoading] = useState(initialState);

    return {
        loading,
        setLoading,
    }
}