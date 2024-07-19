import { useState, useEffect } from "react";
import { Alert } from "react-native";

type UseAppwriteReturn<T> = {
    data: T[] | T,
    isLoading: boolean,
    refetch: () => Promise<void>
}

const useAppwrite = <T>(fn: () => Promise<T[]> | Promise<T>): UseAppwriteReturn<T> => {
    const [data, setData] = useState<T[] | T>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const res = await fn();
            setData(res);
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setIsLoading(false);
        }
    }

    const refetch = () => fetchData();

    return { data, isLoading, refetch };
}

export default useAppwrite;