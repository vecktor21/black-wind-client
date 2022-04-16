import React, {FC, useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import DeviceService from "../services/DeviceService";
import Modal from "./Modal";
import global from "./style/Global.module.css";
import dropdown from "./UI/DropDown.module.css";
import Button from "./UI/Button";
import button from "./UI/Button.module.css";

interface Props {
    active: boolean;
    setActive: (bool: boolean)=>void;
}

const BrandUpdateModal:FC <Props>=observer((props) => {
    const [newBrand, setNewBrand] = useState('')
    const [oldBrand, setOldBrand] = useState('')
    const [selectedBrand, setSelectedBrand] = useState('')
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)
    const [isOldBrandEmpty, setIsOldBrandEmpty] = useState(false)
    const [isNewBrandEmpty, setIsNewBrandEmpty] = useState(false)

    const {deviceStore} = useContext(Context)

    useEffect(()=>{
        deviceStore?.fetchBrands()
    }, [])

    useEffect(()=>{
        console.log('BrandUpdateModal: oldBrand: ', oldBrand)
        console.log('BrandUpdateModal: newBrand: ', newBrand)
        if (oldBrand.length === 0){
            setIsOldBrandEmpty(true)
        }else {
            setIsOldBrandEmpty(false)
        }
        if (newBrand.length === 0){
            setIsNewBrandEmpty(true)
        }else {
            setIsNewBrandEmpty(false)
        }

    }, [oldBrand, newBrand])

    const updateBrand = ()=>{
        let isConfirm =  window.confirm('Сохранить изменения?')
        if (isConfirm){
            DeviceService.updateBrand({
                name: oldBrand,
                newName: newBrand
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
            <span className={global.danger} style={{display: `${isOldBrandEmpty ? 'inline' : 'none'}`}}>старое название не должно быть пустым</span>
            <ul className={dropdown.dropdown}
                onClick={()=>{setIsDropdownVisible(!isDropdownVisible)}}
                onMouseLeave={()=>{setIsDropdownVisible(false)}}
            >
                <li
                    className={dropdown.title}
                >
                    {selectedBrand ? selectedBrand : 'выберите'}
                    <span className={`${dropdown.arrow} ${isDropdownVisible ? dropdown.arrow_down : dropdown.arrow_up}`}></span>
                </li>
                <ul className={`${dropdown.menu} ${isDropdownVisible ? dropdown.visible : dropdown.invisible}`}>
                    {deviceStore?.brands.map(brand=>
                        <li className={dropdown.item}
                            key={brand._id}
                            onClick={()=>{
                                setSelectedBrand(brand.name)
                                setOldBrand(brand.name)
                            }}
                        >
                            {brand.name}
                        </li>
                    )}
                </ul>
            </ul>
            <span className={global.danger} style={{display: `${isNewBrandEmpty ? 'inline' : 'none'}`}}>новое название не должно быть пустым</span>
            <div><label>Новое название бренда: </label><input value={newBrand} onChange={(e)=>{setNewBrand(e.target.value)}}/></div>
            <Button onClick={()=>{updateBrand()}} className={button.blue} disabled={isNewBrandEmpty}>Сохранить изменения</Button>
        </Modal>
    );
});

export default BrandUpdateModal;