import { useState, useEffect } from "react";
import instance from "../API";

export const useFetchData = (url: string) => {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await instance.get(url);
				if (res.data && res.data.data) {
					setData(res.data.data);
				}
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [url]);

	return [data, loading, error];
};
