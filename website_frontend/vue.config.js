module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/filseclab-demo/' : '/',
    devServer: {
        port: 8081,
        host: '0.0.0.0',
        open: true,

        proxy: {
            '/api': { //这里最好有一个 /
                target: 'http://127.0.0.1:8080', // 后台接口域名
                ws: true, //如果要代理 websockets，配置这个参数
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, //是否跨域
                pathRewrite: { //配置重写规则
                    '^/api': ''
                }
            }
        }
    }
}