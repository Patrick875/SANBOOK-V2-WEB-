
import { receptionSideNavs } from "./receptioTypes";
import { roomReceiptionStatusType } from "./types";

export const bookingsNav: receptionSideNavs[] = [
    {
        tab: "Current bookings",
        data: 0,
        link: '',
    },
    {
        tab: "Reminders /Alerts",
        data: 0,
        link: 'reminders'
    },

    {
        tab: "Unconfirmed bookings",
        data: 0,
        link: 'unconfirmed'
    },
    {
        tab: "Upcoming bookings",
        data: 0,
        link: 'upcoming'
    },
    {
        tab: "History",
        data: 0,
        link: 'history'
    },
    {
        tab: "Canceled",
        data: 0,
        link: 'canceled'
    }
]
export const roomsNav: receptionSideNavs[] = [
    {
        tab: "Rooms",
        link: '',
    },
    {
        tab: "Room Status",
        link: 'status'
    },

    {
        tab: "Room Rates",
        link: 'rates'
    },
    {
        tab: "Room Types",
        link: 'types'
    },
    {
        tab: "Reports",
        link: 'reports'
    },

]

export const roomstatusconds: string[] = [
    "name",
    "code",
    "numberofchildren",
    "numberofadults",
    "smockingallowed",
    "bedtype",
];

export const roomreceptionstatus: roomReceiptionStatusType[] = [
    { name: "free", bgColor: 'text-black' },
    { name: 'occupied', bgColor: 'text-emerald-800' },
    { name: 'reserved', bgColor: 'text-sky-800' },
    { name: 'out of order', bgColor: 'text-pink-800' }
]

export function filterDateDuplicates(dates: Date[]): Date[] {
    // Get the date part of each date object.
    const dateOnly = dates.map((date) => new Date(date).toDateString())

    // Create a set of unique date strings.
    const uniqueDateStrings = new Set(dateOnly)

    // Create a new array of unique dates.
    const uniqueDates = []
    for (const dateString of uniqueDateStrings) {
        uniqueDates.push(new Date(dateString))
    }

    return uniqueDates
}

