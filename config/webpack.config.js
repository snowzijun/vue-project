const path = require('path')
const resolve = dir => path.resolve(__dirname, '../', dir)

module.exports = config => {
  // 通用配置
  // 设置路径别名
  config.resolve.alias
    .set('@', resolve('./src'))
    .set('@views', './src/views')
    .set('@components', './src/components')
    .set('@filters', './src/filters')
    .set('@api', './src/api')

  // 配置 scss 全局变量，不用在使用的每一处再引入变量文件
  // TODO: 打包切换主题可在此处完成
  config.module.rule('scss').oneOfs.store.forEach(item => {
    item
      .use('sass-resources-loader')
      .loader('sass-resources-loader')
      .options({
        resources: resolve(
          `./src/style/themes/${process.env.VUE_APP_THEME}/var.scss`
        )
      })
  })
  // 根据环境不同，执行不同的配置
  if (process.env.NODE_ENV === 'production') {
    require('./webpack.config.prod.js')(config)
  } else {
    require('./webpack.config.dev.js')(config)
  }
}
