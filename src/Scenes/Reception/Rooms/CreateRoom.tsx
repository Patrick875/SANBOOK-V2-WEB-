import { useForm } from "react-hook-form";
import { BackButton } from "../../../shared/BackButton";
import { useFetchData } from "../../../hooks/useFetchData";
import { RoomInterface, RoomTypeInterface } from "../types";
import instance from "../../../API";
import toast from "react-hot-toast";

function CreateRoom() {
	const { register, handleSubmit } = useForm<RoomInterface>();
	const [roomtypes] = useFetchData("/reception/rooms/roomtypes");

	const createRoom = async (data: RoomInterface) => {
		await instance
			.post("/reception/rooms/", data)
			.then(() => {
				toast.success("success !!!");
			})
			.catch((err) => {
				toast.error(err.code);
			});
	};

	return (
		<div>
			<BackButton />
			<div className="flex justify-center w-full">
				<form
					onSubmit={handleSubmit(createRoom)}
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
							{...register("type")}>
							{roomtypes &&
								roomtypes.length !== 0 &&
								roomtypes.map((roomtype: RoomTypeInterface) => (
									<option value={roomtype.id} key={roomtype.id}>
										{roomtype.name}
									</option>
								))}
						</select>
					</div>
					<div>
						<label htmlFor="location">Location</label>
						<input
							id="location"
							className="bg-[#fcfcfc] text-xs py-1 w-full border-2 border-gray-300 rounded-[4px] flex-1  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
							{...register("location")}
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

export default CreateRoom;
