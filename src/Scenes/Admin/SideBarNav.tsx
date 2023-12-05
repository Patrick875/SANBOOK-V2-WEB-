import { NavItem } from "./NavItem";
import { UsersIcons } from "../../assets/UserIcon";
import { UserLogs } from "../../assets/UserLogs";
import { HomeIcons } from "../../assets/HomeIcon";

export const navlinks: navitem[] = [
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

export const SideBarNav = (props: Props) => {
	return (
		<div className="w-full">
			{navlinks.map((el) => (
				<NavItem
					key={crypto.randomUUID()}
					page={el.page}
					link={el.link}
					icon={el.icon}
					iconActive={el.iconActive}
					alt={el.alt}
					location={el.location}>
					{el.icon}
				</NavItem>
			))}
		</div>
	);
};
