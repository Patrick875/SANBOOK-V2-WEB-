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
import CreateStockRequest from "./Scenes/HR/HRStock/CreateStockRequest";
import AllRequests from "./Scenes/Stock/Requests/AllRequests";
import RequestDetails from "./Scenes/Stock/Requests/RequestDetails";
import ReceptionPage from "./Scenes/Reception";
import ReceptionDashboard from "./Scenes/Reception/Dashbaord";
import Bookings from "./Scenes/Reception/Bookings";
import Calendar from "./Scenes/Reception/Calendar";
import Events from "./Scenes/Reception/Events";
import Rooms from "./Scenes/Reception/Rooms";
import Services from "./Scenes/Reception/Services";
import Accounting from "./Scenes/Reception/Accounting";
import Guests from "./Scenes/Reception/Guests";
import CurrentBookings from "./Scenes/Reception/Bookings/CurrentBookings";
import Reminders from "./Scenes/Reception/Bookings/Reminders";
import UnconfirmedBookings from "./Scenes/Reception/Bookings/UnconfirmedBookings";
import UpcomingBookings from "./Scenes/Reception/Bookings/UpcomingBookings";
import BookingsHistory from "./Scenes/Reception/Bookings/BookingsHistory";
import CanceledBookings from "./Scenes/Reception/Bookings/CanceledBookings";
import CreateBookingModel from "./Scenes/Reception/Bookings/CreateBookingModel";
import AllRooms from "./Scenes/Reception/Rooms/AllRooms";
import RoomStatus from "./Scenes/Reception/Rooms/RoomStatus";
import RoomRates from "./Scenes/Reception/Rooms/RoomRates";
import RoomTypes from "./Scenes/Reception/Rooms/RoomTypes";
import RoomReports from "./Scenes/Reception/Rooms/RoomReports";
import CreateRoomType from "./Scenes/Reception/Rooms/CreateRoomType";
import CreateRoom from "./Scenes/Reception/Rooms/CreateRoom";
import ServicesPage from "./Scenes/Services";
import ServicesDashboard from "./Scenes/Services/ServicesDashboard";
import ServiceSubServices from "./Scenes/Services/Subservices";
import AllSubservices from "./Scenes/Services/Subservices/AllSubservices";
import CreateSubService from "./Scenes/Services/Subservices/CreateSubService";
import SubServiceRates from "./Scenes/Services/Subservices/SubServiceRates";
import AllServiceSales from "./Scenes/Services/SubServicesSales";
import ServiceStock from "./Scenes/Services/Storage";
import CurrentStock from "./Scenes/Services/Storage/CurrentStock ";
import ServiceStockRequests from "./Scenes/Services/Storage/ServiceStockRequests";
import AllStockRequests from "./Scenes/Services/Storage/AllStockRequests";
import CreateServiceStockRequest from "./Scenes/Services/Storage/CreateServiceStockRequest";
import StockRequestDetails from "./Scenes/Services/Storage/StockRequestDetails";
import SubServiceCategories from "./Scenes/Services/Subservices/SubServiceCategories";
import SubServiceCategoriesLayout from "./Scenes/Services/Subservices/SubServiceCategoriesLayout";
import CreateSubServiceCategories from "./Scenes/Services/Subservices/CreateSubServiceCategories";
import AllServiceSaleRecords from "./Scenes/Services/SubServicesSales/AllServiceSaleRecords";
import AllServiceSaleRecordsDebts from "./Scenes/Services/SubServicesSales/AllServiceSaleRecordsDebts";
function App() {
	const location = useLocation();
	const navigate = useNavigate();
	return (
		<>
			<AnimatePresence>
				<Toaster
					position="top-center"
					toastOptions={{ duration: 4000, position: "top-center" }}
				/>
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
						path="/hr"
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
						<Route
							path="stock/costing-centers/:id"
							element={<CostingCenterDetails />}>
							<Route index element={<EstimatedStock />} />
							<Route path="requests" element={<CostingCenterRequests />}>
								<Route index element={<AllCostingCenterRequests />} />
								<Route path="create" element={<CreateStockRequest />} />
								<Route path=":requestId" element={<RequestDetails />} />
							</Route>
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
									<Route path=":requestId" element={<RequestDetails />} />
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
						path="/reception"
						element={
							<PrivateRoutes
								element={<ReceptionPage />}
								allowedPositions={["receptonist", "admin", "manager"]}
							/>
						}>
						<Route index element={<ReceptionDashboard />} />
						<Route path="bookings" element={<Bookings />}>
							<Route index element={<CurrentBookings />} />
							<Route path="create" element={<CreateBookingModel />} />
							<Route path="reminders" element={<Reminders />} />
							<Route path="unconfirmed" element={<UnconfirmedBookings />} />
							<Route path="upcoming" element={<UpcomingBookings />} />
							<Route path="history" element={<BookingsHistory />} />
							<Route path="canceled" element={<CanceledBookings />} />
						</Route>
						<Route path="calendar" element={<Calendar />} />
						<Route path="events" element={<Events />} />
						<Route path="rooms" element={<Rooms />}>
							<Route index element={<AllRooms />} />
							<Route path="create" element={<CreateRoom />} />
							<Route path="status" element={<RoomStatus />} />
							<Route path="rates" element={<RoomRates />} />
							<Route path="rates/create" element={<RoomRates />} />
							<Route path="types" element={<RoomTypes />} />
							<Route path="types/create" element={<CreateRoomType />} />
							<Route path="reports" element={<RoomReports />} />
						</Route>
						<Route path="services" element={<Services />} />
						<Route path="accounting" element={<Accounting />} />
						<Route path="guests" element={<Guests />} />
					</Route>
					<Route
						path="/services/:id"
						element={
							<PrivateRoutes
								element={<ServicesPage />}
								allowedPositions={[
									"receptonist",
									"admin",
									"manager",
									"service-clerk",
								]}
							/>
						}>
						<Route index element={<ServicesDashboard />} />
						<Route path="services" element={<ServiceSubServices />}>
							<Route index element={<AllSubservices />} />
							<Route path="create" element={<CreateSubService />} />
							<Route path="rates" element={<SubServiceRates />} />
							<Route path="categories" element={<SubServiceCategoriesLayout />}>
								<Route index element={<SubServiceCategories />} />
								<Route path="create" element={<CreateSubServiceCategories />} />
							</Route>
						</Route>

						<Route path="sales" element={<AllServiceSales />}>
							<Route index element={<AllServiceSaleRecords />} />
							<Route path="debts" element={<AllServiceSaleRecordsDebts />} />
						</Route>

						<Route path="stock" element={<ServiceStock />}>
							<Route index element={<CurrentStock />} />
							<Route path="requests" element={<ServiceStockRequests />}>
								<Route index element={<AllStockRequests />} />
								<Route path="create" element={<CreateServiceStockRequest />} />
								<Route
									path="requestDetails/:reqId"
									element={<StockRequestDetails />}
								/>
							</Route>
						</Route>
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
