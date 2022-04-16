import React, {useContext, useEffect, useMemo} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {
    ABOUT_ROUTE, ADMIN_ROUTE, BASKET_ROUTE,
    CONTACTS_ROUTE,
    DELIVERY_ROUTE,
    EXCHANGE_ROUTE,
    LOGIN_ROUTE, PASSWORD_UPDATE_SEND_ROUTE,
    PAY_ROUTE, REGISTRATION_ROUTE,
    SHOP_ROUTE
} from "../consts/consts";
import header from './style/Header.module.css'
import classes from './style/Global.module.css'
import classNames from "classnames";
import {IUser} from "../types/IUser";
import cart from '../assets/cart.svg'
import {User} from "../types/User";
import {Context} from "../index";
import logo from '../assets/logo.png'
import {observer} from "mobx-react-lite";

const Header = observer(() => {

    const {userStore} = useContext(Context)
    const navigate = useNavigate()

    const logout = (e:React.FormEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        userStore?.logout()
        navigate(SHOP_ROUTE)
    }
    return (
        <div className={header.header}>
            <div className={classes.container}>
                <ul>
                    <li><NavLink to={SHOP_ROUTE} className={header.logo}><img src={logo}/></NavLink></li>
                    <li><NavLink to={ABOUT_ROUTE}>О нас</NavLink></li>
                    <li><NavLink to={DELIVERY_ROUTE}>Доставка</NavLink></li>
                    <li><NavLink to={PAY_ROUTE}>Оплата</NavLink></li>
                    <li><NavLink to={EXCHANGE_ROUTE}>Обмен и возврат</NavLink></li>
                    <li><NavLink to={CONTACTS_ROUTE}>Контакты</NavLink></li>
                    <li className={header.cart}><NavLink to={BASKET_ROUTE}><img src={cart} alt=""/></NavLink></li>
                    <li>
                        {
                            userStore?.isAuth
                                ?
                                    <div className={header.profile}>
                                        {userStore?.user.email}
                                        <ul className={header.dropdown}>
                                            <li><NavLink to={PASSWORD_UPDATE_SEND_ROUTE}>сменить пароль</NavLink> </li>
                                            {userStore.user.role === 'ADMIN' &&
                                                <li><NavLink to={ADMIN_ROUTE}>Админ</NavLink> </li>
                                            }
                                            <li><button className={header.logout} onClick={(e:React.FormEvent<HTMLButtonElement>)=>{logout(e)}}>Выйти</button> </li>
                                        </ul>
                                    </div>

                                :
                                <div className={header.authorization}>
                                    <NavLink to={LOGIN_ROUTE}>Войти</NavLink>/
                                    <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink>
                                </div>
                        }
                    </li>
                </ul>
            </div>
        </div>
    );
});

export default Header;
