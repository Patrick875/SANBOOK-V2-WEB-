import { Outlet } from "react-router-dom";

interface Props {}

export const Departments = (props: Props) => {
	return (
		<div>
			<Outlet />
		</div>
	);
};
