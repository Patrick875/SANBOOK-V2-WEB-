import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { IoCalendar } from "react-icons/io5";
import { useFetchData } from "../../../hooks/useFetchData";
import {
	RoomInterface,
	RoomTypeInterface,
	roomReceiptionStatusType,
} from "../types";
import { roomreceptionstatus } from "../constants";
import { BsCircleFill } from "react-icons/bs";

function RoomStatus() {
	const { control } = useForm();
	const [roomTypes] = useFetchData("/reception/rooms/roomtypes");
	const [rooms] = useFetchData("/reception/rooms/");
	const [roomsbystatus] = useFetchData("/reception/rooms/roomstatus");

	console.log("status", roomsbystatus);

	return (
		<div>
			<form className="grid grid-cols-3 gap-3">
				<p className="text-xl font-bold">Room Status</p>
				<div className="flex items-center gap-2">
					<label className="flex-1 block font-bold">Room class</label>
					<select className="px-2 py-1 text-sm border-gray-300">
						{roomTypes &&
							roomTypes.map((el: RoomTypeInterface) => (
								<option key={el.id}>{el.name}</option>
							))}
					</select>
				</div>
				<div>
					<Controller
						control={control}
						name="bookingDetails.check_out"
						defaultValue={new Date()}
						render={({ field }) => (
							<DatePicker
								placeholderText="check_out"
								onChange={(date) => field.onChange(date)}
								select={field.value}
								showIcon
								className="border-2  py-2 text-sm border-gray-300 rounded-[4px]"
								icon={<IoCalendar className="w-3 h-3 text-sky-900" />}
							/>
						)}
					/>
				</div>
			</form>

			<p className="mt-3 text-sm font-bold text-gray-600">Summary</p>

			<div className="flex gap-4 my-3">
				{roomsbystatus &&
					roomreceptionstatus &&
					roomreceptionstatus.map((el: roomReceiptionStatusType) => (
						<div
							className="flex items-center gap-2 text-sm font-bold "
							key={el.name}>
							<BsCircleFill className={`w-3 h-3 ${el.bgColor} `} />
							<p className="capitalize">{el.name}</p>
							{
								<p className="">
									{roomsbystatus.filter((rs) => rs.receptionStatus === el.name)
										.length !== 0
										? roomsbystatus.filter(
												(rs) => rs.receptionStatus === el.name
										  )[0].count
										: 0}
								</p>
							}
						</div>
					))}
			</div>

			<div className="grid grid-cols-7 p-2 text-sm font-bold bg-white">
				<p className="p-2">Room No</p>
				<p className="p-2">Guest Name</p>
				<p className="p-2">Date In</p>
				<p className="p-2">Date Out</p>
				<p className="p-2">Rate</p>
				<p className="p-2">Status</p>
			</div>
			{rooms &&
				rooms.length !== 0 &&
				rooms.map((room: RoomInterface) => (
					<div className="grid grid-cols-7 p-2 text-sm font-bold bg-white">
						<p className="p-2">{room.name}</p>
						<p className="p-2"></p>
						<p className="p-2"></p>
						<p className="p-2"></p>
						<p className="p-2">
							{room.RoomType &&
								room.RoomType.RoomRates?.find(
									(el) => el.name === "normal rate"
								)?.value.toLocaleString()}
						</p>
						<p className="p-2">{room.receptionStatus}</p>
					</div>
				))}
		</div>
	);
}

export default RoomStatus;
