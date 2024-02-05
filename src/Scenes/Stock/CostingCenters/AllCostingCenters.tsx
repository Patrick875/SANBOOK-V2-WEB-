import { useForm } from "react-hook-form";
import LocationInApp from "../../../shared/LocationInApp";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { identity } from "../../../types";

function AllCostingCenters() {
	const { register } = useForm();
	const [data] = useFetchData("/stock/costingcenters");
	console.log("logs", data);

	const navigate = useNavigate();
	return (
		<div>
			<LocationInApp location="Costing centers" />
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
				<div className="grid content-center justify-end col-start-10 col-end-12">
					<Link
						to="create"
						className="col-span-2 px-4 py-1 text-xs text-center rounded-sm bg-login-blue text-primary-white ">
						Create new{" "}
					</Link>
				</div>
			</div>
			{data && (
				<div className="grid grid-cols-4 gap-3 my-2">
					{data.map((center: identity) => (
						<p
							onClick={() => navigate(`${center.id}`)}
							className="p-2 text-xs bg-white rounded-[8px] font-bold cursor-pointer"
							key={center.id}>
							{center.name}
						</p>
					))}
				</div>
			)}
		</div>
	);
}

export default AllCostingCenters;
