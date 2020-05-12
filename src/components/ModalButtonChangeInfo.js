import React, { Component } from 'react'
import { Button, Modal, Form, Input, Radio } from 'antd';
import TagsContainer from './TagsContainer'
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import { message } from 'antd';

const success = () => {
    message.success("修改成功!");
    //this.props.queryTable();
};

const error = () => {
    message.error('This is an error message');
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
            console.log("flag为" + flag)
            if (flag) {
                callback()
            } else {
                callback('请至少选择一个类型')
            }

        }
        constructor(props) {
            super(props)
            let type = this.props.type_of_device;

            // let typeArr = type.split("_")
            // typeArr.pop();
            let allType = ["开关柜(UHF+TEV+AA)", "GIS(UHF)", "GIS(AE)", "GIS(TEV)", "GIS(AA)"]
            let tags = []
            allType.forEach(item => {
                let contains = false;
                if (type == item) {
                    contains = true;
                }
                if (contains) {
                    let tag = {
                        name: item,
                        checked: true
                    }
                    tags.push(tag)
                } else {
                    let tag = {
                        name: item,
                        checked: false
                    }
                    tags.push(tag)
                }
            })
            this.state = {
                tags: tags
            }
            console.log("当前类型为" + tags);

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
            // let origin = this.state.tags
            // console.log(index)

            // origin[index].checked = checked
            // this.setState({
            //     tags: origin
            // });
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
            //console.log("当前编号是" + this.props.code_of_device);

            return (
                <Modal
                    visible={visible}
                    title="修改设备"
                    okText="修改"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={this.submit}
                >
                    <Form layout="vertical">
                        <Form.Item label="传感器编号">
                            <Input
                                defaultValue={this.props.code_of_device}
                                disabled={true}
                            />
                        </Form.Item>
                        <Form.Item label="传感器名称">
                            {getFieldDecorator('name_of_device', {
                                initialValue: this.props.name_of_device,
                                rules: [{ required: true, message: '请输入传感器名称！' }],
                            })(<Input

                                type="textarea" />)}
                        </Form.Item>
                        <Form.Item className="collection-create-form_last-form-item">
                            {getFieldDecorator('tags', {
                                rules: [{
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

export default class ModalButtonCHangeInfo extends Component {
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
            console.log("设备编码为" + this.props.code_of_device);

            axios.post('/modDevice', {
                code_of_device: this.props.code_of_device,
                name_of_device: values.name_of_device,
                remark: values.remark,
                type_of_device: values.tags[0].name

            })
                .then(function (response) {
                    if (response.data == true) {
                        success()
                        _this.props.queryData()
                        // _this.props.history.push('/main')
                        // _this.props.history.go()

                    }
                })

            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <span>
                <a onClick={this.showModal}>
                    修改
            </a>
                <CollectionCreateForm
                    queryData={this.props.queryData}
                    code_of_device={this.props.code_of_device}
                    name_of_device={this.props.name_of_device}
                    type_of_device={this.props.type_of_device}
                    remark={this.props.remark}
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </span>
        );
    }
}
