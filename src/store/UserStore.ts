import {makeAutoObservable} from 'mobx'
import {IUser} from "../types/IUser";
import UserService from "../services/UserService";
export default class UserStore {
    _user = {} as IUser
    /*_user = {
        email: 'denis@mail.ru',
        _id: '1234as',
        role: 'ADMIN'
    } as IUser*/
    _isAuth = false;
    _isLoading = false;

    constructor() {
        makeAutoObservable(this)
    }
    setIsAuth(bool:boolean){
        this._isAuth = bool
    }
    get isAuth(){
        return this._isAuth
    }
    setIsLoading(bool:boolean){
        this._isLoading = bool
    }
    get isLoading(){
        return this._isLoading
    }

    setUser(user: IUser){
        this._user = user
    }
    get user(){
        return this._user
    }

    async login(email:string, password:string){
        this.setIsLoading(true)
        try {
            const response = await UserService.login(email, password)
            //console.log(response.data)
            localStorage.setItem('token', response.data.accessToken)
            this.setIsAuth(true)
            console.log(response.data.user.email)
            this.setUser(response.data.user)
        }catch (e) {
            console.log(e)
        }
        finally {
            this.setIsLoading(false)
        }
    }
    async registration(email:string, password:string){
        UserService.registration(email, password)
            .then(response=>{

                //console.log(response.data)
                localStorage.setItem('token', response.data.accessToken)
                this.setIsAuth(true)
                this.setUser(response.data.user)
            })
            .catch(e=>{
                throw Error(e.message)
            })

    }
    async logout(){
        const response = await UserService.logout()
        //console.log(response)
        localStorage.removeItem('token')
        this.setIsAuth(false)
        this.setUser({} as IUser)
    }
    async checkAuth(){
        this.setIsLoading(true)
        try {
            const response = await UserService.checkAuth()
            this.setUser(response.data.user)
            this.setIsAuth(true)
        }catch (e) {
            console.log(e)
        }
        finally {
            this.setIsLoading(false)
        }
    }
    async changePassword(email:string, password:string, newPassword:string){
        try {
            const response = await UserService.changePassword(email, password, newPassword)
            return response.data.toString()
        }catch (e) {
            console.log(e)
        }
    }
}