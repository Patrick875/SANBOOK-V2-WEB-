import { useForm } from "react-hook-form";
import instance from "../../../API";
import { BackButton } from "../../../shared/BackButton";
import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useFetchData } from "../../../hooks/useFetchData";

interface createItem {
	name: string;
	store: number;
	category: number;
	quantity: number;
	mainunit: number;
	price: number;
}

const CreateItem = () => {
	const { register, handleSubmit, reset } = useForm<createItem>();
	const [success, setSuccess] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const onFieldFocus = () => {
		setSuccess(false);
		setError(false);
	};
	const [stores] = useFetchData("/stock/stores");
	const [categories] = useFetchData("/stock/categories");
	const [units] = useFetchData("/stock/units");
	const create = async (data: createItem) => {
		await instance
			.post("/stock/items", data)
			.then(() => {
				setSuccess(true);
			})
			.catch((err) => {
				console.log(err);
				setError(true);
			})
			.finally(() => {
				reset();
			});
	};
	return (
		<div>
			<BackButton />
			<p className="py-4 font-bold text-center ">Create store</p>
			<div className="w-4/5 mx-auto bg-white rounded-md md:w-2/4 ">
				<form onSubmit={handleSubmit(create)} className="p-6 mx-auto ">
					<div className="py-2">
						<label className="block pb-2 text-xs font-bold ">Name</label>
						<input
							onFocus={onFieldFocus}
							type="text"
							placeholder="name"
							className="w-full py-1 border border-gray-500 rounded-md placeholder:text-xs placeholder:ps-2"
							{...register("name")}
						/>
					</div>
					<div className="w-full py-2">
						<label className="block pb-2 text-xs font-bold ">Store</label>
						<select
							onFocus={onFieldFocus}
							{...register("store")}
							className="w-full">
							{stores &&
								stores.map((store) => (
									<option key={store.id} value={store.id}>
										{store.name}
									</option>
								))}
						</select>
					</div>
					<div className="w-full py-2">
						<label className="block pb-2 text-xs font-bold ">Category</label>
						<select
							onFocus={onFieldFocus}
							{...register("category")}
							className="w-full">
							{categories &&
								categories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
						</select>
					</div>
					<div className="w-full py-2">
						<label className="block pb-2 text-xs font-bold ">Main unit</label>
						<select
							onFocus={onFieldFocus}
							{...register("mainunit")}
							className="w-full">
							{units &&
								units.map((unit) => (
									<option key={unit.id} value={unit.id}>
										{unit.name}
									</option>
								))}
						</select>
					</div>
					<div className="py-2">
						<label className="block pb-2 text-xs font-bold ">Price</label>
						<input
							type="number"
							inputMode="numeric"
							step="any"
							placeholder="0.00"
							className="w-full py-1 border border-gray-500 rounded-md placeholder:text-xs placeholder:ps-2"
							{...register("price")}
							onFocus={onFieldFocus}
						/>
					</div>
					<div className="flex justify-end w-full py-3 ">
						<button className="flex items-center gap-2 px-4 py-1 text-white bg-teal-900 rounded-sm">
							<p>Submit</p>
							<CheckIcon className="w-5 h-5" />
						</button>
					</div>
				</form>
			</div>
			{success && (
				<p className="w-4/5 p-4 mx-auto text-sm font-bold text-center text-teal-900 bg-teal-100">
					{" "}
					Item created
				</p>
			)}
			{error && (
				<p className="w-4/5 p-4 mx-auto text-sm font-bold text-center bg-pink-100 text-primary-red">
					{" "}
					Error creating item{" "}
				</p>
			)}
		</div>
	);
};
export default CreateItem;