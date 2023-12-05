import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../shared/Logo";
import loginArt from "../../assets/loginart.svg";
import { motion } from "framer-motion";
import instance from "../../API";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import { HashLoader } from "react-spinners";

interface loginData {
	username: string;
	email: string;
}
interface error {
	status: boolean;
	message: string;
}

export const Login = (props: Props) => {
	const { loginUser } = useAuth();
	const [success, setSuccess] = useState<boolean>(false);
	const [error, setError] = useState<error | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const { register, handleSubmit, reset } = useForm();
	const navigate = useNavigate();
	const clearError = () => {
		setError(null);
	};
	const login = async (data: loginData) => {
		setLoading(true);
		await instance
			.post("/login", data)
			.then((res) => {
				setSuccess(true);
				loginUser({
					username: res.data.user.username,
					email: res.data.user.email,
					role: res.data.user.role,
				});
				navigate("/admin");
				reset();
			})
			.catch((err) => {
				console.log(err);
				setError({ status: true, message: err.response.data.message });
			})
			.finally(() => {
				setLoading(false);
			});
	};

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

			<form onSubmit={handleSubmit(login)} className="w-4/5 mx-auto ">
				<input
					className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="text"
					placeholder="Email/Username"
					{...register("username")}
					onFocus={clearError}
				/>
				<input
					className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="password"
					placeholder="Password"
					{...register("password")}
					onFocus={clearError}
				/>
				<button
					disabled={loading}
					className={`  w-full py-2 mt-3 text-sm font-semibold text-center rounded-md ${
						!loading
							? " text-primary-white bg-login-blue"
							: " text-login-blue bg-[#E4F1FE]"
					}`}>
					{!loading ? (
						"Login"
					) : (
						<HashLoader color="#0C4981" loading={loading} size={15} />
					)}
				</button>
			</form>
			<p className="mt-3 text-sm text-center">
				Forgot your password ?{" "}
				<span className="font-medium text-login-blue">
					<Link to="/reset-password">Reset password</Link>
				</span>
			</p>
			{error && error.status && (
				<div className="flex items-center justify-center w-4/5 p-2 mx-auto mt-2 bg-pink-100 border border-pink-700 ">
					<p className="text-xs font-medium text-center text-pink-800 capitalize align-middle ">
						{error.message}
					</p>
				</div>
			)}
		</motion.div>
	);
};
