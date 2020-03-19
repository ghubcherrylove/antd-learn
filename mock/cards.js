const result = {
  message: '成功',
  state: 200,
  success: true,
  list: [
    {id: '1', name: 'pmr_mock', sex: '1', desc: 'pmr是一个帅哥', url: 'https://umijs.org'},
    {id: '2', name: 'pantty_mock', sex: '1', desc: '这是小潘的英文名', url: 'baidu.com'},
    {id: '3', name: '明烟雨任_mock', sex: '2', desc: '这是小任的笔名', url: 'baidu.com'}
  ]
}

export default {
  'POST /api/cardsList': function (req, res) {
    setTimeout(() => {
      res.json(result);
    }, 200)
  },
  'POST /api/removeCards': function (req, res) {
    const result = {
      message: '删除成功',
      state: 200,
      success: true,
    }
    setTimeout(() => {
      res.json(result);
    }, 100)
  }
};