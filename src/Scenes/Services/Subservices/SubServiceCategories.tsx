import { Link } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { ServiceCategoryInterface } from "../types";

function SubServiceCategories() {
	const [servicecategories] = useFetchData("/servicecategory");
	return (
		<div>
			<div className="mb-4 w-full  justify-between flex items-center">
				<p className="font-bold"> All Service Categories</p>
				<Link
					className="px-6 py-2 font-bold text-white rounded-full bg-sky-800"
					to="create">
					Add new category
				</Link>
			</div>
			<div className="grid grid-cols-4 gap-2">
				{servicecategories &&
					servicecategories.map((srvCat: ServiceCategoryInterface) => (
						<p
							className="py-2 px-6 font-bold bg-white  rounded-lg"
							key={srvCat.id}>
							{srvCat.name}
						</p>
					))}
			</div>
		</div>
	);
}

export default SubServiceCategories;
