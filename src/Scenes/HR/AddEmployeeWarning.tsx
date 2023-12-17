import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoSendOutline } from "react-icons/io5";
import { useOutletContext } from "react-router-dom";
import instance from "../../API";

interface Props {}
interface apistate {
	loading: boolean;
	success: boolean;
}

interface error {
	status: boolean;
	message: string;
}
const AddEmployeeWarning = (props: Props) => {
	const { employee } = useOutletContext();
	const [apiState, setApiState] = useState<apistate>({
		loading: false,
		success: false,
	});
	const [error, setError] = useState<error | null>(null);
	const { register, handleSubmit, reset } = useForm();
	const handleOnFocus = () => {
		setApiState({ loading: false, success: false });
		setError(null);
	};
	const createWarning = async (data) => {
		setApiState({ ...apiState, loading: true });
		const warning = {
			...data,
			employeeId: employee.id,
			issuedon: new Date().toLocaleDateString("fr-FR"),
		};

		await instance
			.post("/hr/warnings", warning)
			.then((res) => {
				console.log(res);
				setApiState({ ...apiState, success: true });
				reset();
			})
			.catch((err) => {
				console.log(err);
				setError({
					status: err.response.data.status,
					message: err.response.data.message,
				});
				console.log(apiState);
			})
			.finally(() => {
				setApiState({ ...apiState, loading: false });
				reset();
			});
	};

	return (
		<div className="w-5/6 p-8 mx-auto bg-white">
			<p className="text-xs font-bold text-center ">
				Warning to {employee && employee.fullname}
			</p>
			<form className="w-5/6 mx-auto" onSubmit={handleSubmit(createWarning)}>
				<div className="w-full">
					<label className="block py-2 text-xs font-medium">Subject</label>
					<input
						placeholder="subject"
						required
						onFocus={handleOnFocus}
						className=" bg-[#F5F5F5] rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
						{...register("title")}
					/>
				</div>
				<div className="w-full py-2">
					<label className="block py-2 text-xs font-medium">CC</label>
					<input
						placeholder=""
						type="email"
						className=" bg-[#F5F5F5] rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
						{...register("cc")}
					/>
				</div>
				<div className="w-full">
					<textarea
						required
						onFocus={handleOnFocus}
						placeholder="details"
						rows={8}
						cols={12}
						className=" bg-[#F5F5F5] rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
						{...register("description")}
					/>
				</div>
				<div className="flex justify-end w-full">
					<button
						type="submit"
						className="flex items-center gap-4 px-4 py-1 text-xs text-white rounded-sm bg-emerald-900">
						<p>Send</p>
						<IoSendOutline className="w-3 h-3 text-white -rotate-45" />
					</button>
				</div>
			</form>
			{apiState.success && (
				<div className="flex justify-center w-full mt-2 bg-[#D4E7DB] border border-teal-800">
					<p className="text-center text-teal-800">Warning Submitted</p>
				</div>
			)}
			{error && error.status && (
				<div className="flex items-center justify-center w-4/5 p-2 mx-auto mt-2 bg-pink-100 border border-pink-700 ">
					<p className="text-xs font-medium text-center text-pink-800 capitalize align-middle ">
						{error.message}
					</p>
				</div>
			)}
		</div>
	);
};

export default AddEmployeeWarning;
