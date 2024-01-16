import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { itemcategory } from "../../../types";

const AllItemCategories = () => {
	const { register } = useForm();
	const [categories, loading] = useFetchData("/stock/categories");
	return (
		<div>
			<div className="flex items-center w-full px-3 py-2 bg-white rounded-md">
				<div className="flex-1">
					<form className=" w-2/5 flex items-center gap-3 p-2 px-4 bg-search-bg rounded-[8px] ">
						<MagnifyingGlassIcon className="w-5 h-5 text-login-blue" />
						<input
							placeholder="Search"
							className="w-full bg-transparent focus:outline-none focus-border-none placeholder:text-sm placeholder:font-bold"
							{...register("query")}
						/>
					</form>
				</div>

				<Link
					to="create"
					className="px-6 py-1 text-xs text-center rounded-sm bg-login-blue text-primary-white ">
					Add new{" "}
				</Link>
			</div>
			<table className="w-full mt-3 bg-primary-white ">
				<thead className="border-2 border-gray-200">
					<tr>
						<th className="w-20 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
							Name
						</th>
						<th className="w-20 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
							Items
						</th>
						<th className="w-20 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
							Store
						</th>
					</tr>
				</thead>
				<tbody>
					{loading && <p>Loading ...</p>}
					{categories &&
						categories.length !== 0 &&
						categories.map((cat: itemcategory) => (
							<tr className="text-xs">
								<td className="px-3">{cat.name}</td>
								<td className="px-3">{}</td>
								<td className="px-3">{cat.Store.name}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default AllItemCategories;
