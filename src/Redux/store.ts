import { configureStore } from "@reduxjs/toolkit";
import createContractReducer from '../Scenes/HR/Employees/contractSlice'
import authUserReducer from './userSlice'
import sideBarSlice from "./sideBarSlice";
export const store = configureStore({
    reducer: {
        createContractDetails: createContractReducer,
        authUser: authUserReducer,
        sideBarSize: sideBarSlice,
    }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;