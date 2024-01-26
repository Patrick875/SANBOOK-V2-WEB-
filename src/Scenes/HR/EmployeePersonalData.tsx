import { useFetchData } from "../../hooks/useFetchData";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";

const EmployeePersonalData = () => {
	const { employee } = useOutletContext();
	const [deps] = useFetchData("/hr/departments");
	const [positions] = useFetchData("/hr/positions");
	const { register } = useForm();

	return (
		<div>
			{employee && (
				<form className="grid grid-cols-10 gap-2 mt-2">
					<div className="col-span-6 p-4 bg-white rounded-md ">
						<p className="font-medium ">Personal Data</p>
						<div className="w-4/5 mx-auto">
							<div className="w-full">
								<label className="block py-2 text-xs font-medium">
									Full Name
								</label>
								<input
									placeholder="fullname"
									value={employee && employee.fullname}
									className=" bg-[#F5F5F5] border-2 border-gray-300 rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
									{...register("fullname")}
								/>
							</div>
							<div className="w-full">
								<label className="block py-2 text-xs font-medium">
									Birthdate
								</label>
								<input
									placeholder="01/01/1980"
									type=""
									value={
										employee && new Date(employee.birthdate).toDateString()
									}
									className=" text-sm bg-[#F5F5F5] border-2 border-gray-300 rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
									{...register("birthdate")}
								/>
							</div>
							<div className="flex w-full gap-3">
								<div>
									<label className="block py-2 text-xs font-medium">
										Gender
									</label>
									<select
										className="w-full rounded-md bg-[#F5F5F5] px-3 py-1 text-xs bg-transparent border-2 border-gray-300 focus-border-1"
										{...register("gender")}>
										<option
											selected={employee && employee.gender === "male"}
											value="male">
											Male
										</option>
										<option
											selected={employee && employee.gender === "female"}
											value="female">
											Female
										</option>
										<option
											selected={employee && employee.gender === "not stated"}
											value="not stated">
											Not stated
										</option>
									</select>
								</div>
								<div>
									<label className="block py-2 text-xs font-medium">
										Marital Status
									</label>
									<select
										className="w-full rounded-md bg-[#F5F5F5] px-3 py-1 text-xs bg-transparent border-2 border-gray-300 focus-border-1"
										{...register("maritalstatus")}>
										<option
											selected={employee && employee.maritalstatus === "single"}
											value="single">
											Single
										</option>
										<option
											selected={
												employee && employee.maritalstatus === "married"
											}
											value="married">
											Married
										</option>
									</select>
								</div>
							</div>
							<div className="w-full">
								<label className="block py-2 text-xs font-medium">ID</label>
								<input
									placeholder=""
									value={employee && employee.identification}
									className=" bg-[#F5F5F5] border-2 border-gray-300 rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
									{...register("identification")}
								/>
							</div>

							<div className="w-full">
								<label className="block py-2 text-xs font-medium">
									Nationality
								</label>
								<select
									className="w-full rounded-md bg-[#F5F5F5] px-3 py-1 text-xs bg-transparent border-2 border-gray-300 focus-border-1"
									{...register("nationality")}>
									<option
										selected={employee && employee.nationality === "Rwandan"}
										value="Rwandan">
										Rwandan
									</option>
								</select>
							</div>
							<div className="flex w-full gap-3">
								<div>
									<label className="block py-2 text-xs font-medium">
										Provide / City
									</label>
									<select
										className="w-full rounded-md bg-[#F5F5F5] px-3 py-1 text-xs bg-transparent border-2 border-gray-300 focus-border-1"
										{...register("residence_province")}>
										<option value="Kigali">Kigali</option>
										<option value="North">North</option>
										<option value="South">South</option>
										<option value="East">East</option>
										<option value="West">West</option>
									</select>
								</div>
								<div>
									<label className="block py-2 text-xs font-medium">
										District
									</label>
									<select
										className="w-full rounded-md bg-[#F5F5F5] px-3 py-1 text-xs bg-transparent border-2 border-gray-300 focus-border-1"
										{...register("residence_district")}>
										<option value="Gasabo">Gasabo</option>
										<option value="Gatsibo">Gatsibo</option>
									</select>
								</div>
							</div>
							<div className="flex w-full gap-3">
								<div>
									<label className="block py-2 text-xs font-medium">
										Phone 1
									</label>
									<input
										placeholder=""
										value={employee && employee.telephone}
										className=" bg-[#F5F5F5] border-2 border-gray-300 rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
										{...register("telephone")}
									/>
								</div>
								<div>
									<label className="block py-2 text-xs font-medium">
										Whatsapp
									</label>
									<input
										placeholder=""
										value={employee && employee.whatsapphone}
										className=" bg-[#F5F5F5] border-2 border-gray-300 rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
										{...register("whatsapphone")}
									/>
								</div>
							</div>
							<div className="w-full">
								<label className="block py-2 text-xs font-medium">Email</label>
								<input
									placeholder="email"
									value={employee && employee.email}
									className=" bg-[#F5F5F5] border-2 border-gray-300 rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
									{...register("email")}
								/>
							</div>
							<div className="flex w-full gap-3">
								<div>
									<label className="block py-2 text-xs font-medium">
										Emergency Contact
									</label>
									<input
										placeholder=""
										value={employee && employee.emergencyphone}
										className=" bg-[#F5F5F5] rounded-md w-full  border-2 border-gray-300 placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
										{...register("emergencyphone")}
									/>
								</div>
								<div>
									<label className="block py-2 text-xs font-medium">
										Relation
									</label>
									<input
										placeholder=""
										value={employee && employee.emergencyrelation}
										className=" bg-[#F5F5F5] border-2 border-gray-300 rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
										{...register("emergencyrelation")}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full col-span-3 px-4 pb-4 ">
						<div className="w-full ">
							<img
								src={employee?.profile}
								className="block"
								alt={`${employee.fullname}-profile`}
							/>
							<div className="w-full  mx-auto py-3 ">
								<input type="file" id="profile" className="hidden " />
								<label
									htmlFor="profile"
									className="block text-center py-2text-xs w-full h-full border-black rounded-sm bg-slate-200 hover:bg-slate-300 border-1 text-primary-black ">
									Update image
								</label>
							</div>
							<p className="my-3 text-xs font-bold text-center">
								{employee && employee.fullname}
							</p>
							<p
								className={`mt-3  capitalize rounded-full py-1 text-xs font-bold text-center ${
									employee && employee.employmenttype === "Part time"
										? "bg-[#E5F2FF]"
										: "bg-[#D5FFD2] text-teal-900"
								}`}>
								{employee && employee.employmenttype}
							</p>
						</div>
						<p></p>

						<div className="w-full">
							<label className="block py-2 text-xs font-medium">
								Department
							</label>
							<select
								className="w-full rounded-md bg-[#F5F5F5] px-3 py-1 text-xs bg-transparent border-2 border-gray-300 focus-border-1"
								{...register("department")}>
								{deps &&
									deps.map((dep) => (
										<option
											selected={employee && employee.Department.id === dep.id}
											className="capitalize"
											value={dep.id}
											key={dep.id}>
											{dep.name}
										</option>
									))}
							</select>
						</div>
						<div className="w-full">
							<label className="block py-2 text-xs font-medium">Position</label>
							<select
								className="w-full rounded-md bg-[#F5F5F5] px-3 py-1 text-xs bg-transparent border-2 border-gray-300 focus-border-1"
								{...register("position")}>
								{positions &&
									positions.map((pos) => (
										<option
											key={pos.id}
											className="capiltalize"
											selected={employee && employee.Position.id === pos.id}
											value={pos.id}>
											{pos.name}
										</option>
									))}
							</select>

							{employee &&
								employee.Position &&
								employee.Position.reportingPosition &&
								employee.Position.reportingPosition.name && (
									<div>
										<p className="mt-2 text-xs">Reports To </p>
										<p>
											{employee &&
												employee.Position &&
												employee.Position.reportingPosition &&
												employee.Position.reportingPosition.name}{" "}
										</p>
									</div>
								)}
						</div>
					</div>
				</form>
			)}
		</div>
	);
};

export default EmployeePersonalData;
