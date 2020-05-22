import React, { Component } from 'react'
import html2canvas from "html2canvas";
import axios from "axios"
import "../css/QRCode.css"
import qs from 'qs';
import { message } from 'antd';
const error = () => {
    message.error('请勿重复生成相同海报!');
};
export default class QRCode extends Component {
    constructor(props){
        super(props)
        this.state={
            src:""
        }
    }
    componentDidMount() {
        const target = document.getElementById("QRCode")
        let _this = this;


        // axios.post('/getQRCode',
        //     qs.stringify({
        //         inviteCode: this.props.inviteCode
        //     })
        // )
        //     .then(function (response) {
        //         console.log("图片地址为" + response.data);
        //         target.src = response.data
        //         target.onload = function () {
        //             _this.props.convertAndGenerateImg()
        //             _this.props.resetValue()
        //         }
        //     })


    }
    componentDidUpdate(prevProps) {
        if (prevProps.inviteCode !== this.props.inviteCode) {
            if ("" !== this.props.inviteCode) {
                const target = document.getElementById("QRCode")
                let _this = this;
                axios.post('/getQRCode',
                    qs.stringify({
                        inviteCode: this.props.inviteCode
                    })
                )
                    .then(function (response) {
                        // console.log("图片地址为" + response.data);
                        if(response.data){
                            _this.setState({
                                src:response.data
                            })
                        }      
                    })
            }
        }
    }
    onload = ()=>{
        this.props.convertAndGenerateImg()
    }
    render() {
        return (

            <img  className="QRCode" id="QRCode" src={this.state.src} onLoad={this.onload}>
            </img>


        )
    }
}
