import { useForm } from "react-hook-form";
import { BackButton } from "../../../shared/BackButton";
import {
	ServiceCategoryInterface,
	SubServiceInterface,
	servicePackageInterface,
} from "../types";
import instance from "../../../API";
import toast from "react-hot-toast";
import { useFetchData } from "../../../hooks/useFetchData";
import { useState } from "react";
import { CgAdd } from "react-icons/cg";

function CreateSubService() {
	const { register, handleSubmit } = useForm<SubServiceInterface>();
	const [servicecategories] = useFetchData("/servicecategory");
	const createService = async (data: SubServiceInterface) => {
		await instance
			.post("/services", { ...data, packages: servicePackages })
			.then(() => {
				toast.success("success !!!");
			})
			.catch((err) => {
				console.log("err", err);

				toast.error(err.code);
			});
	};
	const [servicePackages, setServicePackages] = useState<
		servicePackageInterface[]
	>([
		{
			refId: crypto.randomUUID(),
			name: "",
			pricerwf: 0,
			priceusd: 0,
		},
	]);

	const handleAddServicePackage = () => {
		setServicePackages((prev: servicePackageInterface[]) => [
			...prev,
			{
				name: "",
				pricerwf: 0,
				priceusd: 0,
				refId: crypto.randomUUID(),
			},
		]);
	};

	const handleUpdateServicePackages = (e, id) => {
		const { name, value } = e.target;
		const newPackages = servicePackages.map((el) =>
			el.refId === id ? { ...el, [name]: value } : el
		);
		setServicePackages(newPackages);
	};
	const handleServicePackageRemove = (id) => {
		setServicePackages(() => servicePackages.filter((el) => el.refId !== id));
	};

	return (
		<div>
			<BackButton />
			<div className="flex justify-center w-full">
				<form
					onSubmit={handleSubmit(createService)}
					className=" my-6 w-3/4 p-8 mx-auto  bg-white rounded-[8px]">
					<p className="font-bold text-center">Create new room </p>
					<div>
						<label htmlFor="name">Name</label>
						<input
							id="name"
							className="bg-[#fcfcfc] text-xs py-1 w-full border-2 border-gray-300 rounded-[4px] flex-1  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
							{...register("name")}
						/>
					</div>
					<div>
						<label htmlFor="type">Room Type</label>
						<select
							className="bg-[#fcfcfc] py-1 text-xs w-full border-2 border-gray-300 rounded-[4px] flex-1  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
							{...register("category")}>
							{servicecategories &&
								servicecategories.length !== 0 &&
								servicecategories.map((category: ServiceCategoryInterface) => (
									<option value={category.id} key={category.id}>
										{category.name}
									</option>
								))}
						</select>
					</div>
					<div>
						<label htmlFor="normal_price">Normal Price (RWF)</label>
						<input
							id="location"
							className="bg-[#fcfcfc] text-xs py-1 w-full border-2 border-gray-300 rounded-[4px] flex-1  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
							{...register("pricerwf")}
						/>
					</div>
					<div>
						<label htmlFor="normal_price_usd">Normal Price (USD)</label>
						<input
							id="location"
							className="bg-[#fcfcfc] text-xs py-1 w-full border-2 border-gray-300 rounded-[4px] flex-1  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
							{...register("priceusd")}
						/>
					</div>
					<p className="my-3 font-bold text-center "> Service sale packages </p>
					{servicePackages.map((el: servicePackageInterface) => (
						<div key={el.refId}>
							<div>
								<label htmlFor="package_name">Package Name</label>

								<input
									type="text"
									name="name"
									required
									id="package_name"
									onChange={(e) => handleUpdateServicePackages(e, el.refId)}
									className="bg-[#fcfcfc] text-xs py-1 w-full border-2 border-gray-300 rounded-[4px] flex-1  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
								/>
							</div>
							<div>
								<label htmlFor="package_price_rwd">Package Price RWF</label>

								<input
									type="text"
									name="pricerwf"
									required
									id="package_pricerwf"
									onChange={(e) => handleUpdateServicePackages(e, el.refId)}
									className="bg-[#fcfcfc] text-xs py-1 w-full border-2 border-gray-300 rounded-[4px] flex-1  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
								/>
							</div>
							<div>
								<label htmlFor="package_price_usd">Package Price USD</label>

								<input
									type="text"
									name="priceusd"
									id="package_priceusd"
									onChange={(e) => handleUpdateServicePackages(e, el.refId)}
									className="bg-[#fcfcfc] text-xs py-1 w-full border-2 border-gray-300 rounded-[4px] flex-1  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
								/>
							</div>
							<button
								type="button"
								onClick={() => handleServicePackageRemove(el.refId)}
								className="bg-pink-900 mt-4 text-sm text-white px-4 py-1 rounded-[4px] ">
								{" "}
								Remove package
							</button>
							<hr className="w-full my-4 bg-gray-400 border-gray-400 border-1 " />
						</div>
					))}
					<button
						onClick={handleAddServicePackage}
						type="button"
						className="mt-4 items-center flex gap-3 text-black font-bold  rounded-[2px]">
						<CgAdd /> Add package
					</button>

					<div className="flex justify-end my-4">
						<button
							type="submit"
							className="w-1/4 py-1 rounded-[4px] text-sm font-bold text-white bg-emerald-900">
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default CreateSubService;
