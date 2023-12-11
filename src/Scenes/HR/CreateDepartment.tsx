import React, { useState } from "react";
import instance from "../../API";
import { BackButton } from "../../shared/BackButton";
import { useForm } from "react-hook-form";
import { CheckIcon } from "@heroicons/react/24/outline";
import { HashLoader } from "react-spinners";

interface Props {}

export const CreateDepartment = (props: Props) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<boolean>(false);
	const { register, handleSubmit, reset } = useForm();
	const createDepartment = async (data) => {
		setLoading(true);
		await instance
			.post("/hr/departments", data)
			.then(() => {
				setSuccess(true);
				reset();
			})
			.catch((err) => {
				setError(err.response.data.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const removeMessages = () => {
		setSuccess(false);
		setError(null);
	};
	return (
		<div className="">
			<p className="text-xs font-bold text-center">Create department</p>
			<BackButton />
			<div className="flex w-full ">
				<form
					className="p-10 mx-auto bg-white basis-3/5"
					onSubmit={handleSubmit(createDepartment)}>
					<div className="w-full">
						<label className="block py-2 text-xs font-medium">Name</label>
						<input
							onFocus={removeMessages}
							placeholder="Name"
							className=" bg-[#F5F5F5]  rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
							{...register("name")}
						/>
					</div>
					<div className="w-full">
						<label className="block py-2 text-xs font-medium">
							Description
						</label>
						<textarea
							onFocus={removeMessages}
							placeholder="description"
							rows={8}
							cols={8}
							className=" bg-[#F5F5F5] text-xs rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
							{...register("description")}
						/>
					</div>
					<button
						className={`flex items-center gap-2 px-4 py-1 mt-2 text-xs  ${
							loading
								? " bg-sky-700 text-login-blue"
								: " bg-teal-900 text-primary-white"
						}   `}>
						{loading ? (
							<HashLoader color="#0C4981" loading={loading} size={15} />
						) : (
							<React.Fragment>
								Submit
								<CheckIcon className="w-4 h-4" />
							</React.Fragment>
						)}
					</button>
					{error && (
						<div className="flex justify-center w-full mt-2 bg-pink-200 ">
							{error && (
								<p className="text-center bg-pink-200 border border-pink-900">
									{error}
								</p>
							)}
						</div>
					)}
					{success && (
						<div className="flex justify-center w-full mt-2 bg-[#D4E7DB] border border-teal-800">
							{success && (
								<p className="text-center text-teal-800">
									Department created SuccessFull
								</p>
							)}
						</div>
					)}
				</form>
			</div>
		</div>
	);
};
