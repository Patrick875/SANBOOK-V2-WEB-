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
import ContractBasicInfo from "./Scenes/HR/ContractBasicInfo";
import ContractEmploymentPeriod from "./Scenes/HR/ContractEmploymentPeriod";
import ContractSalaryAndFacilities from "./Scenes/HR/ContractSalaryAndFacilities";
import ContractTermsAndConditions from "./Scenes/HR/ContractTermsAndConditions";
import { CreateContractDetailsProvider } from "./Context/CreateContractContext";
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
					</Route>
					<Route
						path="/add-contract"
						element={
							<CreateContractDetailsProvider>
								<ContractViewLayout />
							</CreateContractDetailsProvider>
						}>
						<Route index element={<ContractBasicInfo />} />
						<Route path="period" element={<ContractEmploymentPeriod />} />
						<Route path="salary" element={<ContractSalaryAndFacilities />} />
						<Route path="terms" element={<ContractTermsAndConditions />} />
					</Route>
				</Routes>
			</AnimatePresence>
		</>
	);
}

export default App;
