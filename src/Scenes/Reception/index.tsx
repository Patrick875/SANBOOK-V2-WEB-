import { Outlet } from "react-router-dom";
import { TbPigMoney } from "react-icons/tb";
import { BsCalendar2Check, BsSuitcase2 } from "react-icons/bs";
import { IoCalendarOutline, IoPeopleCircle } from "react-icons/io5";
import { MdOutlineBedroomChild } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { GrServices } from "react-icons/gr";
import LayoutContainer from "../../shared/LayoutContainer";
import OutletContainer from "../../shared/OutletContainer";
import ReceptionTopBar from "./ReceptionTopBar";
import { navitem } from "../../types";

const ReceptionPage = () => {
	const navlinks: navitem[] = [
		{
			page: "Dashboard",
			link: "",
			icon: <LuLayoutDashboard />,
			location: "",
		},
		{
			page: "Bookings",
			link: "bookings",
			icon: <BsCalendar2Check />,
			location: "bookings",
		},
		{
			page: "Calendar",
			link: "calendar",
			icon: <IoCalendarOutline />,
			location: "calendar",
		},
		{
			page: "Events",
			link: "events",
			icon: <IoPeopleCircle />,
			location: "events",
		},
		{
			page: "Rooms",
			link: "rooms",
			icon: <MdOutlineBedroomChild />,
			location: "rooms",
		},
		{
			page: "Services",
			link: "services",
			icon: <GrServices />,
			location: "services",
		},
		{
			page: "Accounting",
			link: "accounting",
			icon: <TbPigMoney />,
			location: "accounting",
		},
		{
			page: "Guests",
			link: "guests",
			icon: <BsSuitcase2 />,
			location: "guests",
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

export default ReceptionPage;
