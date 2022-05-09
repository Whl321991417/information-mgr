import './index.scss'
import { yiqingdata } from '../../service/yiQingData';
import { Statistic, Row, Col, Skeleton, Table } from 'antd';
import { useEffect, useState } from 'react';

interface YiqingData {
    diseaseh5Shelf: {
        chinaAdd: any,
        chinaTotal: any,
        lastUpdateTime: any,
        areaTree: [
            {
                children: [
                    {
                        name: any,
                        today: {
                            confirm: number
                        },
                        total: {
                            confirm: number,
                            dead: number,
                            heal: number
                        }
                    }
                ]
            }
        ]
    }
}
export default function Home() {
    // let navigate = useNavigate();
    useEffect(() => {
        yiq()
    }, [])
    //接收国内疫情数据
    const [yiqingData, setYiqingData] = useState<YiqingData>({
        diseaseh5Shelf: {
            chinaAdd: {},
            chinaTotal: {},
            lastUpdateTime: '',
            areaTree: [
                {
                    children: [{
                        name: '',
                        today: {
                            confirm: 0
                        },
                        total: {
                            confirm: 0,
                            dead: 0,
                            heal: 0
                        }
                    }
                    ]
                }
            ]
        }
    })
    const yiq = async () => {
        const data1 = await yiqingdata('/api/yiqing')
        if (!data1) {
            return
        }
        setYiqingData(data1)
        return data1
    }
    interface dataList {
        name: string,
        confirm: number,
        total_confirm: number,
        heal: number,
        dead: number
    }
    const dataSource: any = []
    const dataary = yiqingData.diseaseh5Shelf.areaTree[0].children
    // //地区数据表
    for (let i = 0; i < dataary.length; i++) {
        dataSource[i] = {
            key: i + 1,
            name: dataary[i].name,
            confirm: dataary[i].today.confirm,
            total_confirm: dataary[i].total.confirm,
            heal: dataary[i].total.heal,
            dead: dataary[i].total.dead
        }
    }


    const columns = [
        {
            title: '序号',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: '地区',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '新增确诊',
            dataIndex: 'confirm',
            key: 'confirm',
        },
        {
            title: '累计确诊',
            dataIndex: 'total_confirm',
            key: 'total_confirm',
        },
        {
            title: '累计治愈',
            dataIndex: 'heal',
            key: 'heal',
        },
        {
            title: '累计死亡',
            dataIndex: 'dead',
            key: 'dead',
        },
    ];

    // const chinaAdd = yiqing.
    // <Skeleton active />
    const { chinaAdd, chinaTotal, lastUpdateTime } = yiqingData.diseaseh5Shelf
    console.log(chinaAdd, chinaTotal);

    return <div className="home">
        <div className='yiqingdata'>
            <h2>国内疫情</h2>
            <span className='updatatime'>数据更新于：{lastUpdateTime}</span>
            <Row >
                <Col span={5}>
                    <Statistic title="新增确诊" value={chinaAdd.confirm} valueStyle={{ color: '#ff6a57' }} />
                </Col>
                <Col span={5}>
                    <Statistic title="新增本土" value={chinaAdd.localConfirmH5} valueStyle={{ color: '#ff6a57' }} />
                </Col>
                <Col span={5}>
                    <Statistic title="新增境外" value={chinaAdd.importedCase} valueStyle={{ color: '#476da0' }} />
                </Col>
                <Col span={5}>
                    <Statistic title="新增无症状" value={chinaAdd.noInfect} valueStyle={{ color: '#e66d46' }} />
                </Col>
            </Row><br />
            <Row >
                <Col span={5}>
                    <Statistic title="现有确证" value={chinaTotal.nowConfirm} valueStyle={{ color: '#ff6a57' }} />
                </Col>
                <Col span={5}>
                    <Statistic title="现有本土" value={chinaTotal.localConfirm} valueStyle={{ color: '#ff6a57' }} />
                </Col>
                <Col span={5}>
                    <Statistic title="现有境外" value={chinaTotal.nowSevere} valueStyle={{ color: '#476da0' }} />
                </Col>
                <Col span={5}>
                    <Statistic title="现有无症状" value={chinaTotal.noInfect} valueStyle={{ color: '#e66d46' }} />
                </Col>
            </Row><br />
            <Row >
                <Col span={5}>
                    <Statistic title="累计确证" value={chinaTotal.confirm} valueStyle={{ color: '#e83132' }} />
                </Col>
                <Col span={5}>
                    <Statistic title="累计境外" value={chinaTotal.importedCase} valueStyle={{ color: '#476da0' }} />
                </Col>
                <Col span={5}>
                    <Statistic title="累计治愈" value={chinaTotal.heal} valueStyle={{ color: '#10aeb5' }} />
                </Col>
                <Col span={5}>
                    <Statistic title="累计死亡" value={chinaTotal.dead} valueStyle={{ color: '#999' }} />
                </Col>
            </Row>
            <h2>近期34个省区疫情病例</h2>

            <span className='updatatime'> 该数据为31省(自治区、直辖市)本土新增，及港澳台新增确诊数据</span>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    </div>

}



