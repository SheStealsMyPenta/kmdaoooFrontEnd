import React, { Component } from 'react'
import SalesChart from "./bodyComponent/SalesChart"
import EnterpriseHelpPin from "./bodyComponent/EnterpriseHelpPin"
import QRCode from "./bodyComponent/QRCode"
import { Card, Row, Col } from 'antd';
import "./css/Kbody.css"
import Haibao from './bodyComponent/Haibao';
export default class KBody extends Component {
    render() {
        return (
            <div>
                <Card className="body">



                    <Haibao />


                    <QRCode></QRCode>


                </Card>

            </div>
        )
    }
}
