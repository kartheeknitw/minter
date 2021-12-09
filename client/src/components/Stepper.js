import React from 'react'
import { Steps } from 'antd';

const { Step } = Steps;

export default function Stepper({step}) {
    return (
        <Steps current={step}>
            <Step title="Basic Information" />
            <Step title="Token Supply" />
            <Step title="Finish" />
        </Steps>
    )
}