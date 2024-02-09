import { useState } from "react";
import { useForm } from "react-hook-form";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useFetchData } from "../../hooks/useFetchData";

export const Logs = () => {
	const { register } = useForm();
	const [data] = useFetchData("/system/userlogs");

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
				<div className="grid grid-cols-6">
					<p className="px-2 py-4 text-xs font-semibold">Name</p>
					<p className="px-2 py-4 text-xs font-semibold">Department</p>
					<p className="px-2 py-4 text-xs font-semibold">Time</p>
					<p className="px-2 py-4 text-xs font-semibold">Action</p>
					<p className="px-2 py-4 text-xs font-semibold">Device</p>
					<p className="px-2 py-4 text-xs font-semibold">I.P Address</p>
				</div>
				<div>
					{data &&
						data.length > 0 &&
						data.map((el) => (
							<div className="grid grid-cols-6" key={crypto.randomUUID()}>
								<p className="px-2 py-3 text-xs capitalize ">{el.username}</p>
								<p className="p-3 px-2 text-xs capitalize ">
									{el.identification}
								</p>
								<p className="p-3 px-2 text-xs capitalize ">
									{new Date(el.date).toLocaleString("FR-fr")}
								</p>
								<p className="w-full p-3 px-2 text-xs capitalize">
									<span className="text-wrap">{el.status + " "}</span>
									<span
										className={` font-bold  text-wrap ${
											el.method === "GET"
												? "text-indigo-600 "
												: el.method === "POST"
												? "text-teal-600"
												: el.method === "DELETE"
												? "text-pink-600"
												: "text-slate-900"
										}`}>
										{el.method}
									</span>
									<span className="text-wrap">{" " + el.url}</span>
								</p>
								<p className="p-3 px-2 text-sm capitalize ">
									{el["remote-address"]}
								</p>
								<p className="p-3 px-2 text-sm capitalize ">
									{el["remote-address"]}
								</p>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};
