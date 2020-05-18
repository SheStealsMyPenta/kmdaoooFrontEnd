import React, { Component } from 'react'
import { Statistic, Card, Row, Col } from 'antd';
export default class CableCH4 extends Component {
    render() {
        const ch4 = this.props.ch4;   
        const fontSize= 50     
        if(ch4!==undefined){
            return (
                <div >
                    <Card 
                    title="甲烷"
                    hoverable
                     style={{ height: 360 }}>
                        <Row>
                            <Col span="12">
                                <Statistic
                                    title="甲烷"
                                    value={ch4.ch4}
                                    precision={3}
                                    valueStyle={{ color: '#cf1322',fontSize:fontSize }}
                                    suffix="%VOL"
                                />
                            </Col>
                            <Col span="12">
                                <Statistic
                                    title="sendsor_id"
                                    value={ch4.sensor_id}
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
                                    value={" "+ch4.typeCode}
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
                    title="甲烷"
                     style={{ height: 300,background:'#DCDCDC' }}>
                        <Row>
                            <Col span="12">
                                <Statistic
                                    title="甲烷"
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322',fontSize:fontSize }}
                                    suffix="%VOL"
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
       

