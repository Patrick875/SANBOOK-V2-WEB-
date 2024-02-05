import { useOutletContext } from "react-router-dom";
import { stockRequestItem } from "../../../types";

interface listItemProps {
	item: stockRequestItem;
}

function EstimatedStock() {
	const { costingCenter } = useOutletContext();
	const ListItem = ({ item }: listItemProps) => {
		return (
			<div className="grid w-full grid-cols-4 p-4 py-1 rounded-[8px] ">
				<p className="p-2 text-xs font-bold">
					{item.BaughtItem && item.BaughtItem.Item
						? item.BaughtItem.Item.name
						: ""}
				</p>
				<p className="p-2 text-xs font-bold">{item.price}</p>
				<p className="p-2 text-xs font-bold">{item.quantity}</p>
			</div>
		);
	};

	return (
		<div>
			<p className="my-2 text-xs font-bold">Current estimated stock</p>
			<div className="bg-white">
				<div className="grid w-full grid-cols-4 p-4 py-1 rounded-[8px] ">
					<p className="p-2 text-xs font-bold">Item</p>
					<p className="p-2 text-xs font-bold">Price</p>
					<p className="p-2 text-xs font-bold">Quantity</p>
				</div>
				{costingCenter &&
					costingCenter.CostingCenterItems.map((item: stockRequestItem) => (
						<ListItem key={item.id} item={item} />
					))}
			</div>
		</div>
	);
}

export default EstimatedStock;
