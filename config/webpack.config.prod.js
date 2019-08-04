const cdns = require('./cdn')
module.exports = config => {
  // 生产环境不打包的组件
  config
    .externals({
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      axios: 'axios',
      vuex: 'Vuex'
    })
    .plugin('html')
    .tap(args => {
      args.forEach(arg => {
        arg.cdns = {
          JS: Object.values(cdns.JS),
          CSS: Object.values(cdns.CSS)
        }
      })
      return args
    })
}
