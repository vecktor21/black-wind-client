import React, {FC, useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import Modal from "./Modal";
import dropdown from "./UI/DropDown.module.css";
import global from "./style/Global.module.css";
import Button from "./UI/Button";
import button from "./UI/Button.module.css";
import {Context} from "../index";
import DeviceService from "../services/DeviceService";
interface Props {
    active: boolean;
    setActive: (bool: boolean)=>void;
}
const TypeDeleteModal :FC <Props>= observer((props) => {
    const [type, setType] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)

    const [isTypeEmpty, setIsTypeEmpty] = useState(false)

    const {deviceStore} = useContext(Context)

    useEffect(()=>{
        console.log('TypeUpdateModal: type: ', type)
        if (type.length === 0){
            setIsTypeEmpty(true)
        }else {
            setIsTypeEmpty(false)
        }
    }, [type])

    const deleteType = ()=>{
        if (window.confirm('Сохранить изменения?')){
            DeviceService.deleteType(type).then(response=>{
                alert('тип успешно удален')
            }).catch(e=>{
                alert(e)
            })
            props.setActive(false)
        }
    }
    return (
        <Modal active={props.active} setActive={props.setActive}>
            <h2>Удаление</h2>
            <span className={global.danger} style={{display: `${isTypeEmpty ? 'inline' : 'none'}`}}>Необходимо выбрать тип</span>
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
                                setType(type.name)
                            }}
                        >
                            {type.name}
                        </li>
                    )}
                </ul>
            </ul>
            <Button onClick={()=>{deleteType()}} className={button.red} disabled={isTypeEmpty}>удалить</Button>
        </Modal>
    );
});

export default TypeDeleteModal;