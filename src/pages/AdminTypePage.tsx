import React, {useState} from 'react';
import button from '../components/UI/Button.module.css'
import Button from "../components/UI/Button";
import global from '../components/style/Global.module.css'
import classes from '../components/style/AdminPage.module.css'
import {observer} from "mobx-react-lite";
import TypeCreateModal from "../components/TypeCreateModal";
import TypeUpdateModal from "../components/TypeUpdateModal";
import TypeDeleteModal from "../components/TypeDeleteModal";
import BackButton from "../components/UI/BackButton";

const AdminTypePage = observer(() => {
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
                <h1>Управление типами</h1>
                <Button onClick={()=>{openAddModal()}} className={button.blue}>Добавить</Button>
                <TypeCreateModal active={isAddModalShow} setActive={setIsAddModalShow}/>

                <Button onClick={()=>{openUpdateModal()}} className={button.blue}>Изменить</Button>
                <TypeUpdateModal active={isUpdateModalShow} setActive={setIsUpdateModalShow}/>

                <Button onClick={()=>{openDeleteModal()}} className={button.red}>Удалить</Button>
                <TypeDeleteModal active={isDeleteModalShow} setActive={setIsDeleteModalShow}/>
        </div>
    );
});

export default AdminTypePage;