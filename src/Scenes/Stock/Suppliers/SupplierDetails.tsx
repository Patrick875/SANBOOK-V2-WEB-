import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { BackButton } from "../../../shared/BackButton";

function SupplierDetails() {
	const { supplier } = useParams();
	const [supp] = useFetchData(`/stock/suppliers/${supplier}`);
	console.log("suppliers", supp);

	return (
		<div>
			<BackButton />
			<p className="font-bold text-center tesxt-xs">Supplier Details</p>
			<div className="flex justify-between items-center p-4 bg-white rounded-[4px]">
				<div className="text-xs font-bold ">
					<p className="py-1 ">Name: {supp.name}</p>
					<p className="py-1">Contact: {supp.tel}</p>
				</div>
				<div>
					<button className="px-6 py-1 rounded-[4px] text-xs text-white bg-pink-900">
						Delete
					</button>
				</div>
			</div>
			<p className="my-3 text-xs font-bold">Supply lists</p>
			<div className="p-4 bg-white">
				<div className="grid grid-cols-3 text-xs font-bold">
					<p>Name</p>
					<p>ID</p>
					<p>Submited By</p>
				</div>
				{}
			</div>
		</div>
	);
}

export default SupplierDetails;
