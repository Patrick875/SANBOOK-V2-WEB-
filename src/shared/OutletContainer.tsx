import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface Props {
	children: ReactNode;
}

function OutletContainer({ children }: Props) {
	const { pathname } = useLocation();
	const paths = pathname.split("/");

	return (
		<div
			className={`flex-1 min-h-[100vh]  ${
				paths[1] === "services" && paths[2] === "laundry"
					? "bg-[url('/img/laundry-bg.svg')]  bg-blend-hue bg-contain bg-no-repeat bg-center"
					: " bg-tab-content"
			} `}>
			{children}
		</div>
	);
}

export default OutletContainer;
