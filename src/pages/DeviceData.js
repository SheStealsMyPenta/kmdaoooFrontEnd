import React, { Component } from 'react'
import { Layout, Menu, Icon, DatePicker, Button } from 'antd';
import '../css/MainPage.css'
import TableComponetns from '../components/TableComponetns';
import { WrappedAdvancedSearchForm } from '../components/SearchComponent';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Card } from 'antd';
import ChartComponent from '../components/ChartComponent';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn'
import { LocaleProvider } from 'antd';
moment.locale('zh-cn')


const { Header, Sider, Content } = Layout;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD HH:mm';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
class DeviceData extends Component {
    handleBack = () => {
        // this.props.history.push("/main")
        this.props.showMain()
    }
    constructor(props) {
        super(props)
        // let storage = window.localStorage
        // if (this.props.location.state !== undefined) {
        //     storage.typeOfDevice = this.props.location.state.typeOfDevice
        //     storage.codeOfDevice = this.props.location.state.codeOfDevice
        // }

        this.state = {
            collapsed: false,
            time: ["2019-12-25 10:21:03", "2019-12-25 11:04:12"]
        };
    }


    // toggle = () => {
    //     this.setState({
    //         collapsed: !this.state.collapsed,

    //     });
    // };
    onDatePick = (date) => {
        this.setState({
            time: [moment(date[0]).format("YYYY-MM-DD HH:mm:ss"), moment(date[1]).format("YYYY-MM-DD HH:mm:ss")]
        })
    }
    componentDidMount() {
    }
    render() {
        return (

            <Content
                style={{
                    // margin: '24px 16px',
                    // padding: 24,
                    background: '#fff',
                    minHeight: 1080,
                }}
            >
                <Button style={{ marginLeft: 8 }} onClick={this.handleBack} type="primary">
                    后退
                </Button>
                <LocaleProvider locale={zh_CN}>
                    <RangePicker

                        style={{ marginLeft: 10 }}
                        showTime={{ format: 'HH:mm' }}

                        format={dateFormat}
                        onOk={
                            this.onDatePick
                        }
                    />
                </LocaleProvider>
                <br />
                <br />
                <ChartComponent time={this.state.time} codeOfDevice={this.props.codeOfDevice} typeOfDevice={this.props.typeOfDevice} />
            </Content>

        );
    }
}
export default withRouter(DeviceData)