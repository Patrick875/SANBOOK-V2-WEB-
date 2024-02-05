import { useForm } from "react-hook-form";
import { BackButton } from "../../../shared/BackButton";
import usePostData from "../../../hooks/usePostData";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useFetchData } from "../../../hooks/useFetchData";
import { identity } from "../../../types";
import { useState } from "react";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

function CreateSupplier() {
	const { register, handleSubmit, reset } = useForm();
	const [selectedItems, setSelectedItems] = useState<identity[]>([]);
	const [items, loading] = useFetchData("/stock/items");

	const selectItem = (e) => {
		e.preventDefault();
		const selected =
			items && items.ungrouped.filter((el) => el.id == e.target.value)[0];
		setSelectedItems((prev) => [...prev, selected]);
	};
	const { postData } = usePostData();
	const create = async (data) => {
		const submitItems = selectedItems.map((el) => el.id);
		const submit = { ...data, items: submitItems };
		const res = await postData("/stock/suppliers", submit);
		if (res) {
			toast.success("Supplier Created !!!");
			reset();
			setSelectedItems([]);
		}
	};
	return (
		<div>
			<BackButton />
			<p className="py-4 font-bold text-center ">Add New Supplier</p>
			<div className="w-4/5 mx-auto bg-white rounded-md md:w-2/4 ">
				<form onSubmit={handleSubmit(create)} className="p-6 mx-auto ">
					<div className="flex w-full gap-3 py-2">
						<div>
							<label className="block pb-2 text-xs font-bold ">Name</label>
							<input
								type="text"
								placeholder="name"
								className="w-full  border-2 border-gray-500 rounded-[2px] placeholder:text-xs placeholder:ps-2"
								{...register("name")}
							/>
						</div>
						<div>
							<label className="block pb-2 text-xs font-bold ">Tel</label>
							<input
								type="text"
								placeholder="tel"
								className="w-full  border-2 border-gray-500 rounded-[2px] placeholder:text-xs placeholder:ps-2"
								{...register("tel")}
							/>
						</div>
					</div>
					<div className="w-full py-2">
						<p className="pb-2 text-xs font-bold ">Items</p>
						<select
							onChange={selectItem}
							required
							className="w-full border-2 border-gray-500">
							{items &&
								items.ungrouped.map((item: identity) => (
									<option key={item.id} value={item.id}>
										{item.name}
									</option>
								))}
						</select>
					</div>
					{selectedItems.map((item: identity) => (
						<div className="flex justify-between" key={item.id}>
							<p className="text-xs">{item.name}</p>
							<IoMdRemoveCircleOutline
								className="text-pink-900 cursor-pointer"
								onClick={() =>
									setSelectedItems((pre) =>
										pre.filter((el) => el.id !== item.id)
									)
								}
							/>
						</div>
					))}
					<div className="flex justify-end w-full py-3 ">
						<button className="flex items-center gap-2 px-4 py-1 text-white bg-teal-900 rounded-sm">
							<p>Submit</p>
							<CheckIcon className="w-5 h-5" />
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default CreateSupplier;
