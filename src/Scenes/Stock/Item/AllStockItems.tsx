import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useFetchData } from "../../../hooks/useFetchData";
import { ReactElement, useState } from "react";
import { HiDownload } from "react-icons/hi";
import { BsPrinter } from "react-icons/bs";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaRegDotCircle } from "react-icons/fa";
import { item } from "../../../types";

const AllStockItems = () => {
	const { register } = useForm();
	const [grouped, setGrouped] = useState<boolean>(false);
	const [items, loading] = useFetchData("/stock/items");
	const [stores] = useFetchData("/stock/stores");
	const TableHead = (): ReactElement => (
		<thead className="border-2 border-gray-200">
			<tr>
				<th className="w-20 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					Name
				</th>
				<th className="w-20 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					Price
				</th>
			</tr>
		</thead>
	);

	return (
		<div>
			<div className="flex items-center w-full gap-2 px-3 py-2 bg-white rounded-md">
				<form className="grid items-center w-full grid-flow-col grid-cols-12 bg-white justify-stretch">
					<div className="mx-2 col-span-3 flex items-center gap-3 p-1 px-3 bg-search-bg rounded-[8px]">
						<MagnifyingGlassIcon className="w-5 h-5 " />
						<input
							placeholder="Search"
							className="w-full bg-transparent focus:outline-none focus-border-none placeholder:text-sm placeholder:font-bold"
							{...register("query")}
						/>
					</div>
					<div className="flex col-span-5 gap-3 ">
						<div className="flex items-center gap-2">
							<label className="block text-xs font-bold ">Store</label>
							<select {...register("store")} className="w-full text-xs">
								{stores &&
									stores.map((store) => (
										<option key={store.id} value={store.id}>
											{store.name}
										</option>
									))}
							</select>
						</div>
						<div className="flex gap-2 text-xs">
							<button
								onClick={() => setGrouped(true)}
								type="button"
								className={`px-1 shadow-md py-1 flex gap-2 items-center ${
									grouped
										? "bg-login-blue text-white "
										: "bg-white text-slate-900"
								}`}>
								Grouped
								<FaRegDotCircle />
							</button>
							<button
								onClick={() => setGrouped(false)}
								type="button"
								className={`px-1 py-1 flex gap-2 shadow-md items-center ${
									grouped
										? "bg-white text-slate-900"
										: "bg-login-blue text-white"
								}`}>
								Ungrouped
								<FaRegDotCircle />
							</button>
						</div>
					</div>

					<div className="flex col-span-4 px-2 ">
						<button className="flex items-center gap-2 px-2 py-1 text-xs text-pink-900">
							PDF
							<HiDownload />
						</button>
						<button className="flex items-center gap-2 px-2 py-1 text-xs text-slate-800 ">
							Print
							<BsPrinter />
						</button>
						<button className="flex items-center gap-2 px-2 py-1 text-xs text-teal-900 ">
							Export
							<PiMicrosoftExcelLogoFill />
						</button>
					</div>
				</form>
			</div>
			<div>
				{loading && <p>Loading ...</p>}
				{!grouped &&
					items &&
					items.ungrouped &&
					items.ungrouped.length !== 0 && (
						<table className="w-full mt-3 bg-primary-white ">
							<TableHead />
							<tbody>
								{items.ungrouped.map((item: item) => (
									<tr className="text-xs" key={crypto.randomUUID()}>
										<td className="px-3">{item.name}</td>

										<td className="px-3">{item.price}</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				{grouped &&
					items &&
					items.grouped &&
					items.grouped.length !== 0 &&
					items.grouped.map((gr) => (
						<div>
							<p className="my-1 text-xs font-bold">{gr.name}</p>
							<table className="w-full mt-3 bg-primary-white ">
								<TableHead />
								<tbody>
									{gr.Items.map((item: item) => (
										<tr className="text-xs" key={crypto.randomUUID()}>
											<td className="px-3">{item.name}</td>
											<td className="px-3">{item.price}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					))}
			</div>
		</div>
	);
};

export default AllStockItems;
