import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";

function FilterAndSearchPanel() {
	const { register } = useForm();
	return (
		<form className="grid w-full grid-flow-row grid-cols-12 gap-1 ">
			<div className=" col-span-2 rounded-[8px] flex items-center  gap-2 bg-search-bg ">
				<div className="flex items-center justify-between w-full py-1">
					<BsSearch className="block w-5 h-5 px-1 text-login-blue" />

					<input
						placeholder="Search"
						className="block w-full bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-bold"
						{...register("query")}
					/>
				</div>
			</div>

			<div className="flex cols-span-8 ">
				<div className="flex items-center flex-1 gap-2 text-xs">
					<label className="block">Categories</label>
					<select className="block px-4 ">
						<option>category1</option>
					</select>
				</div>
				<div className="flex items-center gap-1">
					<div className="flex items-center gap-1 py-1">
						<label className="block text-xs">Grouped</label>
						<input
							type="radio"
							className="block text-login-blue"
							id="grouping"
							value="grouped"
							{...register("grouping")}
						/>
					</div>
					<div className="flex items-center gap-1 py-1">
						<label className="block text-xs ">Ungrouped</label>
						<input
							type="radio"
							className="block "
							id="grouping"
							{...register("grouping")}
							value="ungrouped"
						/>
					</div>
				</div>
				<div className="flex flex-1 gap-2">
					<button className="flex items-center gap-2 py-1 text-xs text-pink-800 shadow-md ">
						<p>PDF</p>
						<HiDownload className="w-3 h-3" />
					</button>
					<button className="flex items-center gap-2 py-1 text-xs shadow-md ">
						<p>PRINT</p>
						<FiPrinter className="w-3 h-3" />
					</button>
					<button className="flex items-center gap-2 py-1 text-xs shadow-md text-emerald-800">
						<p>Export</p>
						<RiFileExcel2Fill />
					</button>
				</div>
			</div>
		</form>
	);
}

export default FilterAndSearchPanel;
