import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import './index.scss'
export default function MyInf() {
    let navigate = useNavigate();
    useEffect(() => {
        navigate('/MyInf/myinformation')
    }, [])
    return <Outlet />
}