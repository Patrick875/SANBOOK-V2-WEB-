import { CheckIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useFetchData } from "../../../hooks/useFetchData";
import EditableTable from "../../../shared/EditableTable";
import { initialRows } from "../../../types/constants";
import { useEffect, useState } from "react";
import { purcPlaceholder } from "../../../types";
import { Logo } from "../../../shared/Logo";
import { BsPrinter } from "react-icons/bs";
import instance from "../../../API";
import usePostData from "../../../hooks/usePostData";
import PurchaseOrderFooter from "../PurchaseOrderFooter";

const CreatePurchaseOrder = () => {
	const { postData, isLoading } = usePostData();
	const { register, watch } = useForm();
	const category = watch("category") || 0;
	const store = watch("store") || 0;
	const [searchResults, setSearchResults] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);
	let [requestItems, setRequestItems] = useState<purcPlaceholder[]>([
		...initialRows,
	]);

	const replaceItemWithIndex = (index, selectedItem) => {
		const updatedRows = [...requestItems];
		updatedRows[index] = {
			...updatedRows[index],
			id: selectedItem.id,
			name: selectedItem.name,
			price: selectedItem.price,
		};
		setRequestItems(updatedRows);
	};
	const updateRequestItems = (selectedItem) => {
		if (selectedItems.length === 0) {
			const indexToReplace = requestItems.findIndex((obj) => obj.name === "");
			replaceItemWithIndex(indexToReplace, selectedItem);
		} else {
			// Check if an item with the same name already exists in requestItems
			const itemExists = requestItems.some(
				(item) => item.name === selectedItem.name
			);

			if (!itemExists) {
				const indexToReplace = requestItems.findIndex((obj) => obj.name === "");
				if (indexToReplace !== -1) {
					replaceItemWithIndex(indexToReplace, selectedItem);
				} else {
					setRequestItems((prevRows) => [
						...prevRows,
						{
							name: selectedItem.name,
							id: selectedItem.id,
							price: selectedItem.price,
							quantity: 0,
							times: 0,
							date: "",
						},
					]);
				}
			} else {
				console.log(
					`Item with name ${lastSelectedItem.name} already exists in requestItems`
				);
			}
		}
	};

	const [categories] = useFetchData("/stock/categories");
	const [stores] = useFetchData("/stock/stores");
	const handleSearch = async () => {
		await instance
			.get(`/stock/items?store=${store}&category=${category}`)
			.then((res) => {
				setSearchResults(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		handleSearch();
	}, [category, store]);
	const createPurchaseOrder = async () => {
		const submitdata = requestItems.filter((item) => item.name !== "");
		const data = { order: submitdata };
		const response = await postData("/stock/purchaseorder", data);
		if (response) {
			setRequestItems(initialRows);
		}
	};

	return (
		<div className="w-full">
			<p className="text-xs font-bold text-center">Create Purchase Order</p>
			<div className="w-full grid-flow-col gap-2 px-2 py-2 bg-white rounded-md justify-stretch">
				<form className="grid justify-between w-full grid-flow-col grid-cols-12 px-3 py-1 ">
					<div className="flex col-span-4 gap-2">
						<div className="flex gap-2 text-xs justify-items-center">
							<select
								className="w-full text-xs"
								onChange={(e) => {
									const selectedIndex = e.target.selectedIndex;
									const selectedItem = searchResults[selectedIndex - 1];
									if (selectedItem) {
										setSelectedItems((prevItems) => [
											...prevItems,
											selectedItem,
										]);
										updateRequestItems(selectedItem);
									}
								}}>
								<option>Select item</option>
								{searchResults &&
									searchResults.map((item) => (
										<option key={item.id} value={item.id}>
											{item.name}
										</option>
									))}
							</select>
						</div>
						<div className="flex gap-2 text-xs justify-items-center">
							<select {...register("store")} className="w-full text-xs">
								<option selected={true} value={""}>
									All stores
								</option>
								{stores &&
									stores.map((store) => (
										<option key={crypto.randomUUID()} value={store.id}>
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
										<option key={crypto.randomUUID()} value={category.id}>
											{category.name}
										</option>
									))}
							</select>
						</div>
					</div>
					<div className="grid content-center grid-flow-col col-span-3 gap-2 ">
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
				<div className="flex items-center gap-3">
					<button className="flex items-center gap-1 px-2 py-1 text-xs bg-black text-slate-100 ">
						Print
						<BsPrinter />
					</button>
					<button
						onClick={createPurchaseOrder}
						type="button"
						className="flex items-center gap-3 px-4 py-1 text-xs bg-teal-900 text-slate-100">
						Submit
						<CheckIcon className="w-3 h-3 font-bold text-white" />
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
			<PurchaseOrderFooter />
		</div>
	);
};

export default CreatePurchaseOrder;
