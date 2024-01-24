import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import DocumentHeader from "../../../shared/DocumentHeader";
import PurchaseOrderFooter from "../PurchaseOrderFooter";
import { BackButton } from "../../../shared/BackButton";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import instance from "../../../API";

function ViewPurchaseOrder() {
	const { order } = useParams();
	const [data] = useFetchData(`/stock/purchaseorder/${order}`);
	const [rowsPurchase, setRowsPurchase] = useState();
	const total = useMemo(() => {
		if (rowsPurchase) {
			const totalPurc = rowsPurchase.reduce((accumulator, item) => {
				const prod = item.unitPrice * item.requestQuantity;
				return prod + accumulator;
			}, 0);
			return totalPurc;
		} else {
			return 0;
		}
	}, [rowsPurchase]);
	const onChangeInput = (e, id) => {
		const { name, value } = e.target;
		const editData = rowsPurchase.map((item) =>
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

		setRowsPurchase(editData);
	};
	const updateOrder = async () => {
		console.log("rows", rowsPurchase);

		await instance
			.patch(`/stock/purchaseorder/${order}`, { order: rowsPurchase, total })
			.then((res) => {
				console.log("res", res);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};
	const headers: string[] = ["Item", "Price", "Quantity", "Unit", "Total"];
	useEffect(() => {
		// Check if data is present before updating the states
		if (data) {
			setRowsPurchase(data.StockPurchaseOrderDetails);
		}
	}, [data]);

	return (
		<div>
			<BackButton />
			<DocumentHeader>
				<p> {data && data.status}</p>
			</DocumentHeader>

			{data && (
				<div>
					<p className="w-full mb-4 text-xs font-bold text-center uppercase">
						Purchase order {data?.purchaseOrderId}
					</p>
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
													onChange={(e) => onChangeInput(e, item.id)}
													readOnly={false}
													type="text"
													placeholder=""
												/>
											</td>
											<td key="price">
												<input
													name="unitPrice"
													value={item["unitPrice"]}
													onChange={(e) => onChangeInput(e, item.id)}
													readOnly={false}
													type="text"
													placeholder=""
												/>
											</td>
											<td key="quantity">
												<input
													name="requestQuantity"
													value={item["requestQuantity"]}
													onChange={(e) => onChangeInput(e, item.id)}
													readOnly={false}
													type="text"
													placeholder=""
												/>
											</td>
											<td key="unit">
												<input
													name="unit"
													value={item["unit"]}
													readOnly={false}
													onChange={(e) => onChangeInput(e, item.id)}
													type="text"
													placeholder=""
												/>
											</td>

											<td>
												<input
													name="total"
													type="text"
													value={Number(
														item.unitPrice * item.requestQuantity
													).toLocaleString()}
													placeholder=""
													readOnly={false}
												/>
											</td>
										</tr>
									))}
								<tr className="text-sm font-bold">
									<td colSpan={headers.length - 1}>Total</td>
									<td>{Number(total).toLocaleString()}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<PurchaseOrderFooter />
					<div className="flex items-center justify-between w-full text-xs">
						<p>Done on {new Date(data.date).toLocaleString("fr-FR")}</p>
						<button
							type="button"
							onClick={updateOrder}
							className="flex gap-3 px-4 py-2 font-bold text-white rounded-sm bg-sky-900">
							Update <CheckIcon className="w-4 h-4" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default ViewPurchaseOrder;
