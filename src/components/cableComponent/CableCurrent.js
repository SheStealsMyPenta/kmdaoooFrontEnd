import React, { Component } from 'react'
import { Statistic, Card, Row, Col } from 'antd';
export default class CableCurrent extends Component {
    componentDidMount(){

  console.log(
    "current"+this.props.current
  );
  
        
    }
    render() {
       const fontSize = 30;
       const current = this.props.current
       if(current !==undefined){
        return (
            <div >
                <Card
                    hoverable
                    title="电缆接头护套电流"
                    style={{ height: 360 }}>
                    <Row>
                        <Col span="12">
                            <Statistic
                                title="A相护层电流"
                                value={current.ia}
                                precision={3}
                                valueStyle={{ color: '#cf1322',fontSize:fontSize }}
                                suffix="A"
                            />
                        </Col>
                        <Col span="12">
                            <Statistic
                                title="sendsor_id"
                                value={current.sensor_id}
                            
                                valueStyle={{ color: '#3f8600' }}
                                suffix=""
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Statistic
                                title="B相护层电流"
                                value={current.ib}
                                precision={3}
                                valueStyle={{ color: '#cf1322' ,fontSize:fontSize}}

                                suffix="A"
                            />
                        </Col>
                        <Col span="12">
                            <Statistic
                                title="type code"
                                value={" "+current.typeCode}
                                valueStyle={{ color: '#3f8600' }}
                                suffix=""
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Statistic
                            title="C相护层电流"
                            value={current.ic}
                            precision={3}
                            valueStyle={{ color: '#cf1322',fontSize:fontSize }}

                            suffix="A"
                        />
                    </Row>
                    <Row>
                        <Statistic
                            title="接地电流"
                            value={current.it}
                            precision={3}
                            valueStyle={{ color: '#cf1322',fontSize:fontSize }}
                            suffix="A"
                        />
                    </Row>
                </Card>
            </div>
        )
       }else{
        return (
            <div >
                <Card
                    hoverable
                    title="电缆接头护套电流"
                    style={{ height: 350 }}>
                    <Row>
                        <Col span="12">
                            <Statistic
                                title="A相护层电流"
                                value={"undefined"}
                                precision={3}
                                valueStyle={{ color: '#cf1322' }}
                                suffix="A"
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
                                title="B相护层电流"
                                value={9.3}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}

                                suffix="A"
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
                            title="C相护层电流"
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}

                            suffix="A"
                        />
                    </Row>
                    <Row>
                        <Statistic
                            title="接地电流"
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}

                            suffix="A"
                        />
                    </Row>
                </Card>
            </div>
        )
       }
      
    }
}
