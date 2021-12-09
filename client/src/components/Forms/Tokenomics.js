import { Form, Input, Button, Checkbox, Upload,InputNumber  } from 'antd';
import React from 'react'

export default function BasicForm({nextStep,setTokenFormData}) {
    const onFinish = (values) => {
        console.log('Success:', values);
        setTokenFormData(values)
        nextStep()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <h2>Let’s set up your Tokenomics.</h2>
            <p> Create the rules around supply and limits of your token.</p>
            <Form
                name="basic"
                labelCol={{ span: 16 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout='vertical'
            >
                <Form.Item
                    label="Initial Supply "
                    name="initialSupply"
                    rules={[{ required: true, message: 'Initial Supply' }]}
                >
                    <InputNumber  style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Maximum Supply"
                    name="initialSupply"
                >
                    <InputNumber style={{ width: '100%' }} disabled={true} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>

    )
}