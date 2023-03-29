const express = require('express')
const router = express.Router()
    // 导入数据库连接
const createConnection = require('../config/mysql')
    //导入token和权限验证中间件
const verifyToken = require('../middlewares/frontverifyTokenAndAuthority')
    // 导入自定义加密中间件
const md5password = require('../middlewares/md5password')
const md5 = require('js-md5')
    // 导入fs
const fs = require('fs')


// 通过id查询用户
router.get('/query/:id', verifyToken, (req, res) => {
    // 创建数据库连接查询
    createConnection(res, `SELECT * from front_users WHERE userId='${req.params.id}'`, null, function(result) {
        if (result !== false) {
            if (result.length > 0) {
                delete result[0].password;
                res.send({
                    code: '0',
                    message: '请求成功',
                    data: result[0]
                });
            } else {
                res.send({
                    code: '7',
                    message: '用户不存在',
                });
            }
        }
    });
})

// 修改用户
router.post('/modify', verifyToken, (req, res) => {
    let data = req.body;
    // 验证手机号
    const telreg = /^1[3-9]\d{9}$/;
    // 验证邮箱
    const emailreg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(com|cn|net)$/;
    if (data.phone && !telreg.test(data.phone)) {
        res.send({
            code: '7',
            message: '手机号格式错误',
        });
        return;
    }
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
            if (result1.length === 0) { //用户id不存在时
                res.send({
                    code: '7',
                    message: '用户不存在',
                });
            } else {
                // sql语句
                const sql = 'UPDATE front_users SET phone=?,email=? WHERE userId = ?';
                // 插入的值
                const sqlParams = [data.phone, data.email, data.userId];
                // 创建数据库连接查询
                createConnection(res, sql, sqlParams, function(result) {
                    if (result !== false) {
                        res.send({
                            code: '0',
                            message: '请求成功',
                        });
                    }
                });
            }
        }
    })
})

// 修改用户密码
router.post('/password/modify', verifyToken, md5password, (req, res) => {
    let data = req.body
        // 数据库操作先检出是否已经存在当前帐号
    createConnection(res, `SELECT * from users WHERE userId='${data.userId}'`, null, function(result1) {
        if (result1 !== false) {
            if (result1.length === 0) { //用户id不存在时
                res.send({
                    code: '1000005',
                    message: '当前用户id不存在',
                });
            } else {
                if (!data.oldpassword && !data.password) { //重置密码
                    // sql语句
                    const sql = 'UPDATE users SET password=? WHERE userId = ?';
                    let password = md5(result1[0].userName + '123456');
                    // 插入的值
                    const sqlParams = [md5(password + md5(password).split(10, 10)), data.userId];
                    // 创建数据库连接查询
                    createConnection(res, sql, sqlParams, function(result) {
                        if (result !== false) {
                            res.send({
                                code: '0000000',
                                message: '请求成功',
                            });
                        }
                    });
                } else { // 修改密码
                    if (data.oldpassword !== result1[0].password) {
                        res.send({
                            code: '1000007',
                            message: '原密码错误',
                        });
                        return;
                    }
                    // sql语句
                    const sql = 'UPDATE users SET password=? WHERE userId = ?';
                    // 插入的值
                    const sqlParams = [data.password, data.userId];
                    // 创建数据库连接查询
                    createConnection(res, sql, sqlParams, function(result2) {
                        if (result2 !== false) {
                            res.send({
                                code: '0000000',
                                message: '请求成功',
                            });
                        }
                    });
                }
            }
        }
    })
})

// 导出
module.exports = router;