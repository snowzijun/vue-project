import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// TODO: 考虑首页 / 重定向问题
const routes = []

// 动态读取modules下面的文件，添加到路由中,防止多人修改文件导致代码冲突
const files = require.context('./modules', false, /\.js$/)
files.keys().forEach(key => {
  const file = files(key).default
  // 根据导出的内容判断是否数组，如果数组需使用扩展运算符
  if (Array.isArray(file)) {
    routes.push(...file)
  } else {
    routes.push(file)
  }
})

const router = new VueRouter({
  routes: [
    ...routes,
    // 404页面处理，对于无权限的页面均跳转到404页面
    {
      path: '/404',
      component: () => import('../views/404')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ],
  // 页面滚动行为
  scrollBehavior(/* to, from, savedPosition */) {
    return {
      x: 0,
      y: 0
    }
  }
})

// 前置钩子
router.beforeEach((to, from, next) => {
  // TODO: 判断 to的页面是否有权限，如果没有权限，则next('/404')
  next()
})

router.afterEach((/* to, from */) => {})

export default router
