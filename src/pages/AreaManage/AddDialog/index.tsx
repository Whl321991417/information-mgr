
import { Form, Input, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import '../index.scss'
import { connect } from 'react-redux'
import { addMenuTree, getTableList, hideAddDialog } from '../../../state/actions';
import { getAreaList } from '../../../service/area';
import { DormitoryType } from '../../../model';
import { getAreaName } from '../../../common/utils';

const { Option } = Select;
interface ParamsModel {
    areaName?: string;
    apartmentName?: string;
    type?: DormitoryType;
    manager?: string;
    pid?: string;
}

function AddDialog({ visible, addItemNode, list, dispatch }: any) {
    const [paramsModel, setParamsModel] = useState<ParamsModel>({
        type: DormitoryType.AREA
    })
    const [form] = Form.useForm();
    const submit = async () => {
        const { name, manager } = form.getFieldsValue()
        let params = {
            name,
            manager,
            type: paramsModel.type,
            pid: paramsModel.pid
        }
        await dispatch(addMenuTree(params))
        //新增宿舍
        if (addItemNode?.type === DormitoryType.APARTMENT) {
            dispatch(getTableList(addItemNode.id))
        }
        close()
    }
    const close = () => {
        dispatch(hideAddDialog)
    }

    useEffect(() => {
        console.log(addItemNode);
        if (!addItemNode) {
            setParamsModel({
                type: DormitoryType.AREA,
                pid: ''
            })
            return
        }
        //新增公寓
        if (addItemNode.type === DormitoryType.AREA) {
            setParamsModel({
                type: DormitoryType.APARTMENT,
                areaName: addItemNode.name,
                pid: addItemNode.id
            })
            return
        }
        //新增宿舍
        if (addItemNode.type === DormitoryType.APARTMENT) {
            const name = getAreaName(addItemNode, list)
            setParamsModel({
                type: DormitoryType.ROOM,
                areaName: name,
                apartmentName: addItemNode.name,
                pid: addItemNode.id
            })
            return
        }
    }, [addItemNode])
    return (
        <Modal
            title="新建"
            centered
            visible={visible}
            onOk={submit}
            onCancel={close}
            width={500}
            className="addModal"
            destroyOnClose={true}
        >
            <Form form={form} labelAlign={'left'}  >
                {paramsModel.type !== DormitoryType.AREA && <Form.Item label="区域名称">
                    <Input value={paramsModel.areaName} disabled />
                </Form.Item>}
                {paramsModel.type === DormitoryType.ROOM && <Form.Item label="公寓名称">
                    <Input value={paramsModel.apartmentName} disabled />
                </Form.Item>}
                <Form.Item name="name" label="名称" rules={[{ required: true }]}>
                    <Input placeholder="请输入名称" />
                </Form.Item>
                <Form.Item name="manager" label="管理员" >
                    <Input placeholder="请输入管理员" />
                </Form.Item>
            </Form>
        </Modal>
    )
}


export default connect(
    ({ areaStateReducer: state }) => {
        return {
            list: state.areaList,
            visible: state.addDialogVisible,
            addItemNode: state.addItemNode
        }
    }
)(AddDialog) 