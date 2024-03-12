import { Link } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { roomBookingInterface } from "../types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
function CurrentBookings() {
	const [bookings] = useFetchData("/reception/roomreservation");
	const { register } = useForm();

	return (
		<div>
			<div className="flex items-center justify-between">
				<p className="font-bold ">Bookings</p>
				<div className="flex gap-2 mt-3">
					<button className="px-2 py-1 text-xs font-bold bg-white">All</button>
					<button className="px-2 py-1 text-xs font-bold bg-white">
						Check In
					</button>
					<button className="px-2 py-1 text-xs font-bold bg-white">
						Check out
					</button>
					<button className="px-2 py-1 text-xs font-bold bg-white">
						Other Stays
					</button>
				</div>

				<Link
					to="create"
					className="block px-6 py-1 text-xs text-white bg-blue-900 rounded-full">
					Add New Booking{" "}
				</Link>
			</div>
			<form className="flex items-center justify-between w-full py-1 my-4 mt-1 ">
				<div className="flex items-center w-2/5 gap-1 px-3 py-1 rounded-sm bg-search-bg">
					<MagnifyingGlassIcon className="w-5 h-5 text-login-blue" />
					<input
						placeholder="Search"
						className="w-full bg-transparent focus:outline-none focus-border-none placeholder:text-sm placeholder:font-bold"
						{...register("query")}
					/>
				</div>
				<div className="flex items-center gap-2 ">
					<div className="flex items-center gap-4">
						<label className="block text-sm">Filter by</label>

						<select
							{...register("type")}
							className="bg-[#F5F5F5] text-xs py-1 border-2 border-gray-300 rounded-[4px] flex-1    placeholder:text-xs placeholder:font-bold">
							<option className="text-xs" value="checkin">
								Check in
							</option>
							<option className="text-xs" value="roomtype">
								RoomType
							</option>
						</select>
					</div>
					<div className="flex items-center gap-4 ">
						<label className="block text-sm">Booking by</label>
						<select
							{...register("type")}
							className="bg-[#F5F5F5] text-xs py-1 border-2 border-gray-300 rounded-[4px] flex-1    placeholder:text-xs placeholder:font-bold">
							<option className="text-xs" value="checkin">
								Front Desk
							</option>
							<option className="text-xs" value="roomtype">
								RoomType
							</option>
						</select>
					</div>
				</div>
			</form>
			<div className="grid grid-cols-7 p-3 bg-white">
				<p className="text-sm font-bold">Booking no.</p>
				<p className="text-sm font-bold">Name</p>
				<p className="text-sm font-bold">Guests</p>
				<p className="text-sm font-bold">Room number</p>
				<p className="text-sm font-bold">Check In</p>
				<p className="text-sm font-bold">Check Out</p>
				<p className="text-sm font-bold">Total</p>
			</div>
			{bookings &&
				bookings.length !== 0 &&
				bookings.map((booking: roomBookingInterface) => (
					<div className="grid grid-cols-7 p-3 bg-white">
						<p className="text-sm font-bold">{booking?.refId}</p>
						<p className="text-sm font-bold">
							{booking.Guest
								? `${booking.Guest.firstname}  ${booking.Guest.lastname}`
								: null}
						</p>
						<p className="text-sm font-bold"></p>
						<p className="text-sm font-bold">{booking.Room?.name}</p>
						<p className="text-sm font-bold">
							{new Date(booking.checkinDate).toLocaleDateString()}
						</p>
						<p className="text-sm font-bold">
							{new Date(booking.checkoutDate).toLocaleDateString()}
						</p>
						<p className="text-sm font-bold"></p>
					</div>
				))}
		</div>
	);
}

export default CurrentBookings;
