import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "../../shared/Search";
import { useFetchData } from "../../hooks/useFetchData";

interface statusButtonProps {
	status: boolean;
}
interface modelProps {
	show: boolean;
	userId?: number;
}
const StatusButton = ({ status }: statusButtonProps) => {
	return (
		<select
			className={`px-4 py-1 ${
				status ? "bg-[#D5FFD2] text-teal-900" : "bg-pink-100 text-pink-900"
			}`}>
			<option className="py-1 bg-[#D5FFD2] text-teal-900 " selected={status}>
				Active
			</option>
			<option className="py-1 text-pink-900 bg-pink-100 " selected={!status}>
				Suspended
			</option>
		</select>
	);
};

const UpdateUserStatusModel = ({ show, userId }: modelProps) => {
	useEffect(() => {
		document.body.style.display = "relative";
	}, [show]);
	return (
		<div
			className={`${
				show ? "fixed" : "hidden"
			} w-full min-h-screen z-70 bg-slate-800 opacity-90`}>
			<div className="w-1/4 p-5 bg-white">
				<p className="font-medium text-center ">Confirm User Status Update </p>
			</div>
		</div>
	);
};

export const AllUsers = (props: Props) => {
	const [data, loading, error] = useFetchData("/allusers");
	const [searchData, setSearchData] = useState();
	const [isSearching, setIsSearching] = useState(false);

	return (
		<div>
			<div className="flex items-center justify-between font-nunito">
				<p className="text-sm font-medium">All users</p>
				<Search
					setFetchedData={setSearchData}
					setIsSearching={setIsSearching}
				/>
				<Link
					to="register-user"
					className="px-4 py-2 text-sm rounded-full bg-login-blue text-primary-white ">
					Register New User
				</Link>
			</div>
			<table className="w-full mt-3 ">
				<thead className="border-2 border-gray-200">
					<tr>
						<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
							Name
						</th>
						<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
							Identification
						</th>
						<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
							Tel
						</th>
						<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
							Position
						</th>
						<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
							Status
						</th>
					</tr>
				</thead>

				<tbody>
					{loading ? (
						<p className="w-full text-center">Loading...</p>
					) : !isSearching && data ? (
						data.map((el) => (
							<tr key={crypto.randomUUID()}>
								<td className="p-3 text-xs capitalize whitespace-nowrap">
									{el.username}
								</td>
								<td className="p-3 text-xs capitalize whitespace-nowrap">
									{el.Employee ? el.Employee.identification : null}
								</td>
								<td className="p-3 text-xs capitalize whitespace-nowrap">
									{el.Employee && el.Employee.telephone}
								</td>
								<td className="p-3 text-xs capitalize whitespace-nowrap">
									{el.Employee &&
										el.Employee.Position &&
										el.Employee.Position.name}
								</td>
								<td className="p-3 text-sm capitalize whitespace-nowrap">
									<StatusButton status={el.status} />
								</td>
							</tr>
						))
					) : isSearching && searchData && searchData.length === 0 ? (
						<p>User not found</p>
					) : (
						searchData &&
						searchData.map((el) => (
							<tr key={crypto.randomUUID()}>
								<td className="p-3 text-xs capitalize whitespace-nowrap">
									{el.username}
								</td>
								<td className="p-3 text-xs capitalize whitespace-nowrap">
									{el.Employee ? el.Employee.identification : null}
								</td>
								<td className="p-3 text-xs capitalize whitespace-nowrap">
									{el.Employee && el.Employee.telephone}
								</td>
								<td className="p-3 text-xs capitalize whitespace-nowrap">
									{el.Employee &&
										el.Employee.Position &&
										el.Employee.Position.name}
								</td>
								<td className="p-3 text-sm capitalize whitespace-nowrap">
									<StatusButton status={el.status} />
								</td>
							</tr>
						))
					)}
				</tbody>
				{error && <p>{error.message}</p>}
			</table>
		</div>
	);
};

// <UpdateUserStatusModel show={true} />;
