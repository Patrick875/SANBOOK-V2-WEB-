import React, { ChangeEvent } from "react";
import "./../css/editableTable.css";

// interface Props {
// 	data: any;
// 	setData: (data: any) => void;
// 	readOnly: boolean;
// 	hidePrice: boolean;
// 	type: string;
// 	columns: string[];
// 	totals?: string[];
// 	totalRows?: string[];
// }

interface EditableTableProps {
	data: Array<any>;
	setData?: React.Dispatch<React.SetStateAction<any[]>>;
	readOnly: boolean;
	hidePrice: boolean;
	type: string;
	headers: string[];
	cols: string[];
	totals?: string[]; // Replace 'any' with the actual type of totals
	subtotalCols: string[];
}

const EditableTable: React.FC<EditableTableProps> = (props) => {
	const {
		data,
		setData,
		readOnly,
		hidePrice,
		type,
		headers,
		cols,
		totals,
		subtotalCols,
	} = props;

	const priceHidden = hidePrice || false;

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>, id: string) => {
		const { name, value } = e.target;
		if (!readOnly && setData) {
			setData((prevData) =>
				prevData.map((item) =>
					item.id === id && name
						? name === "date"
							? { ...item, [name]: new Date(value).toLocaleDateString("fr-FR") }
							: name === "quantity" ||
							  name === "times" ||
							  name === "price" ||
							  name === "unitPrice"
							? { ...item, [name]: parseFloat(value) || 0 }
							: { ...item, [name]: value }
						: { ...item }
				)
			);
		}
	};

	const computeOrderTotal = (items: any[]) => {
		return items.reduce(
			(total, item) =>
				total +
				subtotalCols.reduce((subtotal, col) => subtotal * Number(item[col]), 1),
			0
		);
	};

	const computeAmountVAT = (total: number) => {
		return type !== "delivery" ? Number((total * 18) / 100) : 0;
	};

	const computeFinalTotal = (total: number, amountVAT: number) => {
		return type !== "delivery" ? Number(total + amountVAT) : total;
	};

	const orderTotal = computeOrderTotal(data);
	const amountVAT = computeAmountVAT(orderTotal);
	const finalTotal = computeFinalTotal(orderTotal, amountVAT);

	let totalRows: any[] = [];

	if (type === "invoice") {
		totalRows = [
			{
				id: crypto.randomUUID(),
				name: "Subtotal",
				flex: 1,
				minWidth: 200,
				maxWidth: 300,
				requestQuantity: "",
				unitPrice: "",
				total: orderTotal,
			},
			{
				id: crypto.randomUUID(),
				name: "VAT",
				flex: 1,
				minWidth: 200,
				maxWidth: 300,
				requestQuantity: "",
				unitPrice: "",
				total: amountVAT,
			},
			{
				id: crypto.randomUUID(),
				name: "Total",
				flex: 1,
				minWidth: 200,
				maxWidth: 300,
				requestQuantity: "",
				unitPrice: "",
				total: finalTotal,
			},
		];
	} else if (type === "otherType") {
		// Add conditions for other types and define totalRows accordingly
	} else {
		// Default case, type is 'delivery' or other unhandled types
		totalRows = totals.map((el) => ({
			id: crypto.randomUUID(),
			name: el,
			flex: 1,
			minWidth: 200,
			maxWidth: 300,
			requestQuantity: "",
			unitPrice: "",
			total: orderTotal,
		}));
	}

	return (
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
					{[...data].map((item) => (
						<tr key={item.id}>
							{cols.map((col) => (
								<td key={col}>
									<input
										name={col}
										value={item[col] === 0 ? "" : item[col]}
										readOnly={readOnly}
										type="text"
										onChange={(e) => onChangeInput(e, item.id)}
										placeholder=""
									/>
								</td>
							))}
							<td>
								<input
									name="total"
									type="text"
									value={
										hidePrice
											? 0
											: Number(
													subtotalCols.reduce(
														(subtotal, col) => subtotal * Number(item[col]),
														1
													)
											  )
									}
									onChange={(e) => onChangeInput(e, item.id)}
									placeholder=""
									readOnly={readOnly}
								/>
							</td>
						</tr>
					))}
					{totalRows.map(({ id, name, total }) => (
						<tr key={id} className="capitalize lastRows">
							<td colSpan={cols.length}>{name}</td>
							<td>
								<input
									name="total"
									type="text"
									value={hidePrice ? 0 : Number(total)}
									onChange={(e) => onChangeInput(e, id)}
									placeholder=""
									readOnly={readOnly}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default EditableTable;
