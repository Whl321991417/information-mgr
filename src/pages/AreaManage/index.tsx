
import { useEffect, useState } from 'react'
import { Tree, Table, Breadcrumb, Space, Button, Popconfirm, Input } from 'antd';
import {
    AppstoreOutlined,
    BankOutlined,
    DeleteOutlined,
    PlusOutlined
} from '@ant-design/icons';
import './index.scss'
import { connect } from 'react-redux'
import { deleteAreaItem, getMenuTree, getTableList, showAddDialog } from '../../state/actions';
import AddDialog from './AddDialog';
import { DormitoryType } from '../../model';
import { Key } from 'antd/lib/table/interface';
import { getTreePath } from '../../common/utils';

function AreaManage({ list, tableData, dispatch }: any) {
    const [expandedKeys, setExpandedKeys] = useState<Key[]>([])
    const [selectedKeys, setSelectedKeys] = useState<Key[]>([])
    const [path, setPath] = useState<string[]>([])
    const [activeKey, setActiveKey] = useState<string>('')
    const [isFirst, setIsFirst] = useState<boolean>(true)
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
                <Popconfirm
                    title="是否确实删除？"
                    onConfirm={deleteDialog(record)}
                    okText='确认'
                    cancelText='取消'
                >
                    <Space size="middle">
                        <a>删除</a>
                    </Space>
                </Popconfirm>

            ),
        },
    ];
    useEffect(() => {
        const path = getTreePath('', list)
        setPath(path)
        dispatch(getMenuTree())

    }, [])
    useEffect(() => {
        const firstData = list.filter((item: any) => item.children.length > 0)
        if (firstData.length > 0) {
            const path = getTreePath('0-0-0', list)
            setPath(path)
            if (isFirst) {
                setExpandedKeys([firstData[0].id])
                setSelectedKeys([firstData[0].children[0].id])
                setIsFirst(false)
            }

        }
    }, [list])

    useEffect(() => {
        dispatch(getTableList(selectedKeys[0]))
    }, [selectedKeys])

    const openAddDialog = () => {
        dispatch(showAddDialog())
    }
    const deleteDialog = (node: any) => async (e: any) => {
        await dispatch(deleteAreaItem(node.id))
        dispatch(getTableList(selectedKeys[0]))
    }
    const onSelect = (key: Key[], info: any) => {
        const event = info.nativeEvent
        if (event.target!.parentNode?.dataset?.name === "deleteIcon" || event.target!.dataset?.name === "deleteIcon") {
            return
        }
        const { type, pos, expanded, selected } = info.node
        const path = getTreePath(pos, list)
        setPath(path)
        if (type === DormitoryType.APARTMENT) {
            if (!selected) {
                setSelectedKeys(key)
            }
            if (key[0]) {
                dispatch(getTableList(key[0]))
            }

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
    const addItem = (node: any) => (e: any) => {
        e.stopPropagation()
        dispatch(showAddDialog(node))
    }
    const renderTitle = (node: any) => {

        return <div className='customTreeNode'>
            <span> {node.name}</span>
            <span style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <PlusOutlined className='customTreeNodeIcon' onClick={addItem(node)} />
                <Popconfirm
                    title="是否确实删除？"
                    onConfirm={deleteDialog(node)}
                    okText='确认'
                    cancelText='取消'
                    onVisibleChange={(value) => {
                        if (value) {
                            setActiveKey(node.id)
                        } else {
                            setActiveKey('')
                        }
                    }}
                >
                    <DeleteOutlined className={activeKey === node.id ? 'showIcon' : "customTreeNodeIcon"} data-name='deleteIcon' />
                </Popconfirm>

            </span>

        </div>
    }

    const onSearch = (value: string) => {
        dispatch(getTableList(selectedKeys[0], value)) 
    }
    if (list.length === 0) {
        return null
    }
    return (
        <div className='areaWrapper'>
            <div className='leftMenu'>
                <div className='addArea'>
                    <Button type="primary" size='middle' onClick={openAddDialog}>新增区域</Button>
                </div>
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
                    titleRender={renderTitle}
                    onSelect={onSelect}
                />
            </div>

            <div className='areaContent'>
                <Breadcrumb>
                    {path.map(name => <Breadcrumb.Item key={name}>{name}</Breadcrumb.Item>)}
                </Breadcrumb>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                    <Input.Search placeholder='请输入名称' style={{ width: 200 }} onSearch={onSearch}></Input.Search>
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