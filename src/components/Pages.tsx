import React, {FC, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import classes from './style/Pages.module.css'
import moveNext from '../assets/next.svg'

const Pages = observer(() => {
    const {deviceStore} = useContext(Context)
    const totalPages = deviceStore?.totalPages
    const pages = []
    if (totalPages){
        for (let i = 0; i < totalPages; i++){
            pages.push(i+1)
        }
    }
    return (
        <div className={classes.pages}>
            <div
                className={`${classes.page_container} ${classes.page_container}`}
                onClick={()=>deviceStore?.setCurrentPage(deviceStore?.currentPage-1)}
            >
                <img src={moveNext} width={'20px'} style={{transform: 'rotate(180deg)'}} alt=""/>
            </div>
            {pages.map(page=>
                <div
                    key={page}
                    className={`${classes.page_container} ${deviceStore?.currentPage === page ? classes.active : classes.page}`}
                    onClick={()=>deviceStore?.setCurrentPage(page)}
                >
                    {page}
                </div>
            )}
            <div
                className={`${classes.page_container} ${classes.page_container}`}
                onClick={()=>deviceStore?.setCurrentPage(deviceStore?.currentPage+1)}
            >
                <img src={moveNext} width={'20px'} alt=""/>
            </div>
        </div>
    );
});

export default Pages;