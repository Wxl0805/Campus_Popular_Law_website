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
app.use('/api/article', require('./router/uploadArticle'))
app.use('/api/role', require('./router/roles'))
app.use('/api/class', require('./router/classes'))
app.use('/api/role/authority', require('./router/authority'))
app.use('/api/stuteacher', require('./router/stuteacher'))
app.use('/api/admin_article', require('./router/backend-articles'))

// 前台登录与注册
app.use('/api/front_login_register', require('./router/front-login-register'))
    // 用户信息
app.use('/api/front_user', require('./router/front-users'))
    // 留言
app.use('/api/message', require('./router/message'))
    // 文章
app.use('/api/article', require('./router/front-articles'))

app.listen(port, () => console.log(`server is running at http://127.0.0.1:${port}`))