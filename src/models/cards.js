// import request from '../utils/request';  // request 是 demo 项目脚手架中提供的一个做 http 请求的方法，是对于 fetch 的封装，返回 Promise
import {queryList, removeCards} from '../services/cards';

const delay = (millisecond) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecond);
  });
};

export default {
  namespace: 'cards',
  state: {
    cardsList: [
      {id: '1', name: 'pmr', sex: '1', desc: 'pmr是一个帅哥', url: 'https://umijs.org'},
      {id: '2', name: 'pantty', sex: '1', desc: '这是小潘的英文名', url: 'baidu.com'},
      {id: '3', name: '明烟雨任', sex: '2', desc: '这是小任的笔名', url: 'baidu.com'}
    ],
    statistic: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 1150 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]
  },
  effects: { 
    *queryList({payload}, { call, put }) {
      console.log('effect:queryList')
      // call 其实是一个函数，和 yield 关键字配合使用处理异步逻辑，call 第一个参数是一个函数，要求函数返回 Promise，之后的参数是该函数(这里是queryList函数)调用时的入参
      // body: payload || {username: 'admin', password: '123456'}
      // const result = yield call(request, '/dev/cardsList', {method: 'POST', body: payload});
      const result = yield call(queryList, {body: payload});
      yield put({ type: 'queryInitCards', payload: result });
    },
    *getStatistic({ payload }, sagaEffects) {
      console.log('effect:getStatistic')
      const { call, put } = sagaEffects;

      yield put({ type: 'getStatistic_reducer', payload: payload });
    },
    *add({ payload }, sagaEffects) { // 第一个对象是携带的数据，第二个对象是effect的原语集，其中常用的方法有call，put等
      console.log('effect:add')
      const { call, put } = sagaEffects;

      yield put({ type: 'add_reducers', payload: payload });
    },
    *remove({ payload }, sagaEffects) { // 第一个对象是携带的数据，第二个对象是effect的原语集，其中常用的方法有call，put等
      console.log('effect:remove')
      const { call, put } = sagaEffects;

      // const result = yield call(request, '/dev/removeCards', {method: 'POST', body: payload});
      const result = yield call(removeCards, {body: payload});

      yield put({ type: 'remove_reducers', payload: payload });
    },
  },
  reducers: {
    queryInitCards(state, { payload: result }) {
      console.log('reducers:queryList')
      if (result.success) {
        return {...state, cardsList: result.list}
      }
      return {...state};
    },
    getStatistic_reducer(state, { payload: id }) {
      console.log('reducers:getStatistic_reducer')
      return {...state};
    },
    add_reducers(state, { payload: newCard }) {
      console.log('reducers:add_reducers')
      return {...state, cardsList: state.cardsList.concat(newCard)};
    },
    remove_reducers(state, { payload: data = {ids: ''} }) {
      console.log('reducers:remove_reducers')
      const {ids} = data;
      const idArr = ids.split(',');
      const newcardsList = state.cardsList.filter(n => !idArr.includes(n.id));
      return {...state, cardsList: newcardsList};
    }
  }
};