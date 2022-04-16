import {IUser} from './IUser'
export class User implements IUser{
    email: string;
    _id: string;
    isActivated: boolean;
    role: string;
    isAuth: boolean
    constructor(userData: IUser) {
        this.email = userData.email
        this._id = userData._id
        this.isActivated = userData.isActivated
        this.role = userData.role
        this.isAuth = true
    }
}