import React, {FC} from 'react';
import classes from './Button.module.css'

interface Prop {
    children: React.ReactNode,
    onClick: ()=>void,
    className: string,
    disabled?: boolean
}

const Button :FC<Prop>= (props) => {
    return (
        <button
            onClick={(e:React.FormEvent<HTMLButtonElement>)=>{
                e.preventDefault()
                props.onClick()
            }}
            className={classes.button + ' ' + props.className}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;