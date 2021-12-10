import { Button, Col, Divider, Row } from 'antd'
import React from 'react'

export default function FinalForm({ state, createToken }) {
    const { token, basic } = state
    return (
        <Row justify='center'>
            <Col>
                <div className='preview_card'>
                    {
                        Object.entries(basic).map(([key, value]) => {
                            if (typeof value !== 'object') {
                                return <div>
                                    <span className='value'>{value} </span> <span className='label'> ({key}) </span>
                                    <Divider />
                                </div>
                            } else if (key === 'upload') {
                                let file = value[0]
                                return <div>
                                    <img src={file.thumbUrl} width={80} height={80} alt='coin image'/> <span className='label'> ({key}) </span>
                                    <Divider />
                                </div>
                            }
                        })
                    }
                    {
                        Object.entries(token).map(([key, value]) => {
                            if (typeof value !== 'object') {
                                return <div>
                                    <span className='value'>{value} </span>  <span className='label'> ({key}) </span>
                                    <Divider />

                                </div>
                            }
                        })
                    }
                </div>
                <Button onClick={createToken} type='primary'>Create Token</Button>
            </Col>
        </Row>
    )
}