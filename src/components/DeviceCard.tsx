import React, {FC, useContext, useEffect, useMemo, useState} from 'react';
import {Context} from "../index";
import classes from './style/DeviceCard.module.css'
import {observer} from "mobx-react-lite";
import {DEVICE_ROUTE, REACT_APP_API_URL} from "../consts/consts";
import {useNavigate, NavLink} from "react-router-dom";
import buttonType from '../components/UI/Button.module.css'
import Button from "./UI/Button";
import mobx from 'mobx'
import {BasketDevice} from "../types/BasketDevice";

interface Props {
    name: string
    price: number,
    img: string,
    description: string,
    brandId: string,
    typeId: string,
    id: string
}

const DeviceCard :FC<Props> = (props) => {
    const {deviceStore, basketStore} = useContext(Context)
    const [brand, setBrand] = useState('')
    const [type, setType] = useState('')

    const navigate = useNavigate()

    useEffect(()=>{
        const typeName = deviceStore?.types.filter(type=>type._id==props.typeId)[0].name
        const brandName = deviceStore?.brands.filter(brand=>brand._id==props.brandId)[0].name
        if (typeName && brandName){
            setType(typeName)
            setBrand(brandName)
        }
    },[brand, type])
    const toDevice = (id:string)=>{
        navigate(`${DEVICE_ROUTE}/${id}`)
    }
    const addToBasket = ()=>{
        basketStore?.addDevice(new BasketDevice(props.name, props.description, props.id, props.price))
        alert('добавлен товар')
    }
    return (
        <div className={classes.deviceCard}>
            <div className={classes.img}>
                <NavLink to={`${DEVICE_ROUTE}/${props.id}`}>
                    <img src={REACT_APP_API_URL + props.img}/>
                </NavLink>
            </div>
            <div className={classes.contentContainer}>
                <div className={classes.device_name}>
                    <span>{props.name}</span>
                </div>
                <div className={classes.device_description}>
                    <p>{props.description}</p>
                </div>
                <div className={classes.additional}>
                    <span>Категория: {type}</span>
                    <span>Бренд: {brand}</span>
                </div>
            </div>
            <div className={classes.buttons}>
                <span>Цена: {props.price} тг</span>
                <Button onClick={()=>{addToBasket()}} className={buttonType.green}>В корзину</Button>
                <Button onClick={()=>{toDevice(props.id)}} className={buttonType.blue}>Подробнее</Button>
            </div>
        </div>
    );
};

export default DeviceCard;