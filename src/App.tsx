//jshint esversion:9
import { Routes, Route, useLocation } from "react-router-dom";
import { Login } from "./Scenes/Login";
import { ResetPassword } from "./Scenes/ResetPassword";
import { LoginResetLayout } from "./Scenes/Login/LoginResetLayout";
import { AnimatePresence } from "framer-motion";
import { AdminDashboard } from "./Scenes/Admin";
import { Users } from "./Scenes/Admin/Users";
import { Logs } from "./Scenes/Admin/Logs";
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
					<Route path="/admin" element={<AdminDashboard />}>
						<Route index element={<Users />} />
						<Route path="logs" element={<Logs />} />
					</Route>
				</Routes>
			</AnimatePresence>
		</>
	);
}

export default App;
