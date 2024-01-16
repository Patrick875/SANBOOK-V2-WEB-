import ContractSectionInfo from "./ContractSectionInfo";
import { useAppSelector } from "../../hooks/reduxHooks";
import { createContractSelector } from "./contractSlice";
import { useForm } from "react-hook-form";
import { contractStepProps } from "../../types";

const ContractSalaryAndFacilities = ({
	updateStep,
	currentStep,
}: contractStepProps) => {
	const contractDetails = useAppSelector(createContractSelector);
	const { register } = useForm();

	return (
		<>
			<div className="p-8 basis-2/4">
				<p className="py-1 font-bold ">Salary and Facilities</p>
				<div>
					<div className="flex w-full gap-2">
						<div className="flex-1 w-full">
							<label className="block py-2 text-xs font-normal">
								Gross Salary{" "}
							</label>

							<input
								placeholder="40000"
								type="number"
								min={0}
								step={1}
								readOnly={true}
								value={contractDetails.employee?.Position.grossSalary}
								className=" bg-[#F5F5F5] rounded-md   placeholder:ps-3  placeholder:text-xs placeholder:font-normal"
								{...register("grossSalary")}
							/>
						</div>
						<div className="flex-1 w-full">
							<label className="block py-2 text-xs font-normal">
								Net Salary{" "}
							</label>

							<input
								placeholder="40000"
								type="number"
								min={0}
								step={1}
								readOnly={true}
								value={contractDetails.employee?.Position.netSallary}
								className=" bg-[#F5F5F5] rounded-md   placeholder:ps-3  placeholder:text-xs placeholder:font-normal"
								{...register("netSalary")}
							/>
						</div>
					</div>
					<p className="my-2">Benefits</p>
					<div className="grid grid-cols-3">
						{contractDetails?.employee?.Position.SalaryAdvantages.length !==
							0 &&
							contractDetails?.employee?.Position.SalaryAdvantages.map((el) => (
								<p className="text-xs ">
									{el.name} {el.amount}
								</p>
							))}
					</div>

					<p className="my-2 text-sm">Deductions</p>
					<div className="grid grid-cols-3">
						{contractDetails?.employee?.Position.SalaryDeductions.length !==
							0 &&
							contractDetails?.employee?.Position.SalaryDeductions.map((el) => (
								<p className="text-xs ">
									{el.name} {el.amount}
								</p>
							))}
					</div>
				</div>
				<div className="flex justify-end my-2">
					<button
						onClick={() => {
							//saveCurrentValues();
							updateStep(currentStep + 1);
						}}
						className="px-6 py-1 text-xs font-medium text-white bg-emerald-950">
						Next
					</button>
				</div>
			</div>
			<ContractSectionInfo
				title="Salary and Employee facilities"
				content="This part contains information regardless the
time for which this contract will be valid, working hours and conditions regarding the employee annual leave. "
			/>
		</>
	);
};
export default ContractSalaryAndFacilities;
