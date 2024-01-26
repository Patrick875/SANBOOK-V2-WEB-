import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

function OutletContainer({ children }: Props) {
	return <div className="flex-1 bg-tab-content">{children}</div>;
}

export default OutletContainer;
