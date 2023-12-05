import { useState, useEffect } from "react";
import instance from "../API";

export const usePostData = (url: string, data: any) => {
	const [resData, setResData] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await instance.post(url, { data });
				if (res.data && res.data.data) {
					setResData(res.data.data);
				}
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [url]);

	return [resData, loading, error];
};
