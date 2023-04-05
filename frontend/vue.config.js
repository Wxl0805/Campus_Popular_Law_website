module.exports = {
    lintOnSave: true,
    devServer: {
        port: 8082,
        host: '127.0.0.1',
        open: true,
        proxy: {
            '/api/': {
                target: 'http://127.0.0.1:3000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/': '/api/'
                }
            }
        },
        disableHostCheck: true
    }
}