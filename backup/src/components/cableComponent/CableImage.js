import React, { Component } from 'react'
import axios from 'axios';
import { Statistic, Card, Row, Col } from 'antd';
const { Meta } = Card;

export default class CableImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: undefined
        }
    }
    componentDidMount() {
        this.state.timer = setInterval(() => {
            axios.post("/getImage").then(res => {
                this.setState({
                    image: res.data
                })
            })
        }, 3000);
        axios.post("/getImage").then(res => {
            this.setState({
                image: res.data
            })
        })
    }
    render() {
        const image = this.state.image;
        if (image !== undefined) {
            return (
                <div>
                    <Card
                        style={{ height: 600 }}
                        hoverable
                        title="图像"
                    >
                        <Col span="16">
                            <img style={{ width: 640, height: 480 }} alt="example" src={image.img_base64} />
                        </Col>

                        <Col span="8">
                            <Row>
                                <Statistic
                                    title="sendsor_id"
                                    value={this.state.image.sensor_id}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix=""
                                />
                            </Row>
                            <Row>
                                <Statistic
                                    title="typecode"
                                    value={" " + this.state.image.typeCode}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix=""
                                />
                            </Row>
                            <Row>
                                <Statistic
                                    title="ai_code"
                                    value={""}

                                    valueStyle={{ color: '#3f8600' }}
                                    suffix=""
                                />
                            </Row>
                            <Row>
                                <Statistic
                                    title="图片名称"
                                    value={this.state.image.img_name}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix=""
                                />
                            </Row>
                        </Col>

                    </Card>
                </div>
            )
        } else {
            return null
        }

    }
}
