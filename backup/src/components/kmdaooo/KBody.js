import React, { Component } from 'react'
import SalesChart from "./bodyComponent/SalesChart"
import EnterpriseHelpPin from "./bodyComponent/EnterpriseHelpPin"
import QRCode from "./bodyComponent/QRCode"
import { Card, Row, Col } from 'antd';
import html2canvas from "html2canvas";
import "./css/Kbody.css"
import Haibao from './bodyComponent/Haibao';
export default class KBody extends Component {
    componentDidMount() {
 
     
    }
    htmlDraw = ()=>{
        let target = document.getElementById("target")
        console.log(target);
        
        html2canvas(target, {
            allowTaint: true,
             useCORS: true,
             height: 640 ,
             width: 437,
         }).then(function (canvas) {
             let resultStr = canvas.toDataURL("image/png")
      
             console.log("结果为"+resultStr);
 
         })
    }
    render() {
        return (
            <div>
                <Card id="target" className="body">



                    <Haibao />


                    <QRCode getImg= {this.htmlDraw}></QRCode>


                </Card>

            </div>
        )
    }
}
