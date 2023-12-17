import { BackButton } from "../../shared/BackButton";
import { Link, Outlet } from "react-router-dom";

interface contractstep {
	id: string;
	text: string;
	link: string;
}
const contractSteps: contractstep[] = [
	{
		id: "1",
		text: "Basic Information",
		link: "",
	},
	{
		id: "2",
		text: "Employment Period",
		link: "period",
	},
	{
		id: "3",
		text: "Salary and Facilities",
		link: "salary",
	},
	{
		id: "4",
		text: "Terms and Conditions",
		link: "terms",
	},
];

const ContractViewLayout = () => {
	
	return (
		<div className="w-full min-h-screen p-1">
			<div className="flex w-full p-4">
				<div className="basis-1/4">
					<div className="flex justify-center w-full">
						<BackButton />
					</div>
					<div className="p-8 px-4 my-2 text-white rounded-md bg-login-blue">
						{contractSteps &&
							contractSteps.length !== 0 &&
							contractSteps.map((step) => (
								<Link
									key={crypto.randomUUID()}
									to={step.link}
									className="flex items-center block gap-3 py-6 text-white text-md">
									<p className="p-3 border-2 border-white rounded-full">
										{step.id}
									</p>
									<p>{step.text}</p>
								</Link>
							))}
					</div>
				</div>

				<Outlet />
			</div>
		</div>
	);
};

export default ContractViewLayout;
