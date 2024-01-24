import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import PDFButton from "../../../shared/PDFButton";
import { RiEditBoxLine } from "react-icons/ri";
import { receiveVoucher } from "../../../types";
import TableHead from "../Common/TableHead";
import Pages from "../../../shared/Pages";
import { useState } from "react";

interface receiveVoucherListProps {
	item: receiveVoucher;
}

const ReceiveVoucherListItem = ({ item }: receiveVoucherListProps) => {
	return (
		<div className="grid w-full grid-cols-12 text-xs">
			<div className="col-span-3 p-3 py-2 text-xs tracking-wide text-left whitespace-nowrap">
				<PDFButton />
			</div>
			<div className="col-span-3 p-3 py-2 text-xs tracking-wide text-left whitespace-nowrap">
				<p className="py-1">
					{new Date(item.date).toLocaleDateString("fr-FR")}
				</p>
				<p className="py-1">{item?.receiveVoucherId}</p>
			</div>
			<div className="col-span-3 p-3 py-2 text-xs tracking-wide text-left whitespace-nowrap">
				{item?.userId}
			</div>
			<div className="col-span-3 p-3 py-2 text-xs tracking-wide text-left whitespace-nowrap">
				<div className="flex items-center justify-between w-full">
					<p className="font-bold">{Number(item.total).toLocaleString()}</p>
					<Link
						className="flex gap-2 p-2 text-xs font-bold rounded-sm text-sky-900 bg-sky-100"
						to={`${item.id}`}>
						Edit
						<RiEditBoxLine />
					</Link>
				</div>
			</div>
		</div>
	);
};

function AllReceiveVauchers() {
	const { register } = useForm();
	const [data, loading] = useFetchData("/stock/receivevaucher");
	const itemsPerPage = 5;
	const [pageNumber, setPageNumber] = useState<number>(0);
	const pagesVisited = pageNumber * itemsPerPage;

	const displayItems =
		data &&
		data.slice(pagesVisited, pagesVisited + itemsPerPage).map((el) => {
			return <ReceiveVoucherListItem item={el} key={el.id} />;
		});

	return (
		<div className="w-full">
			<div className="grid content-center w-full grid-flow-col grid-cols-12 gap-2 px-2 py-2 bg-white rounded-md justify-stretch">
				<div className="col-start-1 col-end-9">
					<form className="flex items-center w-full gap-3 px-3 py-1 ">
						<div className="flex items-center w-2/5 gap-1 px-3 py-1 rounded-sm bg-search-bg">
							<MagnifyingGlassIcon className="w-5 h-5 text-login-blue" />
							<input
								placeholder="Search"
								className="w-full bg-transparent focus:outline-none focus-border-none placeholder:text-sm placeholder:font-bold"
								{...register("query")}
							/>
						</div>
						<div className="flex gap-2 ">
							<div className="flex gap-2 text-xs justify-items-center">
								<label>From</label>
								<input type="date" className="block " />
							</div>
							<div className="flex items-center gap-2 text-xs">
								<label>To</label>
								<input type="date" className="block " />
							</div>
						</div>
					</form>
				</div>
				<div className="grid content-center justify-end col-start-10 col-end-12">
					<Link
						to="create"
						className="col-span-2 px-4 py-1 text-xs text-center rounded-sm bg-login-blue text-primary-white ">
						Create new{" "}
					</Link>
				</div>
			</div>

			<div className="w-full mt-3 bg-primary-white ">
				<TableHead />
				{loading && <p className="my-4">Loading ....</p>}
				{data && (
					<div>
						{displayItems}

						<Pages
							dataLength={data.length}
							setPageNumber={setPageNumber}
							itemsPerPage={itemsPerPage}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default AllReceiveVauchers;
