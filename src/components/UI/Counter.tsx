import React, {FC} from 'react';
import classes from "./Counter.module.css";

interface Props {
    value: number,
    setValue: (num: number)=>void
}

const Counter:FC<Props> = (props) => {
    return (
        <div className={classes.counter}>
            <button onClick={()=>{props.setValue(props.value-1)}}>-</button>
            <input type="number" value={props.value} onChange={e=>{props.setValue(Number(e.target.value))}}/>
            <button onClick={()=>{props.setValue(props.value+1)}}>+</button>
        </div>
    );
};

export default Counter;