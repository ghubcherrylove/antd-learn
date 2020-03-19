import {queryProjectNotice} from '../services/project';
import router from 'umi/router';

export default {
  namespace: 'project',
  state: {
    notice: [],
  },
  effects: {
    *fetchNotice(_, { call, put }) {
      const {notices} = yield call(queryProjectNotice);
       yield put({
        type: 'saveNotice',
        payload: Array.isArray(notices) ? notices : [],
      });
    },
  },
  reducers: {
    saveNotice(state, action) {
      return { 
        ...state,
        notice: action.payload,
      };
    },
  }
}