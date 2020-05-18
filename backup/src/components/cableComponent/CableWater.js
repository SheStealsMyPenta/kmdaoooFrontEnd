import React, { Component } from 'react'
import { Statistic, Card, Row, Col } from 'antd';
export default class CableWater extends Component {
    render() {
        const water = this.props.water
        const fontSize =40;
        if(water !== undefined){
            return (
                <div >
                    <Card
                    title="水位"
                    hoverable
                    style={{ height: 360 }}>
                        <Row>
                            <Col span="12">
                                <Statistic
                                    title="水位"
                                    value={water.water}
                                    precision={3}
                                    valueStyle={{ color: '#cf1322' ,fontSize:fontSize}}
                                    suffix="cm"
                                />
                            </Col>
                            <Col span="12">
                                <Statistic
                                    title="sendsor_id"
                                    value={water.sensor_id}
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
                                    value={" "+water.typeCode}
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
                                    title="水位"
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322',fontSize:fontSize }}
                                    suffix="cm"
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
