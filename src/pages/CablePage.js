import React, { Component } from 'react'
import { Avatar, Popover, Layout, Menu, Icon, Button, Spin, Row, Col } from 'antd';


import { withRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import CableCurrent from "../components/cableComponent/CableCurrent"
import CableGuard from '../components/cableComponent/CableGuard';
import CablePD from '../components/cableComponent/CablePD';
import CableTempurature from "../components/cableComponent/CableTempurature"
import CableTemHum from '../components/cableComponent/CableTemHum';
import CableWater from "../components/cableComponent/CableWater"
import CableCH4 from '../components/cableComponent/CableCH4';
import CableFlamGas from '../components/cableComponent/CableFlamGas';
import CableH2S from '../components/cableComponent/CableH2S';
import CableWell from '../components/cableComponent/CableWell';
import CableImage from '../components/cableComponent/CableImage';
import CableCo from "../components/cableComponent/CableCO"

import qs from 'qs';
import CableOxygen from '../components/cableComponent/CableOxygen';
import CableSmoke from '../components/cableComponent/CableSmoke';
const { Header, Sider, Content } = Layout;
let cable_current = {
    sensor_id: "",
    typeCode: "",
    cmd_idx: 0,
    ia: 3.2,
    ib: 3.9,
    ic: 61.3,
    it: 0.3
}
class CablePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            showMain: true,
            spanText: "传感器",
            current: undefined,
            guard: undefined,
            pd: undefined,
            co: undefined,
            flamGas: undefined,
            guard: undefined,
            h2s: undefined,
            oxygen: undefined,
            tempHum: undefined,
            well: undefined,
            water: undefined,
            tempurature: undefined,
            ch4: undefined,
            smoke: undefined

        };
    }
    componentDidMount() {
        this.state.timer = setInterval(() => {
            console.log("执行了");

            axios.post("/getJson").then(res => {
                this.setState({
                    current: res.data[0],
                    ch4: res.data[1],
                    co: res.data[2],
                    flamGas: res.data[3],
                    guard: res.data[4],
                    h2s: res.data[5],
                    oxygen: res.data[6],
                    pd: res.data[7],
                    tempHum: res.data[8],
                    well: res.data[9],
                    water: res.data[10],
                    tempurature: res.data[11],
                    smoke: res.data[12]
                })

            })
        }, 1000);
        this.loadingShow();
        // let typeCode = {
        //     codeOfDevice: record.code_of_device
        // }
        // axios.post('/deleteDevice',
        // qs.stringify(typeCode)).then(function (response) {
        //   message.success("删除成功!");
        //   _this.queryData()
        // })
        axios.post("/getJson").then(res => {
            this.setState({
                current: res.data[0],
                ch4: res.data[1],
                co: res.data[2],
                flamGas: res.data[3],
                guard: res.data[4],
                h2s: res.data[5],
                oxygen: res.data[6],
                pd: res.data[7],
                tempHum: res.data[8],
                welL: res.data[9],
                water: res.data[10],
                tempurature: res.data[11],
                smoke: res.data[12]
            })

        })

        // })



    }

    // 监听props变化 
    // componentWillReceiveProps(nextProps) {
    //   //当路由切换时
    //   console.log("开始loading");

    //   if (this.props.location !== nextProps.location) {
    //     window.scrollTo(0, 0);
    //     this.loadingShow();
    //   }
    // }
    loadingShow() {
        this.setState(
            {
                loading: true
            },
            () => {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.setState({ loading: false });
                }, 1000);
            }
        );
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,

        });
    };
    showData = (text, typeOfDevice) => {
        this.loadingShow()
        this.setState({
            showMain: false,
            codeOfDevice: text,
            typeOfDevice: typeOfDevice,
            spanText: "传感器数据"
        })
        console.log(this.state.showMain);


    }
    showMain = () => {
        this.loadingShow()
        this.setState({
            showMain: true,
            spanText: "传感器"
        })
    }
    logout = () => {
        this.props.history.push('/login')
    }
    render() {
        // let content = (
        //   <div>
        //     <p><Button onClick={this.logout}>退出登录</Button></p>
        //   </div>
        // );
        // let showPage = null;
        // if (this.state.showMain) {

        //   showPage = <Manage showData={this.showData} />
        // } else {
        //   console.log("渲染数据" + this.state.typeOfDevice);

        //   showPage = <DeviceData showMain={this.showMain} codeOfDevice={this.state.codeOfDevice} typeOfDevice={this.state.typeOfDevice} />
        // }
        let width = 1920
        return (
            <Layout>

                <Layout style={{ width: "max-content" , background: '#DCDCDC', }}>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <span
                            style={
                                {
                                    margin: '24px 16px'
                                }
                            }
                        >{this.state.spanText}</span>

                    </Header>

                    <Content
                        className="wrapper"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minWidth: width - 50,
                            background: '#DCDCDC',
                            minHeight: 1080,
                        }}
                    >
                        <Row gutter={[15, 24]}>
                            <Col span={8} >
                                <CableCurrent current={this.state.current} />
                            </Col>
                            <Col span={8}>
                                <CableGuard guard={this.state.guard} />
                            </Col>
                            <Col span={8} >
                                <CablePD pd={this.state.pd} />
                            </Col>
                        </Row>
                        <Row gutter={[15, 24]}>
                            <Col span={8}>
                                <CableTempurature tempurature={this.state.tempurature}>

                                </CableTempurature>
                            </Col>
                            <Col span={8}>
                                <CableTemHum tempHum={this.state.tempHum}>

                                </CableTemHum>
                            </Col>
                            <Col span={8}>
                                <CableWater water={this.state.water} ></CableWater>
                            </Col>
                        </Row>
                        <Row gutter={[15, 24]}>
                            <Col span={8}>
                                <CableCH4 ch4={this.state.ch4}></CableCH4>
                            </Col>
                            <Col span={8}>
                                <CableFlamGas flamGas={this.state.flamGas}></CableFlamGas>
                            </Col>
                            <Col span={8}>
                                <CableH2S h2s={this.state.h2s}></CableH2S>
                            </Col>
                        </Row>
                    
                        <Row gutter={[15, 24]}>
                            <Col span={8}>
                                <CableCo co={this.state.co}></CableCo>
                            </Col>
                            <Col span={8}>
                                <CableOxygen oxygen={this.state.oxygen}></CableOxygen>
                            </Col>
                            <Col span={8}>
                                <CableSmoke smoke={this.state.smoke}></CableSmoke>
                            </Col>

                        </Row>
                            <Row gutter={[15, 24]}>
                            <Col span={8}>
                                <CableWell well={this.state.well}></CableWell>
                            </Col>
                            <Col span={16}>
                                <CableImage ></CableImage>
                            </Col>
                           </Row>
                    </Content>

                </Layout>
            </Layout>
        );
    }
}
export default withRouter(CablePage)