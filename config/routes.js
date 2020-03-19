export default [
  {
    path: '/login',
    component: 'User/Login'
  },{
  path: '/',
  component: '../layouts/index',
  routes: [
    {
      path: '/',
      component: 'HelloWorld'
    },
    {
      path: '/english',
      component: './English'
    },
    {
      path: '/zhCn',
      component: './English'
    },
    {
      path: '/cards',
      component: './cards/index'
    },
    {
      path: '/puzzlecards',
      component: './Puzzlecards'
    },
    {
      path: '/helloworld',
      component: 'HelloWorld'
    },
    {
      path: '/dashboard',
      routes: [
        { path: '/dashboard/analysis', component: 'Dashboard/Analysis' },
        { path: '/dashboard/monitor', component: 'Dashboard/Monitor' },
        { path: '/dashboard/workplace', component: 'Dashboard/Workplace' }
      ]
    },
    {
      name: 'account',
      icon: 'user',
      path: '/account',
      routes: [
        {
          path: '/account/center',
          name: 'center',
          component: './Account/Center/Center',
          routes: [
            {
              path: '/account/center',
              redirect: '/account/center/articles',
            },
            // {
            //   path: '/account/center/articles',
            //   component: './Account/Center/Articles',
            // },
            // { 
            //   path: '/account/center/applications',
            //   component: './Account/Center/Applications',
            // },
            // {
            //   path: '/account/center/projects',
            //   component: './Account/Center/Projects',
            // },
          ],
        },
        {
          path: '/account/settings',
          name: 'settings',
          component: './Account/Settings/Info',
          routes: [
            {
              path: '/account/settings',
              redirect: '/account/settings/base',
            },
            {
              path: '/account/settings/base',
              component: './Account/Settings/BaseView',
            },
            // {
            //   path: '/account/settings/security',
            //   component: './Account/Settings/SecurityView',
            // },
            // {
            //   path: '/account/settings/binding',
            //   component: './Account/Settings/BindingView',
            // },
            // {
            //   path: '/account/settings/notification',
            //   component: './Account/Settings/NotificationView',
            // },
          ],
        },
      ],
    },
    {
      path: 'tabs',
      component: './MyTabs'
    },
    {
      path: 'tree',
      component: './MyTree'
    },
    {
      path: '404',
      component: './404'
    }
  ]
}]