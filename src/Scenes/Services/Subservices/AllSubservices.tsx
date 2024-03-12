import { Link } from "react-router-dom";
import { SubServiceInterface, checkoutElement } from "../types";
import { useFetchData } from "../../../hooks/useFetchData";
import { useState } from "react";
import { MdOutlineShoppingBasket } from "react-icons/md";
import ServiceSellCard from "./ServiceSellCard";
import ServiceSellTransactionModel from "./ServiceSellTransactionModel";

function AllSubservices() {
	const [subservices] = useFetchData("/services");
	const [allTotal, setAllTotal] = useState<number>(0);
	const [checkedItems, setCheckedItems] = useState<checkoutElement[]>([]);
	const [show, setShow] = useState<boolean>(false);

	console.log("checked-elements", checkedItems);

	return (
		<div className="min-h-[98vh] relative">
			<div className="flex items-center justify-between">
				<p className="font-bold "> Sell / Order </p>
				<Link
					to="create"
					className="text-white px-6  py-1 font-bold bg-sky-800 rounded-[4px]">
					{" "}
					Add new service
				</Link>
			</div>
			<div className="grid grid-cols-3 gap-4 mt-4">
				{subservices &&
					subservices.length !== 0 &&
					subservices.map((serv: SubServiceInterface) => (
						<ServiceSellCard
							key={serv.id}
							setCheckedItems={setCheckedItems}
							checkedItems={checkedItems}
							allTotal={allTotal}
							setAllTotal={setAllTotal}
							service={serv}
						/>
					))}
			</div>
			<div className="fixed text-white right-4 bottom-4 font-bolf">
				<button
					type="button"
					className="py-1 mb-2 rounded-full ps-3 pe-8 bg-amber-700 ">
					{" "}
					Total {allTotal}
				</button>
				<button
					onClick={() => setShow(true)}
					type="button"
					className="ps-3 mb-2  items-center flex gap-3 pe-8 py-1 rounded-full  bg-black text-s, ">
					{" "}
					Checkout <MdOutlineShoppingBasket className="w-6 h-6 text-white" />
					<span className="block text-sm ">({checkedItems.length})</span>
				</button>
			</div>
			<ServiceSellTransactionModel
				checkoutDetails={{ checkoutElements: checkedItems, total: allTotal }}
				show={show}
				setShow={setShow}
			/>
		</div>
	);
}

export default AllSubservices;
