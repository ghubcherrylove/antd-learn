import React, { Component } from 'react';
import { Card ,Button } from 'antd';
import { connect } from 'dva';

const namespace = 'puzzlecards';

/**
 * 
 * @param {pmr} state 
 * mapStateToProps 函数的作用是把外部的state注入到PuzzleCardsPage组件中。
 * 使得组件PuzzleCardsPage的状态由外部管理，使得在组件内可以这样使用：this.props.cardList
 * mapStateToProps必须是一个纯函数，无副作用，返回一个对象，这个对象上的函数会被dva注入组件的props
 * 这里的返回的对象是：{cardList}
 */
const mapStateToProps = (state) => {
  const cardList = state[namespace].data;
  return {cardList};
};

/**
 * 
 * @param {pmr} dispatch 
 * mapDispatchToProps 函数的作用是把dispatch注入到组件中，这里是注入到PuzzleCardsPage组件
 * 使得PuzzleCardsPage组件有dispatch的能力.使得组件内可以这样使用:this.props.onClickAdd
 * mapDispatchToProps函数一般返回一个对象，这个对象上的函数会被注入到props上
 * {
    onClickAdd: (newCard) => {
      const action = {
        type: `${namespace}/addNewCard`,
        payload: newCard,
      };
      dispatch(action);
    },
    onClickRemove: () => {
      const action = {
        type: `${namespace}/removeCard`,
        payload: '',
      };
      dispatch(action);
    },
  };
 */
const mapDispatchToProps = (dispatch) => {
  return {
    onClickAdd: (newCard) => {
      const action = {
        type: `${namespace}/addNewCard`,
        payload: newCard,
      };
      dispatch(action);
    },
    onClickRemove: () => {
      const action = {
        type: `${namespace}/removeCard`,
        payload: '',
      };
      dispatch(action);
    },
    onDidMount: () => {
      dispatch({
        type: `${namespace}/queryInitCards`
      })
    }
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class PuzzleCardsPage extends Component {
  componentDidMount() {
    this.props.onDidMount();
  }
  render() {
    return (
      <div>
        {
          this.props.cardList.map(card => {
            return (
              <Card key={card.id}>
                <div>Q: {card.setup}</div>
                <div>
                  <strong>A: {card.punchline}</strong>
                </div>
              </Card>
            );
          })
        }
        <div>
          <Button onClick={() => this.props.onClickAdd({
            setup: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            punchline: 'here we use dva',
          })}> 添加卡片 </Button>
          <Button onClick={() => this.props.onClickRemove()}> 移除卡片 </Button>
        </div>
      </div>
    );
  }
}