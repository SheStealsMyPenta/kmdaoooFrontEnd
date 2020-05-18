import React, { Component } from 'react'
import QRCode from "../bodyComponent/QRCode"
export default class Haibao extends Component {
    render() {
        return (
            <>
                <img style={{ marginTop:20,width: "100%", height: "100%", objectFit: "contain" }} src={require("../../../images/poster_02.jpg")} />
                <img style={{ display: "none", width: "100%", height: "100%" }} src={require("../../../images/poster_20200512203023.jpg")} />
            </>
        )
    }
}
