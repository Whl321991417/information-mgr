
import { login } from '../../service/login';
import './index.scss'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginParams } from '../../model';
import { useNavigate } from 'react-router';
import imgLogin from '../../assets/Imgs/login.jpeg'


export default function Login() {
    let navigate = useNavigate();
    const onlogin = async (value: LoginParams) => {
        const token = await login('http://localhost:8000/login', {
            stunum: value.stunum,
            upwd: value.upwd
        })
        if (!token) {
            return
        }
        message.success('登录成功!');
        localStorage.setItem('token', token)
        navigate('/')
    }

    return (<div className='loginview'>
        <img src={imgLogin}  />
                <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onlogin}
            >
            <Form.Item
                name="stunum"
                rules={[{ required: true, message: '请输入学号！' }]}
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

