import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface fullSidebar {
	isFull: boolean;
}

const initialState: fullSidebar = {
	isFull: true,
};

export const sideBarSlice = createSlice({
	name: "sideBarSize",
	initialState,
	reducers: {
		toggleSideBar: (state) => {
			state.isFull = !state.isFull;
		},
	},
});

export const { toggleSideBar } = sideBarSlice.actions;
export const sideBarSizeSelector = (state: RootState) =>
	state.sideBarSize.isFull;
export default sideBarSlice.reducer;
