
const success = {
  message: '成功',
  state: 200,
  success: true,
  status: true,
  username: 'admin'
}
const error = {
  message: '账号或密码错误',
  state: 300,
  status: false,
  success: false,
}

const data = {
  username: ['admin', 'panmr'],
  password: '123456'
}

export default {
  'POST /api/login': function (req, res) {
    console.log('mock: POST /api/login')
    setTimeout(() => {res.json(Math.round(Math.random()) === 0 ? success : error);}, 200);
  }
};