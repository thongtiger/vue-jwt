// vue.config.js
module.exports = {
    // options...
    publicPath: '/',
    assetsDir: 'static',
    outputDir: 'app',
    crossorigin:"anonymous",
    devServer: {
        //  https: true ,
        port: 8000,
          proxy: {
            '^/api': {
              target: 'http://localhost:3000',
              ws: true,
              changeOrigin: true
            },
            '^/foo': {
              target: 'http://localhost:3000'
            }
          }
      }
  }