import {Component} from 'react';
import Link from 'umi/link';
import { withRouter } from 'react-router-dom';
import {Menu, Button, Icon} from 'antd';
import menus from './menus'

const {SubMenu} = Menu;

@withRouter
class MyMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    console.log('--当前路由--');
    console.log(this.props.location);
    return (
      <div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.location.pathname || '/cards']}>
          {menus.map(menu => {
            if (menu.subMenu) {
              return (
                <SubMenu key={menu.key} title={<span><Icon type={menu.iconType} /><span>{menu.text}</span></span>}>
                  {menu.subMenu.map(submenu => {
                  return (<Menu.Item key={submenu.key}><Link to={submenu.to}>{submenu.text}</Link></Menu.Item>);
                  })}
                </SubMenu>
              );
            }
            return (
              <Menu.Item key={menu.key}>
                <Link to={menu.to}><Icon type={menu.iconType} /><span>{menu.text}</span></Link>
              </Menu.Item>
            );
          })}
            {/* <Menu.Item key="/helloworld">
              <Link to="/helloworld"><Icon type="pie-chart" /><span>Helloworld</span></Link>
            </Menu.Item>
            <Menu.Item key="/cards">
              <Link to="/cards"><Icon type="pie-chart" /><span>Cards</span></Link>
            </Menu.Item>
            <SubMenu key="/dashboard" title={<span><Icon type="dashboard" /><span>Dashboard</span></span>}>
              <Menu.Item key="/dashboard/analysis"><Link to="/dashboard/analysis">分析页</Link></Menu.Item>
              <Menu.Item key="/dashboard/monitor"><Link to="/dashboard/monitor">监控页</Link></Menu.Item>
              <Menu.Item key="/dashboard/workplace"><Link to="/dashboard/workplace">工作台</Link></Menu.Item>
            </SubMenu> */}
          </Menu>
      </div>
    );
  }
}

export default MyMenu;