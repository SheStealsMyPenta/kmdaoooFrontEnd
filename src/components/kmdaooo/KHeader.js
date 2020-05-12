import React, { Component } from 'react'

import { Statistic, Card, Row, Col,PageHeader } from 'antd';
export default class KHeader extends Component {
    render() {
        let fontSize = 12;
        return (
            <PageHeader
                className="site-page-header"
              
                title="Title"
                subTitle="This is a subtitle"
            >
                <Card 
                    
                    hoverable
                    style={{ height: 100}}>
             <Row>
                
                        <Col span="8">
                            <Statistic
                                title="A相护层电流"
                                value={100}
                                precision={3}
                                valueStyle={{ color: '#cf1322',fontSize:fontSize }}
                                suffix="A"
                            />
                        </Col>
                        <Col span="8">
                            <Statistic
                                title="sendsor_id"
                                value={100}
                            
                                valueStyle={{ color: '#3f8600' }}
                                suffix=""
                            />
                        </Col>
                        <Col span="8">
                            <Statistic
                                title="sendsor_id"
                                value={100}
                            
                                valueStyle={{ color: '#3f8600' }}
                                suffix=""
                            />
                        </Col>
                    </Row>
                    </Card>
            </PageHeader>
        )
    }
}
