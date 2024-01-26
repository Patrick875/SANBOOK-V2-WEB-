import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { BackButton } from "../../../shared/BackButton";
import PurchaseOrderFooter from "../PurchaseOrderFooter";
import DocumentHeader from "../../../shared/DocumentHeader";
import React, { useEffect, useMemo, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import CreatePurchaseSide from "./CreatePurchaseSide";
import CreateReceiverSide from "./CreateReceiverSide";
import instance from "../../../API";
import { error } from "../../../types";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";

function ViewReceiveVaucher() {
	const { order } = useParams();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const [error, setError] = useState<error>(null);
	const [data] = useFetchData(`/stock/receivevaucher/${order}`);
	const [rowsReceive, setRowsReceive] = useState(undefined);
	const [rowsPurchase, setRowsPurchase] = useState(undefined);
	const [supplierReceivedRows, setSupplierReceivedRows] = useState(undefined);
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
		} else if (doc === "sup") {
			setSupplierReceivedRows(editData);
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

	const updateData = async <T,>(url: string, data: T) => {
		setIsLoading(true);
		await instance
			.patch(`${url}`, data)
			.then((res) => {
				setSuccess(true);
				return res.data;
			})
			.catch((error) => {
				setError(error.message || "An error occurred");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const updateVoucher = async () => {
		let process1;
		if (!data.supplierList) {
			const purchaseSide = rowsPurchase.map((item) => {
				const { Item, ...rest } = item;
				return {
					...rest,
					purchaseDetailId: rest.id,
				};
			});
			process1 = rowsReceive.map((item) => {
				const { Item, ...rest } = item;
				return {
					...rest,
					detailId: rest.id,
				};
			});
			await updateData(`/stock/receivevaucher/${order}`, {
				data: {
					receive: process1,
					purchase: purchaseSide,
					totalRec: totalReceive,
					totalPurc,
					supplierList: data?.supplierList,
				},
			});
		} else {
			process1 =
				supplierReceivedRows &&
				supplierReceivedRows.map((item) => {
					const { Item, ...rest } = item;
					return {
						...rest,
						detailId: rest.id,
					};
				});

			const totalRec = supplierReceivedRows?.reduce((accumulator, item) => {
				const prod = item.unitPrice * item.receivedQuantity;
				return prod + accumulator;
			}, 0);
			console.log("total-rec", totalRec);

			await updateData(`/stock/receivevaucher/${order}`, {
				data: {
					receive: process1,
					totalRec,
					totalPurc,
					supplierList: data?.supplierList,
				},
			});
		}
	};

	useEffect(() => {
		// Check if data is present before updating the states
		if (data) {
			if (data.StockPurchaseOrder) {
				setRowsReceive(data.ReceiveVoucherDetails);
				setRowsPurchase(data.StockPurchaseOrder.StockPurchaseOrderDetails);
			} else {
				setSupplierReceivedRows(data.ReceiveVoucherDetails);
			}
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
					{rowsPurchase && rowsReceive && (
						<div className="flex w-full">
							<div className="w-full">
								<CreatePurchaseSide
									headers={headers}
									rowsPurchase={rowsPurchase}
									onChangeInput={onChangeInput}
								/>
							</div>
							<div className="w-full">
								<CreateReceiverSide
									headers={headers}
									rowsReceive={rowsReceive}
									onChangeInput={onChangeInput}
									balance={balance}
								/>
							</div>
						</div>
					)}
					{supplierReceivedRows && (
						<div>
							<div className="w-full">
								<p className="my-3 text-xs font-bold uppercase">
									Ref : Supplier list {data.supplierList}
								</p>
								<CreateReceiverSide
									headers={headers}
									rowsReceive={supplierReceivedRows}
									onChangeInput={onChangeInput}
									balance={balance}
									supplier={true}
								/>
							</div>
						</div>
					)}
					<PurchaseOrderFooter />
					{success && toast.success("Voucher updated successfuly !!!")}
					<div className="flex items-center justify-between w-full text-xs">
						<p>Done on {new Date(data.date).toLocaleString("fr-FR")}</p>
						<button
							type="button"
							onClick={updateVoucher}
							className="flex gap-3 px-4 py-2   font-bold text-white rounded-[4px] bg-sky-900">
							{!isLoading ? (
								<React.Fragment>
									Update <CheckIcon className="w-4 h-4" />
								</React.Fragment>
							) : (
								<HashLoader color="#ffffff" loading={isLoading} size={15} />
							)}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default ViewReceiveVaucher;
