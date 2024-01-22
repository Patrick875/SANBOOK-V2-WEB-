//jshint esversion:9
import { Routes, Route, useLocation } from "react-router-dom";
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
import { HRHome } from "./Scenes/HR/HRHome";
import { Employees } from "./Scenes/HR/Employees";
import { Contracts } from "./Scenes/HR/Contracts";
import { Payroll } from "./Scenes/HR/Payroll";
import { Departments } from "./Scenes/HR/Departments";
import { Positions } from "./Scenes/HR/Positions";
import { AllPositions } from "./Scenes/HR/AllPositions";
import { CreatePosition } from "./Scenes/HR/CreatePosition";
import { Position } from "./Scenes/HR/Position";
import { AllEmployees } from "./Scenes/HR/AllEmployees";
import { CreateEmployee } from "./Scenes/HR/CreateEmployee";
import { Employee } from "./Scenes/HR/Employee";
import { AllDepartments } from "./Scenes/HR/AllDepartments";
import { CreateDepartment } from "./Scenes/HR/CreateDepartment";
import EmployeeWorkData from "./Scenes/HR/EmployeeWorkData";
import EmployeeContractData from "./Scenes/HR/EmployeeContractData";
import EmployeePersonalData from "./Scenes/HR/EmployeePersonalData";
import EmployeeAdditionalData from "./Scenes/HR/EmployeeAdditionalData";
import AddEmployeeWarning from "./Scenes/HR/AddEmployeeWarning";
import ViewEmployeeWarning from "./Scenes/HR/ViewEmployeeWarning";
import ContractViewLayout from "./Scenes/HR/ContractViewLayout ";
import StockPage from "./Scenes/Stock";
import StockDashboard from "./Scenes/Stock/Dashboard/StockDashboard";
import Requests from "./Scenes/Stock/Requests/Requests";
import Stock from "./Scenes/Stock/Stock/Stock";
import PurchaseOrders from "./Scenes/Stock/PurchaseOrders/index";
import ReceiveVauchers from "./Scenes/Stock/ReceiveVauchers";
import Suppliers from "./Scenes/Stock/Suppliers/Suppliers";
import CostingCenters from "./Scenes/Stock/CostingCenters/CostingCenters";
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
import { BackButton } from "./shared/BackButton";
import ViewPurchaseOrder from "./Scenes/Stock/PurchaseOrders/ViewPurchaseOrder";
import AllReceiveVauchers from "./Scenes/Stock/ReceiveVauchers/AllReceiveVauchers";
import CreateReceiveVaucher from "./Scenes/Stock/ReceiveVauchers/CreateReceiveVaucher";
import ViewReceiveVaucher from "./Scenes/Stock/ReceiveVauchers/ViewReceiveVaucher";
function App() {
	const location = useLocation();
	return (
		<>
			<AnimatePresence>
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
						<Route path="requests" element={<Requests />} />
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
						<Route path="suppliers" element={<Suppliers />} />
						<Route path="costing-centers" element={<CostingCenters />} />
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
									<BackButton />
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
