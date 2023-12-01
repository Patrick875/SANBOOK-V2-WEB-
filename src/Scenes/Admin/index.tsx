import { Outlet } from "react-router-dom";
import { Logo } from "../../shared/Logo";
import { SideBarNav } from "./SideBarNav";

interface Props {}

export const AdminDashboard = (props: Props) => {
	return (
		<div className="flex w-full font-nunito">
			<div className="flex flex-col min-h-screen basis-1/5 bg-login-blue">
				<div className="p-4 basis-1/8">
					<Logo textColor="text-primary-white" />
				</div>
				<SideBarNav />
			</div>
			<div className="basis-4/5">
				<div className="flex justify-between px-6 py-3 text-black bg-top-bar ">
					<p className="text-sm font-bold">User Management</p>
					<div>user</div>
				</div>
				<div className="px-6 py-1">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
