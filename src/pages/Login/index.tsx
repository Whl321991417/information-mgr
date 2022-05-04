
import { login } from '../../service/login';
import './index.scss'
import { Form, Input, Button, Checkbox, message, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginParams } from '../../model';
import { useNavigate } from 'react-router';
import imgLogin from '../../assets/Imgs/login.jpeg';
import md5 from 'md5';
import { setIsLogin } from '../../state/actions';
import { connect } from 'react-redux';
import { useState } from 'react';
//正则表达式验证手机号
// let myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/; // 正则
// let phone = 13581542451
// if(!myreg.test(phone)){ // 号码格式不正确
//   return console.log('请填写正确手机号码!')
// }

function Login({ dispatch }: any) {
    console.log(md5('123456'));

    let navigate = useNavigate();
    const onlogin = async (value: LoginParams) => {
        const token = await login('/api/login', {
            username: value.username,
            upwd: md5(value.upwd)
        })
        if (!token) {
            return
        }
        message.success('登录成功!');
        localStorage.setItem('token', token)
        dispatch(setIsLogin(true))
        navigate('/')
    }
    //注册用户界面
    function Newuser() {
        const [isModalVisible, setIsModalVisible] = useState(false);

        const showModal = () => {
            setIsModalVisible(true);
        };

        const handleOk = () => {
            setIsModalVisible(false);
        };

        const handleCancel = () => {
            setIsModalVisible(false);
        };
        return <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText='确认注册'>
            <Form.Item name="name" label="账号：" rules={[{ required: true }]}>
                <Input placeholder="" />
            </Form.Item>
            <Form.Item name="manager" label="姓名" >
                <Input placeholder="" />
            </Form.Item>
            <Form.Item name="name" label="手机号" rules={[{ required: true }]}>
                <Input placeholder="" />
            </Form.Item>

            <Form.Item name="manager" label="密码" >
                <Input placeholder="" />
            </Form.Item>
        </Modal>
    }
    //重置密码
    function Repwd() {
        const [isModalVisible, setIsModalVisible] = useState(false);

        const showModal = () => {
            setIsModalVisible(true);
        };

        const handleOk = () => {
            setIsModalVisible(false);
        };

        const handleCancel = () => {
            setIsModalVisible(false);
        };
        return <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText='确认重置'>
            <Form.Item name="pwd" label="密码" rules={[{ required: true }]}>
                <Input placeholder="请输入新密码~" />
            </Form.Item>
            <Form.Item name="manager" label="手机号码" >
                <Input placeholder="请输入与本账户绑定的手机号" />
            </Form.Item>
            <Form.Item name="manager" label="验证码" >
                <Input placeholder="请输入验证码~" />
            </Form.Item>
        </Modal>
    }
    return (<div className='loginview'>
        <img src={imgLogin} />
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onlogin}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入账号' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
                name="upwd"
                rules={[{ required: true, message: '请输入密码!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="请输入密码"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住密码</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="">
                    忘记密码
                </a>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" >
                    登录
                </Button>
                <a className="login-form-forgot" href="">
                    注册用户
                </a>
            </Form.Item>
        </Form>
    </div>
    );
}

export default connect(
    ({ loginStateReducer: state }) => { }
)(Login) 