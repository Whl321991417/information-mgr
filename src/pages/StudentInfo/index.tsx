import { Input, Popconfirm, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { studentIfo } from '../../service/studentIfo';
import './index.scss'
export default function StudentInfo() {
    useEffect(() => {
        stuinf()
    }, [])
    interface studataList {
        list: [{
            stunum: string,
            name: string,
            sex: string,
            birthday: string,
            room: string,
            phone: string,
            college: string,
            classroom: string,
        }]

    }
    const [stuData, setStuData] = useState<studataList>(
        {
            list: [{
                stunum: '',
                name: '',
                sex: '',
                birthday: '',
                room: '',
                phone: '',
                college: '',
                classroom: '',
            }]
        }
    )
    const stuinf = async () => {
        const data1 = await studentIfo('/api/stulist')
        setStuData(data1)
    }
    console.log(stuData);

    const dataSource: any = stuData.list
    const columns = [
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
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
        },
        {
            title: '出生日期',
            dataIndex: 'birthday',
            key: 'birthday',
        },

        {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '宿舍',
            dataIndex: 'room',
            key: 'room',
        },

        {
            title: '学院',
            dataIndex: 'college',
            key: 'college',
        },

        {
            title: '班级',
            dataIndex: 'classroom',
            key: 'classroom',
        }, {
            title: '操作',
            key: 'action',
            render: (text: any, record: any) => (
                <Popconfirm
                    title="是否确实删除？"
                    okText='确认'
                    cancelText='取消'
                >
                    <Space size="middle">
                        <a>删除</a>
                    </Space>
                </Popconfirm>

            )
        }
    ];
    return <div className='studentinfo'>
        <div className='inputid' style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Input.Search placeholder='请输入名称' style={{ width: 200 }} ></Input.Search>
        </div>
        <div>
            <Table dataSource={dataSource} columns={columns} rowKey={record => record.stunum} />
        </div>

    </div>
}