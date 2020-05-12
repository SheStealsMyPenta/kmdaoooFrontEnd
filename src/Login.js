import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Card, AutoComplete } from 'antd';
import "./css/Login.css"
import axios from 'axios';
import { withRouter } from 'react-router';
import { message } from 'antd';
import "./css/charts.css"
const success = () => {
    message.success("登录成功!");
    //this.props.queryTable();
};

const error = () => {
    message.error('用户名密码错误！');
};

const warning = () => {
    message.warning('This is a warning message');
};
class Login extends Component {
    handleSubmit = e => {
        let _this = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let user = {
                    username: values.username,
                    password: values.password
                }
                console.log('Received values of form: ', values);
                axios.post('/userLogin', user).then(function (res) {
                    if(res.data.id==0){
                              error()
                    }else{
                        success()
                        sessionStorage.setItem("user",res.data)
                        _this.props.history.push('/main')
                        // axios.interceptors.request.use(config => {
                        //     //发送请求操作，统一再请求里加上userId 
                        //     config.headers['userId'] = window.sessionStorage.getItem("userId");
                        //     return config;
                        // }, error => {
                        //     //发送请求错误操作
                        //     console.log('请求失败')
                        //     return Promise.reject(error);
                        // })
                    }
                      
                    
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (   
            <div style={{ background: "#3E495F", height:"1080px", overflowY:"hidden" }}>
                <Card className='middle' title="智能传感器管理系统">

                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {/* {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)} */}
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
              </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}
export const LoginForm = Form.create({ name: 'normal_login' })(withRouter(Login));
