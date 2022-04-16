import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import classes from "./style/BrandBar.module.css";
import {IBrand} from "../types/IBrand";
import {IType} from "../types/IType";

const BrandBar = observer(() => {
    const {deviceStore} = useContext(Context)
    return (
        <div className={classes.brandContainer}>
            {deviceStore?.brands.map(brand=>
                <div
                    className={deviceStore?.selectedBrand.name == brand.name
                        ?
                        `${classes.brand} ${classes.active}`
                        :
                        classes.brand
                    }
                    onClick={()=> {
                        if (deviceStore?.selectedBrand.name === brand.name){
                            deviceStore?.setSelectedBrand({} as IBrand)
                        }else {
                            deviceStore?.setSelectedBrand(brand)
                        }
                    }}

                    key={brand._id}
                >
                    {brand.name}
                </div>
            )}
        </div>
    );
});

export default BrandBar;