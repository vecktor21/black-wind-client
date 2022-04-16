import React from 'react';
import classes from './Loading.module.css'
import load from '../../assets/loading.svg'
import global from '../style/Global.module.css'
const Loading = () => {
    return (
        <div className={global.content + ' ' + global.container + ' ' + classes.container}>
            <img  className={classes.load} src={load}/>
        </div>
    );
};

export default Loading;