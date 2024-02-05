import { ReactElement } from "react";

const TableHead = (): ReactElement => (
	<div className="">
		<div className="grid grid-flow-col grid-cols-12">
			<div className="col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
				File
			</div>
			<div className="col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
				Date/ID
			</div>
			<div className="col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
				CreatedBy
			</div>
			<div className="col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
				Value/Status
			</div>
		</div>
	</div>
);

export default TableHead;
