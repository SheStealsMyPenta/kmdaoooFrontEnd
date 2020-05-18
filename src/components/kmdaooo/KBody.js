import React, { Component } from 'react'
import SalesChart from "./bodyComponent/SalesChart"
import EnterpriseHelpPin from "./bodyComponent/EnterpriseHelpPin"
import QRCode from "./bodyComponent/QRCode"
import { Card, Row, Col, Input, Button } from 'antd';
import "./css/Kbody.css"
import html2canvas from "html2canvas";
import Haibao from './bodyComponent/Haibao';
export default class KBody extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: "123",
            inviteCode: "",
            showImg:false,
    
        }

    }
    generateImg = () => {
       
        this.setState({
            showImg:false,
            inviteCode: this.state.inputValue
        })
    }
    valueChange(e) {
        this.setState({
            inputValue: e.target.value
        })
   
    }
    resetValue=()=>{
        this.setState({
            inputValue:""
        })
    }
    convertAndGenerateImg=()=> {
        const target = document.getElementById("target")
        const result = document.getElementById("result")
        let _this = this;
        html2canvas(target, {
            allowTaint: true,
            useCORS: true,
            height: 640,
            width: 437,
        }).then(function (canvas) {
            let resultStr = canvas.toDataURL("image/png")
            result.src= resultStr
              _this.setState({
                showImg:true
            })
            alert("图片生成成功!")
            console.log("结果为" + resultStr);
            
        })
    }
    render() {
        return (
            <div style={{margin:"auto"}}>
                <div style={{ paddingTop: "2rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Input onChange={(e) => this.valueChange(e)} style={{ width: "50%", height: 30 }} placeholder="请输入邀请码" /><Button onClick={()=>{this.generateImg()}} style={{ width: 80, height: 30,marginLeft:10 }}>生成</Button>
                </div>

                <div id="target" style={{ position: "relative", maxWidth: "437px", margin: "auto",display:this.state.showImg ? "none":"block"}} className="body">

                    <Haibao style={{ display: "inline-block", position: "absolute", left: 0, top: 0 }} />

                    <QRCode resetValue={this.resetValue} convertAndGenerateImg={this.convertAndGenerateImg} inviteCode={this.state.inviteCode} style={{ position: "absolute", right: "5%", bottom: "10%" }}></QRCode>

                </div>
                <img id="result" style={{position: "relative", maxWidth: "437px", margin: "auto", display:this.state.showImg?"block":"none" }}></img>

            </div>
        )
    }
}
