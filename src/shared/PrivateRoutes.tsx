import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useAuth } from "../Context/AuthContext";

interface privateRoutesProps {
	allowedPositions: string[];
	element: ReactElement;
}
export const PrivateRoutes = ({
	allowedPositions,
	element,
}: privateRoutesProps) => {
	const { user } = useAuth();

	if (!user) {
		return <Navigate to="/" />;
	}
	if (
		allowedPositions &&
		allowedPositions.length !== 0 &&
		!allowedPositions.includes(user.role)
	) {
		<Navigate to={`/${user.role}`} />;
	}

	return element;
};
