import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { sideBarSizeSelector } from "../../Redux/sideBarSlice";
import { motion } from "framer-motion";

interface Props {
	page: string;
	link: string;
	location: string;
	defaultColor: string;
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
				`flex text-sm items-center  transition-all duration-300 delay-100 ${
					isFull ? "gap-3" : "justify-center"
				} p-2 font-medium ${
					isActive && location === url[url.length - 1]
						? `text-${defaultColor} bg-primary-white rounded-tr-[6px] rounded-bl-[6px]`
						: " text-primary-white hover:bg-indigo-500 duration-300 ease-in-out delay-50"
				} `
			}>
			{children}
			<motion.p
				animate={{ display: isFull ? "block" : "hidden" }}
				transition={{ delay: 0.6 }}>
				{isFull && page}
			</motion.p>
		</NavLink>
	);
};
