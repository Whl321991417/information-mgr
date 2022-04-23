
import { Form, Input, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import '../index.scss'
import { connect } from 'react-redux'
import { addMenuTree, hideAddDialog } from '../../../state/actions';
import {  getAreaList } from '../../../service/area';
import { DormitoryType } from '../../../model';

const { Option } = Select;
interface ParamsModel {
    name?: string;
    type?: DormitoryType;
    manager?: string;
    pid?: string;
}
type a = {
    [key: string]: string
}
function AddDialog({ visible, dispatch }: any) {
    const [paramsModel, setParamsModel] = useState<ParamsModel & a>({
        type: DormitoryType.AREA
    })
    const [areaList, setAreaList] = useState<any[]>([])
    const [apartmentList, setApartmentList] = useState<any[]>([])

    const [pid, setPid] = useState('')
    const [form] = Form.useForm();
    const submit = () => {
        const { name, manager } = form.getFieldsValue()
        let params = {
            name,
            manager,
            type: paramsModel.type,
            pid: pid
        }
        dispatch(addMenuTree(params))
        close()
    }
    const close = () => {
        dispatch(hideAddDialog)
    }
    const selectChange = (setType: string) => (value: string) => {
        setParamsModel((state: ParamsModel) => {
            return {
                ...state,
                [setType]: value
            }
        })

        if (setType === DormitoryType.AREA) {
            getAreaList('/api/dormitory', { pid: value }).then((res: any) => {
                setApartmentList(res)
            })
            if (!paramsModel[DormitoryType.APARTMENT]) {
                setPid(value)
            }
        }
        if (setType === DormitoryType.APARTMENT) {
            setParamsModel((state: ParamsModel) => {
                return {
                    ...state,
                    [setType]: value,
                }
            })
            setPid(value)
        }
    }
    useEffect(() => {
        getAreaList('/api/dormitory', {
            type: "area"
        }).then((res: any) => {
            setAreaList(res)
        })
    }, [paramsModel.type])

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
                <Form.Item label="选择类型" rules={[{ required: true }]}>
                    <Select
                        placeholder="选择类型"
                        onChange={selectChange('type')}
                        allowClear
                        value={paramsModel.type}
                        defaultValue={DormitoryType.AREA}
                    >
                        <Option value={DormitoryType.AREA}>区域</Option>
                        <Option value={DormitoryType.APARTMENT}>公寓楼</Option>
                        <Option value={DormitoryType.ROOM}>宿舍</Option>
                    </Select>
                </Form.Item>
                {paramsModel.type !== DormitoryType.AREA && <Form.Item label="选择区域">
                    <Select
                        placeholder="选择区域"
                        onChange={selectChange(DormitoryType.AREA)}
                        value={paramsModel[DormitoryType.AREA] as any}
                    >
                        {
                            areaList.map((area: any) => {
                                return <Option key={area.id} value={area.id}>{area.name}</Option>
                            })
                        }

                    </Select>
                </Form.Item>}
                {paramsModel.type === DormitoryType.ROOM && <Form.Item name="gender" label="选择公寓楼">
                    <Select
                        placeholder="选择公寓楼"
                        onChange={selectChange(DormitoryType.APARTMENT)}
                        value={paramsModel[DormitoryType.APARTMENT] as any}
                    >

                        {
                            apartmentList.map((apartment: any) => {
                                return <Option key={apartment.id} value={apartment.id}>{apartment.name}</Option>
                            })
                        }
                    </Select>
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
            visible: state.addDialogVisible
        }
    }
)(AddDialog) 