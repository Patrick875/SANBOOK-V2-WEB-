import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useFetchData } from "../../../hooks/useFetchData";
import EditableTable from "../../../shared/EditableTable";
import { initialRows } from "../../../types/constants";
import { useEffect, useState } from "react";
import { purcPlaceholder } from "../../../types";
import { Logo } from "../../../shared/Logo";
import { BsPrinter } from "react-icons/bs";
import instance from "../../../API";

const CreatePurchaseOrder = () => {
	const { register, watch } = useForm();
	const query = watch("query") || "";
	const category = watch("category") || 0;
	const store = watch("store") || 0;
	const [searchResults, setSearchResults] = useState([]);
	let [requestItems, setRequestItems] = useState<purcPlaceholder[]>([
		...initialRows,
	]);
	const [categories] = useFetchData("/stock/categories");
	const [stores] = useFetchData("/stock/stores");
	const addItemToOrder = () => {
		setRequestItems([
			...requestItems,
			{
				id: crypto.randomUUID(),
				name: "",
				quantity: 0,
				times: 0,
				price: 0,
				date: "",
			},
		]);
	};

	const handleSearch = async () => {
		const results = await instance
			.get(`/stock/items?store=${store}&category=${category}&item=${query}`)
			.then((res) => {
				console.log(res);
				setSearchResults(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		handleSearch();
	}, [query, category, store]);

	return (
		<div className="w-full">
			<p className="text-xs font-bold text-center">Create Purchase Order</p>
			<div className="w-full grid-flow-col gap-2 px-2 py-2 bg-white rounded-md justify-stretch">
				<form className="grid content-center w-full grid-cols-12 gap-3 px-3 py-1 ">
					<div className="flex items-center col-span-3 gap-1 px-3 py-1 rounded-sm bg-search-bg">
						<MagnifyingGlassIcon className="w-5 h-5 text-login-blue" />
						<input
							placeholder="Search"
							className="w-full bg-transparent focus:outline-none focus-border-none placeholder:text-sm placeholder:font-bold"
							{...register("query")}
						/>
					</div>
					<div className="flex col-span-4 gap-2">
						<div className="flex gap-2 text-xs justify-items-center">
							<select {...register("store")} className="w-full text-xs">
								<option selected={true} value={""}>
									All stores
								</option>
								{stores &&
									stores.map((store) => (
										<option key={store.id} value={store.id}>
											{store.name}
										</option>
									))}
							</select>
						</div>
						<div className="flex items-center gap-2 text-xs">
							<select {...register("category")} className="w-full text-xs">
								<option selected={true} value="">
									All Categories
								</option>
								{categories &&
									categories.map((category) => (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									))}
							</select>
						</div>
					</div>
					<div className="grid content-center grid-flow-col col-span-5 gap-2 ">
						<button
							onClick={addItemToOrder}
							type="button"
							className="col-span-2 px-6 py-1 text-xs text-center rounded-sm cursor-pointer bg-login-blue text-primary-white ">
							Add{" "}
						</button>
						<div className="flex items-center justify-center gap-2 text-xs">
							<label>Done on</label>
							<input type="date" className="block " />
						</div>
					</div>
				</form>
			</div>
			<div className="grid justify-between w-full grid-flow-col p-4 my-4 grid-col-3">
				<Logo textColor="bg-transparent" />
				<div>
					<p className="text-xs font-bold">K_DEV HOTEL</p>
					<p className="text-xs font-bold">
						TEL: +250 780 000 000/ +250 780 000 000
					</p>
					<p className="text-xs font-bold">E-mail:kdevhotel@kdev.rw</p>
					<p className="text-xs font-bold">Web:www.kdev.rw</p>
					<p className="text-xs font-bold">TIN/VAT: 000000000</p>
				</div>
				<div>
					<button className="flex items-center gap-1 px-2 py-1 text-xs text-slate-800 ">
						Print
						<BsPrinter />
					</button>
				</div>
			</div>
			<EditableTable
				cols={["name", "price", "quantity", "unit"]}
				totals={["total"]}
				headers={["Item", "Price", "Quantity", "Unit", "Total"]}
				subtotalCols={["price", "quantity"]}
				data={requestItems}
				readOnly={false}
				type="purchase order"
				setData={setRequestItems}
				hidePrice={false}
			/>
			<div className="grid justify-between w-full grid-flow-col p-4 my-4 grid-col-3">
				<div>
					<p className="text-xs font-bold">Store Keeper</p>
					<p className="text-xs font-bold">Signature</p>
				</div>
				<div>
					<p className="text-xs font-bold">Controller</p>
					<p className="text-xs font-bold">Signature</p>
				</div>
				<div>
					<p className="text-xs font-bold">Cashier</p>
					<p className="text-xs font-bold">Signature</p>
				</div>
				<div>
					<p className="text-xs font-bold">Manager</p>
					<p className="text-xs font-bold">Signature</p>
				</div>
			</div>
		</div>
	);
};

export default CreatePurchaseOrder;
