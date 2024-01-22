import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import DocumentHeader from "../../../shared/DocumentHeader";
import PurchaseOrderFooter from "../PurchaseOrderFooter";
import { BackButton } from "../../../shared/BackButton";

function ViewPurchaseOrder() {
	const { order } = useParams();
	const [data] = useFetchData(`/stock/purchaseorder/${order}`);
	console.log("data", data);

	const headers: string[] = ["Item", "Price", "Quantity", "Unit", "Total"];

	return (
		<div>
			<BackButton />
			<DocumentHeader>
				<p> {data && data.status}</p>
			</DocumentHeader>

			{data && (
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
							{[...data[0].StockPurchaseOrderDetails].map((item) => (
								<tr key={item.id}>
									<td key="name">
										<input
											name="name"
											value={item.Item["name"]}
											readOnly={false}
											type="text"
											placeholder=""
										/>
									</td>
									<td key="price">
										<input
											name="unitPrice"
											value={item["unitPrice"]}
											readOnly={false}
											type="text"
											placeholder=""
										/>
									</td>
									<td key="quantity">
										<input
											name="requestQuantity"
											value={item["requestQuantity"]}
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
								<td>{Number(data[0].total).toLocaleString()}</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
			{data && <PurchaseOrderFooter />}
		</div>
	);
}

export default ViewPurchaseOrder;
