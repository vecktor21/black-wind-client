import React, {FC, useMemo, useState} from 'react';
import classes from './style/Modal.module.css'

interface Props {
    children: React.ReactNode;
    active: boolean;
    setActive: (bool: boolean)=>void;
}
const Modal :FC<Props>= (props) => {

    return (
        <div className={props.active ? `${classes.modal} ${classes.show}` : `${classes.modal} ${classes.hide}`} onClick={()=>{props.setActive(false)}}>
            <div className={classes.content} onClick={(e)=>{e.stopPropagation()}}>
                {props.children}
            </div>
        </div>
    );
};

export default Modal;