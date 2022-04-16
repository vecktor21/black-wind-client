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

const BrandDeleteModal:FC <Props>=observer((props) => {
    const [brand, setBrand] = useState('')
    const [selectedBrand, setSelectedBrand] = useState('')
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)

    const [isBrandEmpty, setIsBrandEmpty] = useState(false)

    const {deviceStore} = useContext(Context)

    useEffect(()=>{
        console.log('BrandUpdateModal: brand: ', brand)
        if (brand.length === 0){
            setIsBrandEmpty(true)
        }else {
            setIsBrandEmpty(false)
        }
    }, [brand])

    const deleteBrand = ()=>{
        if (window.confirm('Сохранить изменения?')){
            DeviceService.deleteBrand(brand).then(response=>{
                alert('бренд успешно удален')
            }).catch(e=>{
                alert(e)
            })
            props.setActive(false)
        }
    }
    return (
        <Modal active={props.active} setActive={props.setActive}>
            <h2>Удаление</h2>
            <span className={global.danger} style={{display: `${isBrandEmpty ? 'inline' : 'none'}`}}>Необходимо выбрать бренд</span>
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
                                setBrand(brand.name)
                            }}
                        >
                            {brand.name}
                        </li>
                    )}
                </ul>
            </ul>
            <Button onClick={()=>{deleteBrand()}} className={button.red} disabled={isBrandEmpty}>удалить</Button>
        </Modal>
    );
});

export default BrandDeleteModal;