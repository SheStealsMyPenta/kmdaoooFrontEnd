  import React, { Component } from 'react'
import { Button, Modal, Form, Input, Radio } from 'antd';
import TagsContainer from './TagsContainer'
import TextArea from 'antd/lib/input/TextArea';


import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
const success = () => {
    message.success("添加成功!");
    //this.props.queryTable();
};

const error = () => {
    message.error('设备编号重复！');
};

const warning = () => {
    message.warning('This is a warning message');
};
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        tagsValidater = (rule, value, callback) => {
            let flag = false;
            this.state.tags.forEach(tag => {
                if (tag.checked == true) {
                    flag = true;
                    return
                }
            })
            if (flag) {
                callback()
            } else {
                callback('请选择一个类型')
            }

        }
        codeValidater = (rules, values, callback) => {
            if (values == undefined) {
                callback()
            }
            if (values.length != 8) {
                callback("请添加长度为8的设备编号！")
            } else {
                callback()
            }
        }
        constructor(props) {
            super(props)
            this.state = {
                tags: [{ name: "开关柜(UHF+TEV+AA)", checked: true }, { name: "GIS(UHF)", checked: false }, { name: "GIS(AE)", checked: false }, { name: "GIS(TEV)", checked: false }, { name: "GIS(AA)", checked: false }]
            }

        }
        handlechange = (indexPick) => {
            let origin = this.state.tags
            origin.map((item, index) => {
                if (index == indexPick) {
                    item.checked = true
                } else {
                    item.checked = false
                }

            })


            // origin[index].checked = checked
            this.setState({
                tags: origin
            });
        };
        componentDidMount() {


        }
        submit = () => {
            let typeArr = []
            this.state.tags.forEach(tag => {
                if (tag.checked) {
                    typeArr.push(tag)
                }

            })
            this.props.form.setFieldsValue({
                tags: typeArr
            })
            this.props.onCreate()
        }
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="添加新设备"
                    okText="添加"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={this.submit}
                >
                    <Form layout="vertical">
                        <Form.Item label="传感器编号">
                            {getFieldDecorator('code_of_device', {
                                rules: [
                                    { required: true, message: '请输入设备编号' },
                                    { validator: this.codeValidater }

                                ],

                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="传感器名称">
                            {getFieldDecorator('name_of_device', {
                                rules: [{ required: true, message: '请输入传感器名称！' }],
                            })(<Input type="textarea" />)}
                        </Form.Item>
                        <Form.Item label="传感器类型" className="collection-create-form_last-form-item">
                            {getFieldDecorator('tags', {
                                rules: [{
                                    rules: [{ required: true, message: '请输入传感器名称！' }],
                                    validator: this.tagsValidater
                                }]
                            })(
                                <TagsContainer tags={this.state.tags} handlechange={this.handlechange}  >

                                </TagsContainer>
                            )}
                        </Form.Item>
                        <Form.Item label="备注">
                            {getFieldDecorator('remark')
                                (<TextArea />)}
                        </Form.Item>

                    </Form>
                </Modal>
            );
        }
    },
);

export default class ModalButton extends Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            // console.log('Received values of form: ', values);
            let type = ""
            // values.tags.forEach(tag => {
            //     type += tag.name

            //     type += "_"
            // })



            const _this = this;
            let deviceCode = {
                codeOfDevice: values.code_of_device

            }
            axios.post('/checkCode',
                qs.stringify(deviceCode)).then(function (response) {



                    if (response.data !== false) {
                        axios.post('/addDevice', {
                            code_of_device: values.code_of_device,
                            name_of_device: values.name_of_device,
                            remark: values.remark,
                            type_of_device: values.tags[0].name

                        })
                            .then(function (response) {
                                if (response.data == true) {
                                    success()
                                    _this.props.reRender()
                                }
                                form.resetFields();
                                _this.setState({ visible: false });
                            })
                    } else {
                        error()
                    }

                })


        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <span>
                <Button type="primary" onClick={this.showModal}>
                    添加
            </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </span>
        );
    }
}
