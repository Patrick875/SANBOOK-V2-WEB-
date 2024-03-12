import { Link } from "react-router-dom";
import { BiCoinStack } from "react-icons/bi";
import { useFetchData } from "../../hooks/useFetchData";

function ServicesDashboard() {
	const [dashdata] = useFetchData("/services/salesdashdata");

	return (
		<div className="p-6 py-3">
			<div className="flex items-center justify-between ">
				<p className="p-3 my-3 text-lg font-bold ">DASHBOARD</p>

				<Link
					to="services"
					className="text-white px-6  py-1 font-bold bg-sky-800 rounded-[4px]">
					{" "}
					New sale
				</Link>
			</div>
			{dashdata && (
				<div className="grid grid-cols-3 gap-4">
					<div className="flex justify-between p-6 bg-white rounded-lg shadow-xl">
						<div>
							<p className="text-sm font-semibold">Today's Sales</p>
							<p className="py-2 text-lg font-extrabold">{dashdata.sales}</p>
						</div>
						<div className="flex items-center ">
							<BiCoinStack className="w-12 h-12 p-2  rounded-[4px] text-white bg-purple-900" />
						</div>
					</div>
					<div className="flex justify-between p-6 bg-white rounded-lg shadow-xl">
						<div>
							<p className="text-sm font-semibold">Today's Users</p>
							<p className="py-2 text-lg font-extrabold">00000</p>
						</div>
						<div className="flex items-center ">
							<BiCoinStack className="w-12 h-12 p-2  rounded-[4px] text-white bg-purple-900" />
						</div>
					</div>
					<div className="flex justify-between p-6 bg-white rounded-lg shadow-xl">
						<div>
							<p className="text-sm font-semibold">Today's Orders</p>
							<p className="py-2 text-lg font-extrabold">{dashdata.sales}</p>
						</div>
						<div className="flex items-center ">
							<BiCoinStack className="w-12 h-12 p-2  rounded-[4px] text-white bg-purple-900" />
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ServicesDashboard;
