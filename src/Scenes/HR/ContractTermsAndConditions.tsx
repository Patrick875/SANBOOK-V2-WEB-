import ContractSectionInfo from "./ContractSectionInfo";

interface Props {}

const ContractTermsAndConditions = (props: Props) => {
	return (
		<>
			<div className="px-2 basis-2/4">
				<p className="py-1 my-4 font-bold ">Terms and Conditions</p>

				<div className="text-xs">
					<p className="py-2 font-bold ">Term 1</p>
					<p className="font-medium text-justify text-[12px] ">
						This part contains information regardless the time for which this
						contract will be valid, working hours and conditions regarding the
						employee annual leave. This part contains information regardless the
						time for which this contract will be valid, working hours and
						conditions regarding the employee annual leave.{" "}
					</p>
				</div>
				<div className="text-xs">
					<p className="py-2 font-bold ">Term 2</p>
					<p className="font-medium text-justify text-[12px] ">
						This part contains information regardless the time for which this
						contract will be valid, working hours and conditions regarding the
						employee annual leave. This part contains information regardless the
						time for which this contract will be valid, working hours and
						conditions regarding the employee annual leave.{" "}
					</p>
				</div>
				<div className="text-xs">
					<p className="py-2 font-bold ">Term 3</p>
					<p className="font-medium text-justify text-[12px] ">
						This part contains information regardless the time for which this
						contract will be valid, working hours and conditions regarding the
						employee annual leave. This part contains information regardless the
						time for which this contract will be valid, working hours and
						conditions regarding the employee annual leave.{" "}
					</p>
				</div>
				<div className="text-xs">
					<p className="py-2 font-bold ">Term 4</p>
					<p className="font-medium text-justify text-[12px] ">
						This part contains information regardless the time for which this
						contract will be valid, working hours and conditions regarding the
						employee annual leave. This part contains information regardless the
						time for which this contract will be valid, working hours and
						conditions regarding the employee annual leave.{" "}
					</p>
				</div>
				<div className="text-xs">
					<p className="py-2 font-bold ">Term 5</p>
					<p className="font-medium text-justify text-[12px] ">
						This part contains information regardless the time for which this
						contract will be valid, working hours and conditions regarding the
						employee annual leave. This part contains information regardless the
						time for which this contract will be valid, working hours and
						conditions regarding the employee annual leave.{" "}
					</p>
				</div>
			</div>
			<ContractSectionInfo
				title="Terms and conditions"
				content="Terms and conditions regarding the work ethic at XXXXXX"
			/>
		</>
	);
};

export default ContractTermsAndConditions;
