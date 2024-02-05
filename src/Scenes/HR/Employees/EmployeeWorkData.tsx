import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";
import { Link, useOutletContext } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { ScaleLoader } from "react-spinners";

interface Props {}

const requests = [
	{
		title: "Half day leave",
		status: "pending",
		datefor: new Date().toDateString(),
		createdAt: new Date().toDateString(),
	},
	{
		title: "Emergency Leave",
		status: "approved",
		datefor: new Date().toDateString(),
		createdAt: new Date().toDateString(),
	},
	{
		title: "Half day leave",
		status: "denied",
		datefor: new Date().toDateString(),
		createdAt: new Date().toDateString(),
	},
];

const warnings = [
	{
		title: "Missing from work",
		datefor: new Date().toDateString(),
		createdAt: new Date().toDateString(),
	},
	{
		title: "Late from work",
		datefor: new Date().toDateString(),
		createdAt: new Date().toDateString(),
	},
	{
		title: "Missing Cash",
		datefor: new Date().toDateString(),
		createdAt: new Date().toDateString(),
	},
];

const EmployeeWorkData = (props: Props) => {
	const { employee } = useOutletContext();
	const [data, loading, error] = useFetchData(
		`/hr/warnings/${employee && employee.id}`
	);

	return (
		<div className="grid w-full grid-cols-10 gap-4 ">
			<div className="col-span-5 p-4 text-xs font-bold bg-white ">
				<div className="flex items-center gap-3 py-2 ">
					<p className="basis-1/3">Requests</p>
					<form className="flex gap-3 basis-2/3 ">
						<input type="date" className="bg-[#EFEFEF] px-3 py-1" />
						<div className="flex items-center gap-2 p-2 py-1 bg-search-bg">
							<MagnifyingGlassIcon className="w-3 h-3 text-login-blue" />
							<input
								placeholder="Search"
								className="w-full bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-bold"
							/>
						</div>
					</form>
				</div>
				{requests &&
					requests.map((el) => (
						<div className=" my-2 bg-[#F1F5F9] items-center flex justify-between p-2">
							<div>
								<p>{el.title}</p>
								<p className="pt-2 text-xs font-medium">{el.datefor}</p>
							</div>
							<div>
								{el.status === "approved" ? (
									<p className="flex items-center text-emerald-700">
										Approved
										<CheckIcon className="w-5 h-5 text-teal-900 ps-2" />
									</p>
								) : el.status === "pending" ? (
									<p className="flex items-center text-teal-900 ">
										Pending
										<AiOutlineLoading3Quarters className="w-5 h-5 ps-2 " />
									</p>
								) : (
									<p className="flex items-center text-pink-900 ">
										Denied
										<FcCancel className="w-5 h-5 ps-2" />
									</p>
								)}
							</div>
						</div>
					))}
			</div>
			<div className="col-span-5 p-4 text-xs font-bold bg-white ">
				<div className="flex items-center gap-3 py-2 ">
					<p className="basis-1/3">Warnings</p>
					<form className="flex gap-3 basis-2/3 ">
						<input type="date" className="bg-[#EFEFEF] px-3 py-1" />
						<div className="flex items-center gap-2 p-2 py-1 bg-search-bg">
							<MagnifyingGlassIcon className="w-3 h-3 text-login-blue" />
							<input
								placeholder="Search"
								className="w-full bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-bold"
							/>
						</div>
					</form>
				</div>
				{loading && (
					<div className="w-full  text-login-blue bg-[#E4F1FE] flex justify-center">
						<ScaleLoader color="#0C4981" size={15} loading={loading} />
					</div>
				)}
				{data &&
					data.map((el) => (
						<div className=" my-2 bg-[#FDF6F5]  p-2">
							<p>{el.title}</p>
							<p className="pt-2 text-xs font-medium">{el.issuedon}</p>
						</div>
					))}

				<Link
					to="addwarning"
					className=" block mt-4 w-full text-center shadow-md bg-[#176B87] py-1 rounded-sm text-primary-white">
					Add
				</Link>
			</div>
		</div>
	);
};

export default EmployeeWorkData;
