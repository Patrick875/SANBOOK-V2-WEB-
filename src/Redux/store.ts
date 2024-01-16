import { configureStore } from "@reduxjs/toolkit";
import createContractReducer from './../Scenes/HR/contractSlice'
import authUserReducer from './../shared/userSlice'
export const store = configureStore({
    reducer: {
        createContractDetails: createContractReducer,
        authUser: authUserReducer
    }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;