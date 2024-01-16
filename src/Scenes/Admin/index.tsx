//jshint esversion:9
import { Outlet, Navigate } from "react-router-dom";
import { SideBarNav } from "./SideBarNav";
import { UserLogs } from "../../assets/UserLogs";
import { useAuth } from "../../Context/AuthContext";
import { navitem } from "../../types";
import { HomeIcons } from "../../assets/HomeIcon";
import { UsersIcons } from "../../assets/UserIcon";
import TopBar from "../../shared/TopBar";

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
		<div className="grid grid-cols-8 w-100 font-nunito">
			<SideBarNav navlinks={navlinks} backgroundColor="bg-login-blue" />
			<div className="col-span-6 ">
				<TopBar />
				<div className="px-6 py-1">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
