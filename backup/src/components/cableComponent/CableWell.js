import React, { Component } from 'react'
import { Statistic, Card, Row, Col } from 'antd';
export default class CableWell extends Component {
    render() {
        const well = this.props.well
        if(well!==undefined){
            return (
                <div >
                    <Card 
                    hoverable
                    title="井盖"
                     style={{ height: 360 }}>
                        <Row>
                            <Col span="12">
                                <Statistic
                                    title="井盖状态"
                                    value={well.cover==0?"关闭":"打开"}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
    
                                />
                            </Col>
                            <Col span="12">
                                <Statistic
                                    title="sendsor_id"
                                    value={well.sensor_id}
                              
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix=""
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <Statistic
                                    title="井盖倾斜度"
                                    value={well.slope}
                                    precision={3}
                                    valueStyle={{ color: '#cf1322' }}
                                    suffix="°"
                                />
                            </Col>
                            <Col span="12">
                                <Statistic
                                    title="type code"
                                    value={" "+well.typeCode}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix=""
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Statistic
                                title="外井盖状态"
                                value={well.upcover==0?"关闭":"打开"}
    
                                valueStyle={{ color: '#cf1322' }}
    
    
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
                     style={{ height: 325 }}>
                        <Row>
                            <Col span="12">
                                <Statistic
                                    title="井盖状态"
                                    value={"gua"}
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
                                <Statistic
                                    title="井盖倾斜度"
                                    value={30}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                    suffix="°"
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
                                title="外井盖状态"
                                value={"关闭"}
    
                                valueStyle={{ color: '#cf1322' }}
    
    
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
