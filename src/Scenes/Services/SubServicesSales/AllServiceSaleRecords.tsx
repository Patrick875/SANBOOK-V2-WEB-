import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { serviceSaleDetailsType, serviceSaleType } from "../types";
import React from "react";

function AllServiceSaleRecords() {
	const { id } = useParams();
	const [serviceSales] = useFetchData("/services/sales");
	console.log("services", serviceSales);

	return (
		<div>
			<p className="my-3 font-bold uppercase">{id} Sales</p>
			<div className="bg-white">
				<div className="grid grid-cols-8 p-3">
					<p>Name/Room</p>
					<p>User</p>
					<div className="grid grid-cols-2 col-span-2 ">
						<p>Service</p>
						<p>P/U</p>
					</div>
					<div className="grid grid-cols-3 col-span-3 ">
						<p>CASH</p>
						<p>MOMO</p>
						<p>POS</p>
					</div>
					<p>Total</p>
				</div>
				{serviceSales &&
					serviceSales.length !== 0 &&
					serviceSales.map((srvcsale: serviceSaleType) => (
						<div key={srvcsale.id} className="grid grid-cols-8 p-3">
							<p>{srvcsale.clientname}</p>
							<p></p>

							<div className="grid grid-cols-2 col-span-2 justify-items-center">
								{srvcsale.ServiceSaleDetails?.map(
									(detail: serviceSaleDetailsType) => (
										<React.Fragment>
											<div className="pb-2 font-semibold">
												{detail.Service.name + `(${detail.quantity})`}
											</div>
											<div className="pb-2 font-semibold">
												{detail.Service.pricerwf}
											</div>
										</React.Fragment>
									)
								)}
							</div>

							<p>
								{
									srvcsale.Payments?.find(
										(el) => el.AccountType.name.toLowerCase() === "cash"
									)?.value
								}
							</p>
							<p>
								{
									srvcsale.Payments?.find(
										(el) => el.AccountType.name.toLowerCase() === "mobile money"
									)?.value
								}
							</p>
							<p>
								{
									srvcsale.Payments?.find(
										(el) => el.AccountType.name.toLowerCase() === "pos"
									)?.value
								}
							</p>
							<p>{srvcsale.total_due}</p>
						</div>
					))}
			</div>
		</div>
	);
}

export default AllServiceSaleRecords;
