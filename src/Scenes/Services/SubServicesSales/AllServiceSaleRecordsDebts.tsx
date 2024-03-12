import { useParams } from "react-router-dom";
import { serviceSaleType } from "../types";
import { useFetchData } from "../../../hooks/useFetchData";

function AllServiceSaleRecordsDebts() {
	const { id } = useParams();
	const [serviceSales] = useFetchData("/services/saleswithdebts");

	return (
		<div>
			<p className="my-3 font-bold uppercase">{id} Debts</p>
			<div className="bg-white">
				<div className="grid grid-cols-5 p-3">
					<p>Date</p>
					<p>Client</p>
					<p>Telephone</p>
					<p>User</p>
					<p>Total</p>
				</div>

				{serviceSales &&
					serviceSales.length !== 0 &&
					serviceSales.map((srvcsale: serviceSaleType) => (
						<div key={srvcsale.id} className="grid grid-cols-5 p-3">
							<p>{new Date(srvcsale.datefor).toLocaleDateString("fr-FR")}</p>
							<p>{srvcsale.clientname}</p>
							<p>
								{srvcsale.Debts ? srvcsale.Debts[0].clientContact.tel : null}
							</p>
							<p></p>
							<p>
								{srvcsale.Debts
									? srvcsale.Debts[0].value.toLocaleString()
									: null}
							</p>
						</div>
					))}
			</div>
		</div>
	);
}

export default AllServiceSaleRecordsDebts;
