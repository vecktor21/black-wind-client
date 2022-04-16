import {IRoute} from "./types/IRoute";
import {
    ABOUT_ROUTE,
    ADMIN_ROUTE, ADMIN_ROUTE_BRANDS, ADMIN_ROUTE_DEVICES, ADMIN_ROUTE_TYPES,
    BASKET_ROUTE, CONTACTS_ROUTE,
    DELIVERY_ROUTE,
    DEVICE_ROUTE, EXCHANGE_ROUTE, LOGIN_ROUTE, PASSWORD_UPDATE_CONFIRM_ROUTE, PASSWORD_UPDATE_SEND_ROUTE,
    PAY_ROUTE, REGISTRATION_ROUTE,
    SHOP_ROUTE
} from "./consts/consts";
import AdminPage from "./pages/AdminPage";
import Shop from "./pages/Shop";
import BasketPage from "./pages/BasketPage";
import DevicePage from "./pages/DevicePage";
import AboutPage from "./pages/AboutPage";
import DeliveryPage from "./pages/DeliveryPage";
import PayInfoPage from "./pages/PayInfoPage";
import ExchangeInfoPage from "./pages/ExchangeInfoPage";
import ContactsPage from "./pages/ContactsPage";
import PasswordUpdateSendPage from "./pages/PasswordUpdateSendPage";
import PasswordUpdateConfirmPage from "./pages/PasswordUpdateConfirmPage";
import AuthPage from "./pages/AuthPage";
import AdminBrandPage from "./pages/AdminBrandPage";
import AdminTypePage from "./pages/AdminTypePage";
import AdminDevicePage from "./pages/AdminDevicePage";

export const publicRoutes:  IRoute[] =[
    {
        path: SHOP_ROUTE,
        component: <Shop/>
    },
    {
        path: BASKET_ROUTE,
        component: <BasketPage/>
    },
    {
        path: DEVICE_ROUTE + '/:id',
        component: <DevicePage/>
    },
    {
        path: ABOUT_ROUTE,
        component: <AboutPage/>
    }
    ,
    {
        path: DELIVERY_ROUTE,
        component: <DeliveryPage/>
    },
    {
        path: PAY_ROUTE,
        component: <PayInfoPage/>
    },{
        path: EXCHANGE_ROUTE,
        component: <ExchangeInfoPage/>
    },
    {
        path: CONTACTS_ROUTE,
        component: <ContactsPage/>
    },
    {
        path: PASSWORD_UPDATE_SEND_ROUTE,
        component: <PasswordUpdateSendPage/>
    },
    {
        path: PASSWORD_UPDATE_CONFIRM_ROUTE,
        component: <PasswordUpdateConfirmPage/>
    },
    {
        path: REGISTRATION_ROUTE,
        component: <AuthPage/>
    },
    {
        path: LOGIN_ROUTE,
        component: <AuthPage/>
    }

]

export const privateRoutes: IRoute[] = [
    {
        path: ADMIN_ROUTE,
        component: <AdminPage/>
    },
    {
        path: ADMIN_ROUTE_BRANDS,
        component: <AdminBrandPage/>
    },
    {
        path: ADMIN_ROUTE_TYPES,
        component: <AdminTypePage/>
    },
    {
        path: ADMIN_ROUTE_DEVICES,
        component: <AdminDevicePage/>
    }

]