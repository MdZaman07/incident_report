import React, {useState} from 'react';
import './userHome.css'
import { Menubar } from 'primereact/menubar';

const UserHome = (props) => { // Will take props as user information will be passed.

    const formList = {

    }

    const items = [
        {
            label: `Welcome, User`,
            className: 'welcome-user',
            disabled: true,
        },
        {
           label:'Home',
           icon:'pi pi-fw pi-file',
        },
        {
            label:'Report an incident',
           icon:'pi pi-fw pi-file',
        }
    ];

    return (
        <>
        <Menubar model={items}/>  
        </>
    )
}

export default UserHome