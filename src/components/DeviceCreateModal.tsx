import React, {FC, FormEvent, useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import global from "./style/Global.module.css";
import Button from "./UI/Button";
import button from "./UI/Button.module.css";
import Modal from "./Modal";
import dropdown from "./UI/DropDown.module.css";
import {Context} from "../index";
import classes from './style/AdminPage.module.css'
import {IInfo} from "../types/IInfo";
import DeviceService from "../services/DeviceService";

interface Props {
    active: boolean;
    setActive: (bool: boolean)=>void;
}
interface Info extends IInfo{
    number: number
}
const DeviceCreateModal :FC <Props>=observer((props) => {
    const {deviceStore} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [selectedBrand, setSelectedBrand] = useState('')
    const [isTypesVisible, setIsTypesVisible] = useState(false)
    const [isBrandsVisible, setIsBrandsVisible] = useState(false)
    const [info, setInfo] = useState([{title: '', value: '', number: 0} as Info])
    const [isData, setIsData] = useState(false)
    const [isInfoValid, setIsInfoValid] = useState(false)
    const [img, setImg] = useState({} as File)
    useEffect(()=>{
        if (isInfoValid){
            if (name && price && selectedType && selectedBrand){
                setIsData(true)
            }else {
                setIsData(false)
            }
        }else {
            setIsData(false)
        }
    },[selectedBrand, selectedType, name, price, isInfoValid])

    useEffect(()=>{
        setIsInfoValid(info.every((i)=>{
            return i.title.length != 0 && i.value.length != 0
        }))

    },[info])

    const addInfo = ()=>{
        setInfo(info=>[...info, {title: '', value: '', number: Date.now()}])
    }

    const changeInfo = (key:string, value:string, number:number)=>{
        setInfo(info.map(i=>i.number === number ? {...i, [key]: value} : i))
    }

    const deleteInfo = (number: number)=>{
        setInfo(info.filter(i=>i.number !== number))
    }
    const createDevice = ()=>{
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('info', JSON.stringify(info))
        formData.append('description', description)
        formData.append('brand', selectedBrand)
        formData.append('type', selectedType)
        formData.append('img', img)
        DeviceService.createDevice(formData).then(response=>{
            if(window.confirm('добавить товар?')){
                alert('товар успешно добавлен')
                props.setActive(false)
            }
        }).catch(e=>{
            alert(e)
        })
    }

    const selectImg = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            setImg(e.target.files[0])
        }
    }

    return (
        <Modal active={props.active} setActive={props.setActive}>
            <div className={classes.deviceCard}>
                <h2>Добавление</h2>
                <div>
                    <div>
                        <label htmlFor="name">
                            Введите название
                        </label>
                        <input type="text" id={'name'} placeholder={'название'} value={name} onChange={(e)=>{setName(e.target.value)}}/>
                    </div>
                    <div>
                        <label htmlFor="name">
                            выберите изображение
                        </label>
                        <input
                            type="file"
                            id={'file'}
                            onChange={(e)=>{selectImg(e)}}
                        />
                    </div>
                    <div>
                        <label htmlFor="price">
                            Введите цену
                        </label>
                        <input type="number" id={'price'} placeholder={'цена'} min={1} value={price} onChange={(e)=>{setPrice(Number(e.target.value))}}/>
                    </div>
                    <div className={classes.textarea} >
                        <p>
                            Введите описание товара
                        </p>
                        <textarea id={'description'} placeholder={'описание'} value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                    </div>
                </div>
                {/*типы*/}
                <ul className={dropdown.dropdown}
                    onClick={()=>{setIsTypesVisible(!isTypesVisible)}}
                    onMouseLeave={()=>{setIsTypesVisible(false)}}
                    title='тип'
                >
                    <li
                        className={dropdown.title}
                    >
                        {selectedType ? selectedType : 'Выберите тип'}
                        <span className={`${dropdown.arrow} ${isTypesVisible ? dropdown.arrow_down : dropdown.arrow_up}`}></span>
                    </li>
                    <ul className={`${dropdown.menu} ${isTypesVisible ? dropdown.visible : dropdown.invisible}`}>
                        {deviceStore?.types.map(type=>
                            <li className={dropdown.item}
                                key={type._id}
                                onClick={()=>{
                                    setSelectedType(type.name)
                                }}
                            >
                                {type.name}
                            </li>
                        )}
                    </ul>
                </ul>
                {/*бренды*/}
                <ul className={dropdown.dropdown}
                    onClick={()=>{setIsBrandsVisible(!isBrandsVisible)}}
                    onMouseLeave={()=>{setIsBrandsVisible(false)}}
                    title='бренд'
                >
                    <li
                        className={dropdown.title}
                    >
                        {selectedBrand ? selectedBrand : 'Выберите бренд'}
                        <span className={`${dropdown.arrow} ${isBrandsVisible ? dropdown.arrow_down : dropdown.arrow_up}`}></span>
                    </li>
                    <ul className={`${dropdown.menu} ${isBrandsVisible ? dropdown.visible : dropdown.invisible}`}>
                        {deviceStore?.brands.map(brand=>
                            <li className={dropdown.item}
                                key={brand._id}
                                onClick={()=>{
                                    setSelectedBrand(brand.name)
                                }}
                            >
                                {brand.name}
                            </li>
                        )}
                    </ul>
                </ul>
                <div>Характеристики</div>
                <Button onClick={()=>{addInfo()}} className={button.green}>Добавить</Button>
                <div className={classes.info}>
                    {
                        info.map((i)=>
                            <div className={classes.infoCard} key={i.number}>
                                <div>
                                    <input
                                        type='text'
                                        placeholder='введите название характеристики'
                                        value={i.title}
                                        onChange={e=>changeInfo('title', e.target.value, i.number)}
                                        title='название характеристики'
                                    />
                                </div>
                                <div>
                                    <input
                                        type='text'
                                        placeholder='введите значение характеристики'
                                        value={i.value}
                                        onChange={e=>changeInfo('value', e.target.value, i.number)}
                                        title='значение характеристики'
                                    />
                                </div>
                                <div><Button onClick={()=>{deleteInfo(i.number)}} className={button.red}>удалить</Button></div>
                            </div>
                        )
                    }
                </div>
                <Button onClick={()=>{createDevice()}} className={button.green} disabled={!isData}>добавить</Button>
            </div>
        </Modal>
    );
});

export default DeviceCreateModal;