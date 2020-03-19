import React from 'react';
import {Input} from 'antd';

class MyInput extends React.Component {
  constructor() {
    super();
    this.state = {
     
    };
  }
  render() {
    return (
      <input value={this.props.value} onChange={this.props.onChange}/>
    );
  }
}

export default MyInput;