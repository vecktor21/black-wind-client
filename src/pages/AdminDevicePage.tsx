import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import global from "../components/style/Global.module.css";
import classes from "../components/style/AdminPage.module.css";
import BackButton from "../components/UI/BackButton";
import Button from "../components/UI/Button";
import button from "../components/UI/Button.module.css";
import DeviceCreateModal from "../components/DeviceCreateModal";
import DeviceUpdateModal from "../components/DeviceUpdateModal";
import DeviceDeleteModal from "../components/DeviceDeleteModal";

const AdminDevicePage = observer(() => {
    const [isAddModalShow, setIsAddModalShow] = useState(false)
    const [isUpdateModalShow, setIsUpdateModalShow] = useState(false)
    const [isDeleteModalShow, setIsDeleteModalShow] = useState(false)


    const openAddModal = ()=>{
        setIsAddModalShow(true)
    }

    const openUpdateModal = ()=>{
        setIsUpdateModalShow(true)
    }

    const openDeleteModal = ()=>{
        setIsDeleteModalShow(true)
    }



    return (
        <div className={global.container + ' ' + global.content + ' ' + classes.content}>
            <BackButton/>
            <h1>Управление товарами</h1>
            <Button onClick={()=>{openAddModal()}} className={button.blue}>Добавить</Button>
            <DeviceCreateModal active={isAddModalShow} setActive={setIsAddModalShow}/>

            <Button onClick={()=>{openUpdateModal()}} className={button.blue}>Изменить</Button>
            <DeviceUpdateModal active={isUpdateModalShow} setActive={setIsUpdateModalShow}/>

            <Button onClick={()=>{openDeleteModal()}} className={button.red}>Удалить</Button>
            <DeviceDeleteModal active={isDeleteModalShow} setActive={setIsDeleteModalShow}/>
        </div>
    );
});

export default AdminDevicePage;