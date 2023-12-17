import ContractSectionInfo from "./ContractSectionInfo";

interface Props {}
const days: string[] = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

const ContractEmploymentPeriod = (props: Props) => {
	return (
		<>
			<div className="px-2 basis-2/4">
				<p className="py-1 font-bold ">Contract Period</p>
				<p className="inline-block text-xs font-medium pe-2 ">
					This contract has effect from this
				</p>
				<input className="rounded-sm w-1/5 bg-[#EFEFEF] " />
				<p className="inline-block px-2 text-xs font-medium ">to </p>
				<input className="rounded-sm w-1/5 bg-[#EFEFEF] " />
				<p className="inline-block py-3 text-xs font-medium pe-2 ">
					During this period the employee is to report at work from
				</p>
				<input className="rounded-sm w-1/12 bg-[#EFEFEF] " />
				<p className="inline-block px-2 text-xs font-medium ">to </p>
				<input className="rounded-sm w-1/12 bg-[#EFEFEF] " />
				<div className="flex w-full my-2">
					<div className="basis-1/2">
						<p className="text-xs font-medium">Every</p>
						<div className="flex justify-center w-full">
							<div>
								{days &&
									days.length !== 0 &&
									days.map((day) => (
										<div
											key={crypto.randomUUID()}
											className="flex items-center gap-3 py-1 ">
											<input
												className="block w-3 h-3"
												type="checkbox"
												name="day"
											/>
											<label className="block text-xs">{day}</label>
										</div>
									))}
							</div>
						</div>
					</div>
					<div className="basis-1/2">
						<p className="text-xs font-medium">Resting every</p>
						<div className="flex justify-center w-full">
							<div>
								{days &&
									days.length !== 0 &&
									days.map((day) => (
										<div
											key={crypto.randomUUID()}
											className="flex items-center gap-3 py-1 ">
											<input
												className="block w-3 h-3"
												type="checkbox"
												name="day"
											/>
											<label className="block text-xs">{day}</label>
										</div>
									))}
							</div>
						</div>
					</div>
				</div>
				<p className="inline-block text-xs font-medium pe-2 ">
					The employee is also allowed to take an annual leave of
				</p>
				<input className="rounded-sm w-2/12 bg-[#EFEFEF] " />
				<p className="inline-block py-2 font-medium text-xs/8 pe-2 ">
					days,which can be only be requested after{" "}
				</p>
				<input className="rounded-sm w-2/12 bg-[#EFEFEF] " />
				<p className="inline px-2 font-medium text-xs/8 ">
					months after this contracts is signed. n such case the employee is
					required to present a request through the Human Resources department
					for approval.
				</p>
			</div>

			<ContractSectionInfo
				title="Employment Period"
				content="This part contains information regarding the time for which this
						contract will be valid, working hours and conditions regarding the
						employee annual leave."
			/>
		</>
	);
};

export default ContractEmploymentPeriod;
