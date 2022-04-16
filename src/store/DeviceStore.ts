import {makeAutoObservable} from "mobx";
import {IType} from "../types/IType";
import {IBrand} from "../types/IBrand";
import {IDevice} from "../types/IDevice";
import DeviceService from "../services/DeviceService";

export default class DeviceStore {
    _devices = [] as IDevice[];
    _brands = [] as IBrand[];
    _types = [] as IType[];
    _selectedType = {} as IType;
    _selectedBrand = {} as IBrand;
    _isLoading = false;
    _selectedDevice = this._devices[0];
    _currentPage = 1;
    _totalPages = 0;
    _totalDevices = 0;
    _limit = 5

    constructor() {
        makeAutoObservable(this)
    }
    get types(){
        return this._types
    }
    get brands(){
        return this._brands
    }
    get devices(){
        return this._devices
    }
    get selectedType(){
        return this._selectedType
    }
    get selectedBrand(){
        return this._selectedBrand
    }
    get selectedDevice(){
        return this._selectedDevice
    }
    get isLoading(){
        return this._isLoading
    }
    get limit(){
        return this._limit
    }
    get currentPage(){
        return this._currentPage
    }
    get totalDevices(){
        return this._totalDevices
    }
    get totalPages(){
        return this._totalPages
    }
    setTypes(types:IType[]){
        this._types = types
    }
    setBrands(Brands:IBrand[]){
        this._brands = Brands
    }
    setDevices(Devices:IDevice[]){
        this._devices = Devices
    }
    setSelectedBrand(brand:IType){
        this.setCurrentPage(1)
        this._selectedBrand = brand
    }
    setSelectedType(type:IType){
        this.setCurrentPage(1)
        this._selectedType = type
    }
    setIsLoading(bool: boolean){
        this._isLoading = bool
    }
    setLimit(limit: number){
        this._limit = limit
    }
    setCurrentPage(page: number){
        if (page<1){
            page=1
        }
        if (page>this.totalPages){
            page=this.totalPages
        }
        this._currentPage = page
    }
    setTotalDevices(totalDevices: number){
        this._totalDevices = totalDevices
    }
    setTotalPages(totalPages: number){
        this._totalPages = totalPages
    }
    async fetchDevices(limit: number, page: number, brandId: string, typeId: string){
        this.setIsLoading(true)
        try {
            console.log('device store: fetchDevices: limit, page: ',limit, page)
            console.log('device store: fetchDevices: brandId: ', brandId)
            console.log('device store: fetchDevices: typeId: ', typeId)
            const response = await DeviceService.getDevices(brandId, typeId, page, limit)
            const brandsResponse = await DeviceService.getBrands()
            const typesResponse = await DeviceService.getTypes()
            this.setTypes(typesResponse.data.types)
            this.setBrands(brandsResponse.data.brands)
            this.setDevices(response.data.devices)
            this.setTotalDevices(response.data.totalDevices)
            this.setTotalPages(response.data.totalPages)
            console.log('device store: fetchDevices: totalDevices: ', this.totalDevices)
            console.log('device store: fetchDevices: totalPages: ', this.totalPages)
        }catch (e) {
            console.log(e)
        }
        finally {
            this.setIsLoading(false)
        }
    }
    async fetchBrands(){
        this.setIsLoading(true)
        try {
            const brandsResponse = await DeviceService.getBrands()
            this.setBrands(brandsResponse.data.brands)
        }catch (e) {
            console.log(e)
        }
        finally {
            this.setIsLoading(false)
        }
    }
    async fetchTypes(){
        this.setIsLoading(true)
        try {
            const typesResponse = await DeviceService.getTypes()
            this.setTypes(typesResponse.data.types)
        }catch (e) {
            console.log(e)
        }
        finally {
            this.setIsLoading(false)
        }
    }

    setSelectedDevice(device: IDevice){
        this._selectedDevice = device
    }
    async getOneDevice(id: string){
        this.setIsLoading(true)
        const response = await DeviceService.getOneDevice(id)
        this.setSelectedDevice(response.data)
        this.setIsLoading(false)
        return this.selectedDevice.name
    }
}