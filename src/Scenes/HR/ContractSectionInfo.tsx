interface Props {
	title: string;
	content: string;
}

const ContractSectionInfo = ({ title, content }: Props) => {
	return (
		<div className="basis-1/4">
			<div className="p-3 bg-[#F1F5F9] border-1  border-[#0C4981]">
				<p className="my-4 text-sm font-bold">{title}</p>
				<p className="text-xs ">{content}</p>
			</div>
		</div>
	);
};
export default ContractSectionInfo;
