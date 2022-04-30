import './index.scss'
import { Link, useNavigate } from "react-router-dom";
import img from '../../assets/Imgs/tianshuilog.png'
import { Button } from 'antd';
interface NavOption {
    name: string;
    path: string;
    className?: string;
}
export default function Header() {
    let navigate = useNavigate();

    const toSomePage = (path: string) => (e: any) => {
        navigate(path)
    }
    const navOptions: NavOption[] = [
        {
            name: "首页",
            path: '/',
            className: 'home-page',
        },
        {
            name: "学生信息",
            path: '/student',
            className: 'student-page',
        },
        {
            name: "接种信息",
            path: '/vaccine',
            className: 'vaccine-page',
        },
        {
            name: "区域管理",
            path: '/area',
            className: 'area-page',
        },
    ]

    return <div className="top" >
        <img src={img} className="img-log" />
        <ul className="top-ul">
            {navOptions.map(option => {
                return <li className={option.className} onClick={toSomePage(option.path)}
                    key={option.path}>{option.name}</li>
            })}
        </ul>
        <Button onClick={toSomePage('./login')} className='Login'>登录</Button>
    </div>

}



