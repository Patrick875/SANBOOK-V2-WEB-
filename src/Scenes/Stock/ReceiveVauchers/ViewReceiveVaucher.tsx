import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";

function ViewReceiveVaucher() {
	const { order } = useParams();
	const [data] = useFetchData(`/stock/receivevaucher/${order}`);
	console.log("data", data);

	const headers: string[] = ["Item", "Price", "Quantity", "Unit", "Total"];
	return <div>ViewReceiveVaucher</div>;
}

export default ViewReceiveVaucher;
