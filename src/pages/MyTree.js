import React from 'react';
import {Tree} from 'antd';
const {TreeNode} = Tree;

class MyTree extends React.Component {
  constructor() {
    super();
    this.state = {
      expandedKeys: ['0-0', '0-1'], // 展开的节点集合
    };
  }
  // 展开/收起节点时触发
  onExpand = () => {}
  // 点击树节点触发
  onSelect = (selectedKeys) => {
    const {expandedKeys} = this.state;
    const key = selectedKeys[0];
    if (expandedKeys.includes(key)) {
      // 移除
      this.setState({expandedKeys: expandedKeys.filter(n => n !== key)});
    } else {
      // 添加
      this.setState({expandedKeys: [...expandedKeys, key]});
    }
  }
  render() {
    return (
      <Tree expandedKeys={this.state.expandedKeys} selectedKeys={[]} onExpand={this.onExpand} onSelect={this.onSelect}>
        <TreeNode title="parent 1" key="0-0">
          <TreeNode title="leaf" key="0-0-0" />
          <TreeNode title="leaf" key="0-0-1" />
        </TreeNode>
        <TreeNode title="parent 2" key="0-1">
          <TreeNode title="leaf" key="0-1-0" />
          <TreeNode title="leaf" key="0-1-1" />
        </TreeNode>
      </Tree>
    );
  }
}

export default MyTree;