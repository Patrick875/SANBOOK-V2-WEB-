import { Outlet, useOutletContext } from "react-router-dom";

function CostingCenterRequests() {
	const { id } = useOutletContext();
	return (
		<div>
			<Outlet context={{id}} />
		</div>
	);
}

export default CostingCenterRequests;
