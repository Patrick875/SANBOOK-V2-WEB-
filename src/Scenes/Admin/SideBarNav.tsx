import {
	ArrowLeftCircleIcon,
	ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { Logo } from "../../shared/Logo";
import { navitem } from "../../types";
import { NavItem } from "./NavItem";
import { useDispatch, useSelector } from "react-redux";
import { sideBarSizeSelector, toggleSideBar } from "../../Redux/sideBarSlice";
import { motion } from "framer-motion";
interface SideBarNavProps {
	navlinks: navitem[];
	backgroundColor: string;
}

export const SideBarNav = ({ navlinks, backgroundColor }: SideBarNavProps) => {
	const isFull = useSelector(sideBarSizeSelector);
	const dispatch = useDispatch();
	console.log("is size", isFull);

	return (
		<motion.aside
			animate={{ width: isFull ? "24vw" : "60px" }}
			transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
			className={`sticky top-0 duration-500 transition-all self-start min-h-screen  ${backgroundColor} `}>
			<div className="flex flex-col ">
				<div className="flex items-center p-4 basis-1/8">
					<Logo textColor="text-primary-white" />
				</div>
				<div className="w-full h-5/6">
					{navlinks.map((el) => (
						<NavItem
							key={crypto.randomUUID()}
							page={el.page}
							link={el.link}
							icon={el.icon}
							defaultColor={backgroundColor}
							iconActive={el.iconActive}
							alt={el.alt}
							location={el.location}>
							{el.icon}
						</NavItem>
					))}
				</div>
				<div className="relative">
					<div
						onClick={() => dispatch(toggleSideBar())}
						className={`${isFull && "absolute"}  ${
							!isFull && " w-3/4 mx-auto"
						} flex items-center  justify-center bg-white rounded cursor-pointer ${
							isFull && " -right-3 "
						} `}>
						{isFull ? (
							<ArrowLeftCircleIcon className="block w-8 h-8 " />
						) : (
							<ArrowRightCircleIcon className="block w-8 h-8 " />
						)}
					</div>
				</div>
			</div>
		</motion.aside>
	);
};
