import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import CreateHeader from "../ReceiveVauchers/CreateHeader";
import { useEffect, useState } from "react";
import EditableRequestView from "../../../shared/EditableRequestView";
import { stockrequest } from "../../../types";
import instance from "../../../API";
import toast from "react-hot-toast";
import { useAuth } from "../../../Context/AuthContext";

type fetchReturnData = [stockrequest, boolean, any];
function RequestDetails() {
	const { requestId } = useParams();
	const { user } = useAuth();
	const [requestStatus, setRequestStatus] = useState<string | null>();
	const [request, loading, error] = useFetchData<fetchReturnData>(
		`/stock/costingcenterrequests/${requestId}`
	);

	const [requestItems, setRequestItems] = useState([]);

	useEffect(() => {
		if (!error && !loading && request) {
			setRequestItems(request.CostingCenterRequestItems);
			setRequestStatus(request.status);
		}
	}, [request]);

	const approveRequest = async (): Promise<void> => {
		await instance
			.post("/stock/costingcenterrequests/approve", {
				id: request.id,
				items: requestItems,
				costingcenter: request.costingcenter,
			})
			.then((res) => {
				console.log("res", res);
				toast.success("Approved !!!");
				setRequestStatus(res.data.newStatus);
			})
			.catch((err) => {
				console.log("err", err);
				toast.error(err.code);
			});
	};
	const cancelRequest = async (): Promise<void> => {
		await instance
			.post("/stock/costingcenterrequests/cancel", {
				id: request.id,
			})
			.then((res) => {
				console.log("res", res);
				toast.success("Denied !!!");

				setRequestStatus(res.data.newStatus);
			})
			.catch((err) => {
				console.log("err", err);
				toast.error(err.code);
			});
	};

	return (
		<div>
			{requestStatus === "PENDING" ? (
				user.role === "admin" || user.role === "stock" ? (
					<p className="text-xs text-center w-1/4 mx-auto font-bold border-[1.2px] border-emerald-800 p-3">
						Edit and take action on request
					</p>
				) : (
					<p className="text-xs text-center w-1/4 mx-auto font-bold border-[1.2px] border-emerald-800 p-3">
						Request {requestStatus}
					</p>
				)
			) : (
				<p className="text-xs text-center w-1/4 mx-auto font-bold border-[1.2px] border-emerald-800 p-3">
					Request {requestStatus}
				</p>
			)}

			<CreateHeader createdId={"0003"} document="Stock Request" />

			<EditableRequestView
				cols={["name", "quantity", "unit"]}
				headers={["Item", "Quantity", "Unit"]}
				data={requestItems}
				readOnlyCols={["name"]}
				readOnly={false}
				setData={setRequestItems}
			/>

			{(user.role === "admin" || user.role === "stock") &&
				requestStatus === "PENDING" && (
					<div className="flex justify-end mt-4 ">
						<div className="flex gap-2">
							<button
								onClick={() => {
									approveRequest();
								}}
								className="text-xs px-6 py-1 rounded-[4px] text-white bg-emerald-900">
								Approve
							</button>
							<button
								onClick={() => {
									cancelRequest();
								}}
								className="text-xs px-6 py-1 rounded-[4px] text-white bg-pink-900">
								Deny
							</button>
						</div>
					</div>
				)}
		</div>
	);
}

export default RequestDetails;
