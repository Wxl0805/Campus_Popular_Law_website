module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/filseclab-demo/' : '/',
    devServer: {
        port: 8081,
        host: '127.0.0.1',
        open: true,

        proxy: {
            '/api': { //这里最好有一个 /
                target: 'http://127.0.0.1:3000', // 后台接口域名
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, //是否跨域
                pathRewrite: { //配置重写规则
                    '^/api': ''
                }
            }
        }
    }
}