import React, { Component } from 'react'
import axios from 'axios';
import TableComponetns from '../components/TableComponetns';
import { WrappedAdvancedSearchForm } from '../components/SearchComponent';
export default class Manage extends Component {
    state = {
        collapsed: false,
        reRender: false,
        codeOfDevice: "",
        typeOfDevice: ""
      };
    
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
      reRender = () => {
        this.setState(
          {
            reRender: !this.state.reRender
          }
        )
      }
      logout=()=>{
        let _this = this;
        axios.post("/userLogOut").then(res=>{
          if(res.data=="ok"){
               _this.props.history.push("/login") 
          }
        })
      }
      handleSearch = (code, type) => {
    //    console.log("执行handleSearch");
    
        this.setState({
          codeOfDevice: code,
          typeOfDevice: type
        })
    
      }
    render() {
        return (
            <div>
                <WrappedAdvancedSearchForm reRender={this.reRender} handleSearch={this.handleSearch}></WrappedAdvancedSearchForm>
                <TableComponetns showData={this.props.showData} codeOfDevice={this.state.codeOfDevice} typeOfDevice={this.state.typeOfDevice}></TableComponetns>
            </div>
        )
    }
}
