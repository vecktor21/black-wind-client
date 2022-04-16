import {makeAutoObservable} from "mobx";
import {BasketDevice} from "../types/BasketDevice";

export default class BasketStore {
    _basketDevices = [] as BasketDevice[];
    _total = 0;
    _email = '';

    constructor() {
        makeAutoObservable(this)
    }

    get basketDevices(){
        return this._basketDevices
    }

    setDevices(devices: BasketDevice[]){
        this._basketDevices = devices
    }

    addDevice(device: BasketDevice){
        this._basketDevices.push(device)
        this._total += device.price
    }

    removeDevice(id: string){
        this.setDevices(this.basketDevices.filter(device=>device._id !== id))
    }

    setEmail(email: string){
        this._email = email
    }

    get email(){
        return this._email
    }
    get total(){
        return this._total
    }
    updateTotal(){
        this._total = 0
        this.basketDevices.forEach(device=>{
            this._total += device.totalPrice
        })
    }
}