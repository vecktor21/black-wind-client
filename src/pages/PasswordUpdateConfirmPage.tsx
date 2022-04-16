import React, {useContext, useEffect, useState} from 'react';
import formClasses from "../components/style/Form.module.css";
import form from "../components/style/Form.module.css";
import Button from "../components/UI/Button";
import button from "../components/UI/Button.module.css";
import classes from '../components/style/ChangePassword.module.css'
import global from '../components/style/Global.module.css'
import {Context} from "../index";
import UserService from "../services/UserService";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../consts/consts";

const PasswordUpdateConfirmPage = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [oldPassDirty, setOldPassDirty] = useState(false)
    const [newPassDirty, setNewPassDirty] = useState(false)

    const [oldPassErr, setOldPassErr] = useState('Пароль не может быть пустым')
    const [newPassErr, setNewPassErr] = useState('Новый пароль не может быть пустым')

    const [formValid, setFormValid] = useState(false)

    const {userStore} = useContext(Context)

    const navigate = useNavigate()

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        switch (e.target.name) {
            case 'oldPassword':
                setOldPassword(e.target.value)
                if(e.target.value.length > 0){
                    setOldPassErr('')
                }
                break
            case 'newPassword':
                setNewPassword(e.target.value)
                if(e.target.value.length > 0){
                    setNewPassErr('')
                }
                break
        }
    }

    useEffect(()=>{
        if(!oldPassword){
            setFormValid(false)
            setOldPassErr("Пароль не может быть пустым")
        }
        if(!newPassword){
            setFormValid(false)
            setNewPassErr("Новый пароль не может быть пустым")
        }
        if(oldPassword && newPassword) {
            setFormValid(true)
            setOldPassErr("")
            setNewPassErr("")
        }
    }, [oldPassword, newPassword])

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>)=>{
        switch (e.target.name) {
            case 'oldPassword':
                setOldPassDirty(true)
                break
            case 'newPassword':
                setNewPassDirty(true)
                break
        }
    }

    const changePassword = ()=>{
        if (userStore?.user.email){
            UserService.changePassword(userStore?.user.email, oldPassword, newPassword)
                .then(response => {
                    alert('пароль успешно изменен')
                    userStore?.logout()
                    navigate(SHOP_ROUTE)
                })
                .catch(err=>{
                    if(err.response){
                        alert("Ошибка, старый пароль не верный")
                    }
                })
        }
    }
    return (
        <div className={classes.container + ' ' + global.content}>
            <h2>Смена пароля</h2>
            <p>Для смены пароля введит свой старый пароль и новый пароль</p>
            <form className={classes.form}>
                {
                    oldPassDirty && oldPassErr &&
                    <span style={{color: 'red'}}>{oldPassErr}</span>
                }
                <div>
                    Старый пароль:
                    <input
                        name="oldPassword"
                        type="password"
                        placeholder="Старый пароль"
                        value={oldPassword}
                        onChange={e=>passwordHandler(e)}
                        onBlur={(e)=>{onBlurHandler(e)}}
                    />
                </div>
                {
                    newPassDirty && newPassErr &&
                    <span style={{color: 'red'}}>{newPassErr}</span>
                }
                <div>
                    Новый пароль:
                    <input
                        name="newPassword"
                        type="password"
                        placeholder="Новый пароль"
                        value={newPassword}
                        onChange={e=>passwordHandler(e)}
                        onBlur={(e)=>{onBlurHandler(e)}}
                    />
                </div>
                <div className={classes.bottom}>
                    <Button
                        className={button.green}
                        onClick={()=>{changePassword()}}
                        disabled={!formValid}
                    >
                        Сменить пароль
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PasswordUpdateConfirmPage;