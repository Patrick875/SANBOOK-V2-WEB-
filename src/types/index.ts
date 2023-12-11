import { ReactElement } from "react";

export interface user {
    username: string;
    email: string;
    role: string;
}
export interface navitem {
    page: string;
    link: string;
    icon: ReactElement;
    location: string
}