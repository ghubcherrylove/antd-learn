import React from 'react';
import Link from 'umi/link';
import { Button, Form, Input, Divider, Row, Col, Icon, Avatar, Tag, Spin, Card } from 'antd';
import { connect } from 'dva';
import styles from './Center.less'

const namespace = 'center'
const namespace1 = 'project'

const mapStateToProps = ({loading, center, project}) => {
  return {
    listLoading: loading.effects['list/fetch'],
    currentUser: center.currentUser,
    currentUserLoading: loading.effects[`${namespace}/fetchCurrent`],
    project,
    projectLoading: loading.effects[`${namespace1}/fetchNotice`]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchNotice: (id) => {
      dispatch({type: `${namespace1}/fetchNotice`})
    }
  }
}

class Center extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTags: [],
      inputVisible: false,
      inputValue: '',
    };
  }
  // 挂载周期
  componentDidMount() {
    this.props.onFetchNotice();
  }

  // 为输入框添加一个引用
  saveInputRef = input => {
    this.input = input;
  };

  // 输入框值改变的时候
  handleInputChange = (e) => {
    this.setState({inputValue: e.target.value})
  }

  // 输入框失去焦点的时候
  handleInputConfirm = () => {
    let {newTags, inputValue} = this.state;
    if (inputValue && newTags.filter(tag => tag.label === inputValue).length === 0) {
      newTags = [...newTags, {key: `new-${newTags.length}`, label: inputValue}]
    }
    this.setState({inputVisible: false, newTags, inputValue: ''})
  }

  // 显示输入框并隐藏tag按钮
  showInput = () => {
    this.setState({inputVisible: true}, () => this.input.focus())
  }
  // 切换tab
  onTabChange = () => {}
  render() {
    const { newTags, inputVisible, inputValue} = this.state;
    const {
      currentUserLoading,
      projectLoading,
      listLoading,
      currentUser,
      project: { notice },
      match,
      children
    } = this.props;
    const operationTabList = [
      {
        key: 'articles',
        tab: (
          <span>
            文章 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        ),
      },
      {
        key: 'applications',
        tab: (
          <span>
            应用 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        ),
      },
      {
        key: 'projects',
        tab: (
          <span>
            项目 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        ),
      },
    ];
    return (
      <div>
        <Row type="flex" justify="end" gutter={[15, 15]}>
          <Col lg={7} md={24}>
            <div className={styles.avatarHolder}>
              <Avatar size={81} icon="user">Tom</Avatar>
              <div className={styles.name}>{currentUser.name}</div>
              <div>{currentUser.signature}</div>
            </div>
            <div className={styles.detail}>
              <p>
                <i className={styles.title} />
                {currentUser.title}
              </p>
              <p>
                <i className={styles.group} />
                {currentUser.group}
              </p>
              <p>
                <i className={styles.address} />
                {currentUser.address}
              </p>
            </div>
            <Divider dashed />
            <div className={styles.tags}>
              <div className={styles.tagsTitle}>标签</div>
              {currentUser.tags.concat(newTags).map(item => (
                <Tag key={item.key}>{item.label}</Tag>
              ))}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag
                  onClick={this.showInput}
                  style={{ background: '#fff', borderStyle: 'dashed' }}
                >
                  <Icon type="plus" />
                </Tag>
              )}
            </div>
            <Divider dashed />
            <div className={styles.team}>
              <div className={styles.teamTitle}>团队</div>
              <Spin spinning={projectLoading}>
                <Row gutter={36}>
                  {notice.map(item => (
                    <Col key={item.id} lg={24} xl={12}>
                      <Link to={item.href}>
                        <Avatar size="small" src={item.logo} />
                        {item.member}
                      </Link>
                    </Col>
                  ))}
                </Row>
              </Spin>
            </div>   
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={location.pathname.replace(`${match.path}/`, '')}
              onTabChange={this.onTabChange}
              loading={listLoading}
            >
              {children}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
/**
 * Form.create()(List)
 * 这段代码的作用是创建一个高阶组件，为页面组件 List 提供表单所需要的内容(this.props.form)
 */
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Center));