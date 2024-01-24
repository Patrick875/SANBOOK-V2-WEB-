import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { BackButton } from "../../../shared/BackButton";
import PurchaseOrderFooter from "../PurchaseOrderFooter";
import DocumentHeader from "../../../shared/DocumentHeader";
import { useEffect, useMemo, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import instance from "../../../API";

function ViewReceiveVaucher() {
	const { order } = useParams();
	const [data] = useFetchData(`/stock/receivevaucher/${order}`);
	const [rowsReceive, setRowsReceive] = useState(undefined);
	const [rowsPurchase, setRowsPurchase] = useState(undefined);

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
	let totalReceive: number = 0;
	let totalPurc: number = 0;

	const balance = useMemo(() => {
		if (rowsPurchase && rowsReceive) {
			totalPurc = rowsPurchase.reduce((accumulator, item) => {
				const prod = item.unitPrice * item.requestQuantity;
				return prod + accumulator;
			}, 0);
			totalReceive = rowsReceive.reduce((accumulator, item) => {
				const prod = item.unitPrice * item.receivedQuantity;
				return prod + accumulator;
			}, 0);

			const balance = totalPurc - totalReceive;
			return balance;
		} else {
			return 0;
		}
	}, [rowsPurchase, rowsReceive]);
	const headers: string[] = ["Item", "Price", "Quantity", "Unit", "Total"];
	console.log("data", data);

	const updateVoucher = async () => {
		const purchaseSide = rowsPurchase.map((item) => {
			const { Item, ...rest } = item;
			return {
				...rest,
				purchaseDetailId: rest.id,
			};
		});
		const process1 = rowsReceive.map((item) => {
			const { Item, ...rest } = item;
			return {
				...rest,
				detailId: rest.id,
			};
		});

		await instance
			.patch(`/stock/receivevaucher/${order}`, {
				data: {
					receive: process1,
					purchase: purchaseSide,
					totalRec: totalReceive,
					totalPurc,
				},
			})
			.then((res) => {
				console.log("res results", res);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	useEffect(() => {
		// Check if data is present before updating the states
		if (data) {
			setRowsReceive(data.ReceiveVoucherDetails);
			setRowsPurchase(data.StockPurchaseOrder.StockPurchaseOrderDetails);
		}
	}, [data]);

	return (
		<div className="w-full">
			<BackButton />

			{data && (
				<div>
					<DocumentHeader />
					<p className="w-full text-xs font-bold text-center uppercase">
						Receive Vaucher {data?.receiveVoucherId}
					</p>
					<div className="flex w-full">
						<div className="w-full">
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
										{rowsPurchase &&
											rowsPurchase.map((item) => (
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
												{rowsPurchase &&
													rowsPurchase
														.reduce((accumulator, item) => {
															const prod =
																item.unitPrice * item.requestQuantity;
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
						<div className="w-full">
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
										{rowsReceive &&
											rowsReceive.map((item) => (
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
															name="receivedQuantity"
															value={item["receivedQuantity"]}
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
																item.unitPrice * item.receivedQuantity
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
												{rowsReceive &&
													rowsReceive
														.reduce((accumulator, item) => {
															const prod =
																item.unitPrice * item.receivedQuantity;
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
						<p>Done on {new Date(data.date).toLocaleString("fr-FR")}</p>
						<button
							type="button"
							onClick={updateVoucher}
							className="flex gap-3 px-4 py-2 font-bold text-white rounded-sm bg-sky-900">
							Update <CheckIcon className="w-4 h-4" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default ViewReceiveVaucher;
