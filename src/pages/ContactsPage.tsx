import React from 'react';
import global from '../components/style/Global.module.css'

const ContactsPage = () => {
    return (
        <div className={global.container + ' ' + global.content}>
            <h1 className={global.header}>Контакты</h1>
            <h2>Контактные номера:</h2>
            <ul>
                <li>+7 (727) 356-52-80 - сервис центр</li>
                <li>+7 771 920-19-20 - контакт центр</li>
            </ul>
            <h2>Адреса магазинов:</h2>
            <ul className={global.contacts}>
                <li>
                    <h3>Нур-султан:</h3>
                    <ul>
                        <li>ул. Пушкина, 11</li>
                        <li>ул. Куйши Дина, 7</li>
                    </ul></li>
                <li>
                    <h3>Астана:</h3>
                    <ul>
                        <li>ул. Пушкина, 11</li>
                        <li>ул. Куйши Дина, 7</li>
                    </ul>
                </li>
                <li>
                    <h3>Акмола:</h3>
                    <ul>
                        <li>ул. Пушкина, 11</li>
                        <li>ул. Куйши Дина, 7</li>
                    </ul>
                </li>
                <li>
                    <h3>Алмата:</h3>
                    <ul>
                        <li>ул. Макатаева, 117</li>
                        <li>пр. Райымбека, 101</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default ContactsPage;