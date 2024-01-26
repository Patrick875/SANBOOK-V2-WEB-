interface Props {
	headers: string[];
	rowsPurchase: any[];
	onChangeInput: (
		e: React.ChangeEvent<HTMLInputElement>,
		id: number,
		dataSet: any[],
		doc?: string
	) => void;
}

function CreatePurchaseSide({ headers, rowsPurchase, onChangeInput }: Props) {
	return (
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
	);
}

export default CreatePurchaseSide;
