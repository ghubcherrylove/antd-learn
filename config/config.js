import routes from './routes'
import path from 'path';
export default {
  plugins: [
    ['umi-plugin-react', {
      // 这里暂时还没有添加配置，该插件还不会有作用，我们会在后面的课程按照需求打开相应的配置
      antd: true,
      dva: true,
      locale: {
        enable: true
      }
    }]
  ],
  routes,
  alias: {
    '@': path.resolve(__dirname, 'src')
  },
  publicPath: './',
  // 加入 theme 定义
  theme: {
    "@primary-color": "#30b767", // 绿色
  }
};