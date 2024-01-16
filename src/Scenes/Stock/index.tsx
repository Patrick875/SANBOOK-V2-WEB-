import { Outlet } from "react-router-dom";
import { SideBarNav } from "../Admin/SideBarNav";
import { HomeIcons } from "../../assets/HomeIcon";
import { navitem } from "../../types";
import TopBar from "../../shared/TopBar";

const navlinks: navitem[] = [
	{
		page: "Dashboard",
		link: "",
		icon: <HomeIcons />,
		location: "stock",
	},
	{
		page: "Requests",
		link: "requests",
		icon: <HomeIcons />,
		location: "requests",
	},
	{
		page: "Stock",
		link: "storage",
		icon: <HomeIcons />,
		location: "storage",
	},
	{
		page: "Purchase orders",
		link: "purchase-orders",
		icon: <HomeIcons />,
		location: "purchase-orders",
	},
	{
		page: "Receive Vauchers",
		link: "receive-vauchers",
		icon: <HomeIcons />,
		location: "receive-vauchers",
	},
	{
		page: "Suppliers",
		link: "suppliers",
		icon: <HomeIcons />,
		location: "suppliers",
	},
	{
		page: "Costing Centers",
		link: "costing-centers",
		icon: <HomeIcons />,
		location: "costing-centers",
	},
	{
		page: "Stores",
		link: "stores",
		icon: <HomeIcons />,
		location: "stores",
	},
	{
		page: "Item Categories",
		link: "item-categories",
		icon: <HomeIcons />,
		location: "item-categories",
	},
	{
		page: "Stock Items",
		link: "stock-items",
		icon: <HomeIcons />,
		location: "stock-items",
	},
	{
		page: "Reports",
		link: "reports",
		icon: <HomeIcons />,
		location: "reports",
	},
];

const StockPage = () => {
	return (
		<div className="grid grid-cols-8 w-100 font-nunito">
			<SideBarNav navlinks={navlinks} backgroundColor="bg-stock-side" />
			<div className="col-span-6 bg-tab-content">
				<TopBar />
				<div className="px-6 py-1 ">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default StockPage;
