import React, {useEffect, useState} from 'react';
import './userHome.css'
import { Menubar } from 'primereact/menubar';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Form from './form'

const UserHome = () => { // Will take props as user information will be passed.

    const { userId } = useParams();
    const[userData, setUserData] = useState(null);
    const[showForm, setShowForm] = useState(false);
    const[header, setHeader] = useState('Your Incident Archive')

    const navigate = useNavigate();

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
           command: () => {
            setShowForm(false);
            setHeader('Your incident archive')
           }
        },
        {
            label:'Report an incident',
           icon:'pi pi-fw pi-file',
           command: () => {
            setShowForm(true);
            setHeader('Report an incident')
           }
        }
    ];

    return (
        <>
        <Menubar model={items}/>
        <h1>{header}</h1>  
        {showForm && <Form/>}
        </>
    )
}

export default UserHome