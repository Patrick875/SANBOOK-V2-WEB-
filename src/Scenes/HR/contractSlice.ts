import { RootState } from './../../Redux/store';
import { employee, term } from './../../types/index';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { contractDetailsType } from "../../types";



const initialState: contractDetailsType =
{
    effectsfrom: '',
    effectstill: '',
    workingshiftstarts: '',
    workingshiftends: '',
    employee: null,
    contractclauses: [],
}

export const contractSlice = createSlice({
    name: "createContractDetails",
    initialState,
    reducers: {
        addEmployee: (state, action: PayloadAction<employee>) => {
            const { payload } = action;

            state = { ...state, employee: payload }
            return { ...state, employee: payload };
        },
        updateStoredTerms: (state, action: PayloadAction<term[]>) => {
            const { payload } = action;

            state = { ...state, contractclauses: [...payload] }

            return { ...state, contractclauses: [...payload] }
        },
        updateOtherFields: (state, action: PayloadAction<any>) => {
            const { payload } = action
            state = { ...state, ...payload }
            return { ...state, ...payload }
        }
    },
});
export const { addEmployee, updateStoredTerms, updateOtherFields } =
    contractSlice.actions;
export const createContractSelector = (state: RootState) => state.createContractDetails;
export default contractSlice.reducer;



