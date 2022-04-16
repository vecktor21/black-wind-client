import React, {FC, useContext, useEffect, useState} from 'react';
import Button from "./UI/Button";
import button from "./UI/Button.module.css";
import Modal from "./Modal";
import DeviceService from "../services/DeviceService";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import global from "./style/Global.module.css";

interface Props {
    active: boolean;
    setActive: (bool: boolean)=>void;
}
const TypeCreateModal :FC <Props>=observer((props) => {
    const {deviceStore} = useContext(Context)
    const [newType, setNewType] = useState('')
    const [isNewTypeEmpty, setIsNewTypeEmpty] = useState(false)

    useEffect(()=>{
        console.log('TypeUpdateModal: newType: ', newType)
        if (newType.length === 0){
            setIsNewTypeEmpty(true)
        }else {
            setIsNewTypeEmpty(false)
        }

    }, [newType])

    const createType = ()=>{
        let isConfirm =  window.confirm('Сохранить изменения?')
        if (isConfirm){
            DeviceService.createType({name: newType}).then(response=>{
                deviceStore?.setTypes([...deviceStore?.types, response.data])
                alert('тип успешно добавлен')
            }).catch(e=>{
                console.log('создание типа')
                console.log(e)
            })
            props.setActive(false)
        }
    }
    return (
        <Modal active={props.active} setActive={props.setActive}>
            <h2>Добавление</h2>
            <span className={global.danger} style={{display: `${isNewTypeEmpty ? 'inline' : 'none'}`}}>название не должно быть пустым</span>
            <div><label>Название типа: </label><input value={newType} onChange={(e)=>{setNewType(e.target.value)}}/></div>
            <Button onClick={()=>{createType()}} className={button.blue} disabled={isNewTypeEmpty}>Добавить</Button>
        </Modal>
    );
});

export default TypeCreateModal;