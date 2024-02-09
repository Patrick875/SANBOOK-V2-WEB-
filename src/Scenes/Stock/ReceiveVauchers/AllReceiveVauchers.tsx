import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import PDFButton from "../../../shared/PDFButton";
import { RiEditBoxLine } from "react-icons/ri";
import { receiveVoucher } from "../../../types";
import TableHead from "../Common/TableHead";
import Pages from "../../../shared/Pages";
import { useState } from "react";
import LocationInApp from "../../../shared/LocationInApp";
import { IoCalendar } from "react-icons/io5";
import Datepicker from "react-datepicker";

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
	const { register, watch, control } = useForm();
	const query = watch("query");
	const currentYear = new Date().getFullYear();
	const firstDate = new Date(currentYear, 0, 1);
	const startDate = watch("from") || firstDate.toLocaleDateString();
	const endDate = watch("to") || new Date().toLocaleDateString();

	console.log("search dates", {
		startDate: new Date(startDate).toISOString(),
		endDate: new Date(endDate).toISOString(),
	});

	const itemsPerPage = 15;
	const [pageNumber, setPageNumber] = useState<number>(0);
	const [data, loading, , length] = useFetchData(
		`/stock/receivevaucher?receive=${query}&page=${
			pageNumber + 1
		}&itemsPerPage=${itemsPerPage}&startDate=${new Date(
			startDate
		).toISOString()}&endDate=${new Date(endDate).toISOString()}`
	);

	const displayItems =
		data &&
		data.map((el) => {
			return <ReceiveVoucherListItem item={el} key={el.id} />;
		});

	return (
		<div className="w-full">
			<LocationInApp location="Receive Vouchers" />
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
							<div className="flex items-center justify-center gap-2 text-xs">
								<label>From</label>
								<Controller
									name="from"
									control={control}
									defaultValue={new Date(new Date().getFullYear(), 0, 1)}
									render={({ field }) => (
										<Datepicker
											placeholderText="from"
											onChange={(date) => field.onChange(date)}
											selected={field.value}
											showIcon
											className="border-[1.5px] text-xs border-gray-800 rounded-[4px]"
											icon={<IoCalendar className="w-3 h-3 text-sky-700" />}
										/>
									)}
								/>
							</div>
							<div className="flex items-center gap-2 text-xs">
								<label>To</label>
								<Controller
									control={control}
									name="to"
									defaultValue={new Date()}
									render={({ field }) => (
										<Datepicker
											placeholderText="to"
											onChange={(date) => field.onChange(date)}
											selected={field.value}
											showIcon
											className="border-[1.5px] text-xs border-gray-800 rounded-[4px]"
											icon={<IoCalendar className="w-3 h-3 text-sky-700" />}
										/>
									)}
								/>
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
							dataLength={length && length}
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
