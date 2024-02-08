import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useFetchData } from "../../../hooks/useFetchData";
import { HiDownload } from "react-icons/hi";
import { BsPrinter } from "react-icons/bs";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import TableHeader from "./ItemListTableHeader";
import { useFetchPaginatedData } from "../../../hooks/useFetchPaginatedData";
import Pages from "../../../shared/Pages";
import { useEffect, useState } from "react";
import { identity } from "../../../types";
import LocationInApp from "../../../shared/LocationInApp";

interface store extends identity {
	active: boolean;
	selling: boolean;
}
interface itemcategory extends identity {
	store: number;
}
interface Item extends identity {
	mainunit: number;
	Store: store;
	ItemCategory: itemcategory;
}

interface StockItem extends identity {
	id: number;
	name: string;
	price: number;
	quantity: number;
	Item: Item;
}

interface ItemProps {
	item: StockItem;
}

const Item = ({ item }: ItemProps) => {
	return (
		<div className="grid grid-cols-4 px-4 py-1">
			<p className="text-xs ">{item.Item.name}</p>
			<p className="text-xs ">{Number(item.price).toLocaleString("fr-FR")}</p>
			<p className="text-xs ">{Number(item.quantity).toLocaleString()}</p>
			<p className="text-xs uppercase">{item.Item.Store.name}</p>
		</div>
	);
};

const Stock = () => {
	const { register, watch } = useForm();
	const name = watch("query") || "";
	const category = watch("category") || "";
	const store = watch("store") || "";
	const [stores] = useFetchData("/stock/stores");
	const [categories] = useFetchData("/stock/categories");
	const [pageNumber, setPageNumber] = useState<number>(0);
	const [itemsPerPage, setItemsPerPage] = useState<number>(15);
	const { data: items, length } = useFetchPaginatedData(
		`/stock/currentstock?name=${name}&category=${category}&store=${store}&page=${
			pageNumber + 1
		}&itemsPerPage=${itemsPerPage}`
	);
	console.log("items", items);

	return (
		<div className="w-full">
			<LocationInApp location="Current Stock" />
			<div className="flex items-center w-full gap-2 px-3 py-2 bg-white rounded-md">
				<form className="grid items-center justify-between w-full grid-flow-col bg-white">
					<div className="col-span-3">
						<div className="flex items-center gap-1 px-3 py-1 rounded-sm bg-search-bg">
							<MagnifyingGlassIcon className="w-4 h-4 text-login-blue" />
							<input
								placeholder="Search"
								className="w-full h-full text-xs bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-bold"
								{...register("query")}
							/>
						</div>
					</div>

					<div className="flex col-span-5 gap-3 ">
						<div className="flex items-center gap-2 basis-1/2 ">
							<label className="block text-xs font-bold ">Categories</label>
							<select
								{...register("category")}
								className="w-full px-2 text-xs border-2 rounded-sm border-slate-500">
								<option value="">Select ...</option>
								{categories &&
									categories.map((cat: identity) => (
										<option
											selected={cat.id == category}
											key={cat.id}
											value={cat.id}>
											{cat.name}
										</option>
									))}
							</select>
						</div>
						<div className="flex items-center gap-2 basis-1/2">
							<label className="block text-xs font-bold ">Stores</label>
							<select
								{...register("store")}
								className="w-full px-2 text-xs border-2 rounded-sm border-slate-500">
								<option value="">Select ...</option>
								{stores &&
									stores.map((st: identity) => (
										<option selected={store == st.id} key={st.id} value={st.id}>
											{st.name}
										</option>
									))}
							</select>
						</div>
					</div>
				</form>
			</div>

			<div className="flex items-center justify-between p-4 my-2 bg-white rounded-md ">
				<p className="text-xs font-bold">Access as File</p>
				<div className="flex gap-4 px-2 ">
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
			</div>
			{items && items.length !== 0 && length !== 0 ? (
				<div>
					<div className="mb-3 bg-white">
						<TableHeader />
						{items.map((item: StockItem) => (
							<Item item={item} key={item.id} />
						))}
					</div>
					<Pages
						dataLength={length && length}
						setPageNumber={setPageNumber}
						itemsPerPage={itemsPerPage}
					/>
				</div>
			) : (
				<p className="w-full py-8 font-bold text-center bg-white">
					No items found
				</p>
			)}
		</div>
	);
};

export default Stock;
