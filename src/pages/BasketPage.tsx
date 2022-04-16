import React, {ChangeEvent, FC, useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import classes from '../components/style/BasketPage.module.css'
import global from "../components/style/Global.module.css";
import Button from "../components/UI/Button";
import button from "../components/UI/Button.module.css";
import Counter from "../components/UI/Counter";
import {observer} from "mobx-react-lite";
import UserService from "../services/UserService";
import {NavLink} from 'react-router-dom'
import {DEVICE_ROUTE, SHOP_ROUTE} from "../consts/consts";
const BasketPage :FC= observer(() => {
    const {basketStore} = useContext(Context)
    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false)
    useEffect(()=>{

    }, [email])
    const makeOrder = ()=>{
        if (basketStore?.basketDevices){
            UserService.makeOrder(email, basketStore?.basketDevices, basketStore?.total).then(response=>{
                alert('товары успешно заказаны. письмо с подтверждением отправвдено на вашу почту')
            }).catch(e=>{
                alert(e)
            })
        }
    }
    const emailHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value)
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!re.test(String(e.target.value).toLowerCase())){
            setIsEmailValid(false)
        }
        else {
            setIsEmailValid(true)
        }
    }
    return (
        <div className={global.container + ' ' + global.content}>
            <h3>Корзина</h3>
            {basketStore?.basketDevices && basketStore?.basketDevices.length > 0
                ?
                <div>
                    <div className={classes.basket_header}>
                        <div className={classes.name}>
                            Название товара
                        </div>
                        <div className={classes.count}>
                            Количество
                        </div>
                        <div className={classes.price}>
                            Цена
                        </div>
                    </div>
                    {basketStore?.basketDevices.map(device=>
                        <div key={device._id} className={classes.basket}>
                            <div className={classes.name}>
                                <NavLink to={`${DEVICE_ROUTE}/${device._id}`}>{device.name}</NavLink>
                            </div>
                            <div className={classes.count}>
                                <Counter
                                    value={device.count}
                                    setValue={(number)=>{
                                        device.setCount(number)
                                        basketStore?.updateTotal()
                                        console.log("device.count: ", device.count)
                                        if (number <= 0){
                                            basketStore?.removeDevice(device._id)
                                        }
                                    }}
                                />
                            </div>
                            <div className={classes.price}>
                                {device.totalPrice}тг
                            </div>
                        </div>
                    )}
                    <div className={classes.bottom}>
                        <div>
                            Итого: {basketStore?.total}
                        </div>
                        <div>
                            <Button onClick={()=>{makeOrder()}} className={button.green} disabled={!isEmailValid}>Заказать</Button>
                        </div>
                        <div>
                            Ваша почта: <input type="email" value={email} onChange={e=>{emailHandler(e)}}/>
                            <span className={global.danger} style={{display:`${isEmailValid ? 'none' : 'inline'}`, marginLeft: '15px'}}>Некорректная почта</span>
                        </div>
                    </div>
                </div>
                :
                <div>
                    Ваша корзина пуста. <NavLink to={SHOP_ROUTE}>Добавьте товары в корзину для их заказа </NavLink>
                </div>
            }
        </div>
    );
});

export default BasketPage;