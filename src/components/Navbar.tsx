import React, {useContext, useEffect, useState} from 'react';
import classes from './style/Navbar.module.css'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {IType} from "../types/IType";
const Navbar = observer(() => {
    const {deviceStore} = useContext(Context)
    return (
        <div className={classes.navbar}>
            {
                deviceStore?.types.map(type=>
                    <div
                        key={type._id}
                        className={type._id == deviceStore?.selectedType._id
                            ? `${classes.type} ${classes.active}`
                            : classes.type
                        }
                        onClick={()=> {
                            if (deviceStore?.selectedType.name === type.name){
                                deviceStore?.setSelectedType({} as IType)
                            }else {
                                deviceStore?.setSelectedType(type)
                            }
                        }}
                    >
                        {type.name}
                    </div>
                )
            }
        </div>
    );
});

export default Navbar;