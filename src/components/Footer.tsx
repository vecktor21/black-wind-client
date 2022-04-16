import React from 'react';
import {NavLink} from "react-router-dom";
import {
    ABOUT_ROUTE,
    BASKET_ROUTE,
    CONTACTS_ROUTE,
    DELIVERY_ROUTE,
    EXCHANGE_ROUTE,
    PAY_ROUTE,
    SHOP_ROUTE
} from "../consts/consts";
import cart from "../assets/cart.svg";
import classes from "./style/Footer.module.css";
import global from './style/Global.module.css'
import logo from '../assets/logo.png'

const Footer = () => {
    return (
        <div className={classes.footer}>
            <div className={global.container}>
                <div className={classes.footer_container}>
                    <div className={classes.logo_container}>
                        <img src={logo}/>
                    </div>
                    <div className={classes.link_container}>
                        <ul >
                            <li><NavLink to={ABOUT_ROUTE}>О нас</NavLink></li>
                            <li><NavLink to={DELIVERY_ROUTE}>Доставка</NavLink></li>
                            <li><NavLink to={PAY_ROUTE}>Оплата</NavLink></li>
                            <li><NavLink to={EXCHANGE_ROUTE}>Обмен и возврат</NavLink></li>
                            <li><NavLink to={CONTACTS_ROUTE}>Контакты</NavLink></li>
                        </ul>

                        <div className={classes.description}>
                            &#169; "Черный Ветер". 2022. <br/>
                            Разработано Одноуровым Денисом <br/>
                            Сайт разработан в рамках курсового проекта на тему "Разработка Web-сайта для компьютерного магазина "

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;