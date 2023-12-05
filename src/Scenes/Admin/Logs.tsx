import { useState } from "react";
import { useForm } from "react-hook-form";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useFetchData } from "../../hooks/useFetchData";

interface Props {}

export const Logs = (props: Props) => {
	const { register, watch } = useForm();
	const [logs, setLogs] = useState([]);
	const [data, loading] = useFetchData("/system/userlogs");

	return (
		<div>
			<form className="flex items-center justify-between my-2">
				<div className="px-1 bg-search-bg">
					<select className="px-4 py-2 text-xs bg-transparent">
						<option>All</option>
						<option>Select user</option>
					</select>
				</div>
				<div className="flex items-center gap-3 p-2 px-1 bg-search-bg rounded-[8px]">
					<MagnifyingGlassIcon className="w-5 h-5 text-login-blue" />
					<input
						placeholder="Search"
						className="bg-transparent focus:outline-none focus-border-none placeholder:text-sm placeholder:font-bold"
						{...register("query")}
					/>
				</div>
				<div className="p-2 px-4 bg-search-bg">
					<input
						type="date"
						className="text-xs bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-bold"
					/>
				</div>
			</form>
			<div>
				<table className="w-full mt-3 ">
					<thead className="border-2 border-gray-200">
						<tr>
							<th className="w-20 p-3 px-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
								Name
							</th>
							<th className="w-20 p-3 px-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
								Department
							</th>
							<th className="w-20 p-3 px-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
								Time
							</th>
							<th className="p-3 text-xs font-semibold tracking-wide text-left w-14 whitespace-nowrap">
								Action
							</th>
							<th className="w-20 p-3 px-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
								Device
							</th>
							<th className="w-20 p-3 px-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
								I.P Address
							</th>
						</tr>
					</thead>

					<tbody>
						{data &&
							data.length > 0 &&
							data.map((el) => (
								<tr key={crypto.randomUUID()}>
									<td className="p-3 px-2 text-xs capitalize whitespace-nowrap">
										{el.username}
									</td>
									<td className="p-3 px-2 text-xs capitalize whitespace-nowrap">
										{el.identification}
									</td>
									<td className="p-3 px-2 text-xs capitalize whitespace-nowrap">
										{new Date(el.date).toLocaleString("FR-fr")}
									</td>
									<td className="p-3 px-2 text-xs capitalize whitespace-nowrap">
										<span>{el.status + " "}</span>
										<span
											className={`${
												el.method === "GET"
													? "text-indigo-600 font-medium"
													: el.method === "POST"
													? "text-teal-600"
													: el.method === "DELETE"
													? "text-pink-600"
													: "text-slate-900"
											}`}>
											{el.method}
										</span>
										<span></span>
										{" " + el.url}
									</td>
									<td className="p-3 px-2 text-sm capitalize whitespace-nowrap">
										{el["remote-address"]}
									</td>
									<td className="p-3 px-2 text-sm capitalize whitespace-nowrap">
										{el["remote-address"]}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
