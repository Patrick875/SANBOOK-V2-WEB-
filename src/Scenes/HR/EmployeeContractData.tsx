import { Link, useOutletContext } from "react-router-dom";

const EmployeeContractData = () => {
	const { employee } = useOutletContext();
	return (
		<div>
			<div>
				<div className="flex items-center p-6 bg-white">
					<p className="text-xs font-bold basis-1/3">Administrative actions</p>
					<div className="flex gap-3 basis-2/3">
						<button className="   shadow-md rounded-sm px-4 py-1  font-bold text-xs bg-[#FFF5F5] text-pink-800">
							Terminate Current Contract
						</button>
						<button className="  shadow-md rounded-sm text-primary-white  text-xs px-4  bg-[#176B87]">
							<Link to="/add-contract" className="w-full text-center">
								Add New Contract
							</Link>
						</button>
					</div>
				</div>
			</div>
			<div className="p-6 my-3 bg-white">
				<p className="py-4 text-xs font-bold text-center ">Employee Contract</p>

				<table className="w-full mt-3 ">
					<thead className="border-2 border-slate-800">
						<tr>
							<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
								Date Created
							</th>
							<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
								File
							</th>
						</tr>
					</thead>

					{employee &&
					employee.EmployeeContracts &&
					employee.EmployeeContracts.length !== 0 ? (
						<tbody className="border-2 border-slate-800">
							{employee.EmployeeContracts.map((contr) => (
								<tr>
									<td>
										{new Date(contr.createdAt).toLocaleDateString("fr-FR")}
									</td>
									<td></td>
								</tr>
							))}
						</tbody>
					) : (
						<tbody>
							<tr>
								<td colSpan={3}>No contracts yet </td>
							</tr>
						</tbody>
					)}
				</table>
			</div>
		</div>
	);
};

export default EmployeeContractData;
