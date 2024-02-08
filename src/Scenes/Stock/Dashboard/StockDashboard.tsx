import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import LocationInApp from "../../../shared/LocationInApp";
import { useFetchPaginatedData } from "../../../hooks/useFetchPaginatedData";
import TableHeader from "../Stock/ItemListTableHeader";
import { baughtItem, identity, stockrequest } from "../../../types";
import { useFetchData } from "../../../hooks/useFetchData";
import { formatDate } from "../../../types/constants";
import { Link } from "react-router-dom";
import { CiWarning } from "react-icons/ci";

interface store extends identity {
	active: boolean;
	selling: boolean;
}
interface itemcategory extends identity {
	store: number;
}
interface Item extends identity {
	mainunit: number;
	Store: store;
	ItemCategory: itemcategory;
}

interface StockItem extends identity {
	id: number;
	name: string;
	price: number;
	quantity: number;
	Item: Item;
}

interface ItemProps {
	item: StockItem;
}

interface ItemProps {
	item: StockItem;
}
interface transaction {
	Item: Item;
	balance: number;
	category: number;
	createdAt: string;
	date: string;
	id: number;
	item: number;
	newQuantity: number;
	preQuantity: number;
	price: number;
	quantity: number;
	status: string;
	store: number;
	to: number | null;
	updatedAt: string;
}

const Item = ({ item }: ItemProps) => {
	return (
		<div className="grid grid-cols-4 px-4 py-1">
			<p className="text-xs ">{item.Item.name}</p>
			<p className="text-xs ">{Number(item.price).toLocaleString("fr-FR")}</p>
			<p className="text-xs ">{Number(item.quantity).toLocaleString()}</p>
			<p className="text-xs uppercase">{item.Item.Store.name}</p>
		</div>
	);
};

function StockDashboard() {
	const { register } = useForm();
	const { data: items } = useFetchPaginatedData(
		`/stock/currentstock?page=${1}&itemsPerPage=${5}}`
	);
	const [pendingRequests, loading] = useFetchData(
		`/stock/costingcenterrequests?status=PENDING&itemsPerPage=5`
	);
	const [transactions] = useFetchData(
		`/stock/history?status=REMOVED&page=1&itemsPerPage=5`
	);
	const [outOfStockItems] = useFetchData(
		"/stock/currentstock/out?page=1&itemsPerPage=5"
	);

	console.log("OUT OF STOCK ITEMS", outOfStockItems);

	return (
		<div>
			<LocationInApp location="Current Stock" />
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
					</form>
				</div>
			</div>
			<div className="p-3 bg-white">
				{items && (
					<div className="mb-3 bg-white">
						<TableHeader />
						{items.map((item: StockItem) => (
							<Item item={item} key={item.id} />
						))}
					</div>
				)}
				<button className="px-6 py-1 text-xs font-bold text-black bg-zinc-200">
					More
				</button>
			</div>
			<div className="grid grid-cols-3 gap-3 my-2">
				<div className="p-3 bg-white rounded-[4px]">
					{pendingRequests ? (
						<div>
							<p className="my-1 text-sm font-bold ">Pending requests</p>
							{pendingRequests.length === 0 ? (
								<p className="text-xs text-center">No current requests</p>
							) : (
								pendingRequests.map((element: stockrequest) => (
									<div
										className="grid content-center grid-cols-3 text-xs "
										key={element.id}>
										<div className="col-span-2">
											<p className="py-1 font-bold">
												{element.CostingCenter?.name}
											</p>
											<p className="py-1 font-medium text-gray-700 ">
												{formatDate(element.date)}
											</p>
										</div>
										<div className="col-span-1">
											<Link
												to={`requests/${element.id}`}
												className="block w-full py-1 text-center text-white bg-black">
												View
											</Link>
										</div>
									</div>
								))
							)}
						</div>
					) : loading ? (
						<p>Loading ...</p>
					) : null}
				</div>
				<div className="p-3 bg-white rounded-[4px]">
					{transactions ? (
						<div>
							<p className="my-1 text-sm font-bold">
								Recent stock transactions
							</p>
							{transactions.length === 0 ? (
								<p className="text-xs text-center">No transactions</p>
							) : (
								transactions.map((element: transaction) => (
									<div className="grid grid-cols-3 text-xs" key={element.id}>
										<div className="col-span-2">
											<p className="font-bold ">{element.Item.name}</p>
											<p className="font-medium text-gray-700 ">
												{element.status +
													"   " +
													Number(element.preQuantity - element.newQuantity)}
											</p>
										</div>
										<div className="col-span-1">
											<Link
												to="#"
												className="block w-full py-1 text-center text-white bg-black">
												View
											</Link>
										</div>
									</div>
								))
							)}
						</div>
					) : loading ? (
						<p>Loading ...</p>
					) : null}
				</div>
				<div className="bg-white p-3 rounded-[4px]">
					{outOfStockItems ? (
						<div>
							<p className="flex justify-between my-1 text-sm font-bold text-pink-900">
								Out stock Items
								<CiWarning className="w-5 h-5" />
							</p>
							{outOfStockItems.length === 0 ? (
								<p className="text-xs text-center">No transactions</p>
							) : (
								outOfStockItems.map((element: baughtItem) => (
									<div className="grid grid-cols-3 text-xs" key={element.id}>
										<div className="col-span-2">
											<p className="font-bold ">{element.Item.name}</p>
											<p className="font-medium text-gray-700 ">
												{!element.quantity ? 0 : element.quantity}
												{" " + element.Item.StockUnit?.name}s remaning
											</p>
										</div>
										<div className="col-span-1">
											<Link
												to="#"
												className="block w-full py-1 text-center text-white bg-black">
												Order
											</Link>
										</div>
									</div>
								))
							)}
						</div>
					) : loading ? (
						<p>Loading ...</p>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default StockDashboard;
