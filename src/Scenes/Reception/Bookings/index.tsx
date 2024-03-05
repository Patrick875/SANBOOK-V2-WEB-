import { Outlet } from "react-router-dom";
import LayoutContainer from "../../../shared/LayoutContainer";
import SideBar from "./SideBar";
import OutletContainer from "../../../shared/OutletContainer";
import { bookingsNav } from "../constants";

function Bookings() {
	return (
		<LayoutContainer>
			<SideBar navlinks={bookingsNav} />
			<OutletContainer>
				<div className="px-6 py-1 ">
					<Outlet />
				</div>
			</OutletContainer>
		</LayoutContainer>
	);
}

export default Bookings;
