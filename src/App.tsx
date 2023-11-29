//jshint esversion:9
import { Routes, Route } from "react-router-dom";
import { Login } from "./Scenes/Login";
import { ResetPassword } from "./Scenes/ResetPassword";
function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/reset-password" element={<ResetPassword />} />
			</Routes>
		</>
	);
}

export default App;
