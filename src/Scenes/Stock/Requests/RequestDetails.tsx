import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import CreateHeader from "../ReceiveVauchers/CreateHeader";
import EditableTableRequest from "../../../shared/EditableTableRequest";
import { useEffect, useState } from "react";
import EditableRequestView from "../../../shared/EditableRequestView";

function RequestDetails() {
	const { requestId } = useParams();
	const [data, loading, error] = useFetchData(
		`/stock/costingcenterrequests/${requestId}`
	);
	const [requestItems, setRequestItems] = useState([]);
	console.log("data and latest", data);
	useEffect(() => {
		if (!error && !loading && data) {
			setRequestItems(data.CostingCenterRequestItems);
		}
	}, [data]);
	console.log("request items", requestItems);

	return (
		<div>
			<CreateHeader createdId={"0003"} document="Stock Request" />
			<EditableRequestView
				cols={["name", "quantity", "unit"]}
				headers={["Item", "Quantity", "Unit"]}
				data={requestItems}
				readOnlyCols={["name"]}
				readOnly={false}
				setData={setRequestItems}
			/>
		</div>
	);
}

export default RequestDetails;
