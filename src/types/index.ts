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

export interface purchaseOrder {
    date: string;
    firstapproval: boolean | null;
    id: number;
    purchaseOrderId: string;
    secondapproval: boolean | null;
    status: string;
    thirdapproval: string | null;
    total: number;
    userId: number | null;
}

interface Item {
    id: number;
    name: string;
    category: number;
    store: number;
    mainunit: number;
    price: number;
    createdBy: any; // You can replace 'any' with the actual type of 'createdBy'
}

interface StockPurchaseOrderDetail {
    id: number;
    ItemId: number;
    currentQuantity: number;
    requestQuantity: number;
    unitPrice: number;
    unit: any; // You can replace 'any' with the actual type of 'unit'
    Item: Item;
}

interface StockPurchaseOrder {
    id: number;
    date: string;
    status: string | null;
    firstapproval: any; // You can replace 'any' with the actual type of 'firstapproval'
    secondapproval: any; // You can replace 'any' with the actual type of 'secondapproval'
    thirdapproval: any; // You can replace 'any' with the actual type of 'thirdapproval'
    userId: any; // You can replace 'any' with the actual type of 'userId'
    total: number;
    purchaseOrderId: string;
    StockPurchaseOrderDetails: StockPurchaseOrderDetail[];
}

interface ReceiveVoucherDetail {
    id: number;
    item: number;
    receiveVoucherId: number;
    receivedQuantity: number;
    unitPrice: number;
    Item: Item;
}

export interface receiveVoucher {
    id: number;
    date: string;
    status: string | null;
    total: number;
    receiveVoucherId: number | null;
    approvals: any; // You can replace 'any' with the actual type of 'approvals'
    StockPurchaseOrder: StockPurchaseOrder;
    ReceiveVoucherDetails: ReceiveVoucherDetail[];
}

export interface img {
    data: string;
    url: string;
}

export interface identity {
    name: string;
    id: number;
}

export interface baughtItem {
    id: number;
    item: number | number;
    quantity: number;
    price: number;
    unit: null | number;
    createdAt: string;
    updatedAt: string;
    Item: item | null
}

export interface item {
    id: number;
    name: string;
    category: number;
    store: number;
    mainunit: number;
    price: number;
    createdBy: null | number;
    createdAt: string;
    updatedAt: string;
}


export interface stockRequestItem {
    id: number;
    request: number;
    item: number;
    quantity: number;
    unit: null | string;
    price: number;
    createdAt: string;
    updatedAt: string;
    BaughtItem: baughtItem
}

export interface stockrequest {
    CostingCenterRequestItems?: stockRequestItem[] | null;
    costingcenter: number;
    createdAt: string;
    date: string;
    id: number;
    status: string;
    updatedAt: string
}