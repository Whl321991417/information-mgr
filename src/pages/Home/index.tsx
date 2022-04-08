import './index.scss'
// import ApiService from '../../request/api-services'
// import { Component, useState } from 'react';
// import img from '../../assets/test.png'
// import { StudentInfo } from './types';
import { Outlet } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router";
import { useEffect } from 'react';
export default function Home() {
    // const [studentList, setStudentList] = useState<StudentInfo[]>([]);
    // const getStudentInfo = async () => {
    //     const result: StudentInfo[] = await ApiService.news.getList({
    //         name: "xiaoming"
    //     })
    //     setStudentList(result)
    // }
    // let location = useLocation();

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