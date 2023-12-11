import { Link } from "react-router-dom";
import { CgMergeVertical } from "react-icons/cg";
import { useFetchData } from "../../hooks/useFetchData";
import { MdOutlineDeleteForever } from "react-icons/md";

interface Props {}

export const AllDepartments = (props: Props) => {
	const [data, loading, error] = useFetchData("/hr/departments");

	return (
		<div>
			<div className="flex items-center justify-between font-nunito">
				<p className="text-sm font-medium uppercase">Departments</p>
				<div className="flex gap-4">
					<Link
						to="create"
						className="px-6 py-1 text-xs bg-login-blue text-primary-white ">
						Add new
					</Link>
					<Link
						to="create-new"
						className="px-6 py-1 text-xs bg-teal-800 text-primary-white ">
						<div className="flex items-center gap-2">
							<p>Merge</p>
							<CgMergeVertical className="w-3 h-3 rotate-90 text-primary-white" />
						</div>
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
							Manager
						</th>
						<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<p className="w-full text-center">Loading...</p>
					) : (
						data &&
						data.map((el) => (
							<tr key={crypto.randomUUID()}>
								<td className="p-3 text-xs capitalize whitespace-nowrap">
									{el.name}
								</td>
								<td className="p-3 text-xs capitalize whitespace-nowrap"></td>
								<td className="p-3 text-xs capitalize whitespace-nowrap">
									<div className="flex w-full gap-2">
										<Link
											to="#"
											className="px-5 py-1 font-medium bg-blue-200 text-login-blue ">
											View
										</Link>
										<Link
											to="#"
											className="flex items-center gap-2 px-5 py-1 font-medium text-white bg-pink-800 ">
											<p>Delete</p>
											<MdOutlineDeleteForever className="w-4 h-4 text-primary-white" />
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
	);
};
