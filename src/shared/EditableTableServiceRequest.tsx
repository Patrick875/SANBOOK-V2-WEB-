import React, { ChangeEvent } from "react";
import "./../css/editableTable.css";

interface EditableTableRRequestProps {
	data: Array<any>;
	setData?: React.Dispatch<React.SetStateAction<any[]>>;
	readOnly: boolean;
	readOnlyCols?: string[];
	headers: string[];
	cols: string[];
}

const EditableTableServiceRequest: React.FC<EditableTableRRequestProps> = (
	props
) => {
	const { data, setData, readOnly, headers, cols, readOnlyCols } = props;
	const onChangeInput = (e: ChangeEvent<HTMLInputElement>, id: string) => {
		const { name, value } = e.target;
		if (!readOnly && setData) {
			setData((prevData) =>
				prevData.map((item) =>
					item.id === id && name
						? name === "date"
							? { ...item, [name]: new Date(value).toLocaleDateString("fr-FR") }
							: name === "quantity" || name === "times"
							? { ...item, [name]: parseFloat(value) || 0 }
							: { ...item, [name]: value }
						: { ...item }
				)
			);
		}
	};

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
					{data.map((item) => (
						<tr key={item.id}>
							{cols.map((col) => (
								<td key={col}>
									<input
										name={col}
										value={item[col]}
										readOnly={
											readOnlyCols ? readOnlyCols.includes(col) : readOnly
										}
										type="text"
										onChange={(e) => onChangeInput(e, item.id)}
										placeholder=""
									/>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default EditableTableServiceRequest;
