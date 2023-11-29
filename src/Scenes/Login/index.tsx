import { Link } from "react-router-dom";
import { Logo } from "../../shared/Logo";
import loginArt from "../../assets/loginart.svg";

interface Props {}

export const Login = (props: Props) => {
	return (
		<div className="m-0 p-0 w-full min-h-screen flex ">
			<div className="basis-1/2 p-6 flex flex-col">
				<div className="basis-5/6">
					<div className="flex justify-between">
						<Logo textColor="text-gray-900" />
						<p className="px-4 py-1  text-login-blue"> Login </p>
					</div>
					<div className="flex justify-center">
						<img
							src={loginArt}
							alt="computer login"
							className="block w-40 h-40"
						/>
					</div>

					<form className="w-4/5 mx-auto ">
						<input
							className=" placeholder:text-xs placeholder:italic font-light w-full my-1 px-3 py-1 border border-gray-300 rounded-md focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
							type="text"
							placeholder="Email/Username"
						/>
						<input
							className=" placeholder:text-xs placeholder:italic font-light w-full my-1  px-3 py-1 border border-gray-300 rounded-md focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
							type="password"
							placeholder="Password"
						/>
						<button className="mt-3 rounded-md py-2 text-sm text-primary-white bg-login-blue font-semibold text-center w-full">
							Login
						</button>
					</form>
					<p className="mt-3 text-sm text-center">
						Forgot your password ?{" "}
						<span className="text-login-blue font-medium">
							<Link to="/password-reset">Reset password</Link>
						</span>
					</p>
				</div>
				<div className="basis-1/6 flex flex-col justify-end">
					<p className=" text-xs text-gray-500">
						<Link to="#">Privacy policy</Link> and{" "}
						<Link to="#">Terms of service</Link>{" "}
					</p>
				</div>
			</div>
			<div className="basis-1/2 bg-login-blue">k</div>
		</div>
	);
};
