import { Link } from "react-router-dom";

function AllStockRequests() {
	return (
		<div>
			<div className="flex justify-between mb-3">
				<p className="text-lg font-bold uppercase">All stock requests </p>
				<Link
					className="px-6 py-1 font-bold text-white rounded-full bg-sky-800"
					to="create">
					Create Request
				</Link>
			</div>
			<div className="grid grid-cols-3 p-3 bg-white">
				<p className="font-bold">Id</p>
				<p className="font-bold">Date</p>
				<p className="font-bold">Status</p>
			</div>
		</div>
	);
}

export default AllStockRequests;
