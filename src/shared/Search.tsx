import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useFetchData } from "../hooks/useFetchData";

interface Props {
	setFetchedData: (data: any) => void;
	setIsSearching: (data: any) => void;
}

export const Search = ({ setFetchedData, setIsSearching }: Props) => {
	const { register, watch } = useForm();
	const query = watch("query");
	//const [data, loading] = useFetchData("");
	if (query !== "") {
		setIsSearching(true);
	} else {
		setIsSearching(false);
	}
	// if (data) {
	// 	console.log(data);
	// 	setFetchedData([]);
	// }

	return (
		<form className="flex items-center gap-3 p-2 px-4 bg-search-bg rounded-[8px] ">
			<MagnifyingGlassIcon className="w-5 h-5 text-login-blue" />
			<input
				placeholder="Search"
				className="bg-transparent focus:outline-none focus-border-none placeholder:text-sm placeholder:font-bold"
				{...register("query")}
			/>
		</form>
	);
};
