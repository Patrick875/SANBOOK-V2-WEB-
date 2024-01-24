import { useState, useEffect } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import { authUser, employeeRequest } from "../types";
import { authUserSelector } from "../Redux/userSlice";
import instance from "../API";

interface userDetails {
	username: string;
	email: string;
}

const Profile = () => {
	const user: authUser = useAppSelector(authUserSelector);
	const [userDetails, setUserDetails] = useState<userDetails>({
		username: user.user.username,
		email: user.user.email,
	});
	const [requests, setRequests] = useState([]);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserDetails((prev) => ({ ...prev, [name]: value }));
	};

	console.log("user user stuff", user);
	useEffect(() => {
		const getRequests = async () => {
			const employeeId = user.user.employeeId;
			if (employeeId) {
				await instance
					.post("/hr/emrequests/personal", { employeeId })
					.then((res) => {
						setRequests(res.data.data);
					})
					.catch((err) => {
						console.log("err", err);
					});
			}
		};
		getRequests();
	}, []);
	return (
		<div className="w-4/5 mx-auto">
			<div className="flex items-center gap-4">
				<div className="px-2 py-3">
					{user.user.profileImg ? (
						<img
							src={user.user.profileImg}
							alt="profile image"
							className="w-5 h-5"
						/>
					) : (
						<p className="w-full p-4 px-6 text-2xl leading-7 text-white capitalize rounded-full bg-primary-black ">
							{user.user.username[0]}
						</p>
					)}
				</div>
				<div>
					<p className="capitalize">
						{user.user.fullname ? user.user.fullname : user.user.username}
					</p>
					<div className="flex gap-2 py-2">
						<button className="px-6 py-1 text-sm text-white rounded-md bg-slate-900">
							Upload picture
						</button>
						<button className="px-6 py-1 text-sm text-white bg-pink-800 rounded-md">
							Delete
						</button>
					</div>
				</div>
			</div>
			<form className="w-3/4">
				<div className="w-full">
					<label className="block py-2 text-xs font-medium">Username</label>
					<input
						placeholder="username"
						name="username"
						defaultValue={user.user.username}
						className=" bg-[#F5F5F5] border-[1px] border-slate-900 rounded-sm w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
						onChange={handleChange}
					/>
				</div>
				<div className="w-full">
					<label className="block py-2 text-xs font-medium">Email</label>
					<input
						name="email"
						defaultValue={user.user.email}
						placeholder="email"
						className=" bg-[#F5F5F5] border-[1px] border-slate-900 rounded-sm w-full  placeholder:ps-3  placeholder:text-xs placeholder:font-bold"
						onChange={handleChange}
					/>
				</div>
			</form>
			<div className="w-3/4 my-2">
				<div className="flex items-center w-full ">
					<p className="flex-1 py-3 text-sm font-medium ">HR Requests</p>
					<div className="flex justify-end flex-1">
						<button className="rounded-[4px] px-4 py-1 text-xs text-white bg-black">
							Submit New Request
						</button>
					</div>
				</div>
				<div className="grid w-full grid-cols-12">
					{requests && requests.length !== 0 ? (
						requests.map((req: employeeRequest) => (
							<div key={req.id} className="flex col-span-3 gap-2 p-2 ">
								<div>
									<p className="pb-2 text-xs font-bold">Title</p>
									<p className="text-sm">{req.title}</p>
								</div>
								<div>
									<p className="pb-2 text-xs font-bold">Type</p>
									<p className="text-sm">{req.type}</p>
								</div>
								<div>
									<p className="pb-2 text-xs font-bold">Title</p>
									<p className="text-sm">{req.status}</p>
								</div>
							</div>
						))
					) : (
						<p className="col-span-12 py-2 text-xs text-center text-gray-700">
							No requests submitted to HR
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Profile;
