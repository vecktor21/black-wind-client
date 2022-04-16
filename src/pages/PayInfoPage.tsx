import React from 'react';
import global from '../components/style/Global.module.css'
import {PAY_ROUTE} from "../consts/consts";

const PayInfoPage = () => {
    return (
        <div className={global.container + ' ' + global.content}>
            <h1 className={global.header}>Оплата</h1>
            <ul className={global.linkBar}>
                <li><a href={`${PAY_ROUTE}/#1`} className={global.link}>Оплата онлайн</a></li>
                <li><a href={`${PAY_ROUTE}/#2`} className={global.link}>Оплата при получении</a></li>
                <li><a href={`${PAY_ROUTE}/#3`} className={global.link}>Оплата в рассрочку и кредит</a></li>
            </ul>
            <h2>Доступные способы оплаты:</h2>
            <h2 id="1">Оплата онлайн</h2>
            <ul className={global.markedList}>
                <li>Оплата банковской картой онлайн</li>
                <li>Оплата через QIWI</li>
            </ul>
            <h2 id="2">Оплата при получении</h2>
            <ul className={global.markedList}>
                <li>Оплата банковской картой или QR в пунктах самовывоза</li>
                <li>Оплата банковской картой курьеру</li>
                <li>Оплата наличными в пунктах самовывоза</li>
                <li>Оплата наличными курьеру</li>
                <li>Наложенный платеж EMS</li>
                <li>Наложенный платеж АО «Казпочта»</li>
            </ul>
            <h2 id="3">Оплата в рассрочку и кредит</h2>
            <ul className={global.markedList}>
                <li>Кредитование в Евразийском банке</li>
                <li>Кредитование в Home Credit Bank</li>
                <li>Кредитование в Kaspi Bank</li>
                <li>Кредитование в Zoodpay</li>
            </ul>
        </div>
    );
};

export default PayInfoPage;