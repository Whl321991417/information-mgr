
import { Input, message, Popconfirm, Space, Table } from 'antd';
import './index.scss'
import { vaccine } from '../../service/Vaccine';
import { useEffect, useState } from 'react';
export default function VaccineManage() {
    try {
        useEffect(() => {
            vaccineinf()
        }, [])
    } catch (error) {
        message.error('请先登录~');
    }


    const [vaccineData, setvaccineData] = useState(
        // [{
        //     stunum: '',
        //     name: '',
        //     room: '',
        //     college: '',
        //     classroom: '',
        //     type: '',
        //     date: '',
        //     heal: '',
        // }]

    )
    const vaccineinf = async () => {
        const data1 = await vaccine('/api/vaccine')
        setvaccineData(data1)
    }
    const columns = [
        {
            title: '学院',
            dataIndex: 'college',
            key: 'college',
        },
        {
            title: '班级',
            dataIndex: 'classroom',
            key: 'classroom',
        },
        {
            title: '学号',
            dataIndex: 'stunum',
            key: 'stunum',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '接种时间',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '健康状况',
            dataIndex: 'heal',
            key: 'heal',
        },
        {
            title: '操作',
            key: 'action',
            render: (text: any, record: any) => (
                // <Popconfirm
                //     title="是否确实删除？"
                //     okText='确认'
                //     cancelText='取消'
                // >
                <Space size="middle">
                    <a>修改</a>
                </Space>
                // </Popconfirm>

            )
        }
    ];
    const dataSource: any = vaccineData;
    return <div className='vaccin'>
        <div className='vaccin_main'>
            <h2>学生疫苗管理</h2>
            <div className='inputid' style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <Input.Search placeholder='请输入学号' style={{ width: 200 }} ></Input.Search>
            </div>
            <div>
                <Table dataSource={dataSource} columns={columns} rowKey={record => record.stunum} />
            </div>
        </div>
    </div>
}