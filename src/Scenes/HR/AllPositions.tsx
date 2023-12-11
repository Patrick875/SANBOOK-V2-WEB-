import { useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useFetchData } from "../../hooks/useFetchData";

//jshint esversion:9
interface Props {}
interface opt {
	id: number;
	name: string;
	depid: string;
	description: string;
	createdBy: number;
}

export const AllPositions = (props: Props) => {
	const { register } = useForm();
	const [data, loading, error] = useFetchData("/hr/positions");
	const [searchData, setSearchData] = useState();
	const [isSearching, setIsSearching] = useState(false);
	console.log(data);

	return (
		<div>
			<div className="flex items-center justify-between font-nunito">
				<p className="text-sm font-medium uppercase basis-1/6">Positions</p>
				<form className="flex items-center gap-3 basis-4/6">
					<div className="flex gap-3 items-center bg-search-bg py-1 px-3 rounded-[8px]">
						<MagnifyingGlassIcon className="w-4 h-4 text-login-blue" />
						<input
							aria-label="search"
							placeholder="Search"
							className="bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-bold"
							{...register("query")}
						/>
					</div>
					<div className="rounded-[8px]">
						<label className="text-xs font-medium me-2">Department</label>
						<select className="px-3 py-1 text-xs bg-transparent border-2 border-gray-300 focus-border-1 ">
							<option value="">All</option>
							{data && data.length !== 0 ? (
								data.map((opt: opt) => (
									<option key={crypto.randomUUID()} value={opt.id}>
										{opt.name}
									</option>
								))
							) : (
								<option className="px-1">No department</option>
							)}
						</select>
					</div>
				</form>

				<Link
					to="create"
					className="px-4 py-1 text-sm text-center rounded-md basis-1/6 bg-login-blue text-primary-white">
					Add New
				</Link>
			</div>
			<table className="w-full mt-3 ">
				<thead className="border-2 border-gray-200">
					<tr>
						<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
							Name
						</th>
						<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
							Department
						</th>
						<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
							Number of Employees
						</th>
						<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<p className="w-full text-center">Loading...</p>
					) : (
						data &&
						data.map((el) => (
							<tr key={crypto.randomUUID()}>
								<td className="p-3 text-xs capitalize whitespace-nowrap">
									{el.name}
								</td>
								<td className="p-3 text-xs capitalize whitespace-nowrap">
									{el.Department.name}
								</td>
								<td className="p-3 text-xs capitalize whitespace-nowrap">
									{el.Employees.length}
								</td>
								<td className="p-3 text-xs capitalize whitespace-nowrap">
									<div className="flex w-full gap-2">
										<Link
											to="#"
											className="px-5 py-1 font-medium bg-blue-200 text-login-blue ">
											View
										</Link>
									</div>
								</td>
							</tr>
						))
					)}
					{error && <p>{error.message}</p>}
				</tbody>
			</table>
		</div>
	);
};
