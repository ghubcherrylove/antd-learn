import {login} from '../services/login';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'login',
  state: {
    status: true, // true 表示为默认不显示错误提示<Alert />   false就显示错误提示框
    username: sessionStorage.username || ''
  },
  effects: { 
    *login({ payload }, { call, put }) {
      // const result = yield call(login, {metnod: 'POST', body: payload});
      console.log('--effects result--')
      sessionStorage.loginStatus = true
      yield put(routerRedux.replace('/cards'));
      // if (result.success) {
      //   // 登录成功
      //   sessionStorage.loginStatus = true // 这里是判断是否登录了，如果没有登录这里是为false，在浏览器地址上强行输入路由地址也是不行的，是会重定向到/login  登录页的
      //   yield put({ type: 'login_reducers', payload: result });
      //   sessionStorage.username = result.username;
      //   document.title = 'cards';
      //   yield put(routerRedux.replace('/cards'));
      // } else {
      //   // 登录失败
      //   yield put({ type: 'login_reducers', payload: result });
      // }
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