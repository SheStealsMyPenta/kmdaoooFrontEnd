import React, { Component } from 'react'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Spin, Button } from "antd";
import MainPage from '../pages/MainPage';
import cablePage from '../pages/CablePage';

import { LoginForm } from '../Login';
import KMDaooo from '../pages/KMDaoo';
class MyRouter extends Component {
    constructor(props) {
        super(props)
        this.state = { loading: true };
        let timer = null;
    }
    componentDidMount() {
        this.loadingShow();
    }
    // 监听props变化 
    componentWillReceiveProps(nextProps) {
        //当路由切换时
        console.log("开始loading");

        if (this.props.location !== nextProps.location) {
            window.scrollTo(0, 0);
            this.loadingShow();
        }
    }
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
    render() {
        return (
            <div key={this.props.location.key}>
                <Spin tip="Loading..." spinning={this.state.loading}>
                    <Switch>
                        <Route exact path="/main" component={MainPage} ></Route>
                        <Route exact path="/login" component={LoginForm}></Route>
                        <Route exact path="/kmdaooo"
                            component={KMDaooo} />
                        <Route exact
                            path="/cablePage:*" component={cablePage}>
                            <Redirect
                                to={{
                                    pathname: "/cablePage",
                                    search: "?utm=your+face"

                                }}
                            />

                        </Route>
                        <Route

                            path="/cablePage?*" component={KMDaooo}>
                            <Redirect
                                to={{
                                    pathname: "/cablePage",
                                    search: "?utm=your+face"

                                }}
                            />
                        </Route>



                    </Switch>
                </Spin>
            </div>
        )
    }
}
export default withRouter(MyRouter)