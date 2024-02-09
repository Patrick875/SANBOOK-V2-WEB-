import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useFetchData } from "../../../hooks/useFetchData";
import { ReactElement, useState } from "react";
import { HiDownload } from "react-icons/hi";
import { BsPrinter } from "react-icons/bs";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { identity, item } from "../../../types";
import LocationInApp from "../../../shared/LocationInApp";
import Pages from "../../../shared/Pages";

const AllStockItems = () => {
	const { register, watch } = useForm();
	const name: string = watch("query");
	const store: string = watch("store");
	const category: string = watch("category");
	const [items, loading] = useFetchData(
		`/stock/items?name=${name}&store=${store}&category=${category}`
	);
	const [stores] = useFetchData("/stock/stores");
	const [categories] = useFetchData("/stock/categories");
	const TableHead = (): ReactElement => (
		<thead className="border-2 border-gray-200">
			<tr>
				<th className="w-20 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					Name
				</th>
			</tr>
		</thead>
	);
	const itemsPerPage = 10;
	const [pageNumber, setPageNumber] = useState<number>(0);
	const pagesVisited = pageNumber * itemsPerPage;
	const displayItems =
		items &&
		items
			.slice(pagesVisited, pagesVisited + itemsPerPage)
			.map((el: identity) => {
				return (
					<tr className="text-xs" key={crypto.randomUUID()}>
						<td className="px-3">{el.name}</td>
					</tr>
				);
			});

	return (
		<div>
			<LocationInApp location="All Stock Items" />
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
					<div className="flex items-center col-span-5 gap-3">
						<div className="flex items-center gap-2">
							<label className="block text-xs font-bold ">Store</label>
							<select
								{...register("store")}
								className="w-full text-xs border-[1.2px] rounded-[4px]">
								{stores &&
									stores.map((store: identity) => (
										<option key={store.id} value={store.id}>
											{store.name}
										</option>
									))}
							</select>
						</div>
						<div className="flex items-center gap-2 text-xs">
							<select
								{...register("category")}
								className="w-full text-xs border-[1.2px] rounded-[4px]">
								<option selected={true} value="">
									All Categories
								</option>
								{categories &&
									categories.map((cat: identity) => (
										<option
											key={crypto.randomUUID()}
											selected={category == `${cat.id}`}
											value={cat.id}>
											{cat.name}
										</option>
									))}
							</select>
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
				{items && items.length !== 0 && (
					<div>
						<table className="w-full mt-3 bg-primary-white ">
							<TableHead />
							<tbody>{displayItems}</tbody>
						</table>
						<Pages
							dataLength={items.length}
							setPageNumber={setPageNumber}
							itemsPerPage={itemsPerPage}
						/>
					</div>
				)}
				{items && items.length === 0 && (
					<p className="my-2 text-center">No items found</p>
				)}
			</div>
		</div>
	);
};

export default AllStockItems;
