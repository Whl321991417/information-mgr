import './index.scss'
import { Link, useNavigate } from 'react-router-dom';
import img from '../../assets/Imgs/tianshuilog.png'
import { Button, Dropdown, Form, Input, Menu, message, Modal, Space } from 'antd';
import { UserOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setIsLogin } from '../../state/actions';

interface NavOption {
    name: string;
    path: string;
    className?: string;
}
interface Poops {
    isModalVisible: boolean;
    onclose: () => void
}
//重置密码
function Repwd({ isModalVisible, onclose }: Poops) {
    const handleOk = () => {

        onclose();
    };

    const handleCancel = () => {
        onclose();
    };
    return <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='确认重置'
        cancelText='取消'>
        <Form.Item name="pwd" label="密码" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Form.Item name="manager" label="手机号码" >
            <Input />
        </Form.Item>
        <Form.Item name="manager" label="验证码" >
            <Input />
        </Form.Item>
    </Modal>
}
//个人信息页面
function UserInf({ isModalVisible, onclose }: Poops) {
    const handleOk = () => {

        onclose();
    };

    const handleCancel = () => {
        onclose();
    };
    return <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='修改'
        cancelText='取消'>
        <Form.Item name="pwd" label="账号：" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Form.Item name="manager" label="姓名：" >
            <Input />
        </Form.Item>
        <Form.Item name="manager" label="手机号：" >
            <Input />
        </Form.Item>
    </Modal>
}
function Header({ isLogin, dispatch }: any) {
    let navigate = useNavigate();
    const [useInfoVisible, setUseInfoVisible] = useState<boolean>(false)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(setIsLogin(true))
        } else {
            dispatch(setIsLogin(false))
        }
    }, [])
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


    //登录菜单
    function handleMenuClick(e: any) {
        switch (e.key) {
            case '1':
                console.log('个人信息');
                setUseInfoVisible(true)
                break;
            case '2': console.log('重置密码');
                setUseInfoVisible(true)
                break;
            case '3': console.log('退出登录');
                outlogin();
                break;
        }

    }

    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: '个人信息',
                    key: '1',
                },
                {
                    label: '重置密码',
                    key: '2'
                },
                {
                    label: '退出登录',
                    key: '3'
                },
            ]}
        />
    );

    function loginMenu() {
        return <Dropdown overlay={menu}>
            <div>
                <UserOutlined
                    style={{ fontSize: '30px', color: '#fff' }}
                />
                <CaretDownOutlined style={{ fontSize: '15px', color: '#000' }} /><br></br>
                <span>已登录</span>
            </div>

        </Dropdown>
    }
    //退出登录
    const outlogin = () => {
        localStorage.removeItem('token')
        dispatch(setIsLogin(false))
    }
    const onclose = () => {
        setUseInfoVisible(false)
    }
    //登录区域
    function loginico() {
        if (isLogin) {
            return loginMenu()
        } else {
            return <Button onClick={toSomePage('./login')} className='Login'>登录</Button>
        }
    }
    return <div className="top" >
        <img src={img} className="img-log" />
        <ul className="top-ul">
            {navOptions.map(option => {
                return <li className={option.className} onClick={toSomePage(option.path)}
                    key={option.path}>{option.name}</li>
            })}
        </ul>
        {loginico()}
        <UserInf isModalVisible={useInfoVisible} onclose={onclose} />

        <Repwd isModalVisible={useInfoVisible} onclose={onclose} />

    </div>

}
export default connect(
    ({ loginStateReducer: state }) => {
        return {

            isLogin: state.isLogin
        }
    }
)(Header)




