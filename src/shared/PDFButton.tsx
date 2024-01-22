import { HiDownload } from "react-icons/hi";

const PDFButton = () => {
	return (
		<button className="flex items-center justify-between w-4/6 px-3 py-3 font-bold text-pink-900 bg-pink-100 rounded-md ">
			PDF
			<HiDownload className="text-slate-900" />
		</button>
	);
};

export default PDFButton;
