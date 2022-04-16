import React, {ChangeEvent, FC, useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import Modal from "./Modal";
import {Context} from "../index";
import {IDevice} from "../types/IDevice";
import searchClass from "./UI/SearchBar.module.css";
import DeviceService from "../services/DeviceService";
import Button from "./UI/Button";
import button from "./UI/Button.module.css";
import classes from './style/AdminPage.module.css'
import {REACT_APP_API_URL} from "../consts/consts";
import {IInfo} from "../types/IInfo";
const uuid = require("uuid")

interface Props {
    active: boolean;
    setActive: (bool: boolean)=>void;
}
interface Info extends IInfo{
    number: number
}
const DeviceUpdateModal  :FC <Props>=observer((props) => {
    const {deviceStore} = useContext(Context)
    const [selectedDevice, setSelectedDevice] = useState({} as IDevice)
    const [searchedDevices, setSearchedDevices] = useState([] as IDevice[])
    const [searchedDeviceName, setSearchedDeviceName] = useState('')
    const [isSearchListVisible, setIsSearchListVisible] = useState(searchClass.hide)
    const [isDisabled, setIsDisabled] = useState(true)
    const [info, setInfo] = useState([{title: '', value: '', number: 0} as Info])
    const [img, setImg] = useState({} as File)
    useEffect(()=>{
        setIsSearchListVisible(searchedDeviceName.length > 0 ? searchClass.show : searchClass.hide)
    }, [searchedDeviceName])

    useEffect(()=>{
        if (selectedDevice.name){
            if(selectedDevice.name.length > 0){
                setIsDisabled(false)
            }else {
                setIsDisabled(true)
            }
        }else {
            setIsDisabled(true)
        }
    }, [selectedDevice])

    const searchDevices = (e:ChangeEvent<HTMLInputElement>)=>{
        setSearchedDeviceName(e.target.value)
        const candidates = deviceStore?.devices.filter(device=> {
            /*console.log('searchedDeviceName: ', e.target.value)
            console.log('device.name: ', device.name)
            console.log('is candidate: ', device.name.toLocaleLowerCase().includes(e.target.value.toLowerCase()))*/
            if(device.name.toLocaleLowerCase().includes(e.target.value.toLowerCase())){return device}
        })
        if (candidates){setSearchedDevices(candidates)}
    }

    const setDevice = (device: IDevice)=>{
        setSelectedDevice(device)
        setInfo(device.info.map(i=>{
            return {
                ...i,
                number:uuid.v4()
            }
        }))
        setIsSearchListVisible(searchClass.hide)
        setSearchedDeviceName('')
    }

    const deleteInfo = (number: number)=>{
        setInfo(info.filter(i=>i.number !== number))
    }
    const updateDevice = ()=> {
        try {
            // console.log('selectedDevice._id: ', selectedDevice._id)
            if (window.confirm('Выполнить удаление товара?')){
                DeviceService.deleteDevice(selectedDevice._id).then(respone=>{
                    window.alert('товар успешно удален')
                }).catch(e=>{
                    alert(e)
                })
            }
        }catch (e) {
            console.log(e)
        }
    }
    const changeInfo = (key:string, value:string, number:number)=>{
        setInfo(info.map(i=>i.number === number ? {...i, [key]: value} : i))
    }

    const selectImg = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            setImg(e.target.files[0])
        }
    }
    return (
        <Modal active={props.active} setActive={props.setActive}>
            <h2>Изменение</h2>
            <div className={searchClass.searchContainer}>
                <input
                    type="search"
                    placeholder='Поиск товара...'
                    className={searchClass.searchBar}
                    value={searchedDeviceName}
                    onChange={(e)=>{searchDevices(e)}}
                />
                <ul className={`${searchClass.candidates} ${isSearchListVisible}`}>
                    {searchedDevices.map(device=>
                        <li key={device._id} onClick={()=>{setDevice(device)}}>{device.name}</li>
                    )}
                </ul>
            </div>
            {selectedDevice.name &&
                <div className={classes.deviceCard}>
                    <div className={classes.updateDeviceCard}>
                        <div>
                            <label htmlFor="name">Название</label>
                            <input
                                type="text" id={"name"}
                                value={selectedDevice.name}
                                onChange={(e)=>{setSelectedDevice({...selectedDevice, name: e.target.value})}}
                            />
                        </div>
                        <div>
                            <label htmlFor="price">Цена</label>
                            <input
                                type="number" id={"price"}
                                value={selectedDevice.price}
                                onChange={(e)=>{setSelectedDevice({...selectedDevice, price: Number(e.target.value)})}}
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Описание</label>
                            <textarea
                                name="description"
                                id="description"
                                cols={30} rows={5}
                                value={selectedDevice.description}
                                onChange={(e)=>{setSelectedDevice({...selectedDevice, description: e.target.value})}}
                            />
                        </div>
                        <label htmlFor="img">Изображение</label>
                        <div style={{justifyContent: 'center'}}>
                            <input
                                type="file"
                                id={"img"}
                               onChange={(e)=>{selectImg(e)}}
                            />
                        </div>
                        <img src={`${REACT_APP_API_URL}/${selectedDevice.img}`} style={{textAlign:'center'}} width={'200px'} alt=""/><br/>
                        <label htmlFor="img">Характеристики</label><br/>
                        <Button onClick={()=>{}} className={button.green}>Добавить</Button>
                    </div>
                        <div className={classes.info}>
                            {
                                info.map((i)=>
                                    <div className={classes.infoCard} key={i.number}>
                                        <div>
                                            <input
                                                type='text'
                                                placeholder='введите название характеристики'
                                                value={i.title}
                                                onChange={e=>changeInfo('title', e.target.value, i.number)}
                                                title='название характеристики'
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type='text'
                                                placeholder='введите значение характеристики'
                                                value={i.value}
                                                onChange={e=>changeInfo('value', e.target.value, i.number)}
                                                title='значение характеристики'
                                            />
                                        </div>
                                        <div><Button onClick={()=>{deleteInfo(i.number)}} className={button.red}>удалить</Button></div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
            }
            <Button onClick={()=>{}} className={button.blue} disabled={isDisabled}>сохранить</Button>
        </Modal>
    );
});

export default DeviceUpdateModal;