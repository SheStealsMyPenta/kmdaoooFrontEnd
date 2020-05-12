import React, { Component } from 'react'
import html2canvas from "html2canvas";
import axios from "axios"
import "../css/QRCode.css"

export default class QRCode extends Component {
    componentDidMount() {var imgs = new Image();
        imgs.crossOrigin = "Anonymous"; //注意存放顺序
        imgs.src = "http://localhost:3000/screenshot.png";
        const target = document.getElementById("QRCode")
        const result = document.getElementById("result")
        axios.post('/getQRCode', {})
            .then(function (response) {
               console.log("图片地址为"+response.data);
               
                // console.log(response.data);
                
                let qrCode = document.getElementById("QRCode")
                qrCode.src=response.data
                target.src= response.data
                html2canvas(target, {
                    allowTaint: true,
                     useCORS: true,
                     height: 100,
                     width: 100,
                 }).then(function (canvas) {
                     let resultStr = canvas.toDataURL("image/png")
              
                     console.log("结果为"+resultStr);
         
                 })

            })

      
    }
    render() {
        return (
            <>
                <img crossOrigin="anonymous" className="QRCode" id="QRCode" src="/image/screenshot.png">
                </img>
            </>

        )
    }
}
