import { Tag } from 'antd';
import React, { Component } from 'react'
const { CheckableTag } = Tag;

class Tags extends React.Component {
  state = {
    checked: true
  };

  handlechange = () => {
    // this.setState({ checked });
    console.log(this.props.index)

    this.props.handlechange(this.props.index)
  };


  render() {
    return (
      <CheckableTag color="blue" {...this.props} checked={this.props.checked} onChange={this.handlechange} />
    );
  }
}
export default Tags;