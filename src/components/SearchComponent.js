import React, { Component } from 'react'
import { Form, Row, Col, Input, Button, Icon, Select, option } from 'antd';
import ModalButton from './ModalButton';
import { withRouter } from 'react-router-dom';

class SearchComponent extends Component {
    state = {
        expand: false,
    };

    // To generate mock Form.Item
    getFields() {
        const count = this.state.expand ? 10 : 6;
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < 2; i++) {
            children.push(
                <Col span={12} key={i} style={{ display: i < count ? 'block' : 'none' }}>
                    <Select

                        placeholder="选择变电站"
                        value={["1", "2"]}
                        size={2}
                        style={{ width: '32%' }}
                        onChange={this.handleCurrencyChange}
                    ></Select>
                </Col>,
            );
        }
        return children;
    }

    handleSearch = e => {

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            console.log(values.code_of_device == undefined);

            if (values.code_of_device == undefined) {
                values.code_of_device = ""
            }
            if (values.type_of_device == undefined) {
                values.type_of_device = ""
            }
            this.props.handleSearch(values.code_of_device, values.type_of_device)
        });
    };
    handleAdd = () => {


    }
    handleReset = () => {

        this.props.form.resetFields();
        // this.props.history.push('/')
    };
    render() {


        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                <Row gutter={24}>
                    <Col span={6} key={"type"} >
                        {getFieldDecorator('code_of_device', {

                        })(
                            <Input placeholder="设备编号模糊查询" />
                        )}

                    </Col>
                    <Col span={6} key={"code"} >
                        {getFieldDecorator('type_of_device', {

                        })(
                            <Select
                                allowClear={true}
                                placeholder="选择传感器类型"
                            >
                                <Select.Option value="开关柜(UHF+TEV+AA)">开关柜(UHF+TEV+AA)</Select.Option>
                                <Select.Option value="GIS(UHF)">GIS(UHF)</Select.Option>
                                <Select.Option value="GIS(AE">GIS(AE)</Select.Option>
                                <Select.Option value="GIS(AE)">GIS(TEV)</Select.Option>
                                <Select.Option value="GIS(AA)">GIS(AA)</Select.Option>
                            </Select>
                        )}

                    </Col>,

                </Row>

                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <ModalButton reRender={this.props.reRender} style={{ marginLeft: 8 }} history={this.props.history} >

                        </ModalButton>
                        <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit" >
                            搜索
                </Button>

                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                            清空
                </Button>

                    </Col>
                </Row>
            </Form>

        );
    }

}
export const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(withRouter(SearchComponent));
