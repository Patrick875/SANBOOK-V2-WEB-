import { useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterUserIcon } from "../../assets/RegisterUserIcon";
import { BackButton } from "../../shared/BackButton";
import instance from "../../API";
import { HashLoader } from "react-spinners";

interface Props {}

export const RegisterUser = (props: Props) => {
	const { register, handleSubmit, reset } = useForm();
	const [success, setSuccess] = useState<boolean | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const disablePrevStatus = (): void => {
		setError(null);
		setSuccess(null);
	};
	const registerUser = async (data) => {
		setSuccess(false);
		setLoading(true);
		await instance
			.post("/signup", { ...data })
			.then((res) => {
				if (res.data && res.data.data) {
					setSuccess(true);
				}
				reset();
			})
			.catch((err) => {
				console.log(err);
				setError(err.response.data.message);
				setSuccess(false);
				reset();
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className="font-nunito">
			<BackButton />
			<p className="text-sm font-bold text-center">Register new user</p>
			<form onSubmit={handleSubmit(registerUser)}>
				<div className="grid grid-cols-2">
					<div className="py-2">
						<label className="block pb-2 text-xs font-bold ">User Name</label>
						<input
							type="text"
							placeholder="userName"
							className="w-5/6 py-1 border border-gray-500 rounded-md placeholder:text-xs placeholder:ps-2"
							{...register("username")}
							onFocus={disablePrevStatus}
						/>
					</div>
					<div className="py-2">
						<label className="block pb-2 text-xs font-bold ">Email</label>
						<input
							type="email"
							placeholder="email"
							className="w-5/6 py-1 border border-gray-500 rounded-md placeholder:text-xs placeholder:ps-2"
							{...register("email")}
							onFocus={disablePrevStatus}
						/>
					</div>
					<div className="py-2">
						<label className="block pb-2 text-xs font-bold ">Employee Id</label>
						<input
							type="text"
							placeholder="employeeId"
							className="w-5/6 py-1 border border-gray-500 rounded-md placeholder:text-xs placeholder:ps-2"
							{...register("employeeId")}
							onFocus={disablePrevStatus}
						/>
					</div>
				</div>
				<div className="flex justify-center w-full mt-4">
					<button
						disabled={loading}
						className={`  w-1/8 mx-auto px-8 py-1 mt-3 text-sm font-semibold text-center rounded-sm ${
							!loading
								? " text-primary-white bg-login-blue"
								: " text-login-blue bg-[#E4F1FE]"
						}`}>
						{!loading ? (
							<div className="flex items-center gap-3">
								Register
								<RegisterUserIcon />
							</div>
						) : (
							<HashLoader color="#0C4981" loading={loading} size={15} />
						)}
					</button>
				</div>
			</form>
			{error && (
				<div className="flex items-center justify-center w-2/5 px-4 mx-auto mt-2 text-pink-800 bg-pink-100 border border-pink-500 rounded-sm">
					<p className="text-sm font-medium text-center ">
						Error registering user
					</p>
				</div>
			)}
			{success && (
				<div className="flex items-center justify-center w-2/5 mx-auto mt-2 text-teal-800 border border-teal-500 rounded-sm ">
					<p className="text-sm font-medium text-center text-teal-800">
						User registered
					</p>
				</div>
			)}
		</div>
	);
};
