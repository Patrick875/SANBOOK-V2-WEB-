import { Link, Outlet, useLocation } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { BackButton } from "../../shared/BackButton";

interface Props {}

export const Employee = (props: Props) => {
	const { pathname } = useLocation();
	const paths = pathname.split("/");
	const activeStyles: string = "border-b-2 border-b-teal-900";
	const id: number = Number(paths[3]);
	const [employee] = useFetchData(`/hr/employees/${id}`);
	console.log({ employee });

	return (
		<div className="w-full px-4">
			<BackButton />
			<div className="flex items-center justify-between w-full mt-4 text-xs font-bold">
				<Link
					to=""
					className={`py-1 ${paths.length === 4 ? activeStyles : ""}`}>
					Work data
				</Link>
				<Link
					to="contract "
					className={`py-1 ${
						paths.length === 5 && paths[paths.length - 1] === "contract"
							? activeStyles
							: ""
					}`}>
					Contract
				</Link>
				<Link
					to="personaldata"
					className={`py-1 ${
						paths.length === 5 && paths[paths.length - 1] === "personaldata"
							? activeStyles
							: ""
					}`}>
					Personal Data
				</Link>
				<Link
					to="additionaldata"
					className={`py-1 ${
						paths.length === 5 && paths[paths.length - 1] === "additionaldata"
							? activeStyles
							: ""
					}`}>
					Additional Data
				</Link>
			</div>
			<div className="mt-8">
				<Outlet context={{ employee }} />
			</div>
		</div>
	);
};
