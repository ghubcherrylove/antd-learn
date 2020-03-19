import React from 'react';
import { connect } from 'dva';
import {Menu, Dropdown, Avatar, Icon} from 'antd';
import router from 'umi/router';

function clickItem({ item, key, keyPath, domEvent }) {
  // console.log(item, key, keyPath, domEvent)
  if (key === '/logout') {
    sessionStorage.clear();
    document.title = '登录 - 明烟雨任';
    router.push('/login')
  }
  if (key === '/center') {
    alert('跳转到个人中心页面')
  }
  if (key === '/setting') {
    alert('跳转到个人设置页面')
  }
}
const menu = () => {
  return (
    <Menu onClick={clickItem}>
      <Menu.Item key="/center">
        <Icon type="user" /><span>个人中心</span>
      </Menu.Item>
      <Menu.Item key="/setting">
        <Icon type="setting" /><span>个人设置</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="/logout">
        <Icon type="logout" /><span>退出登录</span>
      </Menu.Item>
    </Menu>
  );
}
const namespace = 'login';

const mapStateToProps = (state) => {
  return {
    username: state[namespace].username
  }
}

class MyAvatar extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    
  }
  componentDidUpdate(prevProps) {
    
  }
  componentWillUnmount() {
    
  }
  render() {
    return (
      <Dropdown overlay={menu}>
        <div>
          <Avatar size="small" icon="user" style={{marginRight:'5px'}} /><span>{this.props.username || '明烟雨任'}<Icon type="down" /></span>
        </div>
      </Dropdown>
    );
  }
}

export default connect(mapStateToProps)(MyAvatar);