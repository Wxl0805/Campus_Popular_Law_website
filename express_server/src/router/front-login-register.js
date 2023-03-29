const express = require('express')
const router = express.Router()
const md5 = require('js-md5')
    // 导入自定义加密中间件
const md5password = require('../middlewares/md5password')
    // 导入数据库连接
const createConnection = require('../config/mysql')
    // 导入jwt
const jwt = require('jsonwebtoken')
    // 导入fs
const fs = require('fs')

// 注册接口
router.post('/register', (req, res) => {
    let data = req.body;
    // 判断userId是否正确
    const idreg = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])\d{3}[0-9xX]$/;
    if (!idreg.test(data.userId)) {
        res.send({
            code: '7',
            message: '身份证号错误',
        });
        return;
    }
    if (!data.userName) {
        res.send({
            code: '7',
            message: '姓名不能为空',
        });
        return;
    }
    const passreg = /^([0-9]|[a-zA-Z]){6,16}$/;
    if (data.password && !passreg.test(data.password)) {
        res.send({
            code: '7',
            message: '密码不能为空或密码格式错误',
        });
        return;
    }
    let password = md5(data.password + md5(data.password).split(10, 10));
    data.password = password;
    if (data.status !== 0 && data.status !== 1) {
        res.send({
            code: '7',
            message: '状态错误',
        });
        return;
    }
    if (data.identity !== 0 && data.identity !== 1) {
        res.send({
            code: '7',
            message: '角色错误',
        });
        return;
    }
    const telreg = /^1[3-9]\d{9}$/;
    if (data.phone && !telreg.test(data.phone)) {
        res.send({
            code: '7',
            message: '手机号格式错误',
        });
        return;
    }
    const emailreg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(com|cn|net)$/;
    if (data.email && !emailreg.test(data.email)) {
        res.send({
            code: '7',
            message: '邮箱格式错误',
        });
        return;
    }
    // 数据库操作先检出是否已经存在当前帐号
    createConnection(res, `SELECT * from front_users WHERE userId='${data.userId}'`, null, function(result1) {
        if (result1 !== false) {
            if (result1.length > 0) { //用户存在时
                res.send({
                    code: '7',
                    message: '该用户已被注册',
                });
            } else { //当用户不存在，往数据库插入
                // 插入的sql语句
                const addSql = 'INSERT INTO front_users(userId,userName,password,status,identity,phone,email) VALUES(?,?,?,?,?,?,?)';
                // 插入的值
                const addSqlParams = [data.userId, data.userName, data.password, data.status, data.identity, data.phone, data.email];
                createConnection(res, addSql, addSqlParams, function(result2) {
                    if (result2 !== false) {
                        res.send({
                            code: '0',
                            message: '注册成功',
                        });
                    }
                });
            }
        }
    });
})

// 登录接口
router.post('/login', md5password, (req, res) => {
        let data = req.body;
        // 数据库操作,做账号密码判断
        createConnection(res, `SELECT * from front_users WHERE userId='${data.userId}' AND userName='${data.userName}' AND password='${data.password}' AND identity='${data.identity}'`, null, function(result) {
            if (result !== false) {
                if (result.length > 0) { //用户名密码存在时
                    // 判断当前账号是否激活
                    if (result[0].status === 1) {
                        res.send({
                            code: '4',
                            message: '该用户已被禁用',
                        });
                        return;
                    }
                    // 读取文件中定义的jwt_secret
                    const jwt_secret = fs.readFileSync('./.env', 'utf-8');
                    // 发布token
                    let token = jwt.sign({ userId: result[0].userId, userName: result[0].userName }, jwt_secret, { expiresIn: '10d' });
                    delete result[0].password;
                    res.json({
                        code: '0',
                        message: '请求成功',
                        token: token,
                        data: result[0]
                    });
                } else { //用户名或密码错误
                    res.send({
                        code: '7',
                        message: '用户不存在或密码错误',
                    });
                }
            }
        });
    })
    // 导出
module.exports = router;