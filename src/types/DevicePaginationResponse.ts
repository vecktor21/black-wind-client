import {IDevice} from "./IDevice";

export interface DevicePaginationResponse {
    devices: IDevice[];
    limit: number;
    totalPages: number;
    totalDevices: number,
    currentPage: number
}