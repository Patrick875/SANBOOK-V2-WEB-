import { useOutletContext, useParams } from "react-router-dom";
import { stockRequestItem } from "../../../types";
import { useEffect, useState } from "react";
import { useFetchData } from "../../../hooks/useFetchData";

interface listItemProps {
	item: stockRequestItem;
}

function EstimatedStock() {
	const { costingCenter } = useOutletContext();
	const { id } = useParams();
	const [fetchedCenter, loading, error] = useFetchData(
		`/stock/costingcenters/${id}`
	);
	const [items, setItems] = useState<stockRequestItem[]>([]);

	useEffect(() => {
		if (!costingCenter && !loading) {
			setItems(fetchedCenter.CostingCenterItems);
		} else if (costingCenter) {
			setItems(costingCenter.CostingCenterItems);
		}
	}, [loading, costingCenter]);

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

				{loading && <p className="my-2 text-center">Loading .... </p>}
				{costingCenter &&
					items.map((item: stockRequestItem) => (
						<ListItem key={item.id} item={item} />
					))}
				{!loading && items.length == 0 && !error && (
					<p className="my-2 text-center">No items found</p>
				)}
			</div>
		</div>
	);
}

export default EstimatedStock;
