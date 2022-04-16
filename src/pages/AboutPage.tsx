import React from 'react';
import global from '../components/style/Global.module.css'
import {Context} from "../index";
const AboutPage = () => {
    return (
        <div className={global.container + ' ' + global.content}>
            <h1 className={global.header}>О компании</h1>
            <p><span className={global.bold}>«Черный Ветер»</span> - специализированная торговая сеть магазинов электроники и компьютерной техники. Компания является одной из ведущих торговых сетей по продаже компьютерной техники в Казахстане, в которой работает более 4500 сотрудников.</p>
            <p><span className={global.bold}>Наша миссия:</span> Вдохновленные <span className={global.bold}>«Черным Ветером»</span>, мы раскрываем свой потенциал и делаем жизнь людей ярче, а быт комфортнее.</p>
            <p><span className={global.bold}>Наш девиз:</span> Качество во всем!</p>
            <p><span className={global.bold}>Ценности компании:</span> Честность, командный дух, профессионализм, свобода и ответственность, забота о клиенте, лидерство, креативность.</p>
            <p><span className={global.bold}>Социальная ответственность:</span> Руководство компании <span className={global.bold}>«Черный Ветер»</span> осознаёт свою ответственность за будущее нового поколения, и поэтому, всемерно способствует обучению и карьерному продвижению молодых сотрудников.</p>
            <p>Более 40 магазинов розничной сети <span className={global.bold}>«Черный Ветер»</span> в Нур-Султане, Алматы, Павлодаре, Караганде, Костанае, Рудном, Актобе и других городах, а также интернет-магазин обслуживают как жителей городов, так и отдалённых поселков Казахстана. За 13 лет работы интернет-магазина доставлено более 1 миллиона заказов. </p>
        </div>
    );
};

export default AboutPage;