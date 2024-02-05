import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { useForm } from "react-hook-form";
import { useFetchData } from "../../../hooks/useFetchData";
import { ScaleLoader } from "react-spinners";
import { Link } from "react-router-dom";

interface Props {}

export const HRHome = (props: Props) => {
	const { register } = useForm();
	const [hrdata, loading, error] = useFetchData("/hr/dashboard");
	return (
		<div>
			<div className="flex justify-center w-full">
				<form className=" basis-2/4 flex items-center gap-3 p-2 px-4 bg-white rounded-[8px] ">
					<MagnifyingGlassIcon className="w-5 h-5 text-login-blue" />
					<input
						placeholder="Search"
						className="bg-transparent focus:outline-none focus-border-none placeholder:text-sm placeholder:font-bold"
						{...register("query")}
					/>
				</form>
			</div>
			{loading && (
				<div className="min-h-full">
					<ScaleLoader color="#0C4981" size={15} loading={loading} />
				</div>
			)}
			{error && (
				<div className="w-full p-3 text-center text-pink-900 bg-pink-200 border-pink-900 border-1">
					{error.response.data.message}
				</div>
			)}
			<div className="grid grid-cols-3 gap-4 my-3 ">
				{hrdata &&
					Object.keys(hrdata).map((el) => {
						return (
							<p
								key={crypto.randomUUID()}
								className="p-4 py-3 text-xs font-medium capitalize bg-white ">
								{el}- ({hrdata[el].length})
							</p>
						);
					})}
			</div>
			<p className="my-2 text-sm font-bold">Summary</p>
			<div className="grid grid-cols-3 gap-3">
				<div className="grid grid-rows-3 ">
					<div className="row-span-1 p-4 text-xs font-bold bg-white ">
						<div className="w-full gap-2 py-2 ">
							<p className="basis-4/5">
								Employees - on Shift (
								{hrdata && hrdata["employees"] && hrdata["employees"].length})
							</p>
							<form className="flex w-3/5 my-1 ">
								<input type="date" className="bg-[#EFEFEF] w-full  px-2 py-1" />
							</form>
						</div>
						{hrdata &&
							hrdata["employees"] &&
							hrdata["employees"].length !== 0 && (
								<div className="w-full rounded-sm shadow-sm">
									{hrdata["employees"].slice(0, 2).map((el) => (
										<div className=" my-2 bg-[#F1F5F9] border-1 border-gray-500 shadow-sm items-center  p-2">
											<p className="font-bold capitalize text-[14px]">
												{el.fullname} - {el.Position.name}
											</p>
											<p className="pt-2 text-[14px] font-medium text-gray-700">
												Shift : Day
											</p>
										</div>
									))}
									<div className="flex justify-center w-full mt-1 ">
										<Link
											className="block px-6 py-1 text-xs font-medium bg-gray-300"
											to="employees">
											More
										</Link>
									</div>
								</div>
							)}
					</div>
					<div className="row-span-1 p-4 my-2 text-xs bg-white">
						<p className="mb-4 font-bold">Pending requests</p>
						<div className="p-3 border-1 border-gray-800 shadow-md px=6">
							<p className="text-xs font-medium ">Half-day leave</p>
							<p className="py-0 font-bold text-gray-400 text-xs/4 ">
								{" "}
								{new Date().toLocaleDateString("fr-FR")}
							</p>
						</div>
						<div className="p-3 border-1 border-gray-800 shadow-md px=6">
							<p className="text-xs font-medium ">Half-day leave</p>
							<p className="py-0 font-bold text-gray-400 text-xs/4 ">
								{" "}
								{new Date().toLocaleDateString("fr-FR")}
							</p>
						</div>
					</div>
				</div>
				<div className="">
					<div className="col-span-5 p-4 text-xs font-bold bg-white ">
						<div className="py-1 ">
							<p className="mb-2">Wagers - (4) </p>
							<div className="p-3 px-6 border-gray-800 shadow-md border-1">
								<p className="text-xs font-medium ">Jack Ryan - Waiter</p>
								<p className="py-0 font-bold text-gray-400 text-xs/4 ">
									Shift: Day
								</p>
							</div>
							<div className="p-3 px-6 border-gray-800 shadow-md border-1">
								<p className="text-xs font-medium ">Jack Brown - Security</p>
								<p className="py-0 font-bold text-gray-400 text-xs/4 ">
									Shift: Night
								</p>
							</div>
							<div className="flex justify-center w-full mt-2 ">
								<Link
									className="block px-6 py-1 text-xs font-medium bg-gray-300"
									to="employees">
									More
								</Link>
							</div>
						</div>
					</div>
					<div className="col-span-5 p-4 mt-3 text-xs font-bold bg-white ">
						<p className="mb-2">Contracts </p>
						<div className="py-1 ">
							<div className="p-3 px-4 border-gray-800 shadow-md border-1">
								<p className="text-[12px] font-bold ">
									James - Contract due 01/08/2022
								</p>
								<p className="text-[12px] py-0 font-bold text-gray-400 text-xs/4 ">
									31/07/2022 at 11:30 A.M
								</p>
							</div>
							<div className="p-3 px-4 border-gray-800 shadow-md border-1">
								<p className="text-[12px] font-bold ">
									Jane - Delayed extension request
								</p>
								<p className="py-0 font-bold  text-gray-400 text-[12px] ">
									31/07/2022 at 11:30 A.M
								</p>
							</div>
							<div className="flex justify-center w-full mt-2 ">
								<Link
									className="block px-6 py-1 text-xs font-medium bg-gray-300"
									to="employees">
									More
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="">
					<div className="col-span-5 p-4 text-xs font-bold bg-white ">
						<div className="py-2 ">
							<p className="">On Leave (4)</p>
						</div>
						<p className="text-[12px] font-bold">Annual / Maternity</p>
						<div className="p-3 px-4 border-gray-800 shadow-md border-1">
							<p className="text-[12px] font-bold ">James M. (Annual)</p>
							<p className="py-0 font-bold text-gray-400 text-[12px] ">
								31/07/2022 -14/08/2022
							</p>
						</div>
						<div className="p-3 px-4 border-gray-800 shadow-md border-1">
							<p className="text-[12px] font-bold ">Jane K. (Maternity)</p>
							<p className="py-0 font-bold text-gray-400 text-[12px] ">
								30/06/2022 - 30/09/2022
							</p>
						</div>
						<p className="text-[12px] my-2 font-bold">
							On leave/day-off/ Emergancy
						</p>
						<div className="p-3 px-4 border-gray-800 shadow-md border-1">
							<p className="text-[12px] font-bold ">James - day off</p>
							<p className="py-0 font-bold text-gray-400 text-[12px] ">
								30/06/2022
							</p>
						</div>
						<div className="p-3 px-4 border-gray-800 shadow-md border-1">
							<p className="text-[12px] font-bold ">
								Jane - Emergency (Sickness)
							</p>
							<p className="py-0 font-bold text-gray-400 text-[12px] ">
								30/06/2022
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
