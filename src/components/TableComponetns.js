import React, { Component } from 'react'
import { Table, Divider, Tag } from 'antd';
import axios from 'axios';
import qs from 'qs';
import { Popconfirm, message } from 'antd';
import { Link, withRouter } from 'react-router-dom'
import ModalButtonCHangeInfo from './ModalButtonChangeInfo';
class TableComponetns extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }

    this.state = {
      columns: [
        {
          title: '编号',
          dataIndex: 'code_of_device',
          key: 'code_of_device',
    
          render: (text, record) => {
{/* <Link to={{
              pathname: '/deviceData',
              state: {
                "codeOfDevice": text,
                "typeOfDevice": record.type_of_device
              }
            }}>{text}</Link> */}
          return (<a onClick={this.props.showData.bind(this,text,record.type_of_device)}>{text}</a>)
          },
        },
        {
          title: '名称',
          dataIndex: 'name_of_device',
          key: 'name_of_device',
        },
        {
          title: '类型',
          dataIndex: 'type_of_device',
          key: 'type_of_device',
        },
        {
          title: '备注',
          key: 'remark',
          dataIndex: 'remark',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <ModalButtonCHangeInfo queryData={this.queryData} remark={this.props.remark} code_of_device={record.code_of_device} name_of_device={record.name_of_device} type_of_device={record.type_of_device} reRender={this.props.reRender} style={{ marginLeft: 8 }} history={this.props.history} >

              </ModalButtonCHangeInfo>
              <Divider type="vertical" />
              <Popconfirm
                title="确认删除此设备吗?"
                onConfirm={() => {
                  this.confirm(record)
                }}
                onCancel={cancel}
                okText="确认"
                cancelText="取消"
              >
                <a href="#">删除</a>
              </Popconfirm>
      </span>
          ),
        },
      ]

    }



    function cancel(e) {
      console.log(e);
      // message.error('');
    }
    const data = [
      {
        id: '2',
        codeOfDevice: 'B019B001',
        nameOfDevice: '35kV开关柜',
        typeOfDevice: '开关柜(UHF+TEV+AA)',
        comments: '1111',
      },
      {
        id: '1',
        codeOfDevice: 'B019B002',
        nameOfDevice: '35kV开关柜',
        typeOfDevice: '开关柜(UHF+TEV+AA)',
        comments: '1111',
      },
    ]
    this.confirm.bind(this)
  }
  // setStorage = (text, record) => {
  //   console.log("设备信息为"+text,record);

  //   let storage = window.localStorage
  //   storage.codeOfDevice = text
  //   storage.typeOfDevice = record
  // }

  confirm = (record) => {
    // console.log(record);
    let deviceCode = {
      codeOfDevice: record.code_of_device
    }
    let _this = this;
     
    axios.post('/deleteDevice',
      qs.stringify(deviceCode)).then(function (response) {
        message.success("删除成功!");
        _this.queryData()
      })
  }

  delete = (record, rowkey) => {
    // console.log(record);
    // console.log(rowkey)
  }
  componentDidMount() {

    this.queryData()
  }
  componentWillReceiveProps(nextProps) {

    this.queryDataByCondition(nextProps)
  }
  queryData = () => {
    let _this = this
    let codeOfDevice = this.props.codeOfDevice
    let typeOfDevice = this.props.typeOfDevice

    if (codeOfDevice == "" && typeOfDevice == "") {

      axios.post('/getListOfDevice')
        .then(function (response) {
          if (response.data === "logout") {
            _this.props.history.push('/login')
          } else {
            _this.encapsulateData(response)
          }
        })
    } else {


      axios.post('/getListOfDeviceWithCondition', {
        codeOfDevice: codeOfDevice,
        typeOfDevice: typeOfDevice
      }).then(function (response) {
        _this.setState({
          data: response.data
        })
      })
    }

  }
  encapsulateData = (response) => {
    let res = []
    Object.keys(response.data).map((key) => {
      res.push(response.data[key])
    });
    res.forEach((item) => {
      item.key = item.code_of_device
    })
    this.setState({
      data: res
    })
  }
  queryDataByCondition = (props) => {
    let _this = this
    let codeOfDevice = props.codeOfDevice
    let typeOfDevice = props.typeOfDevice

    if (codeOfDevice == "" && typeOfDevice == "") {
      axios.post('/getListOfDevice')
        .then(function (response) {
          // console.log(response.data);

          if (response.data === "logout") {
            _this.props.history.push('/login')
          } else {
            _this.encapsulateData(response)
          }

        })
    } else {
      axios.post('/getListOfDeviceWithCondition', {
        codeOfDevice: codeOfDevice,
        typeOfDevice: typeOfDevice
      }).then(function (response) {
        _this.encapsulateData(response)
      })
    }
  }
  render() {
    return (
      <div>
        <Table columns={this.state.columns} dataSource={this.state.data}>
        </Table>
      </div>)
  }
}
export default withRouter(TableComponetns)
