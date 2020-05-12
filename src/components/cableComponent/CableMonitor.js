import React, { Component } from 'react'
import { Statistic, Card, Row, Col } from 'antd';
export default class CableMonitor    extends Component {
    render() {
        return (
            <div >
                <Card style={{ height: 300 }}>
                    <Row>
                        <Col span="12">
                            <Statistic
                                title="装置"
                                value={"正常"}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}  
                            />
                        </Col>
                        <Col span="12">
                            <Statistic
                                title="sendsor_id"
                                value={"26M00090990000982"}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                suffix=""
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <div></div>
                        </Col>
                        <Col span="12">
                            <Statistic
                                title="type code"
                                value={" 031001"}
                                valueStyle={{ color: '#3f8600' }}
                                suffix=""
                            />
                        </Col>
                    </Row>
                    <Row>
                        <div></div>
                    </Row>
                    <Row>
                        <div></div>
                    </Row>
                </Card>
            </div>
        )
    }
}
