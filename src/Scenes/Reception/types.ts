export interface receptionSideNavs {
    tab: string;
    link: string;
    data?: number
}

export interface RoomTypeInterface {
    id: number;
    name: string;
    icon: string;
    code: string;
    numberofchildren: number;
    numberofadults: number;
    smockingallowed: boolean;
    active: boolean;
    bedtype: string;
    Rooms?: RoomInterface[];
    RoomRates?: RoomRateInterface[]
}
export interface RoomInterface {
    id?: number;
    type: number;
    name: string;
    receptionStatus?: string;
    houseKeepingStatus?: string;
    location?: string;
    RoomType?: RoomTypeInterface;

}
export interface RoomRateInterface {
    id: number;
    roomType: number;
    name: string;
    value: number;
}
export interface roomReceiptionStatusType {
    name: string;
    bgColor: string;
}
export interface roomBookingInterface {
    refId?: string;
    guest: number;
    room: number;
    numberOfAdults?: number;
    numberOfChildren?: number;
    checkinDate: Date;
    checkoutDate: Date;
    commingFrom?: string;
    goingTo?: string;
    datesIn: Date[];
    Room?: RoomInterface;
    Guest: guestInterface;
}
export interface guestInterface {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    tel: string;
    placeOfBirth: string;
    nationality: string;
    residency: string;
    bookedFrom: number;
    company: string;
    passportNumber: string;
    identitycardNumber: string;
    identificationIssuePlace: string;
    identificationIssueDate: Date;
    profession: string;
    otherNote: string;
    creditCards?: any;
    fleights?: any;
}
