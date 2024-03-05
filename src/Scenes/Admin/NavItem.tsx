import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { sideBarSizeSelector } from "../../Redux/sideBarSlice";
import { ReactNode } from "react";

interface Props {
	page: string;
	link: string;
	location: string;
	defaultColor: string;
	children?: ReactNode;
}

export const NavItem = ({
	page,
	link,
	location,
	defaultColor,
	children,
}: Props) => {
	const { pathname } = useLocation();
	const url = pathname.split("/");
	const isFull = useSelector(sideBarSizeSelector);

	return (
		<NavLink
			to={link}
			className={({ isActive }) =>
				`flex text-sm items-center   ${
					isFull ? "gap-3" : "justify-center"
				} p-2 font-medium ${
					isActive && location === url[2]
						? `text-${defaultColor} bg-primary-white rounded-tr-[6px] rounded-bl-[6px]`
						: " text-primary-white hover:bg-indigo-500 duration-300 ease-in-out delay-50"
				} `
			}>
			{children}

			{isFull && page}
		</NavLink>
	);
};
