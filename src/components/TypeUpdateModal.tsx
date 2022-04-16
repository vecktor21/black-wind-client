import React, {FC, useContext, useEffect, useState} from 'react';
import Button from "./UI/Button";
import button from "./UI/Button.module.css";
import Modal from "./Modal";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import dropdown from "./UI/DropDown.module.css";
import global from './style/Global.module.css'
import DeviceService from "../services/DeviceService";
interface Props {
    active: boolean;
    setActive: (bool: boolean)=>void;
}
const TypeUpdateModal :FC <Props> = observer((props) => {

    const [newType, setNewType] = useState('')
    const [oldType, setOldType] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)
    const [isOldTypeEmpty, setIsOldTypeEmpty] = useState(false)
    const [isNewTypeEmpty, setIsNewTypeEmpty] = useState(false)

    const {deviceStore} = useContext(Context)

    useEffect(()=>{
        deviceStore?.fetchTypes()
    }, [])

    useEffect(()=>{
        console.log('TypeUpdateModal: oldType: ', oldType)
        console.log('TypeUpdateModal: newType: ', newType)
        if (oldType.length === 0){
            setIsOldTypeEmpty(true)
        }else {
            setIsOldTypeEmpty(false)
        }
        if (newType.length === 0){
            setIsNewTypeEmpty(true)
        }else {
            setIsNewTypeEmpty(false)
        }

    }, [oldType, newType])

    const updateType = ()=>{
        let isConfirm =  window.confirm('Сохранить изменения?')
        if (isConfirm){
            DeviceService.updateType({
                name: oldType,
                newName: newType
            }).then(response=>{
                alert('Изменения успешно сохранены')
            }).catch(e=>{
                alert(e)
            })
            props.setActive(false)
        }
    }

    return (
        <Modal active={props.active} setActive={props.setActive}>
            <h2>Изменение</h2>
            <span className={global.danger} style={{display: `${isOldTypeEmpty ? 'inline' : 'none'}`}}>старое название не должно быть пустым</span>
            <ul className={dropdown.dropdown}
                onClick={()=>{setIsDropdownVisible(!isDropdownVisible)}}
                onMouseLeave={()=>{setIsDropdownVisible(false)}}
            >
                <li
                    className={dropdown.title}
                >
                    {selectedType ? selectedType : 'выберите'}
                    <span className={`${dropdown.arrow} ${isDropdownVisible ? dropdown.arrow_down : dropdown.arrow_up}`}></span>
                </li>
                <ul className={`${dropdown.menu} ${isDropdownVisible ? dropdown.visible : dropdown.invisible}`}>
                    {deviceStore?.types.map(type=>
                        <li className={dropdown.item}
                            key={type._id}
                            onClick={()=>{
                                setSelectedType(type.name)
                                setOldType(type.name)
                            }}
                        >
                            {type.name}
                        </li>
                    )}
                </ul>
            </ul>
            <span className={global.danger} style={{display: `${isNewTypeEmpty ? 'inline' : 'none'}`}}>новое название не должно быть пустым</span>
            <div><label>Новое название типа: </label><input value={newType} onChange={(e)=>{setNewType(e.target.value)}}/></div>
            <Button onClick={()=>{updateType()}} className={button.blue} disabled={isNewTypeEmpty}>Сохранить изменения</Button>
        </Modal>
    );
});

export default TypeUpdateModal;