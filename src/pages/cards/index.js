import React from 'react';
import { Table, Modal, Button, Form, Select, Input, message, Row, Col, Icon } from 'antd';
import SampleChart from '@/components/SampleChart'
import { connect } from 'dva';
import {STORE} from '@/utils/store'
const FormItem = Form.Item;

const namespace = 'cards'

const mapStateToProps = (state) => {
  return {
    cardsList: state[namespace].cardsList,
    statistic: state[namespace].statistic,
    cardsLoading: state.loading.effects[`${namespace}/queryList`]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDidMount: () => {
      dispatch({
        type: `${namespace}/queryList`,
        payload: {name: '', sex: '', url: ''}
      })
    },
    doSubmit: (values) => {
      dispatch({
        type: `${namespace}/add`,
        payload: {...values, id: Date.now()}
      })
    },
    doRemove: (ids) => {
      dispatch({
        type: `${namespace}/remove`,
        payload: {ids}
      })
    },
    getStatistic: (id) => {
      dispatch({
        type: `${namespace}/getStatistic`,
        payload: id
      })
    }
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      statisticVisible: false,
      ids: '',
      id: ''
    }
  }
  // 挂载周期
  componentDidMount() {
    this.props.onDidMount();
  }
  // 显示
  showModal = () => {
    this.setState({visible: true});
  }
  // 关闭
  closeModal = () => {
    this.setState({visible: false})
  }
  // 确定按钮
  doSubmit = () => {
    const { doSubmit, form: { validateFields } } = this.props;
    validateFields((err, values) => {
      if (err) { // 错误
        message.error('错误');
        return false;
      }
      doSubmit(values);
      this.setState({ visible: false });
      // message.success('操作成功');
    })
  }
  // 删除
  doRemove = (id) => {
    const { ids } = !!id.ids ? id: false || this.state;
    const { doRemove } = this.props;
    if (!!!ids) {
      message.warning('请选择一条记录');
      return false;
    }
    doRemove(ids);
    // message.success('操作成功');
  }
  // 显示图表
  showStatistic = (id) => {
    const { getStatistic } = this.props;
    getStatistic(id);
    // 更新 state，弹出包含图表的对话框
    this.setState({ id, statisticVisible: true });
  };
  // 关闭图表
  handleStatisticCancel = () => {
    this.setState({statisticVisible: false});
  }
  render() {
    const { visible, statisticVisible, id } = this.state;
    const {cardsList, cardsLoading, form: { getFieldDecorator }, statistic } = this.props;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({ids: selectedRows.map(n => n.id).join()})
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render: value => STORE.DICT.SEX[value]
      },
      {
        title: '描述',
        dataIndex: 'desc',
      },
      {
        title: '链接',
        dataIndex: 'url',
        render: value => <a href={value}>{value}</a>
      },
      {
        title: '图表',
        dataIndex: '_',
        render: (_, { id }) => {
          return (
            <Button onClick={() => { this.showStatistic(id); }}>图表</Button>
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'operate',
        render: (_, { id }) => {
          return (
            <Button type="danger" onClick={() => { this.doRemove({ids: id}); }}>删除</Button>
          );
        },
      }
    ]
    return (
      <div>
        <Row type="flex" justify="end" gutter={[15, 15]}>
          <Col>
            <Button onClick={this.showModal} icon="plus" title="新增">新增</Button>
          </Col>
          <Col>
            <Button onClick={this.doRemove} icon="minus" type="danger" disabled={!!!this.state.ids} title="删除">删除</Button>
          </Col>
        </Row>
        <Row gutter={[15, 15]}>
          <Col>
            <Table rowSelection={rowSelection} columns={columns} dataSource={cardsList} loading={cardsLoading} rowKey='id' />
          </Col>
        </Row>
        <Modal visible={visible} onCancel={this.closeModal} onOk={this.doSubmit} title="新增" destroyOnClose={true}>
          <Form>
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="名称"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('sex', {
                initialValue: '1',
                rules: [{ required: true }],
              })(
                <Select placeholder="请选择">
                  <Select.Option value="1">男</Select.Option>
                  <Select.Option value="2">女</Select.Option>
                </Select>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('desc')(
                <Input  placeholder="描述"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('url', {
                rules: [{ type: 'url' }],
              })(
                <Input placeholder="链接"/>
              )}
            </FormItem>
          </Form>
        </Modal>
        <Modal visible={statisticVisible} footer={null} onCancel={this.handleStatisticCancel}>
          <SampleChart data={statistic} />
        </Modal>
      </div>
    );
  }
}
/**
 * Form.create()(List)
 * 这段代码的作用是创建一个高阶组件，为页面组件 List 提供表单所需要的内容(this.props.form)
 */
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(List));