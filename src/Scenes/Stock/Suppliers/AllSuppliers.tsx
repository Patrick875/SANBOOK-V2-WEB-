import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import LocationInApp from "../../../shared/LocationInApp";

function AllSuppliers() {
	const { register } = useForm();
	const navigate = useNavigate();
	const [suppliers, loading] = useFetchData("/stock/suppliers");

	return (
		<div>
			<LocationInApp location="Suppliers" />

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
			<div className="mt-4 bg-white">
				<div className="grid grid-cols-2 p-2 text-xs font-bold">
					<p>Name</p>
					<p>Contact</p>
				</div>
				{suppliers &&
					suppliers.map((supplier) => (
						<div
							onClick={() => navigate(`${supplier.id}`)}
							className="grid grid-cols-2 p-2 text-xs cursor-pointer">
							<p>{supplier.name}</p>
							<p>{supplier.tel}</p>
						</div>
					))}
			</div>
		</div>
	);
}

export default AllSuppliers;
