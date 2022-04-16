import React from 'react';
import button from "./Button.module.css";
import {useNavigate} from "react-router-dom";
import classes from './Button.module.css'
const BackButton = () => {
    const navigate = useNavigate()
    return (
        <button onClick={()=>navigate(-1)} className={button.historyBackBtn}>Назад</button>
    );
};

export default BackButton;