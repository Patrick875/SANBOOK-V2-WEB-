// usePostData.ts
import { useState } from "react";
import instance from "../API";

const usePostData = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const postData = async <T,>(url: string, data: T) => {
		try {
			setIsLoading(true);
			const response = await instance.post(`${url}`, data);
			return response.data;
		} catch (error) {
			setError(error.message || "An error occurred");
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	return { postData, isLoading, error };
};

export default usePostData;
