import { Form, Input, Button, Checkbox, Upload } from 'antd';
import React, { useState } from 'react'

export default function BasicForm({ nextStep, setBasicFormData }) {
    const [upload, setUpload] = useState([])

    const onFinish = (values) => {
        console.log('Success:', values);
        setBasicFormData(values)
        nextStep()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const onValuesChange = ({ upload }) => {
        console.log('on', upload)
        if (upload) {
            setUpload(upload)
        }
    }

    return (
        <>
            <h2>Basic token information.</h2>
            <p> Tell us the basics about the token you are building </p>
            <Form
                name="basic"
                labelCol={{ span: 16 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onValuesChange={onValuesChange}
                autoComplete="off"
                layout='vertical'
                size='middle'
            >
                <Form.Item
                    label="Token Name"
                    name="tokenName"
                    extra="Ex: bitcoin, etherium etc..."
                    rules={[{ required: true, message: 'Please add token name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Token Symbol"
                    name="tokenSymbol"
                    extra="Ex: atom, eth etc..."
                    rules={[{ required: true, message: 'Please add Token Symbol' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="upload"
                    label="Upload Coin Image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: 'Please add image' }]}
                >
                    <Upload maxCount={1} showUploadList={true} name="logo" action="/upload.do" listType="picture-card">
                        {upload.length === 0 && 'Upload Icon'}
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Twitter (optional)"
                    name="twitter"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Telegram (optional)"
                    name="telegram"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Token Description"
                    name="tokenDescription"
                    rules={[{ required: true, message: 'Token Description' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Continue
                    </Button>
                </Form.Item>
            </Form>
        </>

    )
}