import './index.scss'
import { yiqingdata } from '../../service/yiQingData';
import { Statistic, Row, Col, Button } from 'antd';
// import { Outlet } from 'react-router-dom';
// import { useNavigate } from "react-router";
import { useEffect } from 'react';
export default function Home() {
    // let navigate = useNavigate();
    useEffect(() => {
        yiq()
    }, [])

    const yiq = async () => {
        const data1 = await yiqingdata('/api/yiqing')
        console.log(data1, 1111);
        if (!data1) {
            return
        }

    }

    return <div className="home">
        <Row gutter={16}>
            <Col span={12}>
                <Statistic title="Active Users" value={112893} />
            </Col>
            <Col span={12}>
                <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
                <Button style={{ marginTop: 16 }} type="primary">
                    Recharge
                </Button>
            </Col>
            <Col span={12}>
                <Statistic title="Active Users" value={112893} loading />
            </Col>
        </Row>
    </div>

}