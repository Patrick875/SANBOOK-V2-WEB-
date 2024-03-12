import { Dispatch, useEffect, useMemo, useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { ServiceCheckoutDetails, checkoutElement } from "../types";
import instance from "../../../API";
import toast from "react-hot-toast";
import { useFetchData } from "../../../hooks/useFetchData";

interface modelProps {
	show: boolean;
	checkoutDetails?: ServiceCheckoutDetails;
	setShow: Dispatch<React.SetStateAction<boolean>>;
}

interface PaymentFormType {
	clientname: string;
	paymentMethod: string;
	clientTel?: string;
	clientIdentification?: string;
}
interface paymentDetailType {
	id?: number;
	method: number;
	amount: number;
	name: string;
}
function ServiceSellTransactionModel({
	show,
	setShow,
	checkoutDetails,
}: modelProps) {
	const { register, handleSubmit } = useForm<PaymentFormType>();
	const [methods] = useFetchData("/accounting/common/paymentmethods");
	const [paymentDetails, setPaymentDetails] = useState<paymentDetailType[]>([
		{ id: 1, method: 1, name: "", amount: 0 },
		{ id: 2, method: 2, name: "", amount: 0 },
		{ id: 3, method: 3, name: "", amount: 0 },
	]);

	const updatePaymentDetails = (e) => {
		const { name, value } = e.target;
		const newDetails = paymentDetails.map((detail: paymentDetailType) =>
			detail.name === name ? { ...detail, amount: Number(value) } : detail
		);
		setPaymentDetails(newDetails);
	};

	const payForService = async (data: PaymentFormType) => {
		await instance
			.post("/services/sales", {
				...data,
				services: checkoutDetails?.checkoutElements,
				paymentDetails,
				totalDue,
				total_paid: totalPaid,
			})
			.then(() => {
				setShow(false);
				toast.success("Success !!!");
			})
			.catch((err) => {
				console.log("err", err);
				toast.error(err.code);
				setShow(false);
			});
	};
	const totalDue =
		checkoutDetails && checkoutDetails.total ? checkoutDetails.total : 0;
	const totalPaid = useMemo(() => {
		const total = paymentDetails.reduce(
			(acc, detail) => Number(acc + detail.amount),
			0
		);
		return total;
	}, [paymentDetails]);

	const debt = Number(totalDue - totalPaid);

	useEffect(() => {
		if (methods) {
			setPaymentDetails(() => [
				...methods.map((el) => ({
					id: el.id,
					name: el.name,
					method: el.id,
					amount: 0,
				})),
			]);
		}
	}, [methods]);

	return (
		<>
			<Modal
				show={show}
				size="lg"
				position={"top-center"}
				onClose={() => setShow(false)}
				popup>
				<Modal.Header />
				<Modal.Body>
					<form onSubmit={handleSubmit(payForService)} className="space-y-6">
						<h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
							Checkout client
						</h3>
						<div>
							<div className="block mb-2">
								<Label htmlFor="clientName" value="Client name" />
							</div>
							<TextInput
								id="clientname"
								placeholder="clientname"
								{...register("clientname")}
								required
							/>
						</div>

						<div>
							<p className="pb-4 font-bold">Details</p>

							<div className="grid w-full grid-cols-4 gap-3 bg-slate-100">
								<p className="py-1 font-semibold text-center">Name</p>
								<p className="py-1 font-semibold text-center">Quantity</p>
								<p className="py-1 font-semibold text-center">Price</p>
								<p className="py-1 font-semibold text-center">Total</p>
							</div>
							{checkoutDetails?.checkoutElements.map(
								(element: checkoutElement) => (
									<div>
										<div className="grid w-full grid-cols-4 gap-3 bg-slate-100">
											<p className="py-1 text-sm ">{element.name}</p>
											<p className="py-1 text-sm ">{element.quantity}</p>
											<p className="py-1 text-sm ">{element.price}</p>
											<p className="py-1 text-sm text-center">
												{(element.price * element.quantity).toLocaleString()}
											</p>
										</div>
									</div>
								)
							)}
							<p className="mt-3 text-lg font-bold">
								Total : {totalDue.toLocaleString()}
							</p>
						</div>
						<div>
							<div className="mb-2">
								<p className="my-2 text-center">Payment Details</p>
							</div>
							<div className="flex gap-4 ">
								{paymentDetails &&
									paymentDetails.length !== 0 &&
									paymentDetails.map((detail: paymentDetailType) => (
										<div key={detail.id} className="w-1/3">
											<p className="pb-2 font-bold">{detail.name}</p>
											<TextInput
												id="value"
												type="number"
												onChange={updatePaymentDetails}
												placeholder=".... RWF"
												name={detail.name}
											/>
										</div>
									))}
							</div>
						</div>
						<div className="my-3">
							<p className="py-2 font-semibold">
								Total Amount Paid : {totalPaid}
							</p>
							<p className="py-2 font-semibold">
								Debt : {debt.toLocaleString()}
							</p>
						</div>

						{debt && debt !== 0 ? (
							<div>
								<div className="mb-2">
									<Label htmlFor="clientTel" value="Telephone" />
									<TextInput
										id="clientTel"
										placeholder="client Tel"
										{...register("clientTel")}
									/>
								</div>
								<div className="mb-2">
									<Label htmlFor="clientTel" value="Telephone" />
									<TextInput
										id="clientIdentification"
										placeholder="client Id"
										{...register("clientIdentification")}
									/>
								</div>
							</div>
						) : null}

						<div className="w-full">
							<Button type="submit" className="w-full text-center">
								Submit Payment
							</Button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default ServiceSellTransactionModel;
