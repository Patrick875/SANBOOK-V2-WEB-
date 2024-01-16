import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext.tsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Router>
			<AuthProvider>
				<Provider store={store}>
					<App />
				</Provider>
			</AuthProvider>
		</Router>
	</React.StrictMode>
);
