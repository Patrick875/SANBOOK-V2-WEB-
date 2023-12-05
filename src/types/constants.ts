import { ReactNode } from 'react';
interface navitem {
    page: string;
    link: string;
    icon: ReactNode;
    location: string
}

export const serverDev: string = 'http://localhost:5000/api/v1/'

