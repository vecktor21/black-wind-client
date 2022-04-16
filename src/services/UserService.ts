import {AxiosResponse} from 'axios'
import {AuthResponse} from "../types/AuthResponse";
import {$authHost, $host} from '../http/index'
import {BasketDevice} from "../types/BasketDevice";
export default class UserService {
    static async login(email:string, password:string): Promise<AxiosResponse<AuthResponse>>{
        return $authHost.post('/user/login', {email, password})
    }
    static async registration(email:string, password:string): Promise<AxiosResponse<AuthResponse>>{
        return $authHost.post('/user/registration', {email, password})
    }
    static async logout(){
        return $authHost.post('/user/logout')
    }
    static async checkAuth(): Promise<AxiosResponse<AuthResponse>>{
        return $authHost.get('/user/refresh')
    }
    static async confirmToUpdatePassword(email: string): Promise<AxiosResponse>{
        return $authHost.post('/user/update', {email})
    }
    static async changePassword(email:string, password:string, newPassword:string): Promise<AxiosResponse>{
        return $authHost.post('/user/change-password', {email, password, newPassword})
    }
    static async makeOrder(email:string, basket: BasketDevice[], total: number): Promise<AxiosResponse>{
        return $host.post('/user/order', {email, basket, total})
    }
}