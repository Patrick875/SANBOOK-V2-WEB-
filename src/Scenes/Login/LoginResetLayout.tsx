import { Link, Outlet } from "react-router-dom";
import ReceptionGraphics from "./../../assets/ReceptionGraphics.svg";

interface Props {}

export const LoginResetLayout = (props: Props) => {
	return (
		<div className="relative flex w-full min-h-screen p-0 m-0 font-nunito">
			<div className="flex flex-col p-6 basis-1/2">
				<Outlet />
				<div className="flex flex-col justify-end basis-1/6">
					<p className="text-xs text-gray-500 ">
						<Link to="#">Privacy policy</Link> and{" "}
						<Link to="#">Terms of service</Link>{" "}
					</p>
				</div>
			</div>
			<div className="relative flex flex-col p-8 basis-1/2 bg-login-blue">
				<div className="basis-2/3">
					<div className="p-8">
						<img src={ReceptionGraphics} alt="" className="w-25 h-25" />
					</div>
				</div>
				<div className="basis-1/3 text-primary-white">
					<h1 className="text-lg font-medium ">SANBOOK</h1>
					<p className=" text-md font-loginDes">
						The one tool you need to manage all your Hotel services.
					</p>
				</div>
			</div>
		</div>
	);
};
