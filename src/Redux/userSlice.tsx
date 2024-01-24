import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { authUser, user } from "../types";
import { RootState } from "./store";

const initialState: authUser = {
	user: {
		username: "",
		fullname: "",
		email: "",
		employeeId: "",
		status: "",
		role: "",
		profileImg: "",
	},
	isAuth: false,
};

export const authUserSlice = createSlice({
	name: "authUser",
	initialState,
	reducers: {
		loginAuthUser: (state, action: PayloadAction<user>) => {
			const { payload } = action;

			state = { ...state, user: payload, isAuth: true };
			return { ...state, user: payload, isAuth: true };
		},
		logoutUser: (state) => {
			state = { ...state, user: null, isAuth: false };
			return { ...state, user: null, isAuth: false };
		},
	},
});
export const { loginAuthUser, logoutUser } = authUserSlice.actions;
export const authUserSelector = (state: RootState) => state.authUser;
export default authUserSlice.reducer;
