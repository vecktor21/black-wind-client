import React, {useContext, useState} from 'react';
import {Context} from "../index";
import global from "../components/style/Global.module.css";
import classes from "../components/style/AdminPage.module.css";
import BackButton from "../components/UI/BackButton";
import Button from "../components/UI/Button";
import button from "../components/UI/Button.module.css";
import TypeCreateModal from "../components/TypeCreateModal";
import TypeUpdateModal from "../components/TypeUpdateModal";
import TypeDeleteModal from "../components/TypeDeleteModal";
import BrandCreateModal from "../components/BrandCreateModal";
import BrandUpdateModal from "../components/BrandUpdateModal";
import BrandDeleteModal from "../components/BrandDeleteModal";

const AdminBrandPage = () => {
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
            <h1>Управление брендами</h1>
            <Button onClick={()=>{openAddModal()}} className={button.blue}>Добавить</Button>
            <BrandCreateModal active={isAddModalShow} setActive={setIsAddModalShow}/>

            <Button onClick={()=>{openUpdateModal()}} className={button.blue}>Изменить</Button>
            <BrandUpdateModal active={isUpdateModalShow} setActive={setIsUpdateModalShow}/>

            <Button onClick={()=>{openDeleteModal()}} className={button.red}>Удалить</Button>
            <BrandDeleteModal active={isDeleteModalShow} setActive={setIsDeleteModalShow}/>
        </div>
    );
};

export default AdminBrandPage;