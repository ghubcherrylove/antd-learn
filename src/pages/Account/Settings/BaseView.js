import React from 'react';
import { Table, Modal, Button, Form, Select, Input, message, Row, Col, Icon } from 'antd';
import SampleChart from '@/components/SampleChart'
import { connect } from 'dva';
import {STORE} from '@/utils/store'
const FormItem = Form.Item;

const namespace = 'base'

const mapStateToProps = (state) => {
  return {
    // cardsList: state[namespace].cardsList,
    // statistic: state[namespace].statistic,
    // cardsLoading: state.loading.effects[`${namespace}/queryList`]
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
    return (
      <div>
        hello BaseView
      </div>
    );
  }
}
/**
 * Form.create()(List)
 * 这段代码的作用是创建一个高阶组件，为页面组件 List 提供表单所需要的内容(this.props.form)
 */
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(List));