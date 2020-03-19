import request from '../utils/request'; // request 是 demo 项目脚手架中提供的一个做 http 请求的方法，是对于 fetch 的封装，返回 Promise
import { API_BASE } from '../utils/store'

export async function removeCards(options) {
  return request('/api/removeCards', {...options, method: 'POST'});
}

export async function queryList(options) {
  // return request(API_BASE + '/api/cardsList', {...options, method: 'POST'}); // 这里是配置协议域名端口的，目前这里不打开，后期可根据是否是开发环境，生产环境等配置
  return request('/api/cardsList', {...options, method: 'POST'});
}

// 以下是第二种导入导出的方式写法
// export default {
//   async removeCards(options) {
//     return request('/api/removeCards', {...options, method: 'POST'});
//   },
//   async queryList(options) {
//     return request('/api/cardsList', {...options, method: 'POST'});
//   }
// }
// import CardsService from '../services/cards' // 这是另一个文件导入的方式