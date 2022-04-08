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
            name: "信息查询",
            path: '/check',
            className: 'Check-page',
        },
        {
            name: "信息修改",
            path: '/Manage',
            className: 'Manage-page',
        },
        {
            name: "个人信息",
            path: '/MyInf',
            className: 'MyInf-page',
        },
    ]

    return  <div className="top" >
            <img src={img} className="img-log" />
            <ul className="top-ul">
                {navOptions.map(option => {
                    return <li className={option.className} onClick={toSomePage(option.path)} 
                    key={option.path}>{option.name}</li>
                })}
            </ul>
            <Button onClick={toSomePage('./login')}  className='Login'>登录</Button>
        </div>

}



