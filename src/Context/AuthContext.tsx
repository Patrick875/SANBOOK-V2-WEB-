import { useState, useContext, createContext } from "react";
import Cookie from "js-cookie";

interface user {
	username: string;
	email: string;
	role: string;
}

interface authContextType {
	isAuth: boolean;
	user: user;
	loginUser: (user: user) => void;
	logoutUser: () => void;
}
const authContext = createContext<authContextType | null>(null);
export const useAuth = () => {
	const context = useContext(authContext);
	if (!context) {
		throw new Error("useAuth is only used inside authProvider");
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const browserUser = Cookie.get("user")
		? JSON.parse(Cookie.get("user"))
		: null;
	const authenticated =
		Cookie.get("token") &&
		Cookie.get("token") !== "" &&
		Cookie.get("token") != null
			? true
			: false;
	const [isAuth, setIsAuth] = useState<boolean>(authenticated);
	const [user, setUser] = useState<user | null>(browserUser);
	const loginUser = (user: user): void => {
		setIsAuth(true);
		setUser(user);
	};
	const logoutUser = (): void => {
		Cookie.remove("token");
		Cookie.remove("user");
		setUser(null);
		setIsAuth(false);
	};

	return (
		<authContext.Provider value={{ user, isAuth, loginUser, logoutUser }}>
			{children}
		</authContext.Provider>
	);
};
