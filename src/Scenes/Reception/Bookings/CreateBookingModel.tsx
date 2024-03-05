import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { IoCalendar } from "react-icons/io5";
import { GiHouseKeys } from "react-icons/gi";
import { RiShieldKeyholeLine } from "react-icons/ri";
import usePostData from "../../../hooks/usePostData";
import { BackButton } from "../../../shared/BackButton";
import { filterDateDuplicates } from "../constants";
import { useState, useRef, useEffect } from "react";
import { useFetchData } from "../../../hooks/useFetchData";
import { RoomInterface, RoomRateInterface, guestInterface } from "../types";
import instance from "../../../API";
import toast from "react-hot-toast";

function CreateBookingModel() {
	const { register, control, getValues, watch } = useForm();
	const [guest, setGuest] = useState<string>();
	const [guestId, setGuestId] = useState<number>(null);
	const { postData } = usePostData();
	const [daysIn, setDaysIn] = useState<Date[]>([]);
	const [freerooms] = useFetchData("/reception/rooms?receptionStatus=free");
	const [guests] = useFetchData(`/reception/guests?name=${guest}`);
	const room: string = watch("bookingDetails.room");
	const roomBookedDates = async (room: string) => {
		await instance
			.get(`/reception/rooms/booked?room=${room}`)
			.then((res) => {
				console.log("res", res);
				return res.data.data;
			})
			.catch((err) => {
				console.log("err", err);
				return [];
			});
	};

	const inputRef = useRef<HTMLInputElement>(null);
	const [isFocused, setIsFocused] = useState(false);

	const [optionsVisible, setOptionsVisible] = useState<boolean>(false);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	// const handleDays = () => {};
	const submitData = async () => {
		const data = getValues();
		data.bookingDetails = daysIn;
		await postData("/reception/roomreservation", { ...data, guestId })
			.then(() => {
				toast.success("success !!!");
			})
			.catch((err) => {
				toast.error(err.code);
			});
	};
	useEffect(() => {
		roomBookedDates(room);
	}, [room]);
	return (
		<div className="bg-primary-white">
			<BackButton />
			<div className="text-center ">
				<p className="mb-5 font-bold text-center ">New Booking Registration</p>
			</div>
			<form className="w-11/12 mx-auto">
				<p className="text-sm font-bold text-center"> Boking Details</p>
				<div className="flex gap-2 my-4">
					<div className="w-1/2 ">
						<div className="flex items-center w-1/2 gap-3 text-sm">
							<label htmlFor="room">Room</label>
							<select
								{...register("bookingDetails.room")}
								className="bg-[#F5F5F5] text-xs py-1 border-2 border-gray-300 rounded-[4px] flex-1  placeholder:text-xs placeholder:font-bold">
								{freerooms &&
									freerooms.length !== 0 &&
									freerooms.map((el: RoomInterface) => (
										<option
											value={el.id}
											className="p-1 transition-all ease-in cursor-pointer hover:bg-gray-400"
											key={el.id}>
											<p className="text-sm">
												{el.name} / {el.RoomType?.name}{" "}
											</p>
											<p className="text-xs font-">
												{el.RoomType?.RoomRates?.length !== 0 &&
													el.RoomType?.RoomRates?.filter(
														(el: RoomRateInterface) => el.name === "normal rate"
													)[0].value}
											</p>
										</option>
									))}
							</select>
						</div>
					</div>

					<div className="flex items-center w-1/2 gap-3 text-sm ">
						<label htmlFor="adults-children">Adults/Children</label>
						<div className="flex items-center gap-3">
							<input
								{...register("bookingDetails.adults")}
								className="bg-[#F5F5F5] border-2 border-gray-300 rounded-[4px] w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
							/>
							<input
								{...register("bookingDetails.children")}
								className="bg-[#F5F5F5] border-2 border-gray-300 rounded-[4px] w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
							/>
						</div>
					</div>
				</div>
				<div className="flex gap-2 my-4">
					<div className="flex items-center w-1/2 gap-3 text-sm">
						<label htmlFor="comming-from" className="block">
							Comming From
						</label>
						<input
							{...register("bookingDetails.comming_from")}
							className="bg-[#F5F5F5] border-2 border-gray-300 rounded-[4px] flex-1  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
						/>
					</div>
					<div className="flex items-center w-1/2 gap-3 text-sm">
						<label htmlFor="going-to" className="block">
							Going To
						</label>
						<input
							{...register("bookingDetails.going_to")}
							className="bg-[#F5F5F5] border-2 border-gray-300 rounded-[4px] flex-1  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
						/>
					</div>
				</div>
				<div className="flex gap-2 my-4">
					<div className="flex items-center w-1/2 gap-3 text-sm">
						<label htmlFor="check_in">Check in</label>
						<Controller
							control={control}
							name="bookingDetails.check_in"
							defaultValue={new Date()}
							render={({ field }) => (
								<DatePicker
									placeholderText="check_in"
									onChange={(date: Date) => field.onChange(date)}
									selected={field.value}
									showIcon
									className="border-2 text-xs border-gray-300 rounded-[4px]"
									icon={<IoCalendar className="w-3 h-3 text-sky-700" />}
								/>
							)}
						/>
					</div>
					<div className="flex items-center w-1/2 gap-3 text-sm">
						<label htmlFor="check_out">Check out</label>
						<Controller
							control={control}
							name="bookingDetails.check_out"
							defaultValue={new Date()}
							render={({ field }) => (
								<DatePicker
									placeholderText="check_out"
									onChange={(date: Date) => field.onChange(date)}
									select={field.value}
									showIcon
									className="border-2 text-xs border-gray-300 rounded-[4px]"
									icon={<IoCalendar className="w-3 h-3 text-sky-700" />}
								/>
							)}
						/>
					</div>
				</div>
				<div className="flex gap-2 my-4">
					<div className="flex items-center w-1/2 gap-3 text-sm">
						<label htmlFor="days_staying">Days Staying</label>
						<DatePicker
							className="flex-1 py-1 bg-[#F5F5F5] border-2 border-gray-300 rounded-[4px]  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
							multiple
							highlightDates={daysIn}
							minDate={new Date()}
							dateFormat="dd/MM/yyyy"
							onChange={(date: string) => {
								let newDates = [...daysIn, new Date(date)];
								newDates = filterDateDuplicates(newDates);
								setDaysIn([...newDates]);
							}}
							placeholderText="Select many days "
						/>
					</div>
				</div>
				<p className="text-sm font-bold text-center">Guest Details</p>
				<div className="flex gap-2 my-8">
					<div className="w-1/2 ">
						<div className="relative flex items-center w-full gap-3 text-sm">
							<label htmlFor="guestDetails.name" className="block ">
								Guest name{" "}
							</label>
							<div className="flex-1">
								<input
									name="guest"
									onFocus={() => setOptionsVisible(true)}
									onBlur={() => setOptionsVisible(false)}
									onChange={(e) => setGuest(e.target.value)}
									className="bg-[#F5F5F5]   block border-2 border-sky-100 rounded-[4px] w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
								/>
								{optionsVisible && (
									<div className="absolute w-full p-2 bg-white ">
										{guests &&
											guests.map((guest: guestInterface) => (
												<p
													onClick={() => setGuestId(guest.id)}
													key={guest.id}
													className="py-1 text-sm font-bold cursor-pointer ps-2 hover:bg-gray-300">
													{guest.lastname} {guest.firstname}
												</p>
											))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="flex gap-2 my-4">
					<div className="flex items-center w-1/2 gap-3 text-sm">
						<label htmlFor="firstname">Surname</label>
						<input
							{...register("guestDetails.firstname")}
							className="bg-[#F5F5F5] border-2 border-gray-300 rounded-[4px] w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
						/>
					</div>
					<div className="flex items-center w-1/2 gap-3 text-sm">
						<label htmlFor="lastname">Givenname</label>

						<input
							{...register("guestDetails..lastname")}
							className="bg-[#F5F5F5] border-2 border-gray-300 rounded-[4px] w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
						/>
					</div>
				</div>
				<div className="flex gap-2 my-4">
					<div className="flex items-center w-1/2 gap-3 text-sm">
						<label htmlFor="">Email</label>
						<input
							{...register("guestDetails.email")}
							className="bg-[#F5F5F5] border-2 border-gray-300 rounded-[4px] w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
						/>
					</div>
					<div className="flex items-center w-1/2 gap-3 text-sm">
						<label htmlFor="telephone">Tel</label>

						<input
							{...register("guestDetails.tel")}
							className="bg-[#F5F5F5] border-2 border-gray-300 rounded-[4px] w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
						/>
					</div>
				</div>
				<div className="flex gap-2 my-4">
					<div className="flex items-center w-1/2 gap-3 text-sm">
						<label htmlFor="placeOfBirth" className="block">
							Place of birth
						</label>
						<input
							{...register("guestDetails.placeOfBirth")}
							className="bg-[#F5F5F5] border-2 border-gray-300 rounded-[4px] flex-1  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
						/>
					</div>
					<div className="flex items-center w-1/2 gap-3 text-sm">
						<label htmlFor="nationality">Nationality</label>

						<input
							{...register("guestDetails.nationality")}
							className="bg-[#F5F5F5] border-2 border-gray-300 rounded-[4px] w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
						/>
					</div>
				</div>
				<div className="flex gap-2 my-4">
					<div className="flex items-center w-1/2 gap-3 text-sm">
						<label htmlFor="residency">Residency</label>
						<input
							{...register("guestDetails.residency")}
							className="bg-[#F5F5F5] border-2 border-gray-300 rounded-[4px] w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
						/>
					</div>
					<div className="flex items-center w-1/2 gap-3 text-sm">
						<label htmlFor="bookedFrom" className="block">
							Booked From
						</label>

						<input
							{...register("guestDetails.bookedFrom")}
							className="bg-[#F5F5F5] border-2 border-gray-300 rounded-[4px] flex-1 placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
						/>
					</div>
				</div>
				<div className="flex gap-2 my-4">
					<div className="flex items-center w-1/2 gap-3 text-sm">
						<label htmlFor="company" className="block">
							Company
						</label>
						<input
							{...register("guestDetails.company")}
							className="bg-[#F5F5F5] border-2 border-gray-300 rounded-[4px] flex-1  placeholder:text-xs placeholder:font-bold"
						/>
					</div>
					<div className="flex items-center w-1/2 gap-3 text-sm">
						<label htmlFor="profession">Profession</label>

						<input
							{...register("guestDetails.profession")}
							className="bg-[#F5F5F5] border-2 border-gray-300 rounded-[4px] w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
						/>
					</div>
				</div>
				<div className="flex gap-2 my-4">
					<div className="flex items-center w-1/2 gap-3 text-sm">
						<label htmlFor="identificationType" className="block">
							Identification Type
						</label>

						<select
							{...register("guestDetails.identificationType")}
							className="bg-[#F5F5F5] text-xs py-1 border-2 border-gray-300 rounded-[4px] flex-1    placeholder:text-xs placeholder:font-bold">
							<option className="text-xs" selected={true}>
								Passport
							</option>
							<option className="text-xs">ID Card</option>
						</select>
					</div>
					<div className="flex items-center w-1/2 gap-3 text-sm">
						<label htmlFor="identitycardNumber" className="block">
							ID/Passport No
						</label>

						<input
							{...register("guestDetails.identitycardNumber")}
							className="bg-[#F5F5F5] border-2 border-gray-300 rounded-[4px] flex-1  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
						/>
					</div>
				</div>
				<div className="flex gap-2 my-4">
					<div className="flex w-1/2 gap-3 text-sm">
						<label htmlFor="identityissueDate">Identity Issue Date</label>
						<Controller
							control={control}
							name="guestDetails.idententityissueDate"
							defaultValue={new Date()}
							render={({ field }) => (
								<DatePicker
									placeholderText="idententityissueDate"
									onChange={(date) => field.onChange(date)}
									selected={field.value}
									showIcon
									multiple
									className="border-2 text-xs border-gray-300 rounded-[4px]"
									icon={<IoCalendar className="w-3 h-3 text-sky-700" />}
								/>
							)}
						/>
					</div>
					<div className="w-1/2 gap-3 text-sm">
						<label htmlFor="othernote" className="block">
							Other Note
						</label>
						<textarea
							{...register("guestDetails.othernote")}
							className="w-full"
							rows={8}></textarea>
					</div>
				</div>

				<div className="flex justify-around my-4 ">
					<button
						type="button"
						className="flex items-center  text-sm rounded-[8px] justify-around gap-4 px-6 py-2 text-white bg-orange-600">
						Checkin
						<GiHouseKeys />
					</button>
					<button
						type="button"
						onClick={submitData}
						className="flex items-center text-sm rounded-[8px] justify-around gap-4 px-6 py-2 text-white bg-purple-700">
						Reserve
						<RiShieldKeyholeLine />
					</button>
				</div>
			</form>
		</div>
	);
}

export default CreateBookingModel;
