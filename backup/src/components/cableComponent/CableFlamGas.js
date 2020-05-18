import React, { Component } from 'react'
import { Statistic, Card, Row, Col } from 'antd';
export default class CableFlamGas extends Component {
    render() {
        let flamGas = this.props.flamGas;


        const fontSize = 40
        if(flamGas!==undefined){
            return (
                <div >
                    <Card
                    title="可燃气体"
                    hoverable
                    style={{ height: 360 }}>
                        <Row>
                            <Col span="12">
                                <Statistic
                                    title="可燃气体爆炸可能性"
                                    value={flamGas.flam_gas}
                                    precision={3}
                                    valueStyle={{ color: '#cf1322' ,fontSize:fontSize}}
                                    suffix="%LEL"
                                />
                            </Col>
                            <Col span="12">
                                <Statistic
                                    title="sendsor_id"
                                    value={flamGas.sensor_id}
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
                                    value={" "+flamGas.typeCode}
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
                                    title="可燃气体爆炸可能性"
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322',fontSize:fontSize }}
                                    suffix="%LEL"
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
