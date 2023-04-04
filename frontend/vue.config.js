module.exports = {
    lintOnSave: false,
    devServer: {
        port: 8082,
        host: '0.0.0.0',
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
        }
    }
};