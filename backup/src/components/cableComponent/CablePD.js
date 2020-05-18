import React, { Component } from 'react'
import { Statistic, Card, Row, Col } from 'antd';
export default class CablePD extends Component {
    render() {
        let pd = this.props.pd;
        if(pd!==undefined){
            return (
                <div>
                    <Card 
                    title="电缆接头局放"
                    hoverable
                    style={{ height: 360 }}>
                    <Row>
                            <Col span="12">
                                <Statistic
                                    title="sendsor_id"
                                    value={pd.sensor_id}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix=""
                                />
                            </Col>
                            <Col span="12">
                                <Statistic
                                    title="type code"
                                    value={" "+pd.typeCode}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix=""
                                />
                            </Col>
                        </Row>
                        <Row >
                            <Col span={12}>
                                <Statistic
                                    title="A 相放电量"
                                    value={pd.pc_a}
                                    precision={3}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="pC"
                                />
                            </Col>
                            <Col span={12}  >
                                <Statistic
                                    title="A 相放电次数"
                                    value={pd.count_a}
                                    precision={0}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="次"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Statistic
                                    title="B 相放电量"
                                    value={pd.pc_b}
                                    precision={3}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="pC"
                                />
                            </Col>
                            <Col span={12} >
                                <Statistic
                                    title="B 相放电次数"
                                    value={pd.count_b}
                                    precision={0}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="次"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Statistic
                                    title="C 相放电量"
                                    value={pd.pc_c}
                                    precision={3}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="pC"
                                />
                            </Col>
                            <Col span={12} >
                                <Statistic
                                    title="C 相放电次数"
                                    value={pd.count_c}
                                    precision={0}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="次"
                                />
                            </Col>
                        </Row>
                      
    
                    </Card>
                </div>
            )
        }else{
            return (
                <div>
                    <Card 
                    
                    hoverable
                    style={{ height: 300 }}>
                    <Row>
                            <Col span="12">
                                <Statistic
                                    title="sendsor_id"
                                    value={"26M00090990000982"}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix=""
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
                        <Row >
                            <Col span={12}>
                                <Statistic
                                    title="A 相放电量"
                                    value={"79"}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="pC"
                                />
                            </Col>
                            <Col span={12}  >
                                <Statistic
                                    title="A 相放电次数"
                                    value={"100"}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="次"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Statistic
                                    title="B 相放电量"
                                    value={"79"}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="pC"
                                />
                            </Col>
                            <Col span={12} >
                                <Statistic
                                    title="B 相放电次数"
                                    value={"100"}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="次"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Statistic
                                    title="C 相放电量"
                                    value={"79"}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="pC"
                                />
                            </Col>
                            <Col span={12} >
                                <Statistic
                                    title="C 相放电次数"
                                    value={"100"}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="次"
                                />
                            </Col>
                        </Row>
                      
    
                    </Card>
                </div>
            )
        }
       
    }
}
