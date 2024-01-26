import { purcPlaceholder } from "."
import instance from "../API";
export const serverDev: string = 'http://localhost:5000/api/v1/'

export const fileToDataURL = (file): string => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(file);
    });
};

export const fetchData = async (url: string) => {
    try {
        const res = await instance.get(url);
        if (res.data && res.data.data) {
            return res.data.data;
        }
    } catch (error) {
        console.log("err", error);
    }
};


export const initialRows: purcPlaceholder[] = [
    {
        id: crypto.randomUUID(),
        name: '',
        quantity: 0,
        times: 0,
        price: 0,
        date: '',
    },
    {
        id: crypto.randomUUID(),
        name: '',
        quantity: 0,
        times: 0,
        price: 0,
        date: '',
    },
    {
        id: crypto.randomUUID(),
        name: '',
        quantity: 0,
        times: 0,
        price: 0,
        date: '',
    },
    {
        id: crypto.randomUUID(),
        name: '',
        quantity: 0,
        times: 0,
        price: 0,
        date: '',
    },
]