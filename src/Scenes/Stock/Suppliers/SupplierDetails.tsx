import { useNavigate, useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { BackButton } from "../../../shared/BackButton";

function SupplierDetails() {
	const { supplier } = useParams();
	const navigate = useNavigate();
	const [supp, loading] = useFetchData(`/stock/suppliers/${supplier}`);
	return (
		<div>
			<BackButton />
			<p className="font-bold text-center tesxt-xs">Supplier Details</p>
			{loading && <p className="w-full text-xs font-bold">Loading... </p>}
			{supp && (
				<div>
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
							<p>Date</p>
							<p>ID</p>
							<p>Submited By</p>
						</div>
						{supp.SupplierLists &&
							supp.SupplierLists.map((list) => (
								<div
									key={list.id}
									onClick={() => navigate(`${list.id}`)}
									className="grid grid-cols-3 py-1 text-xs font-bold cursor-pointer ">
									<p>{new Date(list.date).toLocaleDateString("fr-FR")}</p>
									<p>{list.id}</p>
									<p>{}</p>
								</div>
							))}
					</div>
				</div>
			)}
		</div>
	);
}

export default SupplierDetails;
