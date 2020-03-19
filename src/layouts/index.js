import {Component} from 'react';
import {Layout, Breadcrumb, Menu, Icon, Avatar, Dropdown, Row, Col} from 'antd';
import { withRouter } from 'react-router-dom';
import router from 'umi/router';
import MyMenu from './MyMenu';
import menus from './menus'
import MyAvatar from '../components/MyAvatar';
import myStyles from './myStyles.less';

// Header, Footer, Sider, Content组件在Layout组件模块下
const { Header, Footer, Sider, Content } = Layout;

@withRouter
class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 256,
      collapsed: false
    };
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  componentDidMount() { //将要挂载到真实的dom树上的时期
    if (!sessionStorage.loginStatus) {
      // 普通跳转，不带参数
      document.title = '登录 - 明烟雨任';
      router.push('/login');

      // 带参数
      // router.push('/list?a=b');
      // router.push({
      //   pathname: '/list',
      //   query: {
      //     a: 'b',
      //   },
      // });
    }
  }
  componentDidUpdate(prevProps) {
    const routeMenu = new Map();
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].subMenu) {
        for (let j = 0; j < menus[i].subMenu.length; j++) {
          routeMenu[menus[i].subMenu[j].key] = menus[i].subMenu[j].text
        }
      } else {
        routeMenu[menus[i].key] = menus[i].text
      }
    }
    document.title = routeMenu[this.props.location.pathname]
  }
  render() {
    const {width, collapsed} = this.state;
    return (
      <Layout>
        <Sider width={width} style={{ minHeight: '100vh', color: 'white' }} onCollapse={this.toggleCollapsed} collapsible collapsed={this.state.collapsed}>
          <div className={myStyles.logo} />
          <MyMenu collapsed={collapsed}/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Row>
              <Col span={4}><Icon className={myStyles.trigger} type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggleCollapsed}/></Col>
              <Col span={20}>
                <div style={{float:'right',marginRight:'15px'}}>
                  <MyAvatar />
                </div>
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: '5px 15px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>pmr Design @2019 by ShenZhen</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;