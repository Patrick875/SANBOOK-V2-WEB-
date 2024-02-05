import { useState, useEffect } from "react";
import instance from "../API";

export const useFetchData = (url: string) => {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [length, setLength] = useState(undefined);
	const [error, setError] = useState();
	const fetchData = async (url: string) => {
		try {
			const res = await instance.get(url);
			if (res.data && res.data.data) {
				setData(res.data.data);
				setLength(res.data.length);
				return res.data.data;
			}
		} catch (error) {
			setError(error);
			return null;
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchData(url);
	}, [url]);

	return [data, loading, error, length, fetchData];
};
