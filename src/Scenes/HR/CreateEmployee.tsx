import { BackButton } from "../../shared/BackButton";
import { Controller, useForm } from "react-hook-form";
import { useFetchData } from "../../hooks/useFetchData";
import { CheckIcon } from "@heroicons/react/24/outline";
import usePostData from "../../hooks/usePostData";
import { useState } from "react";
import { img } from "../../types";
import { fileToDataURL } from "../../types/constants";

interface Props {}

export const CreateEmployee = (props: Props) => {
	const [deps] = useFetchData("/hr/departments");
	const [positions] = useFetchData("/hr/positions");
	const { postData } = usePostData();
	const { register, handleSubmit, reset, control } = useForm();
	const [images, setImages] = useState<img[]>([]);
	const handleFileChange = async (e) => {
		const files = e.target.files;
		const imagesArray: img[] = await Promise.all(
			Array.from(files).map(async (file) => {
				const dataUrl: string = await fileToDataURL(file);
				return {
					url: URL.createObjectURL(file),
					data: dataUrl,
				};
			})
		);

		setImages([...imagesArray]);
	};
	const createEmployee = async (data) => {
		await postData("/hr/employees", {
			...data,
			profileImage: images[0].data,
			birthdate: new Date(data.birthdate).toLocaleDateString(),
		});
	};
	return (
		<div>
			<p className="text-xs font-medium text-center">Create Employee</p>
			<BackButton />
			<form
				onSubmit={handleSubmit(createEmployee)}
				className="grid grid-cols-10 gap-2 mt-2">
				<div className="col-span-6 p-4 bg-white rounded-md ">
					<p className="font-medium ">Personal Data</p>
					<div className="w-4/5 mx-auto">
						<div className="w-full">
							<label className="block py-2 text-xs font-medium">
								Full Name
							</label>
							<input
								placeholder="fullname"
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
								type="date"
								className=" bg-[#F5F5F5] border-2 border-gray-300 rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
								{...register("birthdate")}
							/>
						</div>
						<div className="flex w-full gap-3">
							<div>
								<label className="block py-2 text-xs font-medium">Gender</label>
								<select
									className="w-full rounded-md bg-[#F5F5F5] px-3 py-1 text-xs bg-transparent border-2 border-gray-300 focus-border-1"
									{...register("gender")}>
									<option value="male">Male</option>
									<option value="female">Female</option>
									<option value="not stated">Not stated</option>
								</select>
							</div>
							<div>
								<label className="block py-2 text-xs font-medium">
									Marital Status
								</label>
								<select
									className="w-full rounded-md bg-[#F5F5F5] px-3 py-1 text-xs bg-transparent border-2 border-gray-300 focus-border-1"
									{...register("maritalstatus")}>
									<option value="single">Single</option>
									<option value="married">Married</option>
								</select>
							</div>
						</div>
						<div className="w-full">
							<label className="block py-2 text-xs font-medium">ID</label>
							<input
								placeholder=""
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
								<option value="Rwandan">Rwandan</option>
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
									className=" bg-[#F5F5F5] border-2 border-gray-300 rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
									{...register("whatsapphone")}
								/>
							</div>
						</div>
						<div className="w-full">
							<label className="block py-2 text-xs font-medium">Email</label>
							<input
								placeholder="email"
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
									className=" bg-[#F5F5F5] border-2 border-gray-300 rounded-md w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
									{...register("emergencyrelation")}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full col-span-3 p-4 bg-white">
					<div className="w-full p-4 text-xs  rounded-[4px]">
						<p className="my-2 font-bold">Employee Image</p>
						<div className="flex gap-2">
							{images.length !== 0 && (
								<div className="grid grid-cols-3 gap-2 ">
									{images.map((image, index) => (
										<img
											key={index}
											src={image.url}
											alt={`Uploaded Image ${index}`}
											className="cursor-pointer"
											style={{
												maxWidth: "100px",
												maxHeight: "100px",
												margin: "5px",
											}}
										/>
									))}
								</div>
							)}

							<div className="flex-shrink-0 ms-2">
								<Controller
									name="profileImage"
									control={control}
									defaultValue={null}
									render={({ field }) => (
										<input
											type="file"
											id="profileImage"
											accept="image/*"
											onChange={(e) => {
												field.onChange(e);
												handleFileChange(e);
											}}
											multiple
											style={{ display: "none" }}
										/>
									)}
								/>
								<label
									htmlFor="profileImage"
									className="flex items-center justify-center p-6 text-2xl bg-gray-300 rounded-md text-sky-800"
									style={{ cursor: "pointer" }}>
									+
								</label>
							</div>
						</div>
					</div>
					<p className="font-medium capitalize cols-span-2 text-xsm">
						Employement Data
					</p>

					<div className="w-full">
						<label className="block py-2 text-xs font-medium">Department</label>
						<select
							className="w-full rounded-md bg-[#F5F5F5] px-3 py-1 text-xs bg-transparent border-2 border-gray-300 focus-border-1"
							{...register("department")}>
							{deps &&
								deps.map((dep) => (
									<option key={dep.id} className="capitalize" value={dep.id}>
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
									<option key={pos.id} className="capiltalize" value={pos.id}>
										{pos.name}
									</option>
								))}
						</select>
					</div>
					<button className="flex items-center gap-3 px-4 py-1 mt-3 bg-teal-900 text-primary-white">
						Submit
						<CheckIcon className="w-5 h-5 font-bold text-white" />
					</button>
				</div>
			</form>
		</div>
	);
};
