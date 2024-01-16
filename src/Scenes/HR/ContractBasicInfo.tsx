import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import ContractSectionInfo from "./ContractSectionInfo";
import { createContractSelector, updateOtherFields } from "./contractSlice";
import { CheckIcon } from "@heroicons/react/24/outline";
import { contractStepProps } from "../../types";

const ContractBasicInfo = ({ updateStep, currentStep }: contractStepProps) => {
	const contractDetails = useAppSelector(createContractSelector);
	const dispatch = useAppDispatch();
	const { register, getValues } = useForm();
	const saveCurrentValues = () => {
		const current = getValues();
		console.log("current form data", current);
	};

	return (
		<>
			<div className="p-8 basis-2/4">
				<p className="py-1 font-bold ">Basic Information</p>
				<form>
					<p className="my-4 text-sm font-medium ">Contract Parties </p>
					<div className="w-full">
						<label className="block py-2 text-xs font-normal">
							Employee names
						</label>
						<input
							placeholder="Name"
							value={contractDetails.employee?.fullname}
							className=" bg-[#F5F5F5] rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-normal"
							{...register("employee")}
						/>
					</div>
					<div className="w-full">
						<label className="block py-2 text-xs font-normal">Employer </label>
						<input
							placeholder="Name"
							required
							className=" bg-[#F5F5F5] rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-normal"
							{...register("employer")}
						/>
					</div>

					<div>
						<p className="my-4 text-sm font-medium">
							Employee Position and duties
						</p>
						<div className="w-full">
							<label className="block py-2 text-xs font-normal">
								Department
							</label>
							<input
								placeholder=""
								required={true}
								value={contractDetails.employee?.Position.Department.name}
								className=" bg-[#F5F5F5] rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-normal"
								{...register("department")}
							/>
						</div>
						<div className="w-full">
							<label className="block py-2 text-xs font-normal">Position</label>
							<input
								placeholder="Name"
								value={contractDetails.employee?.Position.name}
								className=" bg-[#F5F5F5] rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-normal"
								{...register("position")}
							/>
						</div>
						<div className="w-full">
							<label className="block py-2 text-xs font-normal">Duties</label>
							<div className="grid grid-cols-3 grid-rows-2">
								{contractDetails.employee?.Position.duties.map((el) => (
									<div key={crypto.randomUUID()} className="flex gap-2 ">
										<CheckIcon className="w-4 h-4 text-teal-900 " />
										<p className="text-xs">{el}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</form>
				<div className="flex justify-end my-2">
					<button
						type="submit"
						onClick={() => {
							saveCurrentValues();
							const employer = getValues().employer;
							if (employer) {
								dispatch(updateOtherFields({ employer: employer }));
								updateStep(currentStep + 1);
							}
						}}
						className="px-6 py-1 text-xs font-medium text-white bg-emerald-950">
						Next
					</button>
				</div>
			</div>
			<ContractSectionInfo
				title="Basic Information"
				content="Fill the primary required contract information including the signing
						parties and duties and responsibilities of the employee."
			/>
		</>
	);
};

export default ContractBasicInfo;
