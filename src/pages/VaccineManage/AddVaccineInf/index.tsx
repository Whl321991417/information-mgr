import { DatePicker, Form, Input, InputNumber, Modal, Radio, Space } from "antd";
import { addVaccineIfo } from "../../../service/Vaccine";
import "./index.scss"
interface Poops {
    isModalVisible: boolean;
    onclose: () => void
}
export function AddVaccineInf({ isModalVisible, onclose }: Poops) {
    const [form] = Form.useForm();
    const handleOk = () => {
        addVaccineIfo('/api/vaccine', form.getFieldsValue())
        onclose();
    };
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const handleCancel = () => {
        onclose();
    };
    const dateChange = (date: any, dateString: any) => {
        form.setFieldsValue({ date: dateString })
        console.log(dateString);
    }
    const dateFormat = "YYYY/MM/DD";
    return (
        <Modal
            title="添加疫苗接种信息"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText='添加'
            cancelText='取消'
        >
            <div className="addVaccine">
                <Form {...layout} name="nest-messages" form={form}>
                    <Form.Item name={'stunum'} label="学号" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={'date'} label="接种日期" >
                        <Space direction="vertical">
                            <DatePicker onChange={dateChange} format={dateFormat} />
                        </Space>
                    </Form.Item>
                    <Form.Item name={'type'} label="接种类型">
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    </Form.Item>
                </Form>
            </div>

        </Modal>
    )
}