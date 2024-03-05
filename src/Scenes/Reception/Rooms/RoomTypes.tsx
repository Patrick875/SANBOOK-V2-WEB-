import { Link } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { RoomTypeInterface } from "../types";
import { roomstatusconds } from "../constants";

function RoomTypes() {
	const [roomTypes] = useFetchData("/reception/rooms/roomtypes");

	return (
		<div>
			<div className="flex justify-between">
				<p className="text-sm font-bold ">Room types</p>
				<Link
					to="create"
					className="bg-blue-900 text-sm text-white font-bold px-6 py-1 rounded-[8px]">
					Add Room Type
				</Link>
			</div>
			<div className="mt-4 bg-white">
				<div className="grid grid-cols-6 py-2">
					{roomstatusconds.map((el: string) => (
						<p
							key={crypto.randomUUID()}
							className="text-xs font-bold text-center capitalize">
							{el === "numberofchildren"
								? "Number of Children"
								: el === "numberofadults"
								? "Number of Adults"
								: el}
						</p>
					))}
				</div>
				{roomTypes &&
					roomTypes.length !== 0 &&
					roomTypes.map((el: RoomTypeInterface) => (
						<div className="grid grid-cols-6 py-2">
							{roomstatusconds.map((elKey: string) => (
								<p
									key={el.id}
									className="text-xs font-bold text-center capitalize">
									{el[elKey]}
								</p>
							))}
						</div>
					))}
			</div>
		</div>
	);
}

export default RoomTypes;
