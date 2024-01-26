import DocumentHeader from "../../../shared/DocumentHeader";

interface Props {
	createdId: string;
}

function CreateHeader({ createdId }: Props) {
	return (
		<div>
			<DocumentHeader />
			<p className="w-full text-xs font-bold text-center uppercase">
				Receive Vaucher {createdId}
			</p>
		</div>
	);
}

export default CreateHeader;
