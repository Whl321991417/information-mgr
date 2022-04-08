import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './index.scss'
export default function Manage() {
    let navigate = useNavigate();
    useEffect(() => {
        navigate('/Manage/managestudents')
    }, [])
    return <Outlet />
}