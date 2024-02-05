import { useForm } from "react-hook-form";
import { useOutletContext, useParams } from "react-router-dom";
import { identity } from "../../../types";
import { useFetchData } from "../../../hooks/useFetchData";
import { ChangeEvent, useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import instance from "../../../API";
import { MdDelete } from "react-icons/md";
import DeleteItemModal from "../../../shared/DeleteItemModal";

interface settings {
	name: string;
	department: string | null;
}

function CostingCenterSettings() {
	const { id: costId } = useParams();
	const [show, setShow] = useState<boolean>(false);
	const [data] = useFetchData(`/stock/costingcenters/${costId}`);
	const { costingCenter } = useOutletContext();
	const [departments] = useFetchData("/hr/departments");
	// const { register, handleSubmit } = useForm();
	const [settings, setSettings] = useState<settings | null>({
		name: costingCenter?.name,
		department: costingCenter?.department,
	});
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (settings && settings != null) {
			setSettings({ ...settings, [name]: value });
		} else {
			setSettings({ [name]: value });
		}
	};
	const update = async (e: SubmitEvent) => {
		await instance
			.patch(`/stock/costingcenters/${costId}`, settings)
			.catch((err) => {
				console.log("err", err);
			});
	};
	useEffect(() => {
		if (costingCenter) {
			setSettings({
				name: costingCenter.name,
				department: costingCenter.department,
			});
		} else {
			setSettings({ name: data?.name, department: data?.department });
		}
	}, [costingCenter]);
	return (
		<div>
			<form onSubmit={update} className="w-full p-6 bg-white">
				<div className="w-1/2 mx-auto">
					<div className="py-2">
						<label className="block pb-2 text-xs font-bold ">Name</label>
						<input
							type="text"
							onChange={onChange}
							placeholder="name"
							name="name"
							defaultValue={settings?.name}
							className="w-full py-1 border border-gray-500 rounded-md placeholder:text-xs placeholder:ps-2"
						/>
					</div>
					<div className="w-full py-2">
						<label className="block pb-2 text-xs font-bold ">
							Linked Department
						</label>
						<select
							onChange={onChange}
							name="department"
							className="w-full border-gray-500 py-1 rounded-md border-[1.5px]">
							<option className="text-xs">Choose ...</option>
							{departments &&
								departments.map((dep: identity) => (
									<option
										className="text-xs"
										key={dep.id}
										selected={dep.id == settings?.department}
										value={dep.id}>
										{dep.name}
									</option>
								))}
						</select>
					</div>
					<div className="w-full py-3 ">
						<button className="my-2 flex w-full justify-center items-center gap-2 px-4 py-1 text-white bg-teal-900 rounded-[8px]">
							<p>Update</p>
						</button>
						<button
							type="button"
							onClick={() => setShow(true)}
							className="my-2 flex  justify-center w-full items-center gap-2 px-4 py-1 text-white bg-pink-900 rounded-[8px]">
							<p>Delete</p>
							<MdDelete className="w-4 h-4" />
						</button>
					</div>
				</div>
			</form>
			{(costingCenter || data) && costId && (
				<DeleteItemModal
					show={show}
					setShow={setShow}
					deleteUrl="/stock/costingcenters"
					itemType={`${
						costingCenter ? costingCenter.name : data?.name
					} Costing center`}
					itemId={Number(costId)}
				/>
			)}
		</div>
	);
}

export default CostingCenterSettings;
