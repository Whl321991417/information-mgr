
import { useEffect, useState } from 'react'
import { Tree, Table, Tag, Space, Button } from 'antd';
import {
    FrownOutlined,
    SmileOutlined,
    MehOutlined,
    FrownFilled,
    DownOutlined,
} from '@ant-design/icons';
import './index.scss'
import { connect } from 'react-redux'
import { getMenuTree, getTableList, showAddDialog } from '../../state/actions';
import AddDialog from './AddDialog';

const columns = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '管理员',
        dataIndex: 'manager',
        key: 'manager',
    },
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },

    {
        title: '操作',
        key: 'action',
        render: (text: any, record: any) => (
            <Space size="middle">
                <a>Delete</a>
            </Space>
        ),
    },
];



function AreaManage({ list, tableData, dispatch }: any) {
    useEffect(() => {
        dispatch(getMenuTree())
    }, [])
    useEffect(() => {
        const firstData = list.filter((item: any) => item.children.length > 0)
        if (firstData.length > 0) {
            console.log(firstData[0].children[0].id);
            dispatch(getTableList(firstData[0].children[0].id))
        }
    }, [list])
    const openAddDialog = () => {
        dispatch(showAddDialog)
    }
    const onSelect = (value: any) => {
        dispatch(getTableList(value))
    }
    return (
        <div className='areaWrapper'>
            <Tree
                showIcon
                defaultExpandAll
                defaultSelectedKeys={['0-0-0']}
                switcherIcon={<DownOutlined />}
                treeData={list}
                fieldNames={{ title: 'name', key: 'id', children: "children" }}
                className="areaTree"
                onSelect={onSelect}
            />
            <div className='areaContent'>
                <div className='areaHeader'>
                    <Button type="primary" onClick={openAddDialog}>新增</Button>
                </div>

                <Table className="areaTable" columns={columns} dataSource={tableData} />
            </div>
            <AddDialog />
        </div>
    )
}


export default connect(
    ({ areaStateReducer: state }) => {
        return {
            list: state.areaList,
            tableData: state.tableData
        }
    }
)(AreaManage) 