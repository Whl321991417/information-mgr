import { Table, Input, Space } from 'antd';
//import { AudioOutlined } from '@ant-design/icons';
import './index.scss'
import { collegeIfo } from '../../../service/studentIfo';
import { useEffect, useState } from 'react';
//import { log } from 'console';

export default function Infstudents() {
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    getCollegeIfo()
  }, [])
  const getCollegeIfo = (params?: any) => {
    collegeIfo('http://localhost:8000/list', params).then(res => {
    console.log(res.list);
      setTableData(res.list)
    })
  }

  const columns = [
    {
      title: '学号',
      dataIndex: 'stunum',
      key: 'stunum',
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
    },
    {
      title: '姓名',
      dataIndex: 'uname',
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
      title: '宿舍区域',
      dataIndex: 'livebuilding',
      key: 'livebuilding',
    },

    {
      title: '宿舍',
      dataIndex: 'dorm',
      key: 'dorm',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '班主任',
      dataIndex: 'classteacher',
      key: 'classteacher',
    },
  ];

  //搜索框

  const { Search } = Input;
  const onSearch = (type?: string) => (value: any) => {
    getCollegeIfo({
      key: type,
      value
    })
  }
  return (
    <div >
      <h2>学生信息查询</h2>
      <Space direction="vertical" className='check-student-ifo'>
        <Search
          placeholder="按学院查找"
          enterButton="查看"
          size="large"
          onSearch={onSearch('college')}
        />
        <Search
          placeholder="按班级查找"
          enterButton="查看"
          size="large"
          onSearch={onSearch('classroom')}
        />
        <Search
          placeholder="按学号查找"
          enterButton="查看"
          size="large"
          onSearch={onSearch('stunum')}
        />
      </Space>
      <Table dataSource={tableData} columns={columns} className='studentIfo' />;
    </div>
  );
}