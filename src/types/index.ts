import { ReactElement } from "react";

export interface user {
    username: string;
    fullname?: string;
    email: string;
    role?: string;
    employeeId?: string;
    status?: string;
    profileImg?: string
}
export interface authUser {
    user: user;
    isAuth: boolean;
}
export interface salaryDeductionAndAdvantage {
    name: string;
    amount: string;
}
export interface navitem {
    page: string;
    link: string;
    icon: ReactElement;
    location: string
}
export interface modalProps {
    show: boolean;
    setShow: (show: boolean) => void
}
export interface employee {
    fullname: string;
    id: number;
    Position: position;
}
export interface position {
    id: number;
    name: string;
    duties: string[];
    netSallary: number;
    grossSalary: number;
    Department: department;
    SalaryAdvantages: salaryDeductionAndAdvantage[];
    SalaryDeductions: salaryDeductionAndAdvantage[];
}
export interface department {
    id: number;
    name: string;
}
export interface contractDetailsType {
    dateOfSigning?: string;
    effectsfrom?: string;
    effectstill?: string;
    workingshiftstarts?: string;
    workingshiftends?: string;
    workdays?: string[];
    restdays?: string[];
    annualleave?: number;
    annualleaveafter?: string;
    contractclauses?: term[];
    employee?: employee | null;
}

export interface contractStepProps {
    currentStep: number;
    updateStep: (el: number) => void;
}
export interface term {
    id: string;
    text: string;
}
export interface employeeRequest {
    employeeId: number;
    id: number;
    title: string;
    type: string;
    description: string;
    status: string;
    submittedon: string;
    cc: string;
    updatedon: string;
    createdBy: number;
}

export interface itemcategory {
    name: string,
    id: number,
    Store: store;
}
export interface store {
    name: string;
    selling: boolean;
    active: boolean
}
export interface item {
    name: string;
    price: number;
    store: number;
    category: number;

}

export interface purcPlaceholder {
    id: string;
    name: string;
    quantity: number;
    times: number,
    price: number,
    date: string;
}

export interface error {
    status: boolean;
    message: string;
}