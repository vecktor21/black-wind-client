import axios from 'axios'
import {REACT_APP_API_URL} from '../consts/consts'
import {AuthResponse} from "../types/AuthResponse";
const APU_URL = REACT_APP_API_URL + 'api'

const $host = axios.create({
    withCredentials: true,
    baseURL: APU_URL
})
const $authHost = axios.create({
    withCredentials: true,
    baseURL: APU_URL
})

$authHost.interceptors.request.use((config)=>{
    config!.headers!.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$authHost.interceptors.response.use((config)=>{
    return config
}, async (error)=>{
    const originalRequest = error.config
    if(error.response.status == 401 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${APU_URL}/user/refresh`)
            localStorage.setItem('token', response.data.accessToken)
            return $authHost.request(originalRequest)

        }catch (e) {
            console.log("пользователь не авторизован")
        }
    }
    throw error
})
export {
    $authHost,
    $host
}