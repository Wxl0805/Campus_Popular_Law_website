/*
 * @Author: [吴志远]
 * @Date: 2022-02-17 11:22:48
 * @LastEditors: [吴志远]
 * @LastEditTime: 2022-02-22 16:08:24
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \express_server\src\app.js
 */
const express = require('express')
    // 导入body解析第三方中间件
const bodyParser = require('body-parser')
const multer = require('multer')
const app = express()
const port = 3000

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Access-Token,Authorization");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 使用第三方中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 静态资源服务
app.use(express.static('../public'));
// 处理文件图片上传中间件
app.use(multer({ dest: "../public/useravatar" }).array("image"));

// 使用路由模块化
app.use('/api/login_register', require('./router/login-register'))
app.use('/api/user', require('./router/users'))
app.use('/api/user', require('./router/upload'))
app.use('/api/role', require('./router/roles'))
app.use('/api/department', require('./router/departments'))
app.use('/api/role/authority', require('./router/authority'))

// 前台登录与注册
app.use('/api/front_login_register', require('./router/front-login-register'))
    // 用户信息
app.use('/api/front_user', require('./router/front-users'))
    // 留言
app.use('/api/message', require('./router/message'))


app.listen(port, () => console.log(`server is running at http://127.0.0.1:${port}`))