
import { Table } from 'antd';
import './index.scss'
import { vaccine } from '../../service/Vaccine';
import { useEffect, useState } from 'react';
export default function VaccineManage() {
    useEffect(() => {
        vaccineinf()
    }, [])
    interface vaccine {
        list: [{
            stunum: string,
            name: string,
            room: string,
            college: string,
            classroom: string,
            type: string,
            date: string,
            heal: string,
        }]

    }
    const [vaccineData, setvaccineData] = useState<vaccine>(
        {
            list: [{
                stunum: '',
                name: '',
                room: '',
                college: '',
                classroom: '',
                type: '',
                date: '',
                heal: '',
            }]
        }
    )
    const dataSource: any = vaccineData.list
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
    ];
    return <div className='vaccin'>
        <Table dataSource={dataSource} columns={columns} rowKey={record => record.stunum} />
    </div>
}