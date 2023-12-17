import React from "react";
import ContractSectionInfo from "./ContractSectionInfo";

type Props = {};

const ContractSalaryAndFacilities = (props: Props) => {
	return (
		<>
			<div className="px-2 basis-2/4">
				<p className="py-1 font-bold ">Salary and Facilities</p>
				<p className="inline-block text-xs font-medium pe-2 ">
					For the agreed period the salary is fixed at
				</p>
				<input className="rounded-sm w-1/5 bg-[#EFEFEF] " />
				<p className="inline-block px-2 text-xs font-medium ">RWF </p>

				<p className="my-5 text-xs font-medium pe-2 ">Deductions on salary</p>

				<ul className="py-4 text-xs ps-2">
					<li>Deduction 1 </li>
					<li>Deduction 2 </li>
					<li>Deduction 3 </li>
					<li>Deduction 4 </li>
				</ul>

				<p className="py-3 text-xs font-medium pe-2 ">Other facilities</p>

				<ul className="py-4 text-xs ps-2">
					<li>Facility 1 </li>
					<li>Facility 2 </li>
					<li>Facility 3 </li>
					<li>Facility 4 </li>
				</ul>
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
