import DocumentHeader from "../../../shared/DocumentHeader";

interface Props {
	createdId: string | null;
	document: string;
}

function CreateHeader({ createdId, document }: Props) {
	return (
		<div>
			<DocumentHeader />
			<p className="w-full text-xs font-bold text-center uppercase">
				{document + "  "}
				{createdId ? createdId : null}
			</p>
		</div>
	);
}

export default CreateHeader;
