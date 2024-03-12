import { Dispatch, useState } from "react";
import { SubServiceInterface, checkoutElement } from "../types";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { IoMdRemoveCircle } from "react-icons/io";

interface ServiceSellCardProps {
	service: SubServiceInterface;
	allTotal: number;
	checkedItems: checkoutElement[];
	setCheckedItems: Dispatch<React.SetStateAction<checkoutElement[]>>;
	setAllTotal: Dispatch<React.SetStateAction<number>>;
}

function ServiceSellCard({
	service,
	allTotal,
	checkedItems,
	setCheckedItems,
	setAllTotal,
}: ServiceSellCardProps) {
	const [quantity, setQuantity] = useState<number>(0);

	const handleRemoveQuantity = () => {
		setQuantity((prev) => {
			const newQuantity = prev - 1;

			if (newQuantity === 0) {
				setCheckedItems(
					checkedItems.filter((item: checkoutElement) => item.id !== service.id)
				);
			}
			const newTotal = allTotal - service.pricerwf;
			setAllTotal(newTotal);
			return newQuantity >= 0 ? newQuantity : 0;
		});
	};

	const handleAddQuantity = () => {
		setQuantity((prev) => {
			let newItems = checkedItems;
			const newQuantity = prev + 1;
			// if (newQuantity === 1 && prev < 1) {
			if (!checkedItems.some((el) => el.id === service.id)) {
				newItems = [
					...checkedItems,
					{
						id: service.id,
						name: service.name,
						quantity: newQuantity,
						price: service.pricerwf,
					},
				];
			} else {
				newItems = checkedItems.map((el) =>
					el.id === service.id ? { ...el, quantity: newQuantity } : el
				);
			}

			setCheckedItems(newItems);
			// }
			const newTotal = allTotal + service.pricerwf;
			setAllTotal(newTotal);
			return newQuantity;
		});
	};

	return (
		<div className="p-4  shadow-md bg-white rounded-[4px]">
			<div className="flex gap-2">
				<div>
					<p className="pb-2 text-lg font-bold">{service.name}</p>
					<p className="font-semibold">
						Price : {service.pricerwf} RWF / {service.priceusd} USD
					</p>
					<div className="flex justify-center py-2 my-4 rounded-full bg-blue-50">
						<div className="flex items-center gap-3 font-bold ">
							<button
								type="button"
								className="bg-pink-800 rounded-full"
								disabled={quantity === 0}
								onClick={handleRemoveQuantity}>
								<IoMdRemoveCircle className="w-12 h-12 p-3 text-white" />
							</button>
							<p>{quantity}</p>
							<button
								className="rounded-full bg-sky-800"
								type="button"
								onClick={handleAddQuantity}>
								<MdOutlineAddCircleOutline className="w-12 h-12 p-3 text-white " />
							</button>
						</div>
					</div>
					<p>
						Total :{" "}
						<span className="font-bold">
							{(service.pricerwf * quantity).toLocaleString()} RWF
						</span>
					</p>
				</div>

				<div className="w-12 h-12 text-white bg-purple">icon</div>
			</div>
		</div>
	);
}

export default ServiceSellCard;
