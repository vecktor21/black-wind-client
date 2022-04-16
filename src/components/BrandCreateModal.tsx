import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import DeviceService from "../services/DeviceService";
import Modal from "./Modal";
import global from "./style/Global.module.css";
import Button from "./UI/Button";
import button from "./UI/Button.module.css";
import {observer} from "mobx-react-lite";

interface Props {
    active: boolean;
    setActive: (bool: boolean)=>void;
}

const BrandCreateModal:FC <Props> = observer((props) => {
    const {deviceStore} = useContext(Context)
    const [newBrand, setNewBrand] = useState('')
    const [isNewBrandEmpty, setIsNewBrandEmpty] = useState(false)

    useEffect(()=>{
        console.log('BrandUpdateModal: newBrand: ', newBrand)
        if (newBrand.length === 0){
            setIsNewBrandEmpty(true)
        }else {
            setIsNewBrandEmpty(false)
        }

    }, [newBrand])

    const createBrand = ()=>{
        let isConfirm =  window.confirm('Сохранить изменения?')
        if (isConfirm){
            DeviceService.createBrand({name: newBrand}).then(response=>{
                deviceStore?.setBrands([...deviceStore?.brands, response.data])
                alert('бренд успешно добавлен')

            }).catch(e=>{
                console.log('создание бренда')
                console.log(e)
            })
            props.setActive(false)
        }
    }
    return (
        <Modal active={props.active} setActive={props.setActive}>
            <h2>Добавление</h2>
            <span className={global.danger} style={{display: `${isNewBrandEmpty ? 'inline' : 'none'}`}}>название не должно быть пустым</span>
            <div><label>Название бренда: </label><input value={newBrand} onChange={(e)=>{setNewBrand(e.target.value)}}/></div>
            <Button onClick={()=>{createBrand()}} className={button.blue} disabled={isNewBrandEmpty}>Добавить</Button>
        </Modal>
    );
});

export default BrandCreateModal;