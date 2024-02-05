import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { BackButton } from "../../../shared/BackButton";
import { useFetchData } from "../../../hooks/useFetchData";

function CostingCenterDetails() {
	const { id } = useParams();
	const { pathname } = useLocation();
	const paths = pathname.split("/");
	const activeStyles: string = "border-b-2 border-b-purple-900";

	const [costingCenter] = useFetchData(`/stock/costingcenters/${id}`);
	console.log("costing-center", costingCenter);

	return (
		<div>
			<BackButton />
			<div className="flex items-center justify-between w-1/2 mt-4 text-xs font-bold">
				<Link
					to=""
					className={`py-1 ${paths.length === 4 ? activeStyles : ""}`}>
					Estimated Stock
				</Link>
				<Link
					to="requests"
					className={`py-1 ${
						paths.length === 5 && paths[paths.length - 1] === "requests"
							? activeStyles
							: ""
					}`}>
					Requests
				</Link>
				<Link
					to="settings"
					className={`py-1 ${
						paths.length === 5 && paths[paths.length - 1] === "settings"
							? activeStyles
							: ""
					}`}>
					Settings
				</Link>
			</div>
			<div className="my-2">
				<Outlet context={{ costingCenter, id }} />
			</div>
		</div>
	);
}

export default CostingCenterDetails;
