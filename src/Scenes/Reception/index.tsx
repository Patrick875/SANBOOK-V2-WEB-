import { Outlet, useLocation } from "react-router-dom";
import { SideBarNav } from "../Admin/SideBarNav";
import { IoIosRestaurant } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { LiaWarehouseSolid, LiaNotesMedicalSolid } from "react-icons/lia";
import { CgNotes, CgBox } from "react-icons/cg";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { GiMeat } from "react-icons/gi";
import { CiSquareQuestion } from "react-icons/ci";
import { MdOutlineCategory, MdDeliveryDining } from "react-icons/md";

import { navitem } from "../../types";
import LayoutContainer from "../../shared/LayoutContainer";
import OutletContainer from "../../shared/OutletContainer";
import ReceptionTopBar from "./ReceptionTopBar";

const navlinks: navitem[] = [
	{
		page: "Dashboard",
		link: "",
		icon: <LuLayoutDashboard />,
		location: "stock",
	},
	{
		page: "Requests",
		link: "requests",
		icon: <CiSquareQuestion />,
		location: "requests",
	},
	{
		page: "Stock",
		link: "storage",
		icon: <LiaWarehouseSolid />,
		location: "storage",
	},
	{
		page: "Purchase orders",
		link: "purchase-orders",
		icon: <CgNotes />,
		location: "purchase-orders",
	},
	{
		page: "Receive Vauchers",
		link: "receive-vauchers",
		icon: <LiaNotesMedicalSolid />,
		location: "receive-vauchers",
	},
	{
		page: "Suppliers",
		link: "suppliers",
		icon: <MdDeliveryDining />,
		location: "suppliers",
	},
	{
		page: "Costing Centers",
		link: "costing-centers",
		icon: <IoIosRestaurant />,
		location: "costing-centers",
	},
	{
		page: "Stores",
		link: "stores",
		icon: <CgBox />,
		location: "stores",
	},
	{
		page: "Item Categories",
		link: "item-categories",
		icon: <MdOutlineCategory />,
		location: "item-categories",
	},
	{
		page: "Stock Items",
		link: "stock-items",
		icon: <GiMeat />,
		location: "stock-items",
	},
	{
		page: "Reports",
		link: "reports",
		icon: <HiOutlineDocumentReport />,
		location: "reports",
	},
];

const ReceptionPage = () => {
	return (
		<div>
			<ReceptionTopBar />
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
