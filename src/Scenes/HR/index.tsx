//jshint esversion:9
import { Outlet, Navigate, Link } from "react-router-dom";
import { useState, ReactNode } from "react";
import { UserLogs } from "../../assets/UserLogs";
import UserProfileIcon from "../../assets/UserProfileIcon";
import { useAuth } from "../../Context/AuthContext";
import { IoIosArrowDown } from "react-icons/io";
import { SideBarNav } from "../Admin/SideBarNav";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosPeople } from "react-icons/io";
import { LiaFileContractSolid } from "react-icons/lia";
import { FcMoneyTransfer, FcDepartment } from "react-icons/fc";
import { IoIdCardOutline } from "react-icons/io5";
import LogoutIcon from "../../assets/LogoutIcon";

interface dropdownItem {
	icon?: ReactNode;
	link: string;
	text: string;
}
const DropdownItem = ({ text, icon, link }: dropdownItem) => {
	return (
		<div className="flex items-center gap-3 p-2 text-xs font-light ">
			{icon}
			<Link to={link}>{text}</Link>
		</div>
	);
};

const TopNavDropdown = () => {
	const { user, logoutUser } = useAuth();
	const [profileOn, setProfileOn] = useState(false);

	const dropdownItems: dropdownItem[] = [
		{
			text: "Personal logs",
			link: "/mylogs",
			icon: <UserLogs />,
		},
		{
			text: "Profile",
			link: "/my-profile",
			icon: <UserProfileIcon />,
		},
	];

	return (
		<div
			className="relative w-3/12 cursor-pointer"
			onClick={() => {
				setProfileOn(!profileOn);
			}}>
			<div className="flex items-center gap-2 px-4 py-1 bg-white rounded-full ">
				<div className="flex items-center justify-center w-6 h-6 text-white rounded-full bg-login-blue">
					<UserProfileIcon />
				</div>
				<div>
					<p className="text-sm font-medium capitalize">
						{user && user.username}
					</p>
					<p className="text-xs ">{user && user.role}</p>
				</div>
				<IoIosArrowDown
					className={` transition-all duration-300 ease-in-out w-3 h-3 ${
						profileOn ? " rotate-180" : ""
					}`}
				/>
			</div>
			<div
				className={`${profileOn ? "absolute" : "hidden"} w-full px-4 bg-white`}>
				{dropdownItems.map(({ icon, text, link }) => (
					<DropdownItem
						key={crypto.randomUUID()}
						icon={icon}
						text={text}
						link={link}
					/>
				))}
				<div className="flex items-center gap-3 p-2 text-xs font-light ">
					<LogoutIcon />
					<p onClick={logoutUser} className="cursor-pointer">
						Logout
					</p>
				</div>
			</div>
		</div>
	);
};
const navlinks: navitem[] = [
	{
		page: "Dashboard",
		link: "",
		icon: <LuLayoutDashboard className="w-4 h-4" />,
		location: "user",
	},
	{
		page: "Employees",
		link: "employees",
		icon: <IoIosPeople />,
		location: "employees",
	},
	{
		page: "Contracts",
		link: "contracts",
		icon: <LiaFileContractSolid />,
		location: "contracts",
	},
	{
		page: "Payroll",
		link: "payroll",
		icon: <FcMoneyTransfer />,
		location: "payroll",
	},
	{
		page: "Departments",
		link: "departments",
		icon: <FcDepartment />,
		location: "departments",
	},
	{
		page: "Positions",
		link: "positions",
		icon: <IoIdCardOutline />,
		location: "positions",
	},
];

export const HRDashboard = () => {
	const { user, isAuth } = useAuth();

	return !isAuth || !user === null ? (
		<Navigate to="/" />
	) : (
		<div className="grid grid-cols-8 w-100 font-nunito bg-[#F5F5F5]">
			<SideBarNav navlinks={navlinks} backgroundColor="bg-hr-side" />
			<div className="col-span-6 ">
				<div className="flex justify-between px-6 py-3 text-black bg-top-bar ">
					<p className="text-sm font-bold">Human Resources</p>
					<TopNavDropdown />
				</div>
				<div className="px-6 py-1 ">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
