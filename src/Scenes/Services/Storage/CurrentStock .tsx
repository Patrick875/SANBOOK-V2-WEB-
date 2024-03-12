function CurrentStock() {
	return (
		<div>
			<p className="text-lg font-bold uppercase">Current Stock</p>

			<div className="grid grid-cols-3 p-3 bg-white">
				<p className="font-bold">Name</p>
				<p className="font-bold">Quantity</p>
				<p className="font-bold">last added</p>
			</div>
			<div className="grid grid-cols-3 p-3"></div>
		</div>
	);
}

export default CurrentStock;
