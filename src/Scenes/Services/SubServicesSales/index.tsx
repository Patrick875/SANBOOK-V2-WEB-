import { Outlet } from "react-router-dom";
import LayoutContainer from "../../../shared/LayoutContainer";
import OutletContainer from "../../../shared/OutletContainer";
import SideBar from "../../Reception/Bookings/SideBar";
import { subServicesSalesNavs } from "../constants";

function AllServiceSales() {
	return (
		<div>
			<LayoutContainer>
				<SideBar navlinks={subServicesSalesNavs} />
				<OutletContainer>
					<div className="px-6 py-1 ">
						<Outlet />
					</div>
				</OutletContainer>
			</LayoutContainer>
		</div>
	);
}

export default AllServiceSales;
