//импорт необходимых компонентов
import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import BasketStore from "./store/BasketStore";
//создание локального интерфейса для хранилища.
interface IContext {
    userStore: UserStore;
    deviceStore: DeviceStore;
    basketStore: BasketStore;
}
//создание контекста. именно этот контекст обеспечивает хранение данных глобально
export const Context = createContext<Partial<IContext>>({});
//код для рендера React клиента. в конце показывается, что этот элемент встраивается в элемент с id="root" в index.hmtl файле
ReactDOM.render(
    //создание и инициализация контекста
    <Context.Provider
        value={{
            userStore: new UserStore(),
            deviceStore: new DeviceStore(),
            basketStore: new BasketStore()
        }}
    >
        {/*рендеринг внутри глобального контейнера элемента App. он показан в файле App.tsx*/}
        <App />
    </Context.Provider>,
  document.getElementById('root')
);
