import React, { Component } from 'react'
import { Statistic, Card, Row, Col } from 'antd';
export default class CableTemHum extends Component {
    render() {
        let tempHum = this.props.tempHum
        const fontSize = 40
        if (tempHum !== undefined) {

            return (
                <div >
                    <Card
                        hoverable
                        title="点式环境温湿度"
                        style={{ height: 360 }}>
                        <Row>
                            <Col span="12">
                                <Statistic
                                    title="温度"
                                    value={tempHum.temp}
                                    precision={3}
                                    valueStyle={{ color: '#cf1322', fontSize: fontSize }}
                                    suffix="℃"
                                />
                            </Col>
                            <Col span="12">
                                <Statistic
                                    title="sendsor_id"
                                    value={tempHum.sensor_id}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix=""
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <Statistic
                                    title="湿度"
                                    value={tempHum.hum}
                                    precision={3}
                                    valueStyle={{ color: '#cf1322', fontSize: fontSize }}
                                    suffix="RH%"
                                />
                            </Col>
                            <Col span="12">
                                <Statistic
                                    title="type code"
                                    value={" " + tempHum.typeCode}
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
        } else {

            return (
                <div >
                    <Card
                        title="点式环境温湿度"
                        hoverable
                        style={{ height: 360 }}>
                        <Row>
                            <Col span="12">
                                <Statistic
                                    title="温度"
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                    suffix="℃"
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
                                <Statistic
                                    title="湿度"
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                    suffix="RH%"
                                />
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
}
