
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
import { getMenuTree, showAddDialog } from '../../state/actions';
import AddDialog from './AddDialog';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text: any) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (tags: any) => (
            <>
                {tags.map((tag: any) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text: any, record: any) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

function AreaManage({ list, dispatch }: any) {
    useEffect(() => {
        dispatch(getMenuTree())
    }, [])

    const openAddDialog = () => {
        dispatch(showAddDialog)
    }
    return (
        <div className='areaContent'>
            <Tree
                showIcon
                defaultExpandAll
                defaultSelectedKeys={['0-0-0']}
                switcherIcon={<DownOutlined />}
                treeData={list}
                fieldNames={{ title: 'name', key: 'id', children: "children" }}
                className="areaTree"
            />
            <div className='areaContent'>
                <div className='areaHeader'>
                    <Button type="primary" onClick={openAddDialog}>新增</Button>
                </div>

                <Table className="areaTable" columns={columns} dataSource={data} />
            </div>
            <AddDialog />
        </div>
    )
}


export default connect(
    ({ areaStateReducer: state }) => {
        return {
            list: state.areaList
        }
    }
)(AreaManage) 