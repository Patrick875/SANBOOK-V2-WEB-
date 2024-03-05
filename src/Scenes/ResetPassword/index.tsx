import { Link, useNavigate } from "react-router-dom";
import Lock from "../../assets/Lock.svg";
import { Logo } from "../../shared/Logo";
import { motion } from "framer-motion";
import instance from "../../API";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { error } from "../../types";
import { HashLoader } from "react-spinners";

export const ResetPassword = () => {
	const [success, setSuccess] = useState<boolean>(false);
	const [error, setError] = useState<error | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const { register, handleSubmit, reset } = useForm();
	const navigate = useNavigate();
	const clearError = () => {
		setError(null);
		setSuccess(null);
	};
	const resetPassword = async (data: loginData) => {
		setLoading(true);
		await instance
			.post("/reset", data)
			.then((res) => {
				setSuccess(true);
				console.log("res", res);
				navigate(`/`);
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
			className="basis-5/6"
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5 }}>
			<div className="flex justify-between">
				<Logo textColor="text-gray-900" isMinifiable={false} />
				<p className="px-4 py-1 text-login-blue"> Reset Password </p>
			</div>
			<div className="flex justify-center">
				<img src={Lock} alt="computer login" className="block w-40 h-40" />
			</div>

			<form onSubmit={handleSubmit(resetPassword)} className="w-4/5 mx-auto ">
				<input
					className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="text"
					placeholder="Email"
					onFocus={clearError}
					{...register("user")}
				/>

				<button
					disabled={loading}
					className={`  w-full py-2 mt-3 text-sm font-semibold text-center rounded-md ${
						!loading
							? " text-primary-white bg-login-blue"
							: " text-login-blue bg-[#E4F1FE]"
					}`}>
					{!loading ? (
						"Reset Password"
					) : (
						<HashLoader color="#0C4981" loading={loading} size={15} />
					)}
				</button>
				<p className="mt-3 text-sm font-medium text-login-blue">
					<Link to="/">Login</Link>
				</p>
			</form>
		</motion.div>
	);
};
