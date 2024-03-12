import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { sideBarSizeSelector } from "../../../Redux/sideBarSlice";
import { NavLink } from "react-router-dom";
import { receptionSideNavs } from "../types";
interface SideBarProps {
	navlinks: receptionSideNavs[];
}

const SideBar = ({ navlinks }: SideBarProps) => {
	const isFull = useSelector(sideBarSizeSelector);
	// const dispatch = useDispatch();

	return (
		<motion.aside
			animate={{ width: isFull ? "24vw" : "60px" }}
			transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
			className={`sticky top-0 duration-500 transition-all self-start min-h-screen bg-white `}>
			<div className="flex flex-col ">
				<div className="w-full h-5/6">
					{navlinks.map((el) => (
						<NavLink
							key={el.tab}
							to={el.link}
							className="flex items-center justify-between p-4">
							{el.tab}
							<p>{el.data}</p>
						</NavLink>
					))}
				</div>
			</div>
		</motion.aside>
	);
};

export default SideBar;

// <div className="relative">
// 	<div
// 		onClick={() => dispatch(toggleSideBar())}
// 		className={`${isFull && "absolute"}  ${
// 			!isFull && " w-3/4 mx-auto"
// 		} flex items-center  justify-center bg-white rounded cursor-pointer ${
// 			isFull && " -right-3 "
// 		} `}>
// 		{isFull ? (
// 			<ArrowLeftCircleIcon className="block w-8 h-8 " />
// 		) : (
// 			<ArrowRightCircleIcon className="block w-8 h-8 " />
// 		)}
// 	</div>
// </div>;
