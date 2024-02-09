import { useNavigate, useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { formatDate } from "../../../types/constants";

function AllCostingCenterRequests() {
	const { register } = useForm();
	const navigate = useNavigate();
	const { id } = useParams();
	const [requests, loading, error] = useFetchData(
		`/stock/costingcenterrequests?center=${id}`
	);
	return (
		<div>
			<div className="grid content-center w-full grid-flow-col grid-cols-12 gap-2 px-2 py-2 bg-white rounded-md justify-stretch">
				<div className="col-start-1 col-end-9">
					<form className="flex items-center w-full gap-3 px-3 py-1 ">
						<div className="flex items-center w-2/5 gap-1 px-3 py-1 rounded-sm bg-search-bg">
							<MagnifyingGlassIcon className="w-5 h-5 text-login-blue" />
							<input
								placeholder="Search"
								className="w-full bg-transparent focus:outline-none focus-border-none placeholder:text-sm placeholder:font-bold"
								{...register("query")}
							/>
						</div>
					</form>
				</div>
			</div>
			<div className="grid grid-flow-col grid-cols-5 bg-white">
				<div className="p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					File
				</div>
				<div className="p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					Date/ID
				</div>
				<div className="p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					From
				</div>
				<div className="p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					Status
				</div>
				<div className="p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					CreatedBy
				</div>
			</div>
			{loading && <p className="w-full text-xs text-center">Loading ....</p>}
			{!error && requests && requests.length == 0 && (
				<p className="w-full my-2 text-center">
					No requests made by costing center ...
				</p>
			)}
			{requests &&
				requests.length !== 0 &&
				requests.map((item) => (
					<div
						key={item.id}
						onClick={() => {
							navigate(`${item.id}`);
						}}
						className="grid grid-flow-col grid-cols-5 bg-white cursor-pointer ">
						<div className="p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
							File
						</div>
						<div className="p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
							{formatDate(item.date)}
						</div>
						<div className="p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
							{item.CostingCenter.name}
						</div>
						<div className="flex items-center gap-2 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
							{item.status}

							{item.status === "APPROVED" && (
								<CheckIcon className="w-3 h-3 text-emelard-900" />
							)}
						</div>
						<div className="p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap"></div>
					</div>
				))}
		</div>
	);
}

export default AllCostingCenterRequests;
