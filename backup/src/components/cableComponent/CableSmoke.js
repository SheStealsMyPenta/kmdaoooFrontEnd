import React, { Component } from 'react'
import { Statistic, Card, Row, Col } from 'antd';
export default class CableSmoke extends Component {
    render() {
        const smoke = this.props.smoke;
        const fontSize= 40;
        if(smoke!==undefined){
            return (
                <div >
                    <Card 
                    title="烟感"
                    hoverable
                    style={{ height: 360 }}>
                        <Row>
                            <Col span="12">
                                <Statistic
                                    title="烟感"
                                    value={smoke.state==0?"正常":"异常"}
                                    precision={2}
                                    valueStyle={smoke.state == 0 ? { color: '#3f8600' } : { color: '#cf1322' }}
                                    suffix=""
                                />
                            </Col>
                            <Col span="12">
                                <Statistic
                                    title="sendsor_id"
                                    value={smoke.sensor_id}
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
                                    value={" "+smoke.typeCode}
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
                                    title="氧气含量"
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
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
