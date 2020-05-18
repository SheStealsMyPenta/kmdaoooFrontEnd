import React, { Component } from 'react'
import { Statistic, Card, Row, Col } from 'antd';
export default class CableH2S extends Component {
    render() {
        const h2s = this.props.h2s
        const fontSize = 40
        if(h2s!==undefined){
            return (
                <div >
                    <Card
                    hoverable
                    title="硫化氢"
                    style={{ height: 360 }}>
                        <Row>
                            <Col span="12">
                                <Statistic
                                    title="硫化氢"
                                    value={h2s.h2s}
                                    precision={3}
                                    valueStyle={{ color: '#cf1322' ,fontSize:fontSize}}
                                    suffix="PPM"
                                />
                            </Col>
                            <Col span="12">
                                <Statistic
                                    title="sendsor_id"
                                    value={h2s.sensor_id}
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
                                    value={" "+h2s.typeCode}
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
        }else{
            return (
                <div >
                    <Card
                    hoverable
                    style={{ height: 300 }}>
                        <Row>
                            <Col span="12">
                                <Statistic
                                    title="硫化氢"
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                    suffix="PPM"
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
}
