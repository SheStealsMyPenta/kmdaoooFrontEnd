import React, { Component } from 'react'
import { Avatar, Popover, Layout, Menu, Icon, Button, Spin } from 'antd';
import '../css/MainPage.css'

import { withRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Manage from '../components/Manage';
import DeviceData from '../pages/DeviceData'
import { LoginForm } from '../Login';
import "../css/div.css"
const { Header, Sider, Content } = Layout;
class MainPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      showMain: true,
      spanText: "传感器"
    };
  }
  componentDidMount() {
    
    this.loadingShow();
  }
  // 监听props变化 
  // componentWillReceiveProps(nextProps) {
  //   //当路由切换时
  //   console.log("开始loading");

  //   if (this.props.location !== nextProps.location) {
  //     window.scrollTo(0, 0);
  //     this.loadingShow();
  //   }
  // }
  loadingShow() {
    this.setState(
      {
        loading: true
      },
      () => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.setState({ loading: false });
        }, 1000);
      }
    );
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,

    });
  };
  showData = (text, typeOfDevice) => {
    this.loadingShow()
    this.setState({
      showMain: false,
      codeOfDevice: text,
      typeOfDevice: typeOfDevice,
      spanText: "传感器数据"
    })
    console.log(this.state.showMain);


  }
  showMain = () => {
    this.loadingShow()
    this.setState({
      showMain: true,
      spanText: "传感器"
    })
  }
  logout = () => {
    this.props.history.push('/login')
  }
  render() {
    let content = (
      <div>
        <p><Button onClick={this.logout}>退出登录</Button></p>
      </div>
    );
    let showPage = null;
    if (this.state.showMain) {

      showPage = <Manage showData={this.showData} />
    } else {
      console.log("渲染数据" + this.state.typeOfDevice);

      showPage = <DeviceData showMain={this.showMain} codeOfDevice={this.state.codeOfDevice} typeOfDevice={this.state.typeOfDevice} />
    }
    return (
      <Layout>
        <Sider style={{ minHeight: 1000 }} trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
            <Icon type="code-sandbox" />
              <span>传感器</span>
            </Menu.Item>
            {/* <Menu.Item key="2">
                  <Icon type="video-camera" />
                  <span>nav 2</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="upload" />
                  <span>nav 3</span>
                </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout style={{width:"max-content"}}>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
             style={{cursor:"pointer"}}
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <span
              style={
                {
                  margin: '24px 16px'
                }
              }
            >{this.state.spanText}</span>
            <Popover trigger="click" placement="bottom" content={content}>
              <Avatar style={{ float: "right", marginTop: 10, marginRight: 20, backgroundColor: this.state.color, verticalAlign: 'middle' ,cursor:"pointer"}} size="large">
                {"admin"}
              </Avatar>
            </Popover>
          </Header>
          <Spin tip="Loading..." spinning={this.state.loading}>
            <Content
              className="wrapper"
              style={{
                margin: '24px 16px',
                padding: 24,
                minWidth: 1150,
                background: '#fff',
                minHeight: 1080,
              }}
            >
              {showPage}
            </Content>
          </Spin>
        </Layout>
      </Layout>
    );
  }
}
export default withRouter(MainPage)