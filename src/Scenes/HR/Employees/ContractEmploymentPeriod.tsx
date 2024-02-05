import { useForm } from "react-hook-form";
import ContractSectionInfo from "./ContractSectionInfo";
import { contractStepProps } from "../../../types";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { updateOtherFields } from "./contractSlice";

const days: string[] = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

const ContractEmploymentPeriod = ({
	updateStep,
	currentStep,
}: contractStepProps) => {
	const { register, watch, getValues } = useForm();
	const dispatch = useAppDispatch();
	const schedule = watch("schedule") || "fullday";
	const saveCurrentValues = () => {
		const current = getValues();
		dispatch(updateOtherFields({ ...current }));
		console.log("current form data", current);
	};

	return (
		<>
			<div className="p-8 basis-2/4">
				<p className="py-1 font-bold ">Contract Period</p>
				<form>
					<p className="my-4 text-sm font-medium">Contract duration</p>
					<div className="flex w-full gap-2 my-2 ">
						<div className="flex-1 ">
							<label className="block py-2 text-xs font-normal">From</label>
							<input
								{...register("effectsfrom")}
								placeholder=""
								required
								type="date"
								className=" bg-[#F5F5F5] rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-normal"
							/>
						</div>
						<div className="flex-1">
							<label className="block py-2 text-xs font-normal">To</label>

							<input
								placeholder=""
								required
								{...register("effectstill")}
								type="date"
								className=" bg-[#F5F5F5] rounded-md w-full placeholder:ps-3  placeholder:text-xs placeholder:font-normal"
							/>
						</div>
					</div>

					<p className="my-4 text-sm font-medium">Work schedule</p>
					<div className="flex items-center w-full gap-3">
						<label className="block py-2 text-xs font-normal">
							Schedule type
						</label>
						<select
							required
							{...register("schedule")}
							className="bg-[#F5F5F5] text-xs py-1  px-6">
							<option value="fullday" className="py-0">
								Full day
							</option>
							<option value="shift" className="py-0">
								By shifts{" "}
							</option>
						</select>
					</div>
					{schedule && schedule === "fullday" && (
						<div className="flex w-full gap-2 my-2 ">
							<div className="flex-1 ">
								<label className="block py-2 text-xs font-normal">
									Work starts at
								</label>
								<input
									{...register("workingshiftstarts")}
									placeholder=""
									required
									type="time"
									className=" bg-[#F5F5F5] rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-normal"
								/>
							</div>
							<div className="flex-1">
								<label className="block py-2 text-xs font-normal">
									Ends at
								</label>
								<input
									placeholder=""
									required
									{...register("workingshiftends")}
									type="time"
									className=" bg-[#F5F5F5] rounded-md w-full placeholder:ps-3  placeholder:text-xs placeholder:font-normal"
								/>
							</div>
						</div>
					)}

					<p className="my-2 text-xs font-normal"> Working days</p>
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
											value={day}
											{...register("workdays")}
										/>
										<label className="block text-xs">{day}</label>
									</div>
								))}
						</div>
					</div>
					<p className="my-2 text-xs">Off Days</p>
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
											value={day}
											{...register("restdays")}
										/>
										<label className="block text-xs">{day}</label>
									</div>
								))}
						</div>
					</div>
					<div className="flex w-full gap-3 ">
						<div>
							<label className="block py-2 text-xs font-normal">
								Annual Leave of{" "}
							</label>
							<div className="flex items-center w-full">
								<input
									placeholder=""
									required
									type="number"
									min={0}
									step={1}
									className=" bg-[#F5F5F5] rounded-md   placeholder:ps-3  placeholder:text-xs placeholder:font-normal"
									{...register("annualleave")}
								/>
								<p className="text-xs ps-4">days</p>
							</div>
						</div>
						<div>
							<label className="block py-2 text-xs font-normal">
								Annual leave taken after{" "}
							</label>
							<div className="flex items-center w-full gap-2">
								<input
									placeholder=""
									type="number"
									required
									min={0}
									step={1}
									className=" bg-[#F5F5F5] rounded-md w-2/5  placeholder:ps-3  placeholder:text-xs placeholder:font-normal"
									{...register("annualleaveafter")}
								/>
								<p className="text-xs">months at work.</p>
							</div>
						</div>
					</div>
				</form>

				<div className="flex justify-end my-2">
					<button
						onClick={() => {
							saveCurrentValues();
							updateStep(currentStep + 1);
						}}
						className="px-6 py-1 text-xs font-medium text-white bg-emerald-950">
						Next
					</button>
				</div>
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
