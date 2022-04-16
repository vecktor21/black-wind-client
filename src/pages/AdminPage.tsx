import React, {FC, useContext, useEffect} from 'react';
import Button from "../components/UI/Button";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, ADMIN_ROUTE_BRANDS, ADMIN_ROUTE_DEVICES, ADMIN_ROUTE_TYPES} from "../consts/consts";
import button from '../components/UI/Button.module.css'
import BackButton from "../components/UI/BackButton";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import global from "../components/style/Global.module.css";
import classes from "../components/style/AdminPage.module.css";

const AdminPage :FC= observer(() => {
    const navigate = useNavigate()
    const {deviceStore} = useContext(Context)



    return (
        <div className={global.container + ' ' + global.content + ' ' + classes.content}>
            <BackButton/>
            <h1>Админ панель</h1>
            <div className={classes.content}>
                <Button onClick={()=>{navigate(ADMIN_ROUTE_BRANDS)}} className={button.blue}>Управление брендами</Button>
                <Button onClick={()=>{navigate(ADMIN_ROUTE_TYPES)}} className={button.blue}>Управление типами</Button>
                <Button onClick={()=>{navigate(ADMIN_ROUTE_DEVICES)}} className={button.blue}>Управление товарами</Button>
            </div>
        </div>
    );
});

export default AdminPage;