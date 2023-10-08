import React, {useEffect, useState} from 'react';
import './userHome.css'
import { Menubar } from 'primereact/menubar';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Form from './form'

const UserHome = () => {

    const { userId } = useParams();
    const[userData, setUserData] = useState(null);
    const[showForm, setShowForm] = useState(false);
    const[header, setHeader] = useState('Your Incident Archive')

    const navigate = useNavigate();

    const getUser = async () => {
        try {
            console.log('get name called')
            const response = await fetch('http://localhost:4000/api/user', {
                method: 'POST',
                body: JSON.stringify({ userId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Retrieved user success')
                const data = await response.json();
                return data.user
            } else {
                return 'Could not find name';
            }
        } catch (error) {
            console.log(error);
            return 'An error occurred';
        }
    };

    useEffect(() => {
        const fetchName = async () => {
            const user = await getUser();
            setUserData(user);
            console.log(userData)
        };
        fetchName();
    }, []);

    const welcomeMessage = userData ? `Welcome, ${userData.firstname}` : 'No name'

    const items = [
        {
            label: welcomeMessage,
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
        },
        {
            label: 'Sign out',
            command: () => {
                navigate('/login.js')
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