import { IoIosArrowDown } from "react-icons/io";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../shared/Logo";
import { navitem } from "../../types";
import { useAuth } from "../../Context/AuthContext";
import { UserLogs } from "../../assets/UserLogs";
import UserProfileIcon from "../../assets/UserProfileIcon";
import LogoutIcon from "../../assets/LogoutIcon";

interface topBarProps {
	navlinks: navitem[];
}

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
			link: "mylogs",
			icon: <UserLogs />,
		},
		{
			text: "Profile",
			link: "my-profile",
			icon: <UserProfileIcon />,
		},
	];

	return (
		<div
			className="relative w-3/12 cursor-pointer"
			onClick={() => {
				setProfileOn(!profileOn);
			}}>
			<div className="flex items-center justify-between px-4 py-1 bg-white rounded-full ">
				<div className="flex items-center justify-center w-6 h-6 text-white rounded-full bg-login-blue">
					<UserProfileIcon />
				</div>
				<div>
					<p className="text-xs font-bold capitalize">
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

const ReceptionTopBar = ({ navlinks }: topBarProps) => {
	return (
		<div className="grid w-full grid-cols-12 p-3 bg-topbar ">
			<div className="col-span-2">
				<Logo textColor="text-black" isMinifiable={false} />
			</div>
			<div className="flex justify-between col-span-10 px-4 ">
				{navlinks.map((el: navitem) => (
					<Link
						to={el.link}
						className="flex items-center gap-2 text-sm text-gray-800 ">
						{el.icon}
						{el.page}
					</Link>
				))}
			</div>
		</div>
	);
};

export default ReceptionTopBar;
