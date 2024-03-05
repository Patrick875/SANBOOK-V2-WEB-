import { ReactNode } from "react";
import { BsPrinter } from "react-icons/bs";
import { Logo } from "./Logo";

interface documentHeaderProps {
	children?: ReactNode;
}

function DocumentHeader({ children }: documentHeaderProps) {
	return (
		<div className="grid justify-between w-full grid-flow-col p-4 my-4 grid-col-3">
			<Logo textColor="bg-transparent" isMinifiable={false} />
			<div>
				<p className="text-xs font-bold">K_DEV HOTEL</p>
				<p className="text-xs font-bold">
					TEL: +250 780 000 000/ +250 780 000 000
				</p>
				<p className="text-xs font-bold">E-mail:kdevhotel@kdev.rw</p>
				<p className="text-xs font-bold">Web:www.kdev.rw</p>
				<p className="text-xs font-bold">TIN/VAT: 000000000</p>
			</div>
			<div className="flex items-center gap-3">
				{children && children}
				<button className="flex items-center gap-1 px-2 py-1 text-xs bg-black text-slate-100 ">
					Print
					<BsPrinter />
				</button>
			</div>
		</div>
	);
}

export default DocumentHeader;
