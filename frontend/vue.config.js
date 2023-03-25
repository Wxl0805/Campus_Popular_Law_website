/*
 * @Author: [吴志远]
 * @Date: 2022-02-19 10:08:03
 * @LastEditors: [吴志远]
 * @LastEditTime: 2022-02-19 10:09:39
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \frontend\vue.config.js
 */
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
}