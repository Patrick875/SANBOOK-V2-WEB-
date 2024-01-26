import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

function LayoutContainer({ children }: Props) {
	return <div className=" w-100 flex font-nunito bg-[#F5F5F5]">{children}</div>;
}

export default LayoutContainer;
