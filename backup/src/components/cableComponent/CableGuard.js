import React, { Component } from 'react'
import { Statistic, Card, Row, Col } from 'antd';
export default class CableGuard extends Component {
    render() {
        const textSize = 20;
        const guard = this.props.guard;

        if (guard == undefined) {
            return (
                <div>
                    <Card
                        hoverable
                        style={{ height: 300 }}>
                        <Row>
                            <Col span="12">
                                <Statistic
                                    title="A 相接地线盗割状态"
                                    value={"正常"}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix=""
                                />
                            </Col>
                            <Col span="12">
                                <Statistic
                                    title="sendsor_id"
                                    value={"26M00090990000982"}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' ,fontSize:textSize}}
                                    suffix=""
                                />
                            </Col>

                        </Row>
                        <Row>
                            <Col span="12">
                                <Statistic
                                    title="B 相接地线盗割状态"
                                    value={"异常"}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}

                                    suffix=""
                                />
                            </Col>
                            <Col span="12">
                                <Statistic
                                    title="type code"
                                    value={" 031001"}
                                    valueStyle={{ color: '#3f8600',fontSize:textSize }}
                                    suffix=""
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Statistic
                                title="C 相接地线盗割状态"
                                value={"异常"}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}

                                suffix=""
                            />
                        </Row>
                        <Row>
                            <Statistic
                                title="外壳接地线盗割状态"
                                value={"异常"}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}

                                suffix=""
                            />
                        </Row>
                    </Card>
                </div>
            )
        } else {
            return (
                <div>
                    <Card
                        title="电缆接头接地线防盗状态"
                        hoverable
                        style={{ height: 360 }}>
                        <Row>
                            <Col span="12">
                                <Statistic
                                    style={{fontSize:10}}
                                    title="A 相接地线盗割状态"
                                    value={guard.a == 0 ? "正常" : "异常"}
                                    precision={2}
                                    valueStyle={guard.a == 0 ? { color: '#3f8600' } : { color: '#cf1322' }}
                                    suffix=""
                                />
                            </Col>
                            <Col span="12">
                                <Statistic
                                    title="sendsor_id"
                                    value={guard.sensor_id}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600',fontSize:textSize}}
                                 
                                />
                            </Col>

                        </Row>
                        <Row>
                            <Col span="12">
                                <Statistic
                                    title="B 相接地线盗割状态"
                                    value={guard.b == 0 ? "正常" : "异常"}
                                    precision={2}
                                    valueStyle={guard.b == 0 ? { color: '#3f8600' } : { color: '#cf1322' }}

                                    suffix=""
                                />
                            </Col>
                            <Col span="12">
                                <Statistic
                                    title="type code"
                                    value={guard.typeCode}
                                    valueStyle={{ color: '#3f8600' ,fontSize:textSize}}
                                    suffix=""
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Statistic
                                title="C 相接地线盗割状态"
                                value={guard.c == 0 ? "正常" : "异常"}
                                precision={2}
                                valueStyle={guard.c == 0 ? { color: '#3f8600' } : { color: '#cf1322' }}

                                suffix=""
                            />
                        </Row>
                        <Row>
                            <Statistic
                                title="外壳接地线盗割状态"
                                value={guard.t == 0 ? "正常" : "异常"}
                                precision={2}
                                valueStyle={guard.t == 0 ? { color: '#3f8600' } : { color: '#cf1322' }}

                                suffix=""
                            />
                        </Row>
                    </Card>
                </div>
            )
        }

    }
}
