import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "../../shared/Search";
import { useFetchData } from "../../hooks/useFetchData";

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
				{loading ? (
					<p className="w-full text-center">Loading...</p>
				) : !isSearching && data ? (
					data.map((el) => (
						<tr key={crypto.randomUUID()}>
							<td className="p-3 text-xs capitalize whitespace-nowrap">
								{el.username}
							</td>
							<td className="p-3 text-xs capitalize whitespace-nowrap">
								{el.identification}
							</td>
							<td className="p-3 text-xs capitalize whitespace-nowrap">
								{el.tel}
							</td>
							<td className="p-3 text-xs capitalize whitespace-nowrap">
								{el.position}
							</td>
							<td className="p-3 text-sm capitalize whitespace-nowrap">
								{el.status}
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
								{el.identification}
							</td>
							<td className="p-3 text-xs capitalize whitespace-nowrap">
								{el.tel}
							</td>
							<td className="p-3 text-xs capitalize whitespace-nowrap">
								{el.position}
							</td>
							<td className="p-3 text-sm capitalize whitespace-nowrap">
								{el.status}
							</td>
						</tr>
					))
				)}
				{error && <p>{error.message}</p>}
				<tbody></tbody>
			</table>
		</div>
	);
};
