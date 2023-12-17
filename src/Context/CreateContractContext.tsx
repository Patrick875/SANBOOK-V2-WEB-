import { ReactNode, createContext, useContext, useState } from "react";

interface props {
	children: ReactNode;
}
interface position {
	id: number;
	name: string;
}
interface contractDetails {
	employeeNames: string;
	employerNames: string;
	dateOfSigning: string;
	position: position;
	startsAt: string;
	endsAt: string;
	workstart: string;
	workends: string;
	workdays: string[];
	restdays: string[];
	daysOfLeave: number;
	leaveStartsAfter: string;
	terms: string[];
}
const contractCreateContext = createContext(null);

export const useCreateContractDetails = () => {
	const context = useContext(contractCreateContext);
	if (!context) {
		throw new Error(
			"useContractCreateDetails is only used within its provider"
		);
	}
	return context;
};

export const CreateContractDetailsProvider = ({ children }: props) => {
	const [contractDetails, setContractDetails] =
		useState<contractDetails | null>(null);
	return (
		<contractCreateContext.Provider
			value={{ contractDetails, setContractDetails }}>
			{children}
		</contractCreateContext.Provider>
	);
};
