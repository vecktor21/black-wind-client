//импорт компонентов
import React, {useContext, useEffect} from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import Header from "./components/Header";
import AppRouter from "./components/AppRouter";
import Footer from "./components/Footer";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
//создание элемента App
const App = observer(() =>{
    const {userStore} = useContext(Context)
    //проверка авторизации пользователя
    useEffect( ()=>{
        try {
            userStore?.checkAuth()
            // console.log('app/useEffect')
        }catch (e) {
            console.log(e)
        }
    },[])
    //элемент возвращает собой сайт с настроенной маршрутизацией
  return (
    <BrowserRouter>
        <Header/>
        <AppRouter/>
        <Footer/>
    </BrowserRouter>
  );
})
//экспорт элемента
export default App;
