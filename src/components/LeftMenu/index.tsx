import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { menuOptions } from "./constant";
import "./index.scss";
export default function Leftmenu() {
    let location = useLocation();
    const paths = location.pathname.split("/")
    const pathName = paths[1] || 'home';
    const option = menuOptions[pathName]
    // useState()
    // useEffect(() => {
    //     console.log(pathName);
    // }, [pathName, option])
    // navigate('/home/news')
    //左边菜单栏
    let navigate = useNavigate();
    const onclick = (item: any) => (e: any) => {
        navigate(pathName + '/' + item.key);
        console.log(item.key + ":" + item.name)
    }
    const path = paths.pop()//取出地址最后一个
    return (
        <Menu className="menu">
            {
                option.map(item => {
                    const isActive = (path === item.key)
                    return <Menu.Item key={item.key} className={'menu-item ' + (isActive ? 'actived' : '')} 
                    onClick={onclick(item)}>
                        {item.name}
                    </Menu.Item>
                })
            }
        </Menu>

    );
}