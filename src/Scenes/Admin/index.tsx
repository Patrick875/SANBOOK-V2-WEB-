//jshint esversion:9
import { Outlet, Navigate } from "react-router-dom";
import { SideBarNav } from "./SideBarNav";
import { UserLogs } from "../../assets/UserLogs";
import { useAuth } from "../../Context/AuthContext";
import { navitem } from "../../types";
import { HomeIcons } from "../../assets/HomeIcon";
import { UsersIcons } from "../../assets/UserIcon";
import TopBar from "../../shared/TopBar";
import LayoutContainer from "../../shared/LayoutContainer";
import OutletContainer from "../../shared/OutletContainer";

const navlinks: navitem[] = [
	{
		page: "Dashboard",
		link: "",
		icon: <HomeIcons />,
		location: "admin",
	},
	{
		page: "Users",
		link: "users",
		icon: <UsersIcons />,
		location: "users",
	},
	{
		page: "User logs",
		link: "logs",
		icon: <UserLogs />,
		location: "logs",
	},
];

export const AdminDashboard = () => {
	const { user, isAuth } = useAuth();

	return !isAuth || !user === null ? (
		<Navigate to="/" />
	) : (
		<LayoutContainer>
			<SideBarNav navlinks={navlinks} backgroundColor="bg-login-blue" />
			<OutletContainer>
				<TopBar />
				<div className="px-6 py-1">
					<Outlet />
				</div>
			</OutletContainer>
		</LayoutContainer>
	);
};
