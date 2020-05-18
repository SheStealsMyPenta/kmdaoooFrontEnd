import React, { Component } from 'react'
import html2canvas from "html2canvas";
import axios from "axios"
import "../css/QRCode.css"
import qs from 'qs';
export default class QRCode extends Component {
    componentDidMount() {
        const target = document.getElementById("QRCode")
        let _this = this;


        axios.post('/getQRCode',
            qs.stringify({
                inviteCode: this.props.inviteCode
            })
        )
            .then(function (response) {
                console.log("图片地址为" + response.data);
                target.src = response.data
                target.onload = function () {
                    _this.props.convertAndGenerateImg()
                    _this.props.resetValue()
                }
            })


    }
    componentDidUpdate(prevProps) {
        if (prevProps.inviteCode !== this.props.inviteCode) {
            const target = document.getElementById("QRCode")
            let _this = this;
            axios.post('/getQRCode',
                qs.stringify({
                    inviteCode: this.props.inviteCode
                })
            )
                .then(function (response) {
                    console.log("图片地址为" + response.data);
                    target.src = response.data
                    target.onload = function () {
                        _this.props.convertAndGenerateImg()
                        _this.props.resetValue()
                    }

                })

        }
    }
    render() {
        return (
            <>
                <img crossOrigin="anonymous" className="QRCode" id="QRCode" src="">
                </img>
            </>

        )
    }
}
