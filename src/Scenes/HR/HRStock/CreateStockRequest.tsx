import { useState } from "react";
import CreateHeader from "../../Stock/ReceiveVauchers/CreateHeader";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Controller, useForm } from "react-hook-form";

import { IoCalendar } from "react-icons/io5";
import DatePicker from "react-datepicker";

import EditableTableRequest from "../../../shared/EditableTableRequest";
import { useFetchPaginatedData } from "../../../hooks/useFetchPaginatedData";

import toast from "react-hot-toast";
import instance from "../../../API";

function CreateStockRequest() {
	const [listItems, setListItems] = useState([]);
	const [createId, setCreateId] = useState<string | null>(null);
	const { register, watch, setValue, control } = useForm();
	const query = watch("query");
	const { data: items, length } = useFetchPaginatedData(
		`/stock/currentstock?name=${query}&page=${1}&itemsPerPage=${100}`
	);

	const createRequest = async () => {
		let data = {
			center: 5,
			items: listItems,
		};

		await instance
			.post("/stock/costingcenterrequests", data)
			.then(() => {
				toast.success("Success !!!");
			})
			.catch((err) => {
				toast.error(err.code);
			});
	};

	return (
		<div>
			<div className="w-full grid-flow-col gap-2 px-2 py-2 bg-white rounded-md justify-stretch">
				<form className="grid justify-between w-full grid-flow-col grid-cols-12 px-3 py-1 ">
					<div className="flex col-span-8 gap-2">
						<div className="">
							<div className="flex items-center gap-1 px-3 py-1 rounded-sm bg-search-bg">
								<MagnifyingGlassIcon className="w-4 h-4 text-login-blue" />
								<input
									placeholder="Search"
									value={query}
									className="w-full h-full text-xs bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-bold"
									{...register("query")}
								/>
							</div>

							{query && query !== "" && (
								<div className="relative w-full">
									<div className="absolute w-full overflow-y-scroll bg-white max-h-48">
										{items &&
											items.map((item) => (
												<p
													onClick={() => {
														setListItems((prev) => [...prev, item]);
														setValue("query", "");
													}}
													className="p-2 text-xs font-bold hover:bg-slate-200 hover:cursor-pointer">
													{item.Item.name +
														" / " +
														Number(item.price).toLocaleString() +
														" Rwf"}
												</p>
											))}
									</div>
								</div>
							)}
						</div>
					</div>
					<div className="grid content-center grid-flow-col col-span-4 gap-2 ">
						<div className="flex items-center justify-center gap-2 text-xs">
							<label className="font-bold">Received on</label>
							<Controller
								name="date"
								control={control}
								render={({ field }) => (
									<DatePicker
										placeholderText="select received date"
										onChange={(date) => field.onChange(date)}
										selected={field.value}
										locale="fr-FR"
										showIcon
										className="border-[1.5px] text-xs border-gray-800 rounded-[4px]"
										icon={<IoCalendar className="w-3 h-3 text-sky-700" />}
									/>
								)}
							/>
						</div>
					</div>
				</form>
			</div>
			<CreateHeader createdId={createId} document="Stock Request" />
			<EditableTableRequest
				cols={["name", "quantity", "unit"]}
				headers={["item", "Quantity", "Unit"]}
				data={listItems}
				readOnlyCols={["name"]}
				readOnly={false}
				setData={setListItems}
			/>
			<div className="flex justify-end my-2 ">
				<button
					onClick={createRequest}
					className="px-6 py-1 font-bold text-white bg-teal-900">
					Submit
				</button>
			</div>
		</div>
	);
}

export default CreateStockRequest;
