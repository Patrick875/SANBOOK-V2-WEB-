import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { LiaFileContractSolid } from "react-icons/lia";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";

interface Props {}

export const AllEmployees = (props: Props) => {
	const navigate = useNavigate();
	const [data, loading, error] = useFetchData("/hr/employees");
	const styleStatus = (status: string) => {
		if (status === "active") {
			return {
				status,
				style: " text-emerald-900",
				icon: <CheckIcon className="w-4 h-4 teal-emerald-900" />,
			};
		} else if (status === "on leave") {
			return {
				status,
				style: " text-teal-900",
				icon: <AiOutlineLoading3Quarters className="w-4 h-4 text-teal-900" />,
			};
		} else {
			return {
				status,
				style: " text-pink-800",
				icon: <FcCancel className="w-4 h-4" />,
			};
		}
	};

	const { register } = useForm();
	return (
		<div>
			<div className="flex items-center w-full gap-4">
				<p className="text-xs font-medium">Employees</p>
				<form className="flex items-center gap-3 py-1 px-4 bg-[#F5F5F5]  border-2 border-gray-300 rounded-full  ">
					<MagnifyingGlassIcon className="w-5 h-5 text-login-blue" />
					<input
						placeholder="Search"
						className="bg-transparent  rounded=full focus:outline-none focus-border-none placeholder:text-sm placeholder:font-bold"
						{...register("query")}
					/>
				</form>
			</div>
			<div className="w-full p-2 bg-white">
				<div className="flex items-center ">
					<div className="flex items-center gap-2 basis-2/3">
						<div>
							<label className="text-xs pe-4">Status</label>
							<select className="px-4 py-1 text-xs bg-[#F5F5F5]">
								<option>Active</option>
								<option>On leave</option>
							</select>
						</div>
						<div>
							<label className="text-xs pe-4">Contract Type</label>
							<select className="px-4 py-1  text-xs bg-[#F5F5F5]">
								<option>Full Time</option>
								<option>Part Time</option>
							</select>
						</div>
					</div>
					<div className="flex items-center justify-end basis-1/3">
						<Link
							to="create-new"
							className="px-6 py-1 text-xs bg-login-blue text-primary-white">
							{" "}
							Add new
						</Link>
					</div>
				</div>
				<table className="w-full mt-3 ">
					<thead className="border-2 border-gray-200">
						<tr>
							<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
								Name
							</th>
							<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
								Department
							</th>
							<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
								Position
							</th>
							<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
								Contract Type
							</th>
							<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
								Status
							</th>
							<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
								Contract
							</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<p className="w-full text-center">Loading...</p>
						) : (
							data &&
							data.map((el) => (
								<tr
									key={crypto.randomUUID()}
									className="cursor-pointer"
									onClick={() => {
										navigate(`${el.id}`);
									}}>
									<td className="p-3 text-xs capitalize whitespace-nowrap">
										{el.fullname}
									</td>
									<td className="p-3 text-xs capitalize whitespace-nowrap">
										{el.Department.name}
									</td>
									<td className="p-3 text-xs capitalize whitespace-nowrap">
										{el.Position.name}
									</td>
									<td className="p-3 text-xs capitalize whitespace-nowrap">
										{el.employmenttype}
									</td>
									<td className="p-3 text-xs capitalize whitespace-nowrap">
										<p
											className={`w-full items-center flex gap-3 ${
												styleStatus(el.status).style
											}`}>
											{" "}
											{el.status}
											{styleStatus(el.status).icon}
										</p>
									</td>
									<td className="p-3 text-xs capitalize whitespace-nowrap">
										<div className="flex w-full gap-2">
											<Link
												to="#"
												className="flex items-center gap-2 px-5 py-1 font-medium bg-blue-200 text-login-blue ">
												<p>View</p>
												<LiaFileContractSolid className="w-5 h-5 text-login-blue" />
											</Link>
										</div>
									</td>
								</tr>
							))
						)}
						{error && <p>{error.message}</p>}
					</tbody>
				</table>
			</div>
		</div>
	);
};
