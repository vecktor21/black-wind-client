import React, {ChangeEvent, FC, useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import Modal from "./Modal";
import {Context} from "../index";
import {IDevice} from "../types/IDevice";
import searchClass from './UI/SearchBar.module.css'
import {log} from "util";
import Button from "./UI/Button";
import button from "./UI/Button.module.css";
import DeviceService from "../services/DeviceService";
interface Props {
    active: boolean;
    setActive: (bool: boolean)=>void;
}
const DeviceDeleteModal  :FC <Props>=observer((props) => {
    const {deviceStore} = useContext(Context)
    const [selectedDevice, setSelectedDevice] = useState({} as IDevice)
    const [searchedDevices, setSearchedDevices] = useState([] as IDevice[])
    const [searchedDeviceName, setSearchedDeviceName] = useState('')
    const [isSearchListVisible, setIsSearchListVisible] = useState(searchClass.hide)
    const [isDisabled, setIsDisabled] = useState(true)

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
        setIsSearchListVisible(searchClass.hide)
        setSearchedDeviceName('')
    }

    const deleteDevice = ()=> {
        try {
            console.log('selectedDevice._id: ', selectedDevice._id)
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

    return (
        <Modal active={props.active} setActive={props.setActive}>
            <h2>Удаление</h2>
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
            <div>
                <b>Выбран товар: </b> {selectedDevice.name}
            </div>
            <Button onClick={()=>{deleteDevice()}} className={button.red} disabled={isDisabled}>удалить</Button>

        </Modal>
    );
});

export default DeviceDeleteModal;