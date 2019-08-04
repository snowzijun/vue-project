// 记录所有cdn的路径，生产环境使用，可根据生产环境不同切换不同的cdn数据源
module.exports = {
  JS: {
    vue: 'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    vuex: 'https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js',
    vueRouter: 'https://cdn.bootcss.com/vue-router/3.0.7/vue-router.min.js',
    ElementUi: 'https://cdn.bootcss.com/element-ui/2.11.1/index.js',
    axios: 'https://cdn.bootcss.com/axios/0.19.0/axios.min.js'
  },
  CSS: {
    // 因为需要设置皮肤，所以不能使用cdn
    // ElementUi: 'https://cdn.bootcss.com/element-ui/2.11.1/theme-chalk/index.css'
  }
}
