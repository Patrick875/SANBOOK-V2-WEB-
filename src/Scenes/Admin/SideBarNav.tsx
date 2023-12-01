import { NavItem } from "./NavItem";
import { UsersIcons } from "../../assets/UserIcon";
import { UserLogs } from "../../assets/UserLogs";

export const navlinks: navitem[] = [
	{
		page: "Users",
		link: "",
		icon: <UsersIcons />,
		location: "admin",
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
		<div>
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
