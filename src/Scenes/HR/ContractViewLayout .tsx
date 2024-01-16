// import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { BackButton } from "../../shared/BackButton";
import ContractBasicInfo from "./ContractBasicInfo";
import ContractEmploymentPeriod from "./ContractEmploymentPeriod";
import ContractSalaryAndFacilities from "./ContractSalaryAndFacilities";
import ContractTermsAndConditions from "./ContractTermsAndConditions";
import { useState } from "react";
// import { createContractSelector, updateStoredTerms } from "./contractSlice";

interface contractstep {
	id: number;
	text: string;
	link: string;
}
interface term {
	id: string;
	text: string;
}
const contractSteps: contractstep[] = [
	{
		id: 1,
		text: "Basic Information",
		link: "",
	},
	{
		id: 2,
		text: "Employment Period",
		link: "period",
	},
	{
		id: 3,
		text: "Salary and Facilities",
		link: "salary",
	},
	{
		id: 4,
		text: "Terms and Conditions",
		link: "terms",
	},
];

const ContractViewLayout = () => {
	const [currentStep, setCurrentStep] = useState<number>(1);
	const changeStep = (step: number) => {
		setCurrentStep((prev) => step);
	};

	return (
		<div className="w-full min-h-screen p-1 ">
			<div className="flex items-start w-full p-4">
				<div className="sticky flex-shrink-0 top-5 basis-1/4">
					<div className="flex justify-center w-full">
						<BackButton />
					</div>
					<div className="p-8 px-4 my-2 text-white rounded-md bg-login-blue">
						{contractSteps &&
							contractSteps.length !== 0 &&
							contractSteps.map((step) => (
								<p
									key={step.id}
									onClick={() => {
										changeStep(step.id);
									}}
									className="flex items-center gap-3 py-6 text-white text-md">
									<p
										className={`p-3 border-2   ${
											currentStep === step.id
												? "  border-white rounded-full"
												: "border-slate-800 rounded-full text-slate-800"
										}`}>
										{step.id}
									</p>
									<p>{step.text}</p>
								</p>
							))}
					</div>
				</div>
				{currentStep === 1 ? (
					<ContractBasicInfo
						updateStep={setCurrentStep}
						currentStep={currentStep}
					/>
				) : currentStep === 2 ? (
					<ContractEmploymentPeriod
						updateStep={setCurrentStep}
						currentStep={currentStep}
					/>
				) : currentStep === 3 ? (
					<ContractSalaryAndFacilities
						updateStep={setCurrentStep}
						currentStep={currentStep}
					/>
				) : (
					currentStep === 4 && (
						<ContractTermsAndConditions
						//terms={terms}
						// addTerm={addTerm}
						//removeTerm={removeTerm}
						// setTerms={setTerms}
						/>
					)
				)}
			</div>
		</div>
	);
};
export default ContractViewLayout;
