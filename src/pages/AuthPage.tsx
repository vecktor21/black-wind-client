import React, {FC} from 'react';
import Form from '../components/UI/Form'
import global from '../components/style/Global.module.css'
import classes from '../style/Auth.module.css'

const AuthPage :FC= () => {
    return (
        <div className={global.content + ' ' + global.container}>
            <Form/>
        </div>
    );
};

export default AuthPage;