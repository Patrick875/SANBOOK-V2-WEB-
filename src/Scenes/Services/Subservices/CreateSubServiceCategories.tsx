import toast from "react-hot-toast";
import instance from "../../../API";
import { useForm } from "react-hook-form";
import { BackButton } from "../../../shared/BackButton";
import { ServiceCategoryInterface } from "../types";

function CreateSubServiceCategories() {
	const { register, handleSubmit } = useForm<ServiceCategoryInterface>();

	const createCategory = async (data: ServiceCategoryInterface) => {
		await instance
			.post("/servicecategory", data)
			.then(() => {
				toast.success("success !!!");
			})
			.catch((err) => {
				console.log("err", err);

				toast.error(err.code);
			});
	};
	return (
		<div>
			<BackButton />
			<div className="flex justify-center w-full">
				<form
					onSubmit={handleSubmit(createCategory)}
					className=" my-6 w-3/4 p-8 mx-auto md:w-1/2 bg-white rounded-[8px]">
					<p className="font-bold text-center">Create service category </p>
					<div>
						<label htmlFor="name">Name</label>
						<input
							id="name"
							className="bg-[#fcfcfc] text-xs py-1 w-full border-2 border-gray-300 rounded-[4px] flex-1  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
							{...register("name")}
						/>
					</div>

					<div className="flex justify-end my-4">
						<button className="w-1/4 py-1 rounded-[4px] text-sm font-bold text-white bg-emerald-900">
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default CreateSubServiceCategories;
