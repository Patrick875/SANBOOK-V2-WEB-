import { useFetchData } from "../../hooks/useFetchData";
import ContractSectionInfo from "./ContractSectionInfo";

const ContractBasicInfo = (props: Props) => {
	const [data] = useFetchData("/hr/positions");
	
	return (
		<>
			<div className="px-2 basis-2/4">
				<p className="py-1 font-bold ">Basic Information</p>
				<p className="my-4 font-medium">Parties</p>
				<p className="text-xs font-medium ">
					This contract is entered into between
				</p>
				<br />
				<input className="rounded-sm w-3/5 bg-[#EFEFEF] " />
				<p className="inline text-xs font-medium ps-3 ">
					hereby refered to as Employee
				</p>
				<p className="py-2 text-xs font-medium ">And</p>
				<br />
				<input className="rounded-sm w-3/5 bg-[#EFEFEF] " />
				<p className="inline text-xs font-medium ps-3 ">
					hereby refered to as Employer
				</p>
				<p className="py-2 text-xs font-medium ">on</p>
				<input className="rounded-sm w-3/5 bg-[#EFEFEF] pe-3" />
				<p className="my-4 font-medium">Duties and Responsibilities</p>
				<p className="inline-block text-xs font-medium pe-3">
					This employee is employed in the position of{" "}
				</p>
				<input className="inline rounded-sm w-2/5 bg-[#EFEFEF] " />
				<p className="py-2 text-xs font-medium ">
					as an employee serving in the position of xxxccccxxxxccc his duties
					and responsibilities include
				</p>
			</div>
			<ContractSectionInfo
				title="Basic Information"
				content="Fill the primary required contract information including the signing
						parties and duties and responsibilities of the employee."
			/>
		</>
	);
};

export default ContractBasicInfo;
