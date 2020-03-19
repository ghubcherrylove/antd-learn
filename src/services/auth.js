import request from '../utils/request'; // request 是 demo 项目脚手架中提供的一个做 http 请求的方法，是对于 fetch 的封装，返回 Promise
import { API_BASE } from '../utils/store'

const generateAuth =  function () { // 生成token，这里目前用当前时间戳来测试，后期可根据实际情况来修改
  return 'pmr ' + Date.now();
}

export {generateAuth}