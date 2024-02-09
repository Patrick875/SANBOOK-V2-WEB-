import { useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterUserIcon } from "../../assets/RegisterUserIcon";
import { BackButton } from "../../shared/BackButton";
import instance from "../../API";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useFetchData } from "../../hooks/useFetchData";

export const RegisterUser = () => {
	const { register, handleSubmit, reset } = useForm();
	const [loading, setLoading] = useState<boolean>(false);
	const [employees] = useFetchData("/hr/employees");
	console.log("employees", employees);
	const newEmployees = employees
		? employees.filter((el) => el.User == null)
		: [];

	const registerUser = async (data) => {
		setLoading(true);
		await instance
			.post("/signup", { ...data })
			.then(() => {
				toast.success("User registered !!!");
				reset();
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.response.data.message);

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
			<form className="my-3" onSubmit={handleSubmit(registerUser)}>
				<div className="w-1/3 p-4 mx-auto bg-white">
					<div className="py-2">
						<label className="block pb-2 text-xs font-bold ">User Name</label>
						<input
							type="text"
							placeholder="username"
							className="w-full py-1 text-xs border border-gray-500 rounded-md placeholder:text-xs placeholder:ps-2"
							{...register("username")}
						/>
					</div>
					<div className="py-2">
						<label className="block pb-2 text-xs font-bold ">Email</label>
						<input
							type="email"
							placeholder="email"
							className="w-full py-1 text-xs border border-gray-500 rounded-md placeholder:text-xs placeholder:ps-2"
							{...register("email")}
						/>
					</div>
					<div className="py-2">
						<label className="block pb-2 text-xs font-bold ">Employee</label>
						<select
							className="w-full rounded-md bg-[#F5F5F5] px-3 py-1 text-xs bg-transparent border-2 border-gray-300 focus-border-1"
							{...register("employeeId")}>
							{newEmployees &&
								newEmployees.map((em) => (
									<option key={em.id} className="capiltalize" value={em.id}>
										{em.fullname}
									</option>
								))}
						</select>
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
		</div>
	);
};
