import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import Button from "../components/UI/Button";
import button from "../components/UI/Button.module.css";
import {Context} from "../index";
import UserService from "../services/UserService";
import classes from '../components/style/ChangePassword.module.css'
import global from '../components/style/Global.module.css'

const PasswordUpdateSendPage = () => {
    const {userStore} = useContext(Context)
    const [response, setResponse] = useState('')

    const sendMail = ()=>{
        if (userStore?.user.email){
            UserService.confirmToUpdatePassword(userStore?.user.email)
                .then((response)=>setResponse(response.data.toString()))
                .catch(e=>{
                    setResponse(e.toString)
                })
        }else {
            alert('возникла ошибка. пожалуйства войдите снова')
        }
    }
    return(
        <div className={classes.container + ' ' + global.content}>
            {
                response
                    ?
                        <div>{response}</div>
                    :
                    <div>
                        <h2>Смена пароля</h2>
                        <p>При нажатии на кнопку - будет отправлено письмо с подтверждением действия на вашу электронную почту</p>
                        <Button onClick={()=>{sendMail()}} className={button.green}>Отправить</Button>
                    </div>
            }
        </div>
    )
};

export default PasswordUpdateSendPage;