import { useForm } from "react-hook-form";
import { BackButton } from "../../../shared/BackButton";
import { useState } from "react";
import { LuDelete } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import instance from "../../../API";
import toast from "react-hot-toast";
import { ToggleSwitch } from "flowbite-react";

interface RoomRate {
	id: string;
	name: string;
	value: number;
}

function CreateRoomType() {
	const { register, getValues, handleSubmit } = useForm();
	// const [roomtypes]= useFetchData('/reception/roomtypes')

	const initialRates: RoomRate[] = [{ id: "1", name: "normal rate", value: 0 }];
	const [roomrates, setRoomRates] = useState<RoomRate[]>(initialRates);
	const [smockingallowed, setSmockingAllowed] = useState<boolean>(false);
	const handleRoomRateChange = (e, id) => {
		const { name, value } = e.target;
		const newRates: RoomRate[] = roomrates.map((el: RoomRate) =>
			el.id === id ? { ...el, [name]: value } : el
		);
		setRoomRates(newRates);
	};
	const createRoomClass = async () => {
		const submitData = getValues();

		console.log("rates-rates", {
			...submitData,
			smockingallowed: smockingAllowed,
		});

		await instance
			.post("/reception/rooms/roomtypes", {
				...submitData,
				smockingallowed,
				rates: roomrates,
			})
			.then(() => {
				toast.success("success !!!");
			})
			.catch((err) => {
				toast.error(err.code);
				console.log("err", err);
			});
	};

	return (
		<div>
			<BackButton />
			<div className="flex justify-center w-full">
				<form
					onSubmit={handleSubmit(createRoomClass)}
					className=" my-6 w-3/4 p-8 mx-auto  bg-white rounded-[8px]">
					<p className="font-bold text-center">Create new room class </p>
					<div>
						<label htmlFor="name">Name</label>
						<input
							id="name"
							className="bg-[#fcfcfc] text-xs py-1 w-full border-2 border-gray-300 rounded-[4px] flex-1  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
							{...register("name")}
						/>
					</div>
					<div>
						<label htmlFor="name">Max number of adults</label>
						<input
							id="name"
							type="number"
							className="bg-[#fcfcfc] text-xs py-1 w-full border-2 border-gray-300 rounded-[4px] flex-1  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
							{...register("numberofadults")}
						/>
					</div>
					<div>
						<label htmlFor="name">Max number of children</label>
						<input
							id="name"
							type="number"
							className="bg-[#fcfcfc] text-xs py-1 w-full border-2 border-gray-300 rounded-[4px] flex-1  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
							{...register("numberofchildren")}
						/>
					</div>

					<div>
						<label htmlFor="bedtype">Type of Bed</label>
						<input
							id="bedtype"
							className="bg-[#fcfcfc] text-xs py-1 w-full border-2 border-gray-300 rounded-[4px] flex-1  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
							{...register("bedtype")}
						/>
					</div>
					<div className="my-4">
						<ToggleSwitch
							checked={smockingAllowed}
							label="Smocking Allowed"
							onChange={setSmockingAllowed}
						/>
					</div>
					<div>
						<p className="my-2 text-xs font-bold text-center">Room rates</p>
						{roomrates &&
							roomrates.length !== 0 &&
							roomrates.map((el: RoomRate) => (
								<div key={el.id} className="flex items-center gap-4 my-3">
									{el.id === "1" ? (
										<label className="w-1/2 my-1 capitalize">{el.name}</label>
									) : (
										<input
											placeholder="room-rate-name"
											name="name"
											onChange={(e) => handleRoomRateChange(e, el.id)}
											className="bg-[#fcfcfc] w-1/2 my-1 text-xs py-1  border-2 border-gray-300 rounded-[4px] flex-1  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
											defaultValue={el.name}
										/>
									)}
									<div className="flex w-1/2 gap-4">
										<input
											placeholder="room-rate-value"
											name="value"
											onChange={(e) => handleRoomRateChange(e, el.id)}
											className=" block flex-1 bg-[#fcfcfc] text-xs py-1 w-full border-2 border-gray-300 rounded-[4px]   placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
											defaultValue={el.value}
										/>
										{el.id !== "1" && (
											<p
												onClick={() =>
													setRoomRates((prev: RoomRate[]) =>
														prev.filter((rt) => rt.id !== el.id)
													)
												}
												className="bg-pink-900 cursor-pointer  rounded-[4px] flex items-center ">
												<MdDeleteForever className="w-4 text-white " />
											</p>
										)}
									</div>
								</div>
							))}
					</div>

					<button
						type="button"
						onClick={() => {
							setRoomRates((prev: RoomRate[]) => [
								...prev,
								{ name: "", value: 0, id: crypto.randomUUID() },
							]);
						}}
						className="w-full py-1 rounded-[4px] font-bold my-3 text-xs text-white bg-blue-900">
						Add new
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

export default CreateRoomType;

const handleRoomRateChange = (e, id) => {
	const { name, value } = e.target;
	const newRates: RoomRate[] = roomrates.map((el: RoomRate) =>
		el.id === id ? { ...el, [name]: value } : el
	);
	setRoomRates(newRates);
};
