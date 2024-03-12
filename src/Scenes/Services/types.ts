export interface ServiceCategoryInterface {
    id?: number;
    name: string;
    active?: boolean;
}

export interface SubServiceInterface {
    id?: number
    name: string;
    headerImage?: string;
    active?: boolean;
    category: number;
    pricerwf: number;
    priceusd: number;
    ServiceCategory?: ServiceCategoryInterface;
    SericcePackages?: servicePackageInterface[];
}
export interface servicePackageInterface {
    id?: number;
    refId?: string;
    name: string;
    service?: number;
    active?: boolean,
    pricerwf: number;
    priceusd: number
}

export interface checkoutElement {
    id: number;
    name: string;
    price: number;
    quantity: number;
}
export interface ServiceCheckoutDetails {
    total: number;
    checkoutElements: checkoutElement[]
}

export interface serviceSaleDetailsType {
    id: number;
    service: number;
    service_package?: number;
    quantity: number;
    serviceSale: number;
    Service: SubServiceInterface;

}

export interface serviceSaleType {
    id?: number,
    clientname: string;
    amount_paid: number;
    total_due: number;
    datefor: Date;
    ServiceSaleDetails?: serviceSaleDetailsType[];
    Payments?: servicePayment[];
    Debts?: serviceDebt[]
}

export interface identity {
    id: number,
    name: string,
}


export interface servicePayment {
    id: number,
    service: number | null,
    paymentMethod: number,
    value: number,
    date: string,
    servicesale: number,
    AccountType: identity,

}
export interface serviceDebt {
    id: number;
    clientName: string;
    value: number;
    clientContact: {
        tel: string | null;
        email: string | null;
        identification: string | null;
    },
    service: number,
    dateRegistered: string;

}

