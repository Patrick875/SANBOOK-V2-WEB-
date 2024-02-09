import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useMemo, useState } from "react";
import { identity, purchaseOrder } from "../../../types";
import { BackButton } from "../../../shared/BackButton";
import PurchaseOrderFooter from "../PurchaseOrderFooter";
import EditableTable from "../../../shared/EditableTable";
import { fetchData, initialRows } from "../../../types/constants";
import { collapseSideBar } from "../../../Redux/sideBarSlice";
import { useDispatch } from "react-redux";
import usePostData from "../../../hooks/usePostData";
import CreatePurchaseSide from "./CreatePurchaseSide";
import CreateReceiverSide from "./CreateReceiverSide";
import CreateHeader from "./CreateHeader";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import { IoCalendar } from "react-icons/io5";

function CreateReceiveVaucher() {
	const { register, watch, setValue, control } = useForm();
	const dispatch = useDispatch();
	const { postData } = usePostData();
	const resetFilledData = () => {
		setRowsSupplier(initialRows);
		setSelectedPurchaseOrder(undefined);
	};
	const [receivingFrom, setReceivingFrom] = useState<string>("");
	const query = watch("query");
	const date = watch("date");
	const headers: string[] = ["Item", "Price", "Quantity", "Unit", "Total"];
	const [purchaseOrders, setPurchaseOrders] = useState([]);
	const [suppliers, setSuppliers] = useState([]);
	const [items, setItems] = useState([]);
	const [selectedSupplier, setSelectedSupplier] = useState();
	const [rowsReceive, setRowsReceive] = useState([]);
	const [rowsSupplier, setRowsSupplier] = useState(initialRows);
	const [rowsPurchase, setRowsPurchase] = useState([]);
	const [createdId, setCreatedId] = useState<string | null>(null);
	const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState();
	const replaceItemWithIndex = (index, selectedItem) => {
		const updatedRows = [...rowsSupplier];
		updatedRows[index] = {
			...updatedRows[index],
			id: selectedItem.id,
			name: selectedItem.name,
			price: selectedItem.price,
		};
		setRowsSupplier(updatedRows);
	};
	const updateRequestItems = (selectedItem) => {
		if (items.length === 0) {
			const indexToReplace = rowsSupplier.findIndex((obj) => obj.name === "");
			replaceItemWithIndex(indexToReplace, selectedItem);
		} else {
			// Check if an item with the same name already exists in requestItems
			const itemExists = rowsSupplier.some(
				(item) => item.name === selectedItem.name
			);

			if (!itemExists) {
				const indexToReplace = rowsSupplier.findIndex((obj) => obj.name === "");
				if (indexToReplace !== -1) {
					replaceItemWithIndex(indexToReplace, selectedItem);
				} else {
					setRowsSupplier((prevRows) => [
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
				console.log(`Item  already exists in rowsSupplier`);
			}
		}
	};
	const onChangeInput = (e, id, dataSet, doc) => {
		const { name, value } = e.target;
		const editData = dataSet.map((item) =>
			item.id === id && name
				? name === "name"
					? {
							...item,
							Item: {
								...item.Item,
								name: value,
							},
					  }
					: { ...item, [name]: value }
				: item
		);
		if (doc === "rec") {
			setRowsReceive(editData);
		} else {
			setRowsPurchase(editData);
		}
	};
	const searchPurchaseOrders = async () => {
		if (
			receivingFrom !== "" &&
			receivingFrom === "purchaseorder" &&
			query !== ""
		) {
			const data = await fetchData(`/stock/purchaseorder/rec/${query}`);
			setPurchaseOrders(data);
		}
	};
	const searchSuppliers = async () => {
		const data = await fetchData(`/stock/suppliers/rec/${query}`);
		setSuppliers(data);
	};
	const getItems = async () => {
		const data = await fetchData(`/stock/items/`);
		setItems(data.ungrouped);
	};
	const balance = useMemo(() => {
		if (rowsPurchase && rowsReceive) {
			const totalPurc = rowsPurchase.reduce((accumulator, item) => {
				const prod = item.unitPrice * item.requestQuantity;
				return prod + accumulator;
			}, 0);
			const totalRec = rowsReceive.reduce((accumulator, item) => {
				const prod = item.unitPrice * item.requestQuantity;
				return prod + accumulator;
			}, 0);
			const balance = totalPurc - totalRec;
			return balance;
		} else {
			return 0;
		}
	}, [rowsPurchase, rowsReceive]);
	const createVoucher = async () => {
		let res;
		if (receivingFrom === "purchaseorder") {
			const purchaseSide = rowsPurchase;
			const process1 = rowsReceive.map((item) => {
				const { Item, times, ...rest } = item;
				return {
					...rest,
					receiveQuantity: item.requestQuantity,
					stockPurchaseOrderId: selectedPurchaseOrder?.id,
				};
			});
			res = await postData("/stock/receivevaucher", {
				data: {
					receive: process1,
					purchase: purchaseSide,
					date: date,
				},
			});
		} else if (receivingFrom === "supplier") {
			res = await postData("/stock/receivevaucher/sup", {
				data: {
					items: rowsSupplier.filter((item) => item.name != ""),
					supplierId: selectedSupplier?.id,
					date: date,
				},
			});
		}
		if (res) {
			setCreatedId(res.voucherId);
			toast.success("Receive voucher submitted !!!");
		}
	};
	const SubmitComponent = () => (
		<div className="flex items-center justify-between w-full my-2 text-xs">
			<p>Done on {new Date().toLocaleDateString("fr-FR")}</p>
			<button
				type="button"
				onClick={createVoucher}
				className="flex gap-3 px-4 py-2 text-white bg-teal-900 rounded-[4px]">
				Submit <CheckIcon className="w-4 h-4" />
			</button>
		</div>
	);
	useEffect(() => {
		if (receivingFrom === "purchaseorder") {
			searchPurchaseOrders();
		} else if (receivingFrom === "supplier") {
			searchSuppliers();
			if (selectedSupplier !== "") {
				getItems();
			}
		}
	}, [receivingFrom, query]);
	return (
		<div>
			<BackButton />
			<div className="w-full grid-flow-col gap-2 px-2 py-2 bg-white rounded-md justify-stretch">
				<form className="grid justify-between w-full grid-flow-col grid-cols-12 px-3 py-1 ">
					<div className="flex col-span-8 gap-2">
						<div className="flex items-center justify-center gap-2 text-xs">
							<p className="font-bold">Receiving from</p>
							<select
								className="text-xs "
								onChange={(e) => {
									setReceivingFrom(e.target.value);
									resetFilledData();
								}}>
								<option value="">Select</option>
								<option value="purchaseorder">Purchase order</option>
								<option value="supplier">Supplier</option>
								<option value="returning">Returning</option>
							</select>
						</div>
						<div className="">
							<div className="flex items-center gap-1 px-3 py-1 rounded-sm bg-search-bg">
								<MagnifyingGlassIcon className="w-4 h-4 text-login-blue" />
								<input
									placeholder="Search"
									value={query}
									className="w-full h-full text-xs bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-bold"
									{...register("query")}
								/>
							</div>

							{query && query !== "" && (
								<div className="relative w-full">
									<div className="absolute w-full bg-white">
										{receivingFrom === "purchaseorder" &&
											purchaseOrders.map((pur: purchaseOrder) => (
												<p
													onClick={() => {
														setSelectedPurchaseOrder(pur);
														setRowsReceive(pur.StockPurchaseOrderDetails);
														setRowsPurchase(pur.StockPurchaseOrderDetails);
														setValue("query", "");
													}}
													className="p-2 text-xs font-bold hover:bg-slate-200 hover:cursor-pointer">
													{pur.purchaseOrderId}
												</p>
											))}
										{receivingFrom === "supplier" &&
											query !== "" &&
											suppliers &&
											suppliers.map((supplier) => (
												<p
													onClick={() => {
														setSelectedSupplier((prev) => supplier);
														dispatch(collapseSideBar());
														setValue("query", "");
													}}>
													{supplier.name}
												</p>
											))}
									</div>
								</div>
							)}
						</div>
						{receivingFrom === "supplier" && selectedSupplier && (
							<div className="">
								<select
									onChange={(e) => {
										const selected =
											items && items.find((el) => el.id == e.target.value);
										updateRequestItems(selected);
									}}
									className="text-xs ">
									<option>Select items</option>
									{items &&
										items.map((item: identity) => (
											<option value={item.id}>{item.name}</option>
										))}
								</select>
							</div>
						)}
					</div>
					<div className="grid content-center grid-flow-col col-span-4 gap-2 ">
						<div className="flex items-center justify-center gap-2 text-xs">
							<label className="font-bold">Received on</label>
							<Controller
								name="date"
								control={control}
								render={({ field }) => (
									<DatePicker
										placeholderText="select received date"
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
			<CreateHeader document="Receieve Voucher" createdId={createdId} />
			{receivingFrom === "purchaseorder" && selectedPurchaseOrder && (
				<div>
					<div className="flex">
						<CreatePurchaseSide
							headers={headers}
							rowsPurchase={rowsPurchase}
							onChangeInput={onChangeInput}
						/>
						<CreateReceiverSide
							headers={headers}
							rowsReceive={rowsReceive}
							onChangeInput={onChangeInput}
							balance={balance}
						/>
					</div>
					<PurchaseOrderFooter />
					<SubmitComponent />
				</div>
			)}

			{receivingFrom && receivingFrom === "supplier" && (
				<React.Fragment>
					<EditableTable
						cols={["name", "price", "quantity", "unit"]}
						totals={["total"]}
						headers={["item", "Price", "Quantity", "Unit", "Total"]}
						subtotalCols={["price", "quantity"]}
						data={rowsSupplier}
						readOnlyCols={["name"]}
						readOnly={false}
						type="purchase order"
						setData={setRowsSupplier}
						hidePrice={false}
					/>
					<SubmitComponent />
				</React.Fragment>
			)}
		</div>
	);
}

export default CreateReceiveVaucher;
