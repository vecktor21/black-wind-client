import React, {useContext, useState} from 'react';
import {FC}from 'react'
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../../consts/consts";
import {useLocation, useNavigate, NavLink} from "react-router-dom";
import classes from '../style/Form.module.css'
import button from '../UI/Button.module.css'
import Button from "./Button";
import {Context} from "../../index";
import axios from 'axios'

const Form :FC= () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('Почта не может быть пустой')
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')


    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const navigate = useNavigate()
    const {userStore} = useContext(Context)


    const onBlurHandler = (e:React.FocusEvent<HTMLInputElement>)=>{
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break;
            case 'password':
                setPasswordDirty(true)
                break;
        }
    }

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value)
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!re.test(String(e.target.value).toLowerCase())){
            setEmailError('Некорректная почта')
        }
        else {
            setEmailError('')
        }
    }
    const passwordHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value)
        if(e.target.value.length != 0){
            setPasswordError('')
        }else{
            setPasswordError('Пароль не может быть пустым')
        }
    }

    const auth =()=>{
        try {
            if (isLogin){
                userStore?.login(email, password)
            }else {
                userStore?.registration(email, password)
            }
            navigate(SHOP_ROUTE)
        }catch (e) {
            alert(e)
        }
    }

    //TODO
    //отображать ошибки при попытках зарегистрироваться\войти
    return (
        <form className={classes.form_container}>
            {isLogin
                ?
                <h2>Вход</h2>
                :
                <h2>Регистрация</h2>
            }
            <div className={classes.form}>
                {(emailDirty && emailError) && <span style={{color:'red'}}>{emailError}</span>}
                <div>
                    Почта:
                    <input
                        name="email"
                        type="email"
                        placeholder="почта"
                        value={email}
                        onChange={e=>emailHandler(e)}
                        onBlur={(e)=>{onBlurHandler(e)}}
                    />
                </div>
                {(passwordDirty && passwordError) && <span style={{color:'red'}}>{passwordError}</span>}
                <div>
                    Пароль:
                    <input
                        name="password"
                        type="password"
                        placeholder="пароль"
                        value={password}
                        onChange={e=>passwordHandler(e)}
                        onBlur={(e)=>{onBlurHandler(e)}}
                    />
                </div>
                {
                    isLogin
                        ?
                        <div className={classes.bottom}>
                            <span>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink></span>
                            <Button
                                className={button.green}
                                onClick={auth}
                                disabled={
                                    emailError || passwordError
                                        ?
                                        true
                                        :
                                        false
                                }
                            >
                                Войти
                            </Button>
                        </div>
                        :
                        <div className={classes.bottom}>
                            <span>Есть Аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink></span>
                            <Button
                                className={button.green}
                                onClick={auth}
                                disabled={
                                    emailError || passwordError
                                        ?
                                        true
                                        :
                                        false
                                }
                            >
                                Зарегистрироваться
                            </Button>
                        </div>
                }
            </div>
        </form>
    );
};

export default Form;