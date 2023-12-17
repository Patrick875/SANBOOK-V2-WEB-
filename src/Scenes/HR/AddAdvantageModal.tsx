import { Modal } from "flowbite-react";
import { modalProps } from "../../types";
import { useForm } from "react-hook-form";
import instance from "../../API";

interface addAdvantage extends modalProps {
	setFormSubmitted: () => void;
	formSubmitted: boolean;
}

const AddAdvantageModal = ({
	show,
	setShow,
	setFormSubmitted,
	formSubmitted,
}: addAdvantage) => {
	const { register, handleSubmit } = useForm();
	const createAdvantage = async (data) => {
		console.log(data);
		await instance
			.post("system/hr/advs", data)
			.then((res) => {
				console.log(res);
				setFormSubmitted(!formSubmitted);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<Modal
			dismissible
			position="top-center"
			show={show}
			onClose={() => setShow(false)}>
			<Modal.Body className="p-8 bg-top-bar ">
				<div className="w-3/5 p-8 mx-auto">
					<form
						onSubmit={handleSubmit(createAdvantage)}
						className="p-6 bg-white rounded-md">
						<p className="text-xs font-medium text-center">
							Add New Salary Advantage
						</p>
						<div className="w-full">
							<label className="block py-2 text-xs font-medium">Name</label>
							<input
								placeholder=""
								className="w-full bg-gray-200 rounded-sm placeholder:ps-3 placeholder:text-xs placeholder:font-bold"
								{...register("name")}
							/>
						</div>
						<div className="w-full">
							<label className="block py-2 text-xs font-medium">
								Percentage
							</label>
							<input
								placeholder=""
								type="number"
								min={0}
								max={100}
								step="any"
								className="w-full bg-gray-200 rounded-sm placeholder:ps-3 placeholder:text-xs placeholder:font-bold"
								{...register("amount")}
							/>
						</div>
						<div className="w-full">
							<label className="block py-2 text-xs font-medium">Amount</label>
							<input
								placeholder=""
								type="number"
								step="any"
								className="w-full bg-gray-200 rounded-sm placeholder:ps-3 placeholder:text-xs placeholder:font-bold"
								{...register("amount")}
							/>
						</div>

						<div className="flex justify-end w-full mt-4">
							<button
								type="submit"
								className="px-6 py-1 text-xs font-medium text-white rounded-sm create bg-hr-side">
								Submit
							</button>
						</div>
					</form>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default AddAdvantageModal;
