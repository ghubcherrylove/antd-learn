const random_jokes = [
  {
    setup: '潘明任很帅?',
    punchline: 'Inheritance',
  },
  {
    setup: '潘明任是真的帅...',
    punchline: "You must first understand what recursion is",
  },
  {
    setup: '潘明任帅出新高度。哈哈',
    punchline: 'A satisfactory',
  },
]

let random_joke_call_count = 0;

export default {
  'get /dev/random_joke': function (req, res) {
    const responseObj = random_jokes[random_joke_call_count % random_jokes.length];
    random_joke_call_count += 1;
    setTimeout(() => {
      res.json(responseObj);
    }, 1000)
  },
  // 'get /dev/random_joke': function (req, res) { // 模拟http请求错误
  //   res.status(500);
  //   res.json({state:500, message: '潘明任 模拟错误的http请求'});
  // },
};