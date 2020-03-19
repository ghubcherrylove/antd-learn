import {login} from '../services/login';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'center',
  state: {
    currentUser: {
      name: '小任',
      signature: '一明烟雨任平生',
      title: '前端工程师',
      group: '深圳办公室总部-AI事业部-产品部-前端工程师',
      address: '广西钟山县',
      tags: [
        {
          key: '1',
          label: '很有想法的',
        },
        {
          key: '2',
          label: '专注设计',
        },
        {
          key: '3',
          label: '辣~',
        },
        {
          key: '4',
          label: '大长腿',
        },
        {
          key: '5',
          label: '川妹子',
        },
        {
          key: '6',
          label: '海纳百川',
        },
      ]
    }
  },
  effects: { 
    *fetchCurrent({ payload }, { call, put }) {
    },
  },
  reducers: {
    login_reducers(state, { payload }) {
      console.log('reducers:login')
      console.log({...state, ...payload})
      return {...state, ...payload};
    }
  }
};