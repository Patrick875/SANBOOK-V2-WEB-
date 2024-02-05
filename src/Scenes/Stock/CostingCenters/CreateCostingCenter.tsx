import { BackButton } from "../../../shared/BackButton";
import { useForm } from "react-hook-form";
import usePostData from "../../../hooks/usePostData";
import toast from "react-hot-toast";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useFetchData } from "../../../hooks/useFetchData";
import { identity } from "../../../types";

function CreateCostingCenter() {
	const { register, handleSubmit, reset } = useForm();
	const { postData, error, isLoading } = usePostData();
	const [departments] = useFetchData("/hr/departments");

	const create = async (data) => {
		const res = await postData("/stock/costingcenters", data).then(() => {
			if (!isLoading) {
				toast.success("Costing center created !!!");
			}
		});

		reset();
	};
	return (
		<div>
			<BackButton />
			<p className="py-4 font-bold text-center ">Create costing center</p>
			<div className="w-4/5 mx-auto bg-white rounded-md md:w-2/4 ">
				<form onSubmit={handleSubmit(create)} className="p-6 mx-auto ">
					<div className="py-2">
						<label className="block pb-2 text-xs font-bold ">Name</label>
						<input
							type="text"
							placeholder="name"
							className="w-full py-1 border border-gray-500 rounded-md placeholder:text-xs placeholder:ps-2"
							{...register("name")}
						/>
					</div>
					<div className="w-full py-2">
						<label className="block pb-2 text-xs font-bold ">
							Linked Department
						</label>
						<select
							{...register("department")}
							className="w-full border-gray-500 py-1 text-xs rounded-md border-[1.5px]">
							<option className="text-xs" value="">
								Choose ...
							</option>
							{departments &&
								departments.map((dep: identity) => (
									<option key={dep.id} value={dep.id} className="text-xs">
										{dep.name}
									</option>
								))}
						</select>
					</div>

					<div className="flex justify-end w-full py-3 ">
						<button className="flex items-center gap-2 px-4 py-1 text-white bg-teal-900 rounded-sm">
							<p>Submit</p>
							<CheckIcon className="w-5 h-5" />
						</button>
					</div>
				</form>
			</div>
			{error && toast.error(error)}
		</div>
	);
}

export default CreateCostingCenter;
