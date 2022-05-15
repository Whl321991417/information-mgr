import { DatePicker, Form, Input, InputNumber, Modal, Radio, Space } from "antd";
import "./index.scss"
interface Poops {
    isModalVisible: boolean;
    onclose: () => void
}
export function AddVaccineInf({ isModalVisible, onclose }: Poops) {
    const handleOk = () => {
        onclose();
    };
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 30 },
    };
    const handleCancel = () => {
        onclose();
    };
    const ondateChange = (dateString: any) => {

    }
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
                <Form {...layout} name="nest-messages" >
                    <Form.Item name={['user', 'stunum']} label="学号" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'date']} label="接种日期" >

                        <Space direction="vertical">
                            <DatePicker onChange={ondateChange} />
                        </Space>
                    </Form.Item>
                    <Form.Item name={['user', 'type']} label="接种类型">
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    </Form.Item>
                </Form>
            </div>

        </Modal>
    )
}