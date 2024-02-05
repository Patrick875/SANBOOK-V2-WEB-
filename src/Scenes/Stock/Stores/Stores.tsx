import { useForm } from "react-hook-form";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import LocationInApp from "../../../shared/LocationInApp";

function Stores() {
	const navigate = useNavigate();
	const { register } = useForm();
	const [data, loading] = useFetchData("/stock/stores");

	return (
		<div className="w-full">
			<LocationInApp location="Stores" />
			<div className="flex items-center w-full px-3 py-2 bg-white rounded-md">
				<div className="flex-1">
					<form className=" w-2/5 flex items-center gap-3 p-2 px-4 bg-search-bg rounded-[8px] ">
						<MagnifyingGlassIcon className="w-5 h-5 text-login-blue" />
						<input
							placeholder="Search"
							className="w-full bg-transparent focus:outline-none focus-border-none placeholder:text-sm placeholder:font-bold"
							{...register("query")}
						/>
					</form>
				</div>

				<Link
					to="create"
					className="px-6 py-1 text-xs text-center rounded-sm bg-login-blue text-primary-white ">
					Add new{" "}
				</Link>
			</div>
			<div className="grid grid-flow-row grid-cols-4 gap-3 my-2 grid-cols-auto ">
				{loading && <p>loading...</p>}
				{data &&
					data.map((store) => (
						<div
							onClick={() => {
								navigate(`${store.id}`);
							}}
							key={store.id}
							className="px-6 py-3 text-xs font-bold bg-white rounded-md cursor-pointer ">
							<p>{store.name}</p>
						</div>
					))}
			</div>
		</div>
	);
}

export default Stores;
