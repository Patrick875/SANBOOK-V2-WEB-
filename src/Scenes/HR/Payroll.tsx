import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useFetchData } from "../../hooks/useFetchData";
import { useForm } from "react-hook-form";

export const Payroll = () => {
	const [data, loading, error] = useFetchData("/hr/employees");
	const { register } = useForm();

	return (
		<div>
			<div className="flex items-center gap-4">
				<p className="my-2 text-sm font-bold">PAYROLL</p>
				<form className=" flex items-center gap-3 py-1 px-4 bg-[#F5F5F5]  border-2 border-gray-300 rounded-full  ">
					<MagnifyingGlassIcon className="w-5 h-5 text-login-blue" />
					<input
						placeholder="Search"
						className="text-sm bg-transparent rounded-full focus:outline-none focus-border-none placeholder:text-sm placeholder:font-bold"
						{...register("query")}
					/>
				</form>
			</div>

			<div className="p-0">
				<table className="w-full mt-3 ">
					<thead className="border-2 border-gray-200">
						<tr>
							<th className="p-2 text-xs font-semibold tracking-wide text-left w-14 whitespace-nowrap">
								Name
							</th>
							<th className="w-16 p-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
								Position/Dep
							</th>
							<th className="p-2 text-xs font-semibold tracking-wide text-left w-14 whitespace-nowrap">
								Gross Salary
							</th>
							<th className="p-2 text-xs font-semibold tracking-wide text-left w-14 whitespace-nowrap">
								Deductions
							</th>
							<th className="p-2 text-xs font-semibold tracking-wide text-left w-14 whitespace-nowrap">
								Advance paid
							</th>
							<th className="p-2 text-xs font-semibold tracking-wide text-left w-14 whitespace-nowrap">
								Bonus
							</th>
							<th className="p-2 text-xs font-semibold tracking-wide text-left w-14 whitespace-nowrap">
								Net Salary
							</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<p className="w-full text-center">Loading...</p>
							</tr>
						) : (
							data &&
							data.map((el) => (
								<tr key={crypto.randomUUID()} className="cursor-pointer">
									<td className="p-3 text-xs capitalize whitespace-nowrap">
										{el.fullname}
									</td>
									<td className="p-3 text-xs capitalize whitespace-nowrap">
										{el.Position.name + "/" + el.Department.name}
									</td>
									<td className="p-2 text-xs capitalize whitespace-nowrap">
										{Number(el.Position.grossSalary).toLocaleString() + " RWF"}
									</td>
									<td className="p-2 text-xs capitalize whitespace-nowrap"></td>
									<td className="p-2 text-xs capitalize whitespace-nowrap"></td>
									<td className="p-2 text-xs capitalize whitespace-nowrap"></td>
									<td className="p-2 text-xs capitalize whitespace-nowrap">
										{el.Position.netSallary}
									</td>
								</tr>
							))
						)}
						{error && (
							<tr>
								<p>{error.message}</p>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};
