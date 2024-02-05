//jshint esversion:9
import { Toaster } from "react-hot-toast";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Login } from "./Scenes/Login";
import { ResetPassword } from "./Scenes/ResetPassword";
import { LoginResetLayout } from "./Scenes/Login/LoginResetLayout";
import { AnimatePresence } from "framer-motion";
import { AdminDashboard } from "./Scenes/Admin";
import { Users } from "./Scenes/Admin/Users";
import { Logs } from "./Scenes/Admin/Logs";
import { AllUsers } from "./Scenes/Admin/AllUsers";
import { RegisterUser } from "./Scenes/Admin/RegisterUser";
import { Dashboard } from "./Scenes/Admin/Dashboard";
import { PrivateRoutes } from "./shared/PrivateRoutes";
import { HRDashboard } from "./Scenes/HR";
import { HRHome } from "./Scenes/HR/Dashboard/HRHome";
import { Employees } from "./Scenes/HR/Employees/Employees";
import { Contracts } from "./Scenes/HR/Contracts/Contracts";
import { Payroll } from "./Scenes/HR/Payroll/Payroll";
import { Departments } from "./Scenes/HR/Departments/Departments";
import { Positions } from "./Scenes/HR/Positions/Positions";
import { AllPositions } from "./Scenes/HR/Positions/AllPositions";
import { CreatePosition } from "./Scenes/HR/Positions/CreatePosition";
import { Position } from "./Scenes/HR/Positions/Position";
import { AllEmployees } from "./Scenes/HR/Employees/AllEmployees";
import { CreateEmployee } from "./Scenes/HR/Employees/CreateEmployee";
import { Employee } from "./Scenes/HR/Employees/Employee";
import { AllDepartments } from "./Scenes/HR/Departments/AllDepartments";
import { CreateDepartment } from "./Scenes/HR/Departments/CreateDepartment";
import EmployeeWorkData from "./Scenes/HR/Employees/EmployeeWorkData";
import EmployeeContractData from "./Scenes/HR/Employees/EmployeeContractData";
import EmployeePersonalData from "./Scenes/HR/Employees/EmployeePersonalData";
import EmployeeAdditionalData from "./Scenes/HR/Employees/EmployeeAdditionalData";
import AddEmployeeWarning from "./Scenes/HR/Employees/AddEmployeeWarning";
import ViewEmployeeWarning from "./Scenes/HR/Employees/ViewEmployeeWarning";
import ContractViewLayout from "./Scenes/HR/Employees/ContractViewLayout ";
import StockPage from "./Scenes/Stock";
import StockDashboard from "./Scenes/Stock/Dashboard/StockDashboard";
import Requests from "./Scenes/Stock/Requests/Requests";
import Stock from "./Scenes/Stock/Stock";
import PurchaseOrders from "./Scenes/Stock/PurchaseOrders/index";
import ReceiveVauchers from "./Scenes/Stock/ReceiveVauchers";
import Suppliers from "./Scenes/Stock/Suppliers";
import CostingCenters from "./Scenes/Stock/CostingCenters";
import Stores from "./Scenes/Stock/Stores/Stores";
import StockItems from "./Scenes/Stock/Item/StockItems";
import ItemCategories from "./Scenes/Stock/ItemCategories/ItemCategories";
import Reports from "./Scenes/Stock/Reports/Reports";
import CreateStore from "./Scenes/Stock/Stores/CreateStore";
import StoresIndex from "./Scenes/Stock/Stores/StoresIndex";
import Profile from "./shared/Profile";
import PersonalLogs from "./shared/PersonalLogs";
import AllItemCategories from "./Scenes/Stock/ItemCategories/AllItemCategories";
import AddItemCategory from "./Scenes/Stock/ItemCategories/AddItemCategory";
import AllStockItems from "./Scenes/Stock/Item/AllStockItems";
import CreateItem from "./Scenes/Stock/Item/CreateItem";
import StoreDetails from "./Scenes/Stock/Stores/StoreDetails";
import AllPurchaseOrders from "./Scenes/Stock/PurchaseOrders/AllPurchaseOrders";
import CreatePurchaseOrder from "./Scenes/Stock/PurchaseOrders/CreatePurchaseOrder";
import ViewPurchaseOrder from "./Scenes/Stock/PurchaseOrders/ViewPurchaseOrder";
import AllReceiveVauchers from "./Scenes/Stock/ReceiveVauchers/AllReceiveVauchers";
import CreateReceiveVaucher from "./Scenes/Stock/ReceiveVauchers/CreateReceiveVaucher";
import ViewReceiveVaucher from "./Scenes/Stock/ReceiveVauchers/ViewReceiveVaucher";
import CreateSupplier from "./Scenes/Stock/Suppliers/CreateSupplier";
import AllSuppliers from "./Scenes/Stock/Suppliers/AllSuppliers";
import SupplierDetails from "./Scenes/Stock/Suppliers/SupplierDetails";
import SupplierDetailsContainer from "./Scenes/Stock/Suppliers/SupplierDetailsContainer";
import SupplierDetailsList from "./Scenes/Stock/Suppliers/SupplierDetailsList";
import AllCostingCenters from "./Scenes/Stock/CostingCenters/AllCostingCenters";
import CreateCostingCenter from "./Scenes/Stock/CostingCenters/CreateCostingCenter";
import CostingCenterDetails from "./Scenes/Stock/CostingCenters/CostingCenterDetails";
import EstimatedStock from "./Scenes/Stock/CostingCenters/EstimatedStock";
import CostingCenterRequests from "./Scenes/Stock/Common/CostingCenterRequests";
import AllCostingCenterRequests from "./Scenes/Stock/CostingCenters/AllCostingCenterRequests";
import CostingCenterRequest from "./Scenes/Stock/CostingCenters/CostingCenterRequest";
import CostingCenterSettings from "./Scenes/Stock/CostingCenters/CostingCenterSettings";
import HrStock from "./Scenes/HR/HRStock/HrStock";
import AllHRRequests from "./Scenes/HR/HRStock/AllHRRequests";
import CreateStockRequest from "./Scenes/HR/HRStock/CreateStockRequest";
import AllRequests from "./Scenes/Stock/Requests/AllRequests";
import RequestDetails from "./Scenes/Stock/Requests/RequestDetails";
function App() {
	const location = useLocation();
	const navigate = useNavigate();
	return (
		<>
			<AnimatePresence>
				<Toaster position="top-center" duration={4000} />
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<LoginResetLayout />}>
						<Route index element={<Login />} />
						<Route path="reset-password" element={<ResetPassword />} />
					</Route>
					<Route
						path="/admin"
						element={
							<PrivateRoutes
								element={<AdminDashboard />}
								allowedPositions={["admin"]}
							/>
						}>
						<Route index element={<Dashboard />} />
						<Route path="users" element={<Users />}>
							<Route index element={<AllUsers />} />
							<Route path="register-user" element={<RegisterUser />} />
						</Route>
						<Route path="logs" element={<Logs />} />
					</Route>
					<Route
						path="/user"
						element={
							<PrivateRoutes
								element={<HRDashboard />}
								allowedPositions={["user"]}
							/>
						}>
						<Route index element={<HRHome />} />
						<Route path="employees" element={<Employees />}>
							<Route index element={<AllEmployees />} />
							<Route path="create-new" element={<CreateEmployee />} />
							<Route path=":emid" element={<Employee />}>
								<Route index element={<EmployeeWorkData />} />
								<Route path="addwarning" element={<AddEmployeeWarning />} />
								<Route path="viewwarning" element={<ViewEmployeeWarning />} />
								<Route path="contract" element={<EmployeeContractData />} />
								<Route path="add-contract" element={<ContractViewLayout />} />
								<Route path="personaldata" element={<EmployeePersonalData />} />
								<Route
									path="additionaldata"
									element={<EmployeeAdditionalData />}
								/>
							</Route>
						</Route>
						<Route path="contracts" element={<Contracts />} />
						<Route path="payroll" element={<Payroll />} />
						<Route path="stock" element={<HrStock />}>
							<Route index element={<AllHRRequests />} />
							<Route path="create" element={<CreateStockRequest />} />
						</Route>
						<Route path="departments" element={<Departments />}>
							<Route index element={<AllDepartments />} />
							<Route path="create" element={<CreateDepartment />} />
						</Route>
						<Route path="positions" element={<Positions />}>
							<Route index element={<AllPositions />} />
							<Route path="create" element={<CreatePosition />} />
							<Route path=":posid" element={<Position />} />
						</Route>
						<Route path="my-profile" element={<Profile />} />
						<Route path="mylogs" element={<PersonalLogs />} />
					</Route>
					<Route path="/add-contract" element={<ContractViewLayout />} />
					<Route
						path="/stock"
						element={
							<PrivateRoutes
								element={<StockPage />}
								allowedPositions={["user"]}
							/>
						}>
						<Route index element={<StockDashboard />} />
						<Route path="requests" element={<Requests />}>
							<Route index element={<AllRequests />} />
							<Route path=":requestId" element={<RequestDetails />} />
						</Route>
						<Route path="storage" element={<Stock />} />
						<Route path="purchase-orders" element={<PurchaseOrders />}>
							<Route index element={<AllPurchaseOrders />} />
							<Route path="create" element={<CreatePurchaseOrder />} />
							<Route path=":order" element={<ViewPurchaseOrder />} />
						</Route>
						<Route path="receive-vauchers" element={<ReceiveVauchers />}>
							<Route index element={<AllReceiveVauchers />} />
							<Route path="create" element={<CreateReceiveVaucher />} />
							<Route path=":order" element={<ViewReceiveVaucher />} />
						</Route>
						<Route path="suppliers" element={<Suppliers />}>
							<Route index element={<AllSuppliers />} />
							<Route path="create" element={<CreateSupplier />} />
							<Route path=":supplier" element={<SupplierDetailsContainer />}>
								<Route index element={<SupplierDetails />} />
								<Route path=":list" element={<SupplierDetailsList />} />
							</Route>
						</Route>
						<Route path="costing-centers" element={<CostingCenters />}>
							<Route index element={<AllCostingCenters />} />
							<Route path="create" element={<CreateCostingCenter />} />
							<Route path=":id" element={<CostingCenterDetails />}>
								<Route index element={<EstimatedStock />} />
								<Route path="requests" element={<CostingCenterRequests />}>
									<Route index element={<AllCostingCenterRequests />} />
									<Route path=":id" element={<CostingCenterRequest />} />
								</Route>
								<Route path="settings" element={<CostingCenterSettings />} />
							</Route>
						</Route>
						<Route path="stores" element={<StoresIndex />}>
							<Route index element={<Stores />} />
							<Route path="create" element={<CreateStore />} />
							<Route path=":name" element={<StoreDetails />} />
						</Route>
						<Route path="item-categories" element={<ItemCategories />}>
							<Route index element={<AllItemCategories />} />
							<Route path="create" element={<AddItemCategory />} />
						</Route>
						<Route path="stock-items" element={<StockItems />}>
							<Route index element={<AllStockItems />} />
							<Route path="create" element={<CreateItem />} />
						</Route>
						<Route path="reports" element={<Reports />} />
					</Route>
					<Route
						path="*"
						element={
							<div className="flex flex-col items-center justify-center w-full min-h-screen p-8">
								<div>
									<p className="my-3">
										Hey There Lad... You lost or what ? Get back to safety{" "}
									</p>
									<button
										className="px-6 py-1 text-white bg-sky-900"
										onClick={() => {
											navigate("/");
										}}>
										{" "}
										Return
									</button>
								</div>
							</div>
						}
					/>
				</Routes>
			</AnimatePresence>
		</>
	);
}

export default App;
