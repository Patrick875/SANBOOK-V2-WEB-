import { useParams } from "react-router-dom";
import { BackButton } from "../../../shared/BackButton";
import { useFetchData } from "../../../hooks/useFetchData";

function SupplierDetailsList() {
	const { list } = useParams();
	const [data, loading] = useFetchData(`/stock/supplierlists/${list}`);
	const headers: string[] = ["Item", "Quantity", "Unit", "Price/unit", "Total"];
	console.log("list", { list, data });

	return (
		<div>
			<BackButton />
			{loading && (
				<p className="w-full py-3 my-4 text-xs text-center ">Loading ...</p>
			)}
			{data && (
				<div className="mt-4">
					<div>
						<p className="py-1 text-xs">
							Supplier List : {data.supplierListId}
						</p>
						<p className="py-1 text-xs">Created by : </p>
						<p className="py-1 text-xs">
							Created on :{new Date(data.date).toLocaleDateString("fr-FR")}{" "}
						</p>
					</div>
					<p className="mt-3 mb-1 text-xs font-bold text-center">
						{data.supplierListId}
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
								{data.SupplierListItems.map((item) => (
									<tr key={item.id} className="bg-transparent">
										<td key="name">
											<input
												name="name"
												value={item.Item["name"]}
												readOnly={true}
												type="text"
												placeholder=""
											/>
										</td>
										<td key="quantity">
											<input
												name="quantity"
												value={item["quantity"]}
												readOnly={true}
												type="text"
												placeholder=""
											/>
										</td>
										<td key="unit">
											<input
												name="unit"
												value={item["unit"]}
												readOnly={true}
												type="text"
												placeholder=""
											/>
										</td>
										<td key="price">
											<input
												name="unitPrice"
												value={item["unitPrice"]}
												readOnly={true}
												type="text"
												placeholder=""
											/>
										</td>

										<td>
											<input
												name="total"
												type="text"
												className="text-xs"
												value={Number(
													item.unitPrice * item.quantity
												).toLocaleString()}
												placeholder=""
												readOnly={true}
											/>
										</td>
									</tr>
								))}
								<tr className="text-xs font-bold">
									<td colSpan={headers.length - 1}>Total</td>
									<td>
										{data.SupplierListItems.reduce((accumulator, item) => {
											const prod = item.unitPrice * item.quantity;
											return prod + accumulator;
										}, 0).toLocaleString()}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
}

export default SupplierDetailsList;
