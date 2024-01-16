import { useLocation } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { BackButton } from "../../../shared/BackButton";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FaRegDotCircle } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { BsPrinter } from "react-icons/bs";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { ReactElement, useState } from "react";

const StoreDetails = () => {
	const { register } = useForm();
	const [grouped, setGrouped] = useState<boolean>(false);
	const [categories] = useFetchData("/stock/categories");

	const { pathname } = useLocation();
	const getId = () => {
		const path: string = pathname;
		const id: string = path.split("/")[path.split("/").length - 1];
		return id;
	};
	const id: string = getId();
	const [data] = useFetchData(`/stock/stores/${id}`);
	const TableHead = (): ReactElement => (
		<thead className="border-2 border-gray-200">
			<tr>
				<th className="w-20 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					Name
				</th>
				<th className="w-20 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					Quantity
				</th>
				<th className="w-20 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					Price
				</th>
				<th className="w-20 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					Total
				</th>
				<th className="w-20 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					Category
				</th>
			</tr>
		</thead>
	);

	return (
		<div className="w-full">
			<div className="flex w-full my-2">
				<BackButton />
				<p className="flex-1 font-bold text-center uppercase">
					{data && data.name}
				</p>
			</div>
			<div className="flex items-center w-full gap-2 px-3 py-2 bg-white rounded-md">
				<form className="grid items-center w-full grid-flow-col grid-cols-12 bg-white justify-stretch">
					<div className=" col-span-2 flex items-center gap-3 p-1  bg-search-bg rounded-[8px]">
						<MagnifyingGlassIcon className="w-5 h-5 " />
						<input
							placeholder="Search"
							className="w-full bg-transparent focus:outline-none focus-border-none placeholder:text-sm placeholder:font-bold"
							{...register("query")}
						/>
					</div>
					<div className="flex col-span-6 gap-1 justify-stretch ">
						<div className="flex items-center flex-1 gap-2">
							<label className="block text-xs font-bold ">Categories</label>
							<select {...register("store")} className="w-full text-xs">
								{categories &&
									categories.map((category) => (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									))}
							</select>
						</div>
						<div className="flex gap-2 text-xs">
							<button
								onClick={() => setGrouped(true)}
								type="button"
								className={`px-1 shadow-md py-1 flex gap-1 items-center ${
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
								className={`px-1 py-1 flex gap-1 shadow-md items-center ${
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
						<button className="flex items-center gap-1 px-2 py-1 text-xs text-pink-900">
							PDF
							<HiDownload />
						</button>
						<button className="flex items-center gap-1 px-2 py-1 text-xs text-slate-800 ">
							Print
							<BsPrinter />
						</button>
						<button className="flex items-center gap-2 px-1 py-1 text-xs text-teal-900 ">
							Export
							<PiMicrosoftExcelLogoFill />
						</button>
					</div>
				</form>
			</div>
			<div>
				<table className="w-full mt-3 bg-primary-white ">
					<TableHead />
					<tbody>
						{data &&
							data.Items &&
							data.Items.length !== 0 &&
							data.Items.map((item) => (
								<tr className="text-xs" key={crypto.randomUUID()}>
									<td className="px-3">{item.name}</td>
									<td className="px-3">{item.quantity}</td>
									<td className="px-3">{item.price}</td>
									<td className="px-3">{item.total}</td>
									<td className="px-3">{item.ItemCategory.name}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			<div className="flex items-center justify-between w-full p-3 my-2 bg-white rounded-sm">
				<p className="text-xs font-bold">Total Valuation</p>
				<div className="">
					<p className="text-xs">Items</p>
					<p className="text-xs"> Value</p>
				</div>
			</div>
		</div>
	);
};

export default StoreDetails;
