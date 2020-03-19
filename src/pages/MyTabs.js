import React from 'react';
import {Tabs} from 'antd';
const {TabPane} = Tabs;

class MyTabs extends React.Component {
  constructor() {
    super();
    this.state = {
      activeKey: '1',
    };
  }
  onTabChange = (activeKey) => {
    this.setState({activeKey:activeKey})
  }
  render() {
    return (
      <Tabs activeKey={this.state.activeKey} onChange={this.onTabChange}>
        <TabPane tab="tab 1" key="1">content of tab pane 1</TabPane>
        <TabPane tab="tab 2" key="2">content of tab pane 2</TabPane>
      </Tabs>
    );
  }
}

export default MyTabs;