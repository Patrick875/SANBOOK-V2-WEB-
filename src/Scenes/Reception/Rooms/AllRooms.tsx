import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authUserSelector } from "../../../Redux/userSlice";
import { useFetchData } from "../../../hooks/useFetchData";
import { RoomInterface, RoomTypeInterface } from "../types";
import { BsHouse } from "react-icons/bs";

function AllRooms() {
	const user = useSelector(authUserSelector);
	const roomStatusColor = (status?: string) => {
		let color = "bg-black";
		if (status) {
			switch (status) {
				case "free":
					color = "bg-black";
					break;
				case "occupied":
					color = "bg-emerald-800";
					break;
				case "out of order":
					color = "bg-pink-900";
					break;
				case "reserved":
					color = "bg-sky-800";
					break;
				default:
					color = "bg-black";
					break;
			}
		}
		return color;
	};

	const [roomtypes] = useFetchData("/reception/rooms/roomtypes");

	return (
		<div>
			<div className="flex items-center justify-between">
				<p className="text-lg font-bold ">All Rooms</p>
				<div className="flex gap-4">
					<Link
						to="create"
						className="bg-blue-900 text-sm text-white font-bold px-6 py-1 rounded-[8px]">
						Add New Room
					</Link>
					<Link
						to="creSate"
						className="bg-emerald-900 text-sm text-white font-bold px-6 py-1 rounded-[8px]">
						Add New Booking
					</Link>
				</div>
			</div>
			<div className="grid grid-cols-4">
				{roomtypes &&
					roomtypes.length !== 0 &&
					roomtypes.map((el: RoomTypeInterface) => (
						<div>
							<div className="bg-white showdow-md">
								<p className="p-3 text-sm font-bold ">{el.name}</p>
							</div>
							{el.Rooms?.map((el: RoomInterface) => (
								<div className="flex items-center gap-2 bg-white rounded-[12px] p-4">
									<div>
										<p className="text-lg font-bold">Room {el.name}</p>
										<p className="text-sm ">Status: {el.receptionStatus}</p>
										<p className="text-sm ">Location: {el.location}</p>
									</div>
									<div
										className={`w-10 h-10 flex justify-center  rounded-full items-center text-white ${roomStatusColor(
											el.receptionStatus
										)} }`}>
										<BsHouse className="w-5 h-5" />
									</div>
								</div>
							))}
						</div>
					))}
			</div>
		</div>
	);
}

export default AllRooms;
