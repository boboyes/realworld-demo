/**
 * Nuxt.js自定义配置 
 **/
module.exports = {
  router: {
      linkActiveClass: 'active',  //路由跳转激活样式类名
      extendRoutes(routes, resolve) {
          //清除默认路由配置
          routes.splice(0)
          routes.push(...[
              {
                  // name:'/',
                  path:'/',
                  component:resolve(__dirname,'pages/layout/'),
                  children:[
                    {
                      path: '',  //默认子路由
                      name: 'home',
                      component: resolve(__dirname, 'pages/home/')
                    },
                    {
                      path: '/login',  
                      name: 'login',
                      component: resolve(__dirname, 'pages/login/')
                    },
                    {
                      path: '/register',  
                      name: 'register',
                      component: resolve(__dirname, 'pages/login/')
                    },
                    {
                      path: '/profile/:username',  
                      name: 'profile',
                      component: resolve(__dirname, 'pages/profile/')
                    },
                    {
                      path: '/profile/:username/:favorited',  
                      name: 'profilef',
                      component: resolve(__dirname, 'pages/profile/')
                    },
                    {
                      path: '/settings', 
                      name: 'settings',
                      component: resolve(__dirname, 'pages/settings/')
                    },
                    {
                      path: '/editor', 
                      name: 'editor',
                      component: resolve(__dirname, 'pages/editor/')
                    },
                    {
                      path: '/article/:slug',  
                      name: 'article',
                      component: resolve(__dirname, 'pages/article/')
                    }
                  ]
              }
          ])
      }
  },
  server: {
    host:'0.0.0.0',
    port: 3000
  },
  //注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]
}