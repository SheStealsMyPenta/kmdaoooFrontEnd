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
        let _this=this;
        axios.post('/getQRCode', {})
            .then(function (response) {
               console.log("图片地址为"+response.data);

                
                let qrCode = document.getElementById("QRCode")
                qrCode.src=response.data
                target.src= response.data
                
                _this.props.getImg()
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
