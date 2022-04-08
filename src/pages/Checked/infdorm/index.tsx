import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { collegeIfo } from '../../../service/studentIfo'
import './index.scss'
export default function infdorm() {
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    getCollegeIfo()
  }, [])
  const getCollegeIfo = (params?: any) => {
    collegeIfo('http://localhost:8000/list', params).then(res => {

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
  return (
    <div>
      <h1>infdorm</h1>
      <Table dataSource={tableData} columns={columns} className='studentIfo' />;
    </div>
  );
}