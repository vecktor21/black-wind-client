import {IInfo} from "./IInfo";

export interface IDevice {
    _id: string;
    name: string;
    price: number;
    img: string;
    info: IInfo[];
    description: string;
    brand: string;
    type: string;
}