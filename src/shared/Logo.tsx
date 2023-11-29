import logo from "../assets/SANBOOK-LOGO.svg";
interface Props {
	textColor: string;
}
export const Logo = ({ textColor }: Props) => {
	return (
		<div className="flex gap-3">
			<img alt="logo" className="block" src={logo} />
			<p className={`text-bold text-base ${textColor}`}>SANBOOK</p>
		</div>
	);
};
