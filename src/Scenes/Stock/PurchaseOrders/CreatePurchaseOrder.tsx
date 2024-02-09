import { CheckIcon } from "@heroicons/react/24/outline";
import { Controller, useForm } from "react-hook-form";
import { useFetchData } from "../../../hooks/useFetchData";
import EditableTable from "../../../shared/EditableTable";
import { initialRows } from "../../../types/constants";
import { useEffect, useState } from "react";
import { purcPlaceholder } from "../../../types";
import instance from "../../../API";
import usePostData from "../../../hooks/usePostData";
import PurchaseOrderFooter from "../PurchaseOrderFooter";
import DocumentHeader from "../../../shared/DocumentHeader";
import toast from "react-hot-toast";
import { IoCalendar, IoRemove } from "react-icons/io5";
import { BackButton } from "../../../shared/BackButton";
import Datepicker from "react-datepicker";

const CreatePurchaseOrder = () => {
	const { postData, isLoading } = usePostData();
	const { register, watch, control } = useForm();
	const category = watch("category") || 0;
	const store = watch("store") || 0;
	const date = watch("date");
	const [searchResults, setSearchResults] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);
	const [requestItems, setRequestItems] = useState<purcPlaceholder[]>([
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

	const createPurchaseOrder = async () => {
		const submitdata = requestItems.filter((item) => item.name !== "");
		const data = { order: submitdata, date: new Date(date).toUTCString() };
		const response = await postData("/stock/purchaseorder", data);
		if (response) {
			toast.success("Purchase order created successfully !!!!");
		}
	};
	const clearPurchaseOrder = () => {
		setRequestItems(initialRows);
	};
	useEffect(() => {
		handleSearch();
	}, [category, store]);
	return (
		<div className="w-full">
			<BackButton />
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
									stores.map((st) => (
										<option
											selected={store == st.id}
											key={crypto.randomUUID()}
											value={st.id}>
											{st.name}
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
									categories.map((cat) => (
										<option
											key={crypto.randomUUID()}
											selected={category == cat.id}
											value={cat.id}>
											{cat.name}
										</option>
									))}
							</select>
						</div>
					</div>
					<div className="grid content-center grid-flow-col col-span-4 gap-2 ">
						<div className="flex items-center justify-center gap-2 text-xs">
							<label>Done on</label>
							<Controller
								control={control}
								name="date"
								render={({ field }) => (
									<Datepicker
										placeholderText="pick a date"
										onChange={(date) => field.onChange(date)}
										selected={field.value}
										showIcon
										className="border-[1.5px] text-xs border-gray-800 rounded-[4px]"
										icon={<IoCalendar className="w-3 h-3 text-sky-700" />}
									/>
								)}
							/>
						</div>
					</div>
				</form>
			</div>
			<DocumentHeader>
				<div className="flex items-center gap-3">
					<button
						onClick={clearPurchaseOrder}
						type="button"
						className="flex items-center gap-3 px-4 py-1 text-xs bg-pink-900 text-slate-100">
						Clear <IoRemove />
					</button>
					<button
						onClick={createPurchaseOrder}
						type="button"
						className="flex items-center gap-3 px-4 py-1 text-xs bg-teal-900 text-slate-100">
						Submit
						<CheckIcon className="w-3 h-3 font-bold text-white" />
					</button>
				</div>
			</DocumentHeader>
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
