import { useFetchData } from "../../../hooks/useFetchData";
import { RoomRateInterface, RoomTypeInterface } from "../types";

function RoomRates() {
	const [roomtypes] = useFetchData("/reception/rooms/roomtypes");

	return (
		<div>
			<p className="text-xl font-bold">Room rates</p>
			<div className="grid w-full grid-cols-2 gap-4 my-4">
				{roomtypes &&
					roomtypes.length !== 0 &&
					roomtypes.map((el: RoomTypeInterface) => (
						<div key={el.id} className="p-4 rounded-[12px] bg-white">
							<p className="text-lg font-bold text-center">{el.name}</p>
							{el.RoomRates &&
								el.RoomRates.length !== 0 &&
								el.RoomRates.map((el: RoomRateInterface) => (
									<div className="flex justify-between text-sm text-gray">
										<p>{el.name}</p>
										<p>{el.value.toLocaleString("fr-FR")} RWF</p>
									</div>
								))}
						</div>
					))}
			</div>
		</div>
	);
}

export default RoomRates;
