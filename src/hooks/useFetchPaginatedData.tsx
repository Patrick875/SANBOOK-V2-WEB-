import { useState, useEffect } from "react";
import instance from "../API";

interface data {
	page?: number;
	data: any;
	length: number;
}
export const useFetchPaginatedData = (url: string) => {
	const [data, setData] = useState<data>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const fetchData = async (url: string) => {
		try {
			const res = await instance.get(url);
			console.log("res", res);

			if (res.data && res.data.data) {
				setData({ data: res.data.data, length: res.data.length });
			}
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData(url);
	}, [url]);

	return { data: data?.data, length: data?.length, loading, error, fetchData };
};
