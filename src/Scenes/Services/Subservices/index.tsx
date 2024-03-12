import { Outlet } from "react-router-dom";
import LayoutContainer from "../../../shared/LayoutContainer";
import SideBar from "../../Reception/Bookings/SideBar";
import OutletContainer from "../../../shared/OutletContainer";
import { subservicesNavs } from "../constants";

function ServiceSubServices() {
	return (
		<div>
			<LayoutContainer>
				<SideBar navlinks={subservicesNavs} />
				<OutletContainer>
					<div className="px-6 py-1 ">
						<Outlet />
					</div>
				</OutletContainer>
			</LayoutContainer>
		</div>
	);
}

export default ServiceSubServices;
