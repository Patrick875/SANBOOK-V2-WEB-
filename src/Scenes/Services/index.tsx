import { Outlet } from "react-router-dom";
import LayoutContainer from "../../shared/LayoutContainer";
import OutletContainer from "../../shared/OutletContainer";
import ReceptionTopBar from "../Reception/ReceptionTopBar";
import { navitem } from "../../types";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiHandCoinsLight } from "react-icons/pi";
import { LiaCoinsSolid, LiaWarehouseSolid } from "react-icons/lia";

const ServicesPage = () => {
	const navlinks: navitem[] = [
		{
			page: "Dashboard",
			link: "",
			icon: <LuLayoutDashboard />,
			location: "",
		},
		{
			page: "Services",
			link: "services",
			icon: <PiHandCoinsLight />,
			location: "services",
		},
		{
			page: "Sales",
			link: "sales",
			icon: <LiaCoinsSolid />,
			location: "sales",
		},
		{
			page: "Stock",
			link: "stock",
			icon: <LiaWarehouseSolid />,
			location: "stock",
		},
	];
	return (
		<div>
			<ReceptionTopBar navlinks={navlinks} />
			<LayoutContainer>
				<OutletContainer>
					<div className="py-1 ">
						<Outlet />
					</div>
				</OutletContainer>
			</LayoutContainer>
		</div>
	);
};

export default ServicesPage;
