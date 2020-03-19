import request from '../utils/request';  // request 是 demo 项目脚手架中提供的一个做 http 请求的方法，是对于 fetch 的封装，返回 Promise

const delay = (millisecond) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecond);
  });
};

export default {
  namespace: 'puzzlecards',
  state: {
    data: [],
    counter: 0,
  },
  effects: {
    *queryInitCards(_, sagaEffects) {
      const { call, put } = sagaEffects;
      const endPointURI = '/dev/random_joke';

      const puzzle = yield call(request, endPointURI);
      yield put({ type: 'addNewCard', payload: puzzle });

      yield call(delay, 3000);

      const puzzle2 = yield call(request, endPointURI);
      yield put({ type: 'addNewCard', payload: puzzle2 });
      
      yield call(delay, 3000);

      const puzzle3 = yield call(request, endPointURI);
      yield put({ type: 'addNewCard', payload: puzzle3 });
    }
  },
  reducers: {
    addNewCard(state, { payload: newCard }) {
      const nextCounter = state.counter + 1;
      const newCardWithId = { ...newCard, id: nextCounter };
      const nextData = state.data.concat(newCardWithId);
      return {
        data: nextData,
        counter: nextCounter,
      };
    },
    removeCard(state, { payload: newCard }) {
      const nextCounter = state.counter + 1;
      /**
       * 注意这里是不能改变原来的state
       * 所以这里不能用splice来删除元素，因为splice会改变原来的数据
       * 而slice是不会改变原来的数据的，只会返回一个子数组
       * 也不能用pop()因为这个会改变原来的数据
       */
      const newData = state.data.slice(0, state.data.length - 1);
      return {
        data: newData,
        counter: nextCounter,
      };
    }
  }
};