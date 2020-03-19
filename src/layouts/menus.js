
export default [
  {key: '/helloworld', to: '/helloworld', iconType: 'pie-chart', text: 'Helloworld'},
  {key: '/cards', to: '/cards', iconType: 'pie-chart', text: 'Cards'},
  {key: '/dashboard', iconType: 'dashboard', text: 'Dashboard', subMenu: [
    {key: '/dashboard/analysis', to: '/dashboard/analysis',  text: '分析页'},
    {key: '/dashboard/monitor', to: '/dashboard/monitor',  text: '监控页'},
    {key: '/dashboard/workplace', to: '/dashboard/workplace',  text: '工作台'}
  ]},
  {key: '/account', iconType: 'user', text: '设置中心', subMenu: [
    {key: '/account/center', to: '/account/center',  text: '个人中心'},
    {key: '/account/settings', to: '/account/settings',  text: '个人设置'},
  ]}
]