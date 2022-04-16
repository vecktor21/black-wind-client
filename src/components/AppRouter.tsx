import React, {useContext, useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom'
import {privateRoutes, publicRoutes} from '../routes'
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {userStore} = useContext(Context)
    return (
        <Routes>
            {/*идет проверка - является ли пользователь администратором или нет.
            в завимимости от этого ему будут доступны разные маршруты*/}
            {
                publicRoutes.map((route, index)=>
                    <Route key={route.path} element={route.component} path={route.path}/>
                )
            }
            {
                userStore?.user.role === 'ADMIN' &&
                privateRoutes.map((route)=>
                    <Route key={route.path} element={route.component} path={route.path}/>
                )
            }
        </Routes>
    );
});

export default AppRouter;