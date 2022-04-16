import {AxiosResponse}from 'axios'
import {DeviceResponse} from "../types/DeviceResponse";
import {$authHost, $host} from '../http/index'
import {BrandResponse} from "../types/BrandResponse";
import {TypeResponse} from "../types/TypeResponse";
import {IDevice} from "../types/IDevice";
import {ICreate} from "../types/ICreate";
import {IUpdate} from "../types/IUpdate";
import {IType} from "../types/IType";
import {IBrand} from "../types/IBrand";
import {IInfo} from "../types/IInfo";
import {DevicePaginationResponse} from "../types/DevicePaginationResponse";
export default class DeviceService {
    //товары
    static async getDevices(brand:string, type:string, page:number, limit:number):Promise<AxiosResponse<DevicePaginationResponse>>{
        return $host.get('/device/get', {params: {brand, type, page, limit}})
    }
    static async getOneDevice(id: string):Promise<AxiosResponse<IDevice>>{
        return $host.get('/device/get/'+id)
    }
    static async createDevice(device: FormData):Promise<AxiosResponse<DeviceResponse>>{
        return $authHost.post('/device/create', device)
    }
    static async deleteDevice(id: string):Promise<AxiosResponse<DeviceResponse>>{
        return $authHost.post('/device/delete', {id})
    }
    static async updateDevice(id: string, newDeviceData: IDevice):Promise<AxiosResponse<DeviceResponse>>{
        return $authHost.post('/device/update', {id, newDeviceData})
    }
    //типы
    static async getTypes():Promise<AxiosResponse<TypeResponse>>{
        return $host.get('/type/get')
    }
    static async createType(newType: ICreate):Promise<AxiosResponse<IType>>{
        return $authHost.post('/type/create', newType)
    }
    static async updateType(type: IUpdate):Promise<AxiosResponse<IType>>{
        return $authHost.post('/type/update', type)
    }
    static async deleteType(name:string):Promise<AxiosResponse>{
        return $authHost.post('/type/delete', {name})
    }
    //бренды
    static async getBrands():Promise<AxiosResponse<BrandResponse>>{
        return $host.get('/brand/get')
    }
    static async createBrand(newBrand: ICreate):Promise<AxiosResponse<IBrand>>{
        return $authHost.post('/brand/create', newBrand)
    }
    static async updateBrand(brand: IUpdate):Promise<AxiosResponse<IBrand>>{
        return $authHost.post('/brand/update', brand)
    }
    static async deleteBrand(name:string):Promise<AxiosResponse>{
        return $authHost.post('/brand/delete', {name})
    }
}