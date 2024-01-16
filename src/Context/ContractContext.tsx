import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { contractDetailsType, employee } from "../types";

interface props {
	children: ReactNode;
}

const contractContext = createContext(null);

export const useContractDetails = () => {
	const context = useContext(contractContext);
	if (!context) {
		throw new Error(
			"useContractCreateDetails is only used within its provider"
		);
	}
	return context;
};

export const ContractDetailsProvider = ({ children }: props) => {
	const [contractDetails, setContractDetails] = useState<contractDetailsType>({
		dateOfSigning: "",
		startsAt: "",
		endsAt: "",
		workstart: "",
		workends: "",
		employee: null,
	});
	const [employee, setEmployee] = useState<employee | null>();
	const getEmployeeData = (emp: employee) => {
		setEmployee(emp);
		setContractDetails((prevContractDetails) => ({
			...prevContractDetails,
			employee: emp,
		}));
		console.log("contractDetails", contractDetails);
	};
	useEffect(() => {
		console.log("Updated contractDetails", contractDetails);
	}, [contractDetails]);

	return (
		<contractContext.Provider
			value={{
				contractDetails,
				setContractDetails,
				getEmployeeData,
				employee,
			}}>
			{children}
		</contractContext.Provider>
	);
};
