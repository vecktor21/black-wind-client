import {IBasketDevice} from "./IBasketDevice";
import BasketStore from "../store/BasketStore";

export class BasketDevice implements IBasketDevice{
    name: string;
    description: string;
    _id: string;
    count: number;
    price: number;
    _totalPrice: number;
    constructor(name:string, description:string, _id:string, price:number) {
        this.name=name
        this.description=description
        this._id=_id
        this.count=1
        this.price=price
        this._totalPrice = 0;
    }
    setName(name: string){
        this.name=name
    }
    setDescription(description: string){
        this.description=description
    }
    setId(_id: string){
        this._id=_id
    }
    setCount(count: number){
        this.count=count
        this._totalPrice = this.price * this.count
    }
    setPrice(price: number){
        this.price=price
    }
    get totalPrice(){
        return this.price * this.count
    }
}