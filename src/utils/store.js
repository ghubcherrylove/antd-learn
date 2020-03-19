// 定义资源接口地址、资源编码、认证服务等
let API_BASE
if (process.env.NODE_ENV == 'development') {
  API_BASE = window.location.protocol + '//' + window.location.hostname + ':8080'
} else if (process.env.NODE_ENV == 'testing') {
  API_BASE = 'http://test.com:8080'
} else if (process.env.NODE_ENV == 'production') {
  if (window.location.protocol == 'http:') {
    API_BASE = 'http://production.com:8080'
  } else {
    API_BASE = 'https://production.com:8080'
  }
}

const STORE = {
  DICT: {
    SEX: {'1': '男', '2': '女'}
  }
}
export {API_BASE, STORE}