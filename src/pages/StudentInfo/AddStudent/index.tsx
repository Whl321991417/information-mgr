import { Col, DatePicker, Form, Input, InputNumber, Modal, Radio, RadioChangeEvent, Row, Space } from "antd";
import form from "antd/lib/form";

import { addStudentIfo } from "../../../service/studentIfo";
import "./index.scss"
enum SexValue {
    MAN = "男",
    WOMAN = "女"
}
interface Poops {
    isModalVisible: boolean;
    onclose: () => void
}
export function StudentInf({ isModalVisible, onclose }: Poops) {
    const [form] = Form.useForm();
    const handleOk = () => {
        const sex = form.getFieldValue('sex') || SexValue.MAN
        addStudentIfo('/api/stulist', { ...form.getFieldsValue(), sex })

        onclose();
    };
    const handleCancel = () => {
        onclose();
    };
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const dateChange = (dateString: any) => {
        form.setFieldsValue({ birthday: dateString })
        console.log(dateString);
    }
    const sexChange = (e: RadioChangeEvent) => {
        form.setFieldsValue({ sex: e.target.value })

    }
    const dateFormat = 'YYYY/MM/DD';

    return (
        <Modal
            title="添加学生信息"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText='添加'
            cancelText='取消'
        ><div className="addStudent">
                <Form {...layout} name="nest-messages" form={form} style={
                    {
                        width: "100%"
                    }
                }>
                    <Row>
                        <Col span={12}>
                            <Form.Item name={'name'} label="姓名" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name='sex' label="性别" rules={[{ required: true }]}>
                                <Radio.Group defaultValue={SexValue.MAN} onChange={sexChange} >
                                    <Radio value={SexValue.MAN}>男</Radio>
                                    <Radio value={SexValue.WOMAN}>女</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name={'phone'} label="电话">
                                <Input />
                            </Form.Item>
                            <Form.Item name={'classroom'} label="班级">
                                <Input />
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name={'stunum'} label="学号" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={'room'} label="宿舍">
                                <Input />
                            </Form.Item>
                            <Form.Item name={'birthday'} label="出生日期">
                                <Space direction="vertical">
                                    <DatePicker onChange={dateChange} format={dateFormat} />
                                </Space>
                            </Form.Item>
                            <Form.Item name={'college'} label="学院">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>


                </Form>

            </div>

        </Modal>
    )
}