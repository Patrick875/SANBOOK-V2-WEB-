import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function AllPurchaseOrders() {
	const { register } = useForm();
	const TableHead = (): ReactElement => (
		<div className="border-2 border-gray-200">
			<div className="grid grid-flow-col grid-cols-4">
				<div className="w-20 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					File
				</div>
				<div className="w-20 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					Date/ID
				</div>
				<div className="w-20 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					CreatedBy
				</div>
				<div className="w-20 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					Value/Status
				</div>
			</div>
		</div>
	);
	return (
		<div className="w-full">
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
						<div className="flex gap-2 ">
							<div className="flex gap-2 text-xs justify-items-center">
								<label>From</label>
								<input type="date" className="block " />
							</div>
							<div className="flex items-center gap-2 text-xs">
								<label>To</label>
								<input type="date" className="block " />
							</div>
						</div>
					</form>
				</div>
				<div className="grid content-center justify-end col-start-10 col-end-12">
					<Link
						to="create"
						className="col-span-2 px-6 py-1 text-xs text-center rounded-sm bg-login-blue text-primary-white ">
						Add new{" "}
					</Link>
				</div>
			</div>
			<div className="w-full mt-3 bg-primary-white ">
				<TableHead />
				<div></div>
			</div>
		</div>
	);
}

export default AllPurchaseOrders;
