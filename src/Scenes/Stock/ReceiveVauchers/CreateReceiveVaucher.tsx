import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import instance from "../../../API";
import { useEffect, useMemo, useState } from "react";
import { purchaseOrder } from "../../../types";
import DocumentHeader from "../../../shared/DocumentHeader";
import { BackButton } from "../../../shared/BackButton";
import PurchaseOrderFooter from "../PurchaseOrderFooter";

function CreateReceiveVaucher() {
	const { register, watch, setValue } = useForm();
	const receivingFrom = watch("from") || "";
	const query = watch("query");
	const headers: string[] = ["Item", "Price", "Quantity", "Unit", "Total"];
	const [purchaseOrders, setPurchaseOrders] = useState([]);
	let [rowsReceive, setRowsReceive] = useState();
	let [rowsPurchase, setRowsPurchase] = useState();
	const [createdId, setCreatedId] = useState<string | null>(null);
	const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState();
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
			await instance
				.get(`/stock/purchaseorder/rec/${query}`)
				.then((res) => {
					console.log("res", res);
					setPurchaseOrders(res.data.data);
				})
				.catch((err) => {
					console.log("err", err);
				});
		}
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
		const purchaseSide = rowsPurchase;
		const process1 = rowsReceive.map((item) => {
			const { Item, ...rest } = item;
			return {
				...rest,
				receiveQuantity: item.requestQuantity,
				stockPurchaseOrderId: selectedPurchaseOrder?.id,
			};
		});

		await instance
			.post("/stock/receivevaucher", {
				data: {
					receive: process1,
					purchase: purchaseSide,
				},
			})
			.then((res) => {
				setCreatedId(res.data.voucherId);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};
	useEffect(() => {
		searchPurchaseOrders();
	}, [receivingFrom, query]);
	return (
		<div>
			<BackButton />
			<div className="w-full grid-flow-col gap-2 px-2 py-2 bg-white rounded-md justify-stretch">
				<form className="grid justify-between w-full grid-flow-col grid-cols-12 px-3 py-1 ">
					<div className="flex col-span-8 gap-2">
						<div className="flex items-center justify-center gap-2 text-xs">
							<p className="font-bold">Receiving from</p>
							<select className="text-xs " {...register("from")}>
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
									className="w-full h-full text-xs bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-bold"
									{...register("query")}
								/>
							</div>
							{query && query !== "" && purchaseOrders.length !== 0 && (
								<div className="relative w-full">
									<div className="absolute w-full bg-white">
										{purchaseOrders.map((pur: purchaseOrder) => (
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
									</div>
								</div>
							)}
						</div>
					</div>
					<div className="grid content-center grid-flow-col col-span-4 gap-2 ">
						<div className="flex items-center justify-center gap-2 text-xs">
							<label className="font-bold">Received on</label>
							<input type="date" className="block " />
						</div>
					</div>
				</form>
			</div>
			<DocumentHeader />
			<p className="w-full text-xs font-bold text-center uppercase">
				Receive Vaucher {createdId}
			</p>
			{selectedPurchaseOrder && (
				<div>
					<div className="flex">
						<div>
							<p className="my-2 text-xs font-bold">Purchase order</p>
							<div className="editableTable">
								<table>
									<thead>
										<tr>
											{headers.map((header) => (
												<th key={header}>{header}</th>
											))}
										</tr>
									</thead>
									<tbody>
										{rowsPurchase.map((item) => (
											<tr key={item.id}>
												<td key="name">
													<input
														name="name"
														value={item.Item["name"]}
														readOnly={false}
														type="text"
														onChange={(e) =>
															onChangeInput(e, item.id, rowsPurchase, "purc")
														}
														placeholder=""
													/>
												</td>
												<td key="price">
													<input
														name="unitPrice"
														value={item["unitPrice"]}
														readOnly={false}
														type="text"
														onChange={(e) =>
															onChangeInput(e, item.id, rowsPurchase, "purc")
														}
														placeholder=""
													/>
												</td>
												<td key="quantity">
													<input
														name="requestQuantity"
														value={item["requestQuantity"]}
														readOnly={false}
														type="text"
														onChange={(e) =>
															onChangeInput(e, item.id, rowsPurchase, "purc")
														}
														placeholder=""
													/>
												</td>
												<td key="unit">
													<input
														name="unit"
														value={item["unit"]}
														readOnly={false}
														type="text"
														onChange={(e) =>
															onChangeInput(e, item.id, rowsPurchase, "purc")
														}
														placeholder=""
													/>
												</td>

												<td>
													<input
														name="total"
														type="text"
														className="text-xs"
														value={Number(
															item.unitPrice * item.requestQuantity
														).toLocaleString()}
														onChange={(e) =>
															onChangeInput(e, item.id, rowsPurchase, "purc")
														}
														placeholder=""
														readOnly={false}
													/>
												</td>
											</tr>
										))}
										<tr className="text-xs font-bold">
											<td colSpan={headers.length - 1}>Total</td>
											<td>
												{rowsPurchase
													.reduce((accumulator, item) => {
														const prod = item.unitPrice * item.requestQuantity;
														return prod + accumulator;
													}, 0)
													.toLocaleString()}
											</td>
										</tr>
										<tr>
											<td className="text-xs font-bold">Balance</td>
											<td colSpan={headers.length - 1} />
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div>
							<p className="my-2 text-xs font-bold">Receive vaucher</p>
							<div className="editableTable">
								<table>
									<thead>
										<tr>
											{headers.map((header) => (
												<th key={header}>{header}</th>
											))}
										</tr>
									</thead>
									<tbody>
										{[...rowsReceive].map((item) => (
											<tr key={item.id}>
												<td key="name">
													<input
														name="name"
														value={item.Item["name"]}
														readOnly={false}
														type="text"
														onChange={(e) =>
															onChangeInput(e, item.id, rowsReceive, "rec")
														}
														placeholder=""
													/>
												</td>
												<td key="price">
													<input
														name="unitPrice"
														value={item["unitPrice"]}
														readOnly={false}
														type="text"
														onChange={(e) =>
															onChangeInput(e, item.id, rowsReceive, "rec")
														}
														placeholder=""
													/>
												</td>
												<td key="quantity">
													<input
														name="requestQuantity"
														value={item["requestQuantity"]}
														readOnly={false}
														type="text"
														onChange={(e) =>
															onChangeInput(e, item.id, rowsReceive, "rec")
														}
														placeholder=""
													/>
												</td>
												<td key="unit">
													<input
														name="unit"
														value={item["unit"]}
														readOnly={false}
														type="text"
														onChange={(e) =>
															onChangeInput(e, item.id, rowsReceive, "rec")
														}
														placeholder=""
													/>
												</td>

												<td>
													<input
														name="total"
														type="text"
														className="text-xs"
														value={Number(
															item.unitPrice * item.requestQuantity
														).toLocaleString()}
														onChange={(e) =>
															onChangeInput(e, item.id, rowsReceive, "rec")
														}
														placeholder=""
														readOnly={false}
													/>
												</td>
											</tr>
										))}
										<tr className="text-xs font-bold">
											<td className="text-xs" colSpan={headers.length - 1}>
												Total
											</td>
											<td className="text-xs">
												{rowsReceive
													.reduce((accumulator, item) => {
														const prod = item.unitPrice * item.requestQuantity;
														return prod + accumulator;
													}, 0)
													.toLocaleString()}
											</td>
										</tr>
										<tr>
											<td colSpan={headers.length - 1} />
											<td className="text-xs font-bold">
												{balance.toLocaleString()}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<PurchaseOrderFooter />
					<div className="flex items-center justify-between w-full text-xs">
						<p>Done on {new Date().toLocaleDateString("fr-FR")}</p>
						<button
							type="button"
							onClick={createVoucher}
							className="flex gap-3 px-4 py-2 text-white bg-teal-900 rounded-sm">
							Submit <CheckIcon className="w-4 h-4" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default CreateReceiveVaucher;
