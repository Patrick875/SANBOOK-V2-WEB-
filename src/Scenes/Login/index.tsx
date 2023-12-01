import { Link } from "react-router-dom";
import { Logo } from "../../shared/Logo";
import loginArt from "../../assets/loginart.svg";
import { motion } from "framer-motion";

interface Props {}

export const Login = (props: Props) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: -50, transition: { duration: 0.5 } }}
			animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
			className="basis-5/6">
			<div className="flex justify-between">
				<Logo textColor="text-gray-900" />
				<p className="px-4 py-1 text-login-blue"> Login </p>
			</div>
			<div className="flex justify-center">
				<img src={loginArt} alt="computer login" className="block w-40 h-40" />
			</div>

			<form className="w-4/5 mx-auto ">
				<input
					className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="text"
					placeholder="Email/Username"
				/>
				<input
					className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="password"
					placeholder="Password"
				/>
				<button className="w-full py-2 mt-3 text-sm font-semibold text-center rounded-md text-primary-white bg-login-blue">
					Login
				</button>
			</form>
			<p className="mt-3 text-sm text-center">
				Forgot your password ?{" "}
				<span className="font-medium text-login-blue">
					<Link to="/reset-password">Reset password</Link>
				</span>
			</p>
		</motion.div>
	);
};
