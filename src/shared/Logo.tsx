import { useSelector } from "react-redux";
import logo from "../assets/SANBOOK-LOGO.svg";
import { sideBarSizeSelector } from "../Redux/sideBarSlice";
interface Props {
	textColor: string;
	isMinifiable: boolean;
}
export const Logo = ({ textColor, isMinifiable = true }: Props) => {
	const isFull = useSelector(sideBarSizeSelector);

	return (
		<div className="flex items-center gap-3">
			<img alt="logo" className="block" src={logo} />
			{isFull || !isMinifiable ? (
				<p className={`text-bold font-medium text-base ${textColor}`}>
					SANBOOK
				</p>
			) : null}
		</div>
	);
};
