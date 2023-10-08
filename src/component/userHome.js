import React, {useEffect, useState} from 'react';
import './userHome.css'
import { Menubar } from 'primereact/menubar';
import { useParams } from 'react-router-dom';

const UserHome = () => { // Will take props as user information will be passed.

    const { userId } = useParams();
    const[userData, setUserData] = useState(null);

    useEffect(() => {
        
    })

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