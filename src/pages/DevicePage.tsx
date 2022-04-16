import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter, useNavigate, useParams} from "react-router-dom";
import {Context} from "../index";
import {IDevice} from "../types/IDevice";
import {observer} from "mobx-react-lite";
import DeviceService from "../services/DeviceService";
import global from '../components/style/Global.module.css'
import classes from '../components/style/DevicePage.module.css'
import button from '../components/UI/Button.module.css'
import {REACT_APP_API_URL} from "../consts/consts";
import Button from "../components/UI/Button";
import Error from "../components/UI/Error";
import Header from "../components/Header";
import BackButton from "../components/UI/BackButton";
import Loading from "../components/UI/Loading";
import {BasketDevice} from "../types/BasketDevice";

const DevicePage= observer(() => {
    const {id} = useParams()
    const {deviceStore, basketStore} = useContext(Context)
    const [isError, setIsError] = useState(false)

    useEffect(()=>{
        if (id){
            deviceStore?.getOneDevice(id).then(response=>{
                console.log('selectedDevice: ', response)
            }).catch(e=>{
                setIsError(true)
            })
        }
    },[])

    useEffect(()=>{
        console.log('deviceStore?.isLoading: ', deviceStore?.isLoading)
    })

    if (isError){
        return (
            <div className={global.container + ' ' + global.content}>
                <Error>Ошибка, товар не найден</Error>
            </div>
        );
    }
    return (
        <div className={classes.devicePage + ' ' + global.content}>
            {deviceStore?.isLoading || !deviceStore?.selectedDevice
            ?
                <Loading/>
            :
                <div>
                    <BackButton/>
                    <h1 className={classes.title}>{deviceStore?.selectedDevice.name}</h1>
                    <div className={classes.top}>
                        <img src={`${REACT_APP_API_URL}/${deviceStore?.selectedDevice.img}`} alt=""/>
                        <div className={classes.top_right}>
                            <div>
                                <h2>Цена: {deviceStore?.selectedDevice.price} тг.</h2>
                                <Button
                                    onClick={()=>{
                                        basketStore?.addDevice(new BasketDevice(
                                            deviceStore?.selectedDevice.name,
                                            deviceStore?.selectedDevice.description,
                                            deviceStore?.selectedDevice._id,
                                            deviceStore?.selectedDevice.price));
                                        alert('добавлен товар')}}
                                    className={button.green}>В корзину</Button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.description}>
                        <h2 className={global.header}>Описание</h2>
                        {deviceStore?.selectedDevice.description}
                    </div>
                    <div className={classes.info}>
                        <h2 className={global.header}>Технические характеристики</h2>
                        <table>
                            {deviceStore?.selectedDevice.info.map((info, index)=>
                                <tr key={index} className={classes.info_line}>
                                    <td>{info.title}</td>
                                    <td>{info.value}</td>
                                </tr>

                            )}
                        </table>
                    </div>
                </div>
            }
        </div>
    );
});
/*

*/
export default DevicePage;