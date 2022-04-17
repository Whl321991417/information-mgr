import './index.scss'
import { Outlet } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router";
import { useEffect } from 'react';
export default function Home() {
    let navigate = useNavigate();
    useEffect(() => {
        navigate('/home/today')
    }, [])
    return (
        <div className="home">
            <Outlet />
        </div>
    );
}