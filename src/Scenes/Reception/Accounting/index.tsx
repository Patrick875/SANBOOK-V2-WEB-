import { Outlet } from "react-router-dom";

function Accounting() {
	return (
		<div>
			<div>
				index
				<Outlet />
			</div>
		</div>
	);
}

export default Accounting;
