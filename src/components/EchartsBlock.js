import React, { Component } from 'react'
import * as echarts from 'echarts';
import { datetimeFormat, getHours, getMinutes, getDay, getSeconds } from '../Utils'
import axios from 'axios';
import qs from 'qs';
import "../css/charts.css"
export default class EchartsBlock extends Component {
    constructor(props) {
        super(props)
        let type = this.props.type;
        let yAxisName = []
        if (type == "AE") {
            yAxisName.push("放电幅值(mV)")
            yAxisName.push("频率特性(mV)")
        } else if (type == "UHF") {
            yAxisName.push("放电幅值(dBm)") 
            yAxisName.push("频率特性(%)")
        } else if (type == "TEV") {
            yAxisName.push("放电幅值(dBmV)")
            yAxisName.push("")
        } else if (type == "AA") {
            yAxisName.push("放电幅值(dBuV)")
            yAxisName.push("放电幅值(dBuV)")
        } else {
            yAxisName.push("放电幅值(dBm)")
            yAxisName.push("频率特性(%)")
        }

        this.state = {
            title: this.props.codeOfDevice + "-" + type,
            yAxisName: yAxisName,
            type:type
        }
    }

    getTheOption(min,max) {
        var gridWidth = '90%';
        var gridHeight = '35%';
        var gridLeft =80;
        var gridTop = 40;
        var gridRight = 0;
        return {
            backgroundColor: '#fff',
            animation: false,
            axisPointer: {
                show: true,
                axis: 'y',
                label: {
                    show: false,
                    margin: 6,
                    backgroundColor: '#556',
                    textStyle: {
                        color: '#fff'
                    }
                },
                handle: {
                    show: true,
                    size: 0
                },
                status: true,
                triggerOn: 'click',
                link: {
                    xAxisId: ['xAxisFirst-yAxisFirst', 'xAxisSecond-yAxisSecond'],
                }

            },
            title: {
                text: this.state.title

            },
            //添加图谱下载为图片
            toolbox: {
                right: 70,
                feature: {
                    saveAsImage: { show: true },
                    dataZoom: {
                        yAxisIndex: false,
                        xAxisIndex: [0, 1]
                    },
                    restore: {
                        show: true,
                        title: '还原'
                    }
                }
            },
            dataZoom: [
                { // 第一个 dataZoom 组件
                    top: 485,
                    showDetail: false,
                    xAxisIndex: [0, 1]  // 表示这个 dataZoom 组件控制 第一个 和 第三个 angleAxis
                },
            ],
            tooltip: {
                trigger: 'axis',
                alwaysShowContent: true,
                axisPointer: {
                    type: 'cross',
                    label: {
                        show: false
                    },
                    show: true,
                    triggerOn: 'click'
                },
                show: true,

                backgroundColor: 'rgba(50,50,50,0.55)',
                borderColor: '#ccc',
                borderWidth: 2,
                borderRadius: 4,
                transitionDuration: 0,
                extraCssText: 'width:200px;white-space:small',
                textStyle: {
                    fontSize: 12,
                    // color: 'rgba(0,128,255,1)'
                }
                ,

                formatter: function (params) {
                    //console.log(params)
                    var timeBefore = params[0].data[0]
                    var timeAfter = datetimeFormat(timeBefore, "symbol")
                    var time = new Date(params[0].data[0])
                    var showTime = time.getFullYear() + "/" + time.getMonth() + "/" + time.getDay() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
                    var res = '<p>测试时间：' + timeAfter + '</p>'
                    var cap1, cap2, cap3, cap4, cap5;
                    for (var i = 0; i < params.length; i++) {

                        if (params[i].seriesName === '放电均值') {
                            cap1 = '<p>' + params[i].seriesName + '：' + params[i].data[1].toFixed(1) + ' dBm</p>'

                        } else if (params[i].seriesName === '放电峰值') {

                            cap2 = '<p>' + params[i].seriesName + '：' + params[i].data[1].toFixed(1) + ' dBm</p>'

                        } else if (params[i].seriesName === '放电次数') {

                            cap3 = '<p>' + params[i].seriesName + '：' + params[i].data[1] + ' 次/秒</p>'

                        } else if (params[i].seriesName === '频率特性1') {

                            cap4 = '<p>' + params[i].seriesName + '：' + params[i].data[1].toFixed(1) + ' %</p>'

                        } else {

                            cap5 = '<p>' + params[i].seriesName + '：' + params[i].data[1].toFixed(1) + ' %</p>'

                        }
                    }
                    if (typeof cap2 !== 'undefined') {
                        res += cap2
                    }
                    if (typeof cap1 !== 'undefined') {
                        res += cap1
                    }
                    if (typeof cap3 !== 'undefined') {
                        res += cap3
                    }
                    if (typeof cap4 !== 'undefined') {
                        res += cap4
                    }
                    if (typeof cap5 !== 'undefined') {
                        res += cap5
                    }

                    return res;
                }
            },
            legend: {
                top: 10,
                left: 'center',
                // align:'center',
                data: ['放电峰值', '放电均值', '频率特性1', '频率特性2'],
                itemWidth: 12,
                itemHeight: 12,

                textStyle: {
                    fontWeight: 'bold',
                    fontSize: 12,
                    padding: [4, 0, 5, 0]
                },
                // top:gridTop,
                // right:160,
                icon: 'square'
            },
            xAxis: [
                this.makeXAxis('xAxisFirst-yAxisFirst', '', 'middle', false, this.props.theTime),
                this.makeXAxis('xAxisSecond-yAxisSecond', '', 'middle', true, this.props.theTime)
            ],
            yAxis: [
                this.makeSpecialYAxis('xAxisFirst-yAxisFirst', this.state.yAxisName[0], 'center',0,80),
                this.makeYAxis('xAxisSecond-yAxisSecond', this.state.yAxisName[1], 0, 100, false, 'center'),
            ],
            grid: [{
                id: 'xAxisFirst-yAxisFirst',
                left: gridLeft,
                top: gridTop,
                width: gridWidth,
                height: gridHeight,
                right: gridRight
            }, {
                id: 'xAxisSecond-yAxisSecond',
                left: gridLeft,
                top: gridTop + 145,
                width: gridWidth,
                height: gridHeight,
                right: gridRight
            }
            ],
            animationEasingUpdate: 'cubicInOut',
            animationDurationUpdate: 2000
        };
    }
    encapsulateData(data, idOfXAxis, idOfYAxis, nameOfTheLine) {
        return {
            type: 'line',
            name: nameOfTheLine,
            xAxisId: idOfXAxis,
            yAxisId: idOfYAxis,
            symbolSize: 2.5,
            itemStyle: {
                emphasis: {
                    color: '#fff'
                }
            },
            animationThreshold: 5000,
            progressiveThreshold: 5000,
            data: data
        };
    }
    makeXAxis = (idOfAxis, nameOfAxis, position, show, theTime, labels) => {
        if (theTime === "过去1小时") {
            return {
                id: idOfAxis,
                type: 'time',
                show: show,
                ticketInterval: 300000,
                name: nameOfAxis,
                gridId: idOfAxis,
                splitLine: { show: false },
                axisLine: {
                    lineStyle: {
                        color: '#333'
                    }
                },
                axisLabel: {
                    show: show,
                    textStyle: {
                        color: '#333'
                    }
                },
            };
        } else if (theTime === "过去一天") {
            return {
                id: idOfAxis,
                type: 'category',
                show: show,
                // interval: 1000 * 60 * 60,
                name: nameOfAxis,
                gridId: idOfAxis,
                minInterval: 1000 * 60 * 60,
                splitLine: { show: false },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#333'
                    }
                },
                axisTick: {
                    alignWithLabel: 'true'
                },
                data: labels,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#333'
                    },
                    formatter: function (params) {
                        //console.log("一天params:"+params)
                        var time = datetimeFormat(params)
                        return time
                    }

                },
                //min: labels[labels.length - 1] - 60 * 60 * 1000 * 24,
                //max: labels[labels.length - 1]
            };
        } else if (theTime === '过去7天') {
            return {
                id: idOfAxis,
                type: 'category',
                show: show,
                ticketInterval: 1000 * 60 * 60 * 24,
                name: nameOfAxis,
                gridId: idOfAxis,
                splitLine: { show: false },
                axisLine: {
                    show: true,
                    lineStyle: {

                        color: '#333'
                    }
                },
                axisTick: {
                    alignWithLabel: 'true'

                },
                data: labels,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#333'
                    },
                    formatter: function (params) {
                        //console.log("一天params:"+params)
                        var time = datetimeFormat(params)
                        return time
                    }

                },
                //min: labels[labels.length - 1] - 60 * 60 * 1000 * 24 * 7,
                //max: labels[labels.length - 1]
            };
        }
    }
    makeSpecialYAxis(idOfAxis, nameOfAxis, location,min,max) {
        
        
        if(this.state.type=="UHF"){
            return {
                id: idOfAxis,
                type: 'value',
                name: nameOfAxis,
                gridId: idOfAxis,
                nameLocation: location,
                axisPointer: {
                    show: false
                },
                inverse: false,
                nameTextStyle: {
                    color: "black",
                },
                max: 0,
                min: -80,
                interval: 20,
                nameGap: 30,
                splitLine: { show: true },
                axisLine: {
                    lineStyle: {
                        color: '#333'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#333'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#333'
                    }
                }
            };
        }else if(this.state.type=="AE"){
            return {
                id: idOfAxis,
                type: 'value',
                name: nameOfAxis,
                gridId: idOfAxis,
                nameLocation: location,
                min: min,
                max: max,
                axisPointer: {
                    show: false
                },
                inverse: false,
                nameTextStyle: {
                    color: "black",
                },
                interval: 20,
                nameGap: 35,
                splitLine: {show: true},
                axisLine: {
                    lineStyle: {
                        color: '#333'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#333'
                    },
                    formatter: function (value, index) {
                        switch (index) {
                            case 0:
                                return 0;
                            case 1:
                                return 2;
                            case 2:
                                return 20;
                            case 3:
                                return 200;
                            case 4:
                                return 2000;
                        }
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#333'
                    }
                }
            };
        }else if(this.state.type=="TEV") {
            return {
                id: idOfAxis,
                type: 'value',
                name: nameOfAxis,
                gridId: idOfAxis,
                nameLocation: location,
                min: min,
                max: max,
                axisPointer: {
                    show: false
                },
                inverse: false,
                nameTextStyle: {
                    color: "black",
                },
                interval: 20,
                nameGap: 35,
                splitLine: {show: true},
                axisLine: {
                    lineStyle: {
                        color: '#333'
                    }
                },
        
                axisTick: {
                    lineStyle: {
                        color: '#333'
                    }
                }
            };

        }else{
            return {
                id: idOfAxis,
                type: 'value',
                name: nameOfAxis,
                gridId: idOfAxis,
                nameLocation: location,
                min: min,
                max: max,
                axisPointer: {
                    show: false
                },
                inverse: false,
                nameTextStyle: {
                    color: "black",
                },
                interval: 20,
                nameGap: 35,
                splitLine: {show: true},
                axisLine: {
                    lineStyle: {
                        color: '#333'
                    }
                },
             
                axisTick: {
                    lineStyle: {
                        color: '#333'
                    }
                }
            };
        }
      
    }
    makeYAxis(idOfAxis, nameOfAxis, maxValue, minValue, inverse, location) {
        if(this.state.type=="UHF"){
            return {
                id: idOfAxis,
                type: 'value',
                name: nameOfAxis,
                gridId: idOfAxis,
                nameLocation: location,
                min: minValue,
                max: maxValue,
                axisPointer: {
                    show: false
                },
                interval: 25,
                inverse: false,
                nameTextStyle: {
                    color: "black",
                },
                nameGap: 30,
                splitLine: { show: true },
                axisLine: {
                    lineStyle: {
                        color: '#333'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#333'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#333'
                    }
                }
            };
        }else if(this.state.type=="AE"){
            return {
                id: idOfAxis,
                type: 'value',
                name: nameOfAxis,
                gridId: idOfAxis,
                nameLocation: location,
                min: 0,
                max: 80,
                axisPointer: {
                    show: false
                },
                inverse: false,
                nameTextStyle: {
                    color: "black",
                },
                interval: 20,
                nameGap: 35,
                splitLine: {show: true},
                axisLine: {
                    lineStyle: {
                        color: '#333'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#333'
                    },
                    formatter: function (value, index) {
                        switch (index) {
                            case 0:
                                return 0;
                            case 1:
                                return 2;
                            case 2:
                                return 20;
                            case 3:
                                return 200;
                            case 4:
                                return 2000;
                        }
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#333'
                    }
                }
            };
        }else if(this.state.type=="TEV"){
            return {
                id: idOfAxis,
                type: 'value',
                name: nameOfAxis,
                gridId: idOfAxis,
                nameLocation: location,
                min: 0,
                max: 3000000,
                axisPointer: {
                    show: false
                },
                inverse: false,
                nameTextStyle: {
                    color: "black",
                },
                interval: 500000,
                nameGap: 35,
                splitLine: {show: true},
                axisLine: {
                    lineStyle: {
                        color: '#333'
                    }
                },
            
                axisTick: {
                    lineStyle: {
                        color: '#333'
                    }
                }
            };
        }else{
            return {
                id: idOfAxis,
                type: 'value',
                name: nameOfAxis,
                gridId: idOfAxis,
                nameLocation: location,
                min: 0,
                max: 80,
                axisPointer: {
                    show: false
                },
                inverse: false,
                nameTextStyle: {
                    color: "black",
                },
                interval: 20,
                nameGap: 35,
                splitLine: {show: true},
                axisLine: {
                    lineStyle: {
                        color: '#333'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#333'
                    },
                    formatter: function (value, index) {
                       return value/10
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#333'
                    }
                }
            };
        }
     
    }
    componentDidMount() {
        var chartObj = echarts.init(document.getElementById(this.props.id))
        chartObj.setOption(this.getTheOption())
    //     console.log("window对象"+window);
        
        window.addEventListener("resize",()=>{
        console.log("重新布局");
        
          chartObj.resize();
       });    
        //扩大区域取消扩大操作
        chartObj.on('dataZoom', function () {
            chartObj.dispatchAction({
                type: 'takeGlobalCursor',
                key: 'dataZoomSelect',
                // 启动或关闭
                dataZoomSelectActive: false
            });
            //隐藏提示框
            chartObj.getZr().on('mousedown', function (params) {
                console.log(params)
                let cursorSytle = chartObj.getDom().firstChild.style.cursor
                if (cursorSytle === 'crosshair') {
                    //取消提示框
                    let option = {
                        tooltip: {
                            show: false,
                            alwaysShowContent: false
                        },
                        axisPointer: {
                            show: false
                        }
                    }
                    chartObj.setOption(option)

                }
            });
            //显示提示框
            chartObj.getZr().on('mouseup', function (params) {

                let cursorSytle = chartObj.getDom().firstChild.style.cursor
                if (cursorSytle !== 'crosshair') {
                    //取消提示框
                    let option = {
                        tooltip: {
                            show: true,
                            alwaysShowContent: true
                        },
                        axisPointer: {
                            show: true
                        }
                    }
                    chartObj.setOption(option)

                }
            });
        });

        this.setState({
            chartObj: chartObj
        })
        //初始化图谱后进行网络访问
        this.getData();
    }
    getData = () => {
        let range = this.props.range
        let codeOfDevice = this.props.codeOfDevice
        let type = this.props.type
        let params = {
            range: range,
            codeOfDevice: codeOfDevice,
            type: type
        }
        console.log(params);
        let _this = this;
        axios.post('/findDataByCodeOfDevice',
            params).then(function (response) {
                //渲染前台页面
                if (response.data.length !== 0) {
                    if (response != null) {
                        let data1Arr = []
                        let data2Arr = []
                        let data3Arr = []
                        let data4Arr = []
                        let testTime = []
                        let data1ChartArr = []
                        let data2ChartArr = []
                        let data3ChartArr = []
                        let data4ChartArr = []
                        // let res =  JSON.parse(response.data)
                        let res = []
                        Object.keys(response.data).map((key) => {
                            res.push(response.data[key])
                        });

                        res.forEach(item => {
                            data1Arr.push(item.data1)
                            data2Arr.push(item.data2)
                            data3Arr.push(item.data3)
                            data4Arr.push(item.data4)
                            testTime.push(item.testTime)
                        })
                        console.log("时间为" + Date.parse(testTime[0]));

                        for (var j = 0; j < testTime.length; j++) {
                            data1ChartArr.push([Date.parse(testTime[j]), data1Arr[j]]);
                            data2ChartArr.push([Date.parse(testTime[j]), data2Arr[j]]);
                            data3ChartArr.push([Date.parse(testTime[j]), data3Arr[j]]);
                            data4ChartArr.push([Date.parse(testTime[j]), data4Arr[j]]);
                        }

                        let option = {
                            series: [
                                _this.encapsulateData(data1ChartArr, 'xAxisFirst-yAxisFirst', 'xAxisFirst-yAxisFirst', '放电峰值'),
                                _this.encapsulateData(data2ChartArr, 'xAxisFirst-yAxisFirst', 'xAxisFirst-yAxisFirst', '放电均值'),
                                _this.encapsulateData(data3ChartArr, 'xAxisSecond-yAxisSecond', 'xAxisSecond-yAxisSecond', '频率特性1'),
                                _this.encapsulateData(data4ChartArr, 'xAxisSecond-yAxisSecond', 'xAxisSecond-yAxisSecond', '频率特性2'),
                            ]
                        }
                        let newChartObj = _this.state.chartObj
                        newChartObj.setOption(option)
                        _this.setState({
                            chartObj: newChartObj
                        })
                    }
                } else {
                    console.log("没有数据");

                    let option = _this.getTheOption()
                    let newChartObj = _this.state.chartObj
                    newChartObj.setOption(option)
                    _this.setState({
                        chartObj: newChartObj
                    })
                }
            })
    }
    getDataByProps = (props) => {
        let range = props.range
        let codeOfDevice = this.props.codeOfDevice
        let type = this.props.type
        let params = {
            range: range,
            codeOfDevice: codeOfDevice,
            type: type
        }
        console.log(params);
        let _this = this;
        this.state.chartObj.showLoading({
            text: '加载中...',
            color: '#4cbbff',
            textColor: '#4cbbff',
            
        });
        axios.post('/findDataByCodeOfDevice',
            params).then(function (response) {

                _this.state.chartObj.hideLoading();
                //渲染前台页面
                if (response.data.length !== 0) {
                    if (response != null) {
                        let data1Arr = []
                        let data2Arr = []
                        let data3Arr = []
                        let data4Arr = []
                        let testTime = []
                        let data1ChartArr = []
                        let data2ChartArr = []
                        let data3ChartArr = []
                        let data4ChartArr = []
                        // let res =  JSON.parse(response.data)
                        let res = []
                        Object.keys(response.data).map((key) => {
                            res.push(response.data[key])
                        });

                        res.forEach(item => {
                            data1Arr.push(item.data1)
                            data2Arr.push(item.data2)
                            data3Arr.push(item.data3)
                            data4Arr.push(item.data4)
                            testTime.push(item.testTime)
                        })
                        console.log("时间为" + Date.parse(testTime[0]));

                        for (var j = 0; j < testTime.length; j++) {
                            data1ChartArr.push([Date.parse(testTime[j]), data1Arr[j]]);
                            data2ChartArr.push([Date.parse(testTime[j]), data2Arr[j]]);
                            data3ChartArr.push([Date.parse(testTime[j]), data3Arr[j]]);
                            data4ChartArr.push([Date.parse(testTime[j]), data4Arr[j]]);
                        }

                        let option = {
                            series: [
                                _this.encapsulateData(data1ChartArr, 'xAxisFirst-yAxisFirst', 'xAxisFirst-yAxisFirst', '放电峰值'),
                                _this.encapsulateData(data2ChartArr, 'xAxisFirst-yAxisFirst', 'xAxisFirst-yAxisFirst', '放电均值'),
                                _this.encapsulateData(data3ChartArr, 'xAxisSecond-yAxisSecond', 'xAxisSecond-yAxisSecond', '频率特性1'),
                                _this.encapsulateData(data4ChartArr, 'xAxisSecond-yAxisSecond', 'xAxisSecond-yAxisSecond', '频率特性2'),
                            ]
                        }
                        let newChartObj = _this.state.chartObj
                        newChartObj.setOption(option)
                        _this.setState({
                            chartObj: newChartObj
                        })
                    }
                } else {
                    console.log("没有数据");

                    let option = _this.getTheOption()
                    let newChartObj = _this.state.chartObj
                    newChartObj.clear()
                    newChartObj.setOption(option)
                    _this.setState({
                        chartObj: newChartObj
                    })
                }
                
            })
    }
    componentWillReceiveProps(nextProps) {
    
        if(nextProps.range!==this.props.range){
            this.getDataByProps(nextProps)
        }else{
            console.log("时间相同不渲染");
            
        }
     

    }
    render() {
        return (
            <div id={this.props.id} style={{ height: "350px" }}>

            </div>
        )
    }
}
