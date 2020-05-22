import React, { Component } from 'react'
import QRCode from "./bodyComponent/QRCode"
import { Input, Button,message } from 'antd';
import "./css/Kbody.css"
import html2canvas from "html2canvas";
import Haibao from './bodyComponent/Haibao';


const success = () => {
  message.success('图片生成成功!');
};
export default class KBody extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: "123",
            inviteCode: "",
            showImg: false,
            disabled:false

        }

    }
    generateImg = () => {

        this.setState({
            showImg: false,
            disabled:true,
            inviteCode: this.state.inputValue
        })
    }
    valueChange(e) {
        this.setState({
            inputValue: e.target.value
        })

    }
    resetValue = () => {
        this.setState({
            inputValue: ""
        })
    }
    convertAndGenerateImg = () => {
        const target = document.getElementById("target")
        const result = document.getElementById("result")
        let _this = this;
        let height = target.offsetHeight;
        let width = target.offsetWidth;
        // 640,437
        html2canvas(target, {
            allowTaint: true,
            useCORS: true,
            height: height,
            width: width,
        }).then(function (canvas) {
            let resultStr = canvas.toDataURL("image/png")
            result.onload=function() {
                _this.setState({
                    showImg: true,
                    disabled:false
                })
               success();
            }
            result.src = resultStr
        })
    }
    render() {
        return (
            <div style={{ height:400,margin: "auto" }}>
                <div style={{ paddingTop: "2rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Input onChange={(e) => this.valueChange(e)} value={this.state.inputValue} style={{ width: "50%", height: 30 }} placeholder="请输入邀请码" /><Button disabled={this.state.disabled} onClick={() => { this.generateImg() }} style={{ width: 80, height: 30, marginLeft: 10 }}>生成</Button>
                </div>
                <div style={{height:20}}></div>
                <div id="target" style={{ width: 375, height: 591, position: "relative", margin: "auto", display: this.state.showImg ? "none" : "block" }}>
                    <Haibao style={{ width: "100%", height: "100%"}} />
                    <QRCode resetValue={this.resetValue} convertAndGenerateImg={this.convertAndGenerateImg} inviteCode={this.state.inviteCode} style={{ position: "absolute", right: "5%", bottom: "10%" }}></QRCode>
                </div>
                <div style={{ width: 375, height: 591, position: "relative", margin: "auto",  display: this.state.showImg ? "block" : "none" }} >
                    <img id="result" src="" style={{ width: "100%", height: "100%"}}></img>
                </div>
            </div>
        )
    }
}
