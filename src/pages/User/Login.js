import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Checkbox, Alert, Modal, Row, Col, Icon, Tabs } from 'antd';
import styles from './Login.less';

const { TabPane } = Tabs;
const FormItem = Form.Item

const namespace = 'login';

const mapStateToProps = (state) => {
  return {
    status: state[namespace].status,
    submitting: state.loading.effects[`${namespace}/login`]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doSubmit: (values) => {
      dispatch({
        type: `${namespace}/login`,
        payload: values
      })
    }
  }
}

class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'login/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);

          Modal.info({
            title: formatMessage({ id: 'app.login.verification-code-warning' }),
          });
        }
      });
    });

  handleSubmit = () => {
    const { type } = this.state;
    const { doSubmit, form: { validateFields } } = this.props;
    validateFields((err, values) => {
      if (err) { // 错误
        message.error('错误');
        return false;
      }
      console.log('--values--')
      console.log(values);
      doSubmit({...values, type})
    })
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );
  
  render() {
    const { status, form: { getFieldDecorator } } = this.props;
    return (
      <div className={styles.main}>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={16}>
            <div style={{textAlign: 'center'}}>
              <h1>logo</h1>
              <h5>这是pmr做的练习antd design项目,登录有可能成功，有可能失败，这是mock模拟的</h5>
            </div>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={16}>
            {!status && <Alert message="账号或密码错误" type="error" showIcon/>}
          </Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={16}>
            <div style={{textAlign: 'center'}}>
                <Tabs defaultActiveKey="account">
                  <TabPane tab="账号密码登陆" key="account">
                    <Form>
                      <FormItem>
                        {getFieldDecorator('username', {
                          rules: [{ required: true }],
                        })(
                          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名: admin"/>
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator('password', {
                          rules: [{ required: true }],
                        })(
                          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码: 123456"/>
                        )}
                      </FormItem>
                      <Form.Item>
                        {getFieldDecorator('remember', {
                          valuePropName: 'checked',
                          initialValue: true,
                        })(<Checkbox className={styles.loginFormRemeber}>记住密码</Checkbox>)}
                        <a className={styles.loginFormForgot} href="">
                          忘记密码
                        </a>
                        <Button type="primary" onClick={this.handleSubmit} className={styles.loginFormButton}>登录</Button>
                        Or <a href="">注册</a>
                      </Form.Item>
                    </Form>
                  </TabPane>
                  <TabPane tab="手机号登陆" key="mobile">
                    手机号登陆
                  </TabPane>
                </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

/**
 * Form.create()(LoginPage)
 * 这段代码的作用是创建一个高阶组件，为页面组件 List 提供表单所需要的内容(this.props.form)
 */
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LoginPage));
