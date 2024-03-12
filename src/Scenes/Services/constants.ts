import { receptionSideNavs } from "../Reception/types";

export const dashboardNavs: receptionSideNavs[] = [
    {
        tab: "All",
        data: 0,
        link: '',
    },
    {
        tab: "Daily",
        data: 0,
        link: 'daily'
    },

    {
        tab: "Monthly",
        data: 0,
        link: 'monthly'
    },
]

export const subservicesNavs: receptionSideNavs[] = [
    {
        tab: "Services",
        data: 0,
        link: '',
    },
    {
        tab: "Categories",
        data: 0,
        link: 'categories',
    },

]
export const subServicesSalesNavs: receptionSideNavs[] = [
    {
        tab: "All Sales",
        data: 0,
        link: '',
    },
    {
        tab: "Debts",
        data: 0,
        link: 'debts'
    },
]
export const subServiceStockNavs: receptionSideNavs[] = [
    {
        tab: "Current Stock",
        data: 0,
        link: '',
    },
    {
        tab: "Stock requests",
        data: 0,
        link: 'requests'
    },
]