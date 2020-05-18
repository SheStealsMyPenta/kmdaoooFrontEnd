import React, { Component } from 'react'
import { Card } from 'antd';
import { datetimeFormat, getHours, getMinutes, getDay, getSeconds, getParenthesesStr } from '../Utils'

import * as echarts from 'echarts';
import EchartsBlock from './EchartsBlock';
export default class ChartComponent extends Component {
    constructor(props) {
        super(props)
    
        let type = this.props.typeOfDevice.match(/\((.+)\)/g);
        type = type.toString();
        let typeArr = type.substring(1, type.length - 1).split("+")
        this.state = {
            theTime: "过去一天",
            type: typeArr
        }



    }
    componentDidMount() {
        // var chartObj = echarts.init(document.getElementById("dataBlock1"))
        // var option = this.getTheOption();
        // //  chartObj.setOption({
        // //     title: { text: 'ECharts 入门示例' },
        // //     tooltip: {},
        // //     xAxis: {
        // //         data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        // //     },
        // //     yAxis: {},
        // //     series: [{
        // //         name:'得到',
        // //         type:'bar',
        // //         data:[100.,311.3,322.8,10,10,10]
        // //     }],
        // // });
        // chartObj.setOption(option)

    }
    //     <Card >
    //     <EchartsBlock unitsName={["放电幅值(dBm)", "频率特性(%)"]} range={this.props.time} title={"测点UHF_AE" + "A102033"} theTime={this.state.theTime} id={"block1"} />
    // </Card>
    // <Card style={{ marginTop: "20px" }}>
    //     <EchartsBlock unitsName={["放电幅值(dBm)", "频率特性(%)"]} range={this.props.time} title={"测点UHF_AE" + "A102033"} theTime={this.state.theTime} id={"block2"} />
    // </Card>
    // <Card style={{ marginTop: "20px" }}>
    //     <EchartsBlock unitsName={["放电幅值(dBm)", "频率特性(%)"]} range={this.props.time} title={"测点UHF_AE" + "A102033"} theTime={this.state.theTime} id={"block3"} />
    // </Card>
    componentWillReceiveProps(nextProps) {
        console.log("执行了willReceive");

        this.setState({
            range: nextProps.time
        })

    }
    render() {
        let types = this.state.type

        return (
            <div>
                {
                    types.map((item, index) => {
                        console.log("类型为：" + item);
                        return (
                            <Card key={item} style={{ marginTop: "20px" }}>
                                <EchartsBlock range={this.props.time} theTime={this.state.theTime} codeOfDevice={this.props.codeOfDevice} type={item} id={item + index} />
                            </Card>)
                    })
                }

            </div>

        )
    }
}
 