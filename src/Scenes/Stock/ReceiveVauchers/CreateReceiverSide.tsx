interface Props {
	balance: number;
	supplier?: boolean;
	headers: string[];
	rowsReceive: any[];
	onChangeInput: (
		e: React.ChangeEvent<HTMLInputElement>,
		id: number,
		dataSet: any[],
		doc?: string
	) => void;
}

function CreateReceiverSide({
	headers,
	rowsReceive,
	onChangeInput,
	balance,
	supplier,
}: Props) {
	const docType: string = supplier ? "sup" : "rec";
	return (
		<div>
			{!supplier && <p className="my-2 text-xs font-bold">Receive vaucher</p>}
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
											onChangeInput(e, item.id, rowsReceive, docType)
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
											onChangeInput(e, item.id, rowsReceive, docType)
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
											onChangeInput(e, item.id, rowsReceive, docType)
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
											onChangeInput(e, item.id, rowsReceive, docType)
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
											onChangeInput(e, item.id, rowsReceive, docType)
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
										const prod = item.unitPrice * item.receivedQuantity;
										return prod + accumulator;
									}, 0)
									.toLocaleString()}
							</td>
						</tr>
						{!supplier && (
							<tr>
								<td colSpan={headers.length - 1} />
								<td className="text-xs font-bold">
									{balance.toLocaleString()}
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default CreateReceiverSide;
