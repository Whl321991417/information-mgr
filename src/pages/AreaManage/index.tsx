
import { useEffect, useState } from 'react'
import { Tree, Table, Breadcrumb, Space, Button } from 'antd';
import {
    AppstoreOutlined,
    BankOutlined,
} from '@ant-design/icons';
import './index.scss'
import { connect } from 'react-redux'
import { getMenuTree, getTableList, showAddDialog } from '../../state/actions';
import AddDialog from './AddDialog';
import { DormitoryType } from '../../model';
import { Key } from 'antd/lib/table/interface';
import { getTreePath } from '../../common/utils';
// import { debounce } from '../../common/utils';

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
    const [expandedKeys, setExpandedKeys] = useState<Key[]>([])
    const [selectedKeys, setSelectedKeys] = useState<Key[]>([])
    const [path, setPath] = useState<string[]>([])
    useEffect(() => {
        const path = getTreePath('', list)
        setPath(path)
        dispatch(getMenuTree())
    }, [])
    useEffect(() => {
        const firstData = list.filter((item: any) => item.children.length > 0)
        if (firstData.length > 0) {
            dispatch(getTableList(firstData[0].children[0].id))
            const path = getTreePath('0-0-0', list)
            setPath(path)
            setExpandedKeys([firstData[0].id])

            setSelectedKeys([firstData[0].children[0].id])
        }

    }, [list])
    const openAddDialog = () => {
        dispatch(showAddDialog)
    }
    const onSelect = (key: Key[], info: any) => {
        const { type, pos, expanded, selected } = info.node
        const path = getTreePath(pos, list)
        setPath(path)
        if (type === DormitoryType.APARTMENT) {
            if (!selected) {
                setSelectedKeys(key)
            }
            dispatch(getTableList(key[0]))

        } else {
            const expandedKeySet = new Set(expandedKeys)
            if (expanded) {
                const index = expandedKeys.indexOf(info.node.id);
                const expandedKey = [...expandedKeys];
                expandedKey.splice(index, 1)
                setExpandedKeys(expandedKey)
                return
            } else {
                if (!expandedKeySet.has(key[0])) {
                    expandedKeySet.add(key[0])
                }
                // 展开并选中
                setExpandedKeys(Array.from(expandedKeySet))
            }
        }

    }
    if (list.length === 0) {
        return null
    }
    return (
        <div className='areaWrapper'>
            <Tree
                showIcon
                treeData={list}
                fieldNames={{ title: 'name', key: 'id', children: "children" }}
                className="areaTree"
                expandedKeys={expandedKeys}
                selectedKeys={selectedKeys}
                icon={(data: any) => {
                    if (data.type === DormitoryType.AREA) {
                        return <AppstoreOutlined />
                    }
                    return <BankOutlined />
                }}
                onSelect={onSelect}
            />
            <div className='areaContent'>
                <Breadcrumb>
                    {
                        path.map(name => <Breadcrumb.Item key={name}>{name}</Breadcrumb.Item>)
                    }
                </Breadcrumb>

                <div className='areaHeader'>
                    <Button type="primary" onClick={openAddDialog}>新增</Button>
                </div>

                <Table className="areaTable" columns={columns} dataSource={tableData} rowKey={(record) => record.id} />
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