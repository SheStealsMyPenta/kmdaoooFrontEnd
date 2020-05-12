import React, { Component } from 'react'
import { Statistic, Card, Row, Col } from 'antd';
export default class CableTempurature extends Component {
    render() {
        const tempurature = this.props.tempurature;
        const fontSize = 40;
        if(tempurature!==undefined){
            return (
                <div >
                    <Card 
                    title="电缆接头温度"
                    hoverable
                    style={{ height: 360 }}>
                        <Row>
                            <Col span="12">
                                <Statistic
                                    title="A 相温度"
                                    value={tempurature.temp_a}
                                    precision={3}
                                    valueStyle={{ color: '#cf1322' ,fontSize:fontSize}}
                                    suffix="℃"
                                />
                            </Col>
                            <Col span="12">
                                <Statistic
                                    title="sendsor_id"
                                    value={tempurature.sensor_id}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix=""
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                            <Statistic
                                title="B 相温度"
                                value={tempurature.temp_b}
                                precision={3}
                                valueStyle={{ color: '#cf1322',fontSize:fontSize }}
                                suffix="℃"
                            />
                            </Col>
                            <Col span="12">
                                <Statistic
                                    title="type code"
                                    value={" "+tempurature.typeCode}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix=""
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Statistic
                                title="C 相温度"
                                value={tempurature.temp_c}
                                precision={3}
                                valueStyle={{ color: '#cf1322',fontSize:fontSize }}
    
                            suffix="℃"
                            />
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
                    title="电缆接头温度"
                    style={{ height: 360 }}>
                        <Row>
                            <Col span="12">
                                <Statistic
                                    title="A 相温度"
                                    value={"13"}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322',fontSize:fontSize }}
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
                                title="B 相温度"
                                value={9.3}
                                precision={2}
                                valueStyle={{ color: '#cf1322',fontSize:fontSize }}
                                suffix="℃"
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
                            <Statistic
                                title="C 相温度"
                                value={9.3}
                                precision={2}
                                valueStyle={{ color: '#cf1322',fontSize:fontSize }}
    
                            suffix="℃"
                            />
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
