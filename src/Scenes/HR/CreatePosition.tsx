import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BackButton } from "../../shared/BackButton";
import { useFetchData } from "../../hooks/useFetchData";
import { IoIosAdd, IoIosCheckmark } from "react-icons/io";
import instance from "../../API";
import AddAdvantageModal from "./AddAdvantageModal";
import AddDeductionModal from "./AddDeductionModal";

interface Props {}
interface opt {
	id: number;
	name: string;
	depid: string;
	description: string;
	createdBy: number;
}
interface duty {
	id: string;
	value: string;
}

export const CreatePosition = (props: Props) => {
	const [showAddAdvntageModel, setShowAddAdvantageModel] =
		useState<boolean>(false);
	const [showAddDeductionModel, setShowAddDeductionModel] =
		useState<boolean>(false);
	const { register, handleSubmit, watch, reset } = useForm();
	const [deps] = useFetchData("/hr/departments");
	const [positions] = useFetchData("/hr/positions");
	const [advs] = useFetchData("/system/hr/advs");
	const [deds] = useFetchData("/system/hr/deds");
	const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

	const defaultDuties: duty[] = [{ id: "909cq", value: "" }];
	const [duties, setDuties] = useState<duty[]>(defaultDuties);
	const addedAdvs = watch("salaryAdvs");
	const addedDeds = watch("salaryDeds");
	const grossSalary = watch("grossSalary");

	let sumAdvantages: number = 0;
	let sumDeductions: number = 0;

	if (addedAdvs && addedAdvs.length !== 0) {
		sumAdvantages = advs
			? advs.reduce(
					(total, adv) =>
						addedAdvs.includes(adv.id.toString())
							? total + Number(adv.amount)
							: total,
					0
			  )
			: 0;
	}

	if (addedDeds && addedDeds.length !== 0) {
		sumDeductions = deds
			? deds.reduce(
					(total, ded) =>
						addedDeds.includes(ded.id.toString())
							? total + Number(ded.amount)
							: total,
					0
			  )
			: 0;
	}

	const netSalary = grossSalary
		? Number(grossSalary) + sumAdvantages - sumDeductions
		: sumAdvantages - sumDeductions;

	const updateDuties = (e, id) => {
		const newDuties = duties.map((dut) =>
			dut.id === id ? { ...dut, value: e.target.value } : dut
		);
		setDuties(newDuties);
	};

	const createPosition = async (data) => {
		const submitDuties = duties
			.map((dut) => (dut.value !== "" ? dut.value : null))
			.filter((dut) => (dut ? dut : null));

		await instance
			.post("/hr/positions", {
				...data,
				netSallary: netSalary,
				duties: submitDuties,
			})
			.then(() => {
				reset();
				setDuties(defaultDuties);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				console.log("submitted");
			});
	};
	useEffect(() => {}, [formSubmitted]);

	return (
		<div>
			<p className="text-xs font-bold text-center">Create Position</p>
			<BackButton />
			<form className="mt-4" onSubmit={handleSubmit(createPosition)}>
				<div className="grid w-full grid-flow-col col-span-9 gap-3">
					<div className="col-span-3 p-4 px-6 bg-white rounded-md">
						<div className="w-full">
							<label className="block py-2 text-xs font-medium">Name</label>
							<input
								placeholder="Name"
								className=" bg-[#F5F5F5] rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
								{...register("name")}
							/>
						</div>
						<div className="w-full">
							<label className="block py-2 text-xs font-medium">
								Department
							</label>
							<select
								className="w-full rounded-md bg-[#F5F5F5] px-3 py-1 text-xs bg-transparent border-2 border-gray-300 focus-border-1"
								{...register("department")}>
								<option value="">All</option>
								{deps && deps.length !== 0 ? (
									deps.map((opt: opt) => (
										<option key={crypto.randomUUID()} value={opt.id}>
											{opt.name}
										</option>
									))
								) : (
									<option className="px-1">No department</option>
								)}
							</select>
						</div>

						<div className="w-full">
							<label className="block py-2 text-xs font-medium">Duties</label>
							{duties.map((dut) => (
								<input
									key={dut.id}
									onChange={(e) => updateDuties(e, dut.id)}
									value={dut.value}
									placeholder="Duty"
									className="w-full mt-2 bg-[#F5F5F5] border-2 border-gray-300 rounded-sm bg-transparent placeholder:ps-3 focus:outline-none focus-border-none placeholder:text-xs placeholder:font-bold"
								/>
							))}

							<button
								onClick={() =>
									setDuties([...duties, { id: crypto.randomUUID(), value: "" }])
								}
								type="button"
								className=" mt-2 flex items-center gap-2 px-4 text-xs shadow-lg rounded-sm bg-[#F5F5F5] text-login-blue ">
								<IoIosAdd className="w-5 h-5" />
								<p>Add</p>
							</button>
						</div>
						<div className="w-full">
							<label className="block py-2 text-xs font-medium">
								Reports to
							</label>
							<select
								className=" rounded-md bg-[#F5F5F5] w-full px-3 py-1 text-xs bg-transparent border-2 border-gray-300 focus-border-1"
								{...register("reportsTo")}>
								<option value="">All</option>
								{positions && positions.length !== 0 ? (
									positions.map((opt: opt) => (
										<option key={crypto.randomUUID()} value={opt.id}>
											{opt.name}
										</option>
									))
								) : (
									<option className="px-1">No levels</option>
								)}
							</select>
						</div>
					</div>
					<div className="col-span-3 p-4 px-6 bg-white rounded-md">
						<div className="w-full">
							<label className="block py-2 text-xs font-medium">
								Gross Salary
							</label>
							<input
								placeholder="Gross salary"
								type="number"
								step="any"
								min={0}
								className="w-full  bg-[#F5F5F5] placeholder:ps-3 placeholder:text-xs placeholder:font-bold"
								{...register("grossSalary")}
							/>
						</div>
						<div className="w-full">
							<p className="block py-3 text-xs font-medium">Advantages</p>
							{advs && advs.length !== 0 ? (
								advs.map((adv) => (
									<div
										className="flex items-center gap-2 py-1"
										key={crypto.randomUUID()}>
										<input
											type="checkbox"
											value={adv.id}
											className="bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-bold"
											{...register("salaryAdvs")}
										/>
										<label className="text-xs ">
											{adv.name}{" "}
											{"   /  " + Number(adv.amount).toLocaleString()}
										</label>
									</div>
								))
							) : (
								<p className="text-xs">No salary advantages added</p>
							)}
							<button
								onClick={() => setShowAddAdvantageModel(true)}
								type="button"
								className="flex items-center gap-2 px-4 text-xs shadow-lg rounded-sm bg-[#F5F5F5] text-login-blue ">
								<IoIosAdd className="w-5 h-5" />
								<p>Add</p>
							</button>
						</div>
						<div className="w-full">
							<p className="block py-3 text-xs font-medium">Deductions</p>
							{deds && deds.length !== 0 ? (
								deds.map((ded) => (
									<div
										className="flex items-center gap-2 py-1"
										key={crypto.randomUUID()}>
										<input
											type="checkbox"
											value={ded.id}
											className="bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-bold"
											{...register("salaryDeds")}
										/>
										<label className="text-xs ">
											{ded.name}{" "}
											{"   /    " + Number(ded.amount).toLocaleString()}
										</label>
									</div>
								))
							) : (
								<p className="text-xs">No salary deductions registered</p>
							)}
							<button
								type="button"
								onClick={() => {
									setShowAddDeductionModel(true);
								}}
								className="flex items-center gap-2 px-4 text-xs bg-[#F5F5F5] rounded-sm shadow-lg text-login-blue ">
								<IoIosAdd className="w-5 h-5" />
								<p>Add</p>
							</button>
						</div>
						<div className="flex items-center w-full py-4">
							<label className="block py-2 text-sm font-medium basis-1/2 ">
								Net Salary
							</label>
							<p className="text-sm font-medium basis-1/2">{netSalary}</p>
						</div>
					</div>
				</div>
				<div className="flex justify-center w-full mt-3">
					<button
						type="submit"
						className="flex items-center gap-2 px-4 text-xs font-medium text-center bg-teal-800 rounded-sm text-primary-white">
						Submit
						<IoIosCheckmark className="w-6 h-6 " />
					</button>
				</div>
			</form>
			<AddAdvantageModal
				show={showAddAdvntageModel}
				setShow={setShowAddAdvantageModel}
				formSubmitted={formSubmitted}
				setFormSubmitted={setFormSubmitted}
			/>
			<AddDeductionModal
				show={showAddDeductionModel}
				setShow={setShowAddDeductionModel}
			/>
		</div>
	);
};
