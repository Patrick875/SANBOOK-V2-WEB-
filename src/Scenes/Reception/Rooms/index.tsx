import { Outlet } from "react-router-dom";
import LayoutContainer from "../../../shared/LayoutContainer";
import OutletContainer from "../../../shared/OutletContainer";
import SideBar from "../Bookings/SideBar";
import { roomsNav } from "../constants";

function Rooms() {
	return (
		<LayoutContainer>
			<SideBar navlinks={roomsNav} />
			<OutletContainer>
				<div className="px-6 py-1 ">
					<Outlet />
				</div>
			</OutletContainer>
		</LayoutContainer>
	);
}

export default Rooms;
