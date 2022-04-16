import React, {FC, useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import DeviceService from "../services/DeviceService";
import DeviceCard from "../components/DeviceCard";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import {BrowserRouter, useParams, useSearchParams} from "react-router-dom";
import classes from '../components/style/Shop.module.css'
import BrandBar from "../components/BrandBar";
import Loading from "../components/UI/Loading";
import Pages from "../components/Pages";

const Shop = observer( () => {
    const {deviceStore} = useContext(Context)
    const {userStore} = useContext(Context)

    useEffect(()=>{
        deviceStore?.fetchDevices(deviceStore?.limit, deviceStore?.currentPage, '', '')
    }, [])

    useEffect(()=>{
        deviceStore?.fetchDevices(deviceStore?.limit, deviceStore?.currentPage, deviceStore?.selectedBrand._id, deviceStore?.selectedType._id)
    }, [deviceStore?.currentPage, deviceStore?.selectedType, deviceStore?.selectedBrand])
    return (
            <div>
                {
                    deviceStore?.isLoading
                        ?
                        <div><Loading/></div>
                        :

                        <div>
                            <div key={userStore?.user._id} className={classes.shopContainer}>
                                <Navbar/>
                                <div className={classes.deviceContainer}>
                                    <BrandBar/>
                                    {deviceStore?.devices.map(device=>
                                        <DeviceCard
                                            name={device.name}
                                            price={device.price}
                                            img={device.img} description={device.description}
                                            brandId={device.brand}
                                            typeId={device.type}
                                            key={device._id}
                                            id={device._id}
                                        />
                                    )}
                                </div>
                            </div>
                            <Pages/>
                        </div>

                }
            </div>
    );

});

export default Shop;