import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';

const namespace = 'cards'

const mapStateToProps = (state) => {
  return {
    cardsList: state.cards.cardsList,
    cardsLoading: state.loading.effects['cards/queryList']
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '描述',
        dataIndex: 'desc',
      },
      {
        title: '链接',
        dataIndex: 'url',
      },
    ]
  }
  componentDidMount() {
    this.dispatch({
      type: 'cards/queryList'
    });
  }
  render() {
    const {cardsList, cardsLoading} = this.props;
    return (
      <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading} rowKey='id' />
    );
  }
}

export default connect(mapStateToProps)(List);