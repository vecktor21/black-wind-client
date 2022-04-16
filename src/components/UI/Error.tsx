import React, {FC, ReactElement} from 'react';
import global from '../components/style/Global.module.css'
import classes from "../style/Error.module.css";
import img from '../../assets/error.svg'
import BackButton from "./BackButton";
interface Props {
    children: React.ReactNode;
}
const Error :FC<Props> = (props: Props) => {
    return (
        <div className={classes.errorContainer}>
            <div>
                <img src={img} alt="error"/>
                <div>{props.children}</div><br/>
                <BackButton/>
            </div>
        </div>
    );
};

export default Error;