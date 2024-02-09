import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useFetchData } from "../../../hooks/useFetchData";
import { formatDate } from "../../../types/constants";
import { useNavigate } from "react-router-dom";
import LocationInApp from "../../../shared/LocationInApp";

function AllRequests() {
	const navigate = useNavigate();
	const { register } = useForm();
	const [data, loading] = useFetchData("/stock/costingcenterrequests");

	return (
		<div>
			<LocationInApp location="Requests" />
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
			{data &&
				data.length !== 0 &&
				data.map((item) => (
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
						<div className="p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
							{item.status}
						</div>
						<div className="p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap"></div>
					</div>
				))}
		</div>
	);
}

export default AllRequests;
