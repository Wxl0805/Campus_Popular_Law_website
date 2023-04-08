const express = require('express')
const router = express.Router()
    // 导入数据库连接
const createConnection = require('../config/mysql')
    //导入token和权限验证中间件
const verifyToken = require('../middlewares/verifyTokenAndAuthority')
    // 导入自定义加密中间件
const md5password = require('../middlewares/md5password')
const md5 = require('js-md5')
    // 导入fs
const fs = require('fs')
const { rejects } = require('assert')

// 查询所有用户
router.get('/queryAll', verifyToken, (req, res) => {
    // 创建数据库连接查询
    createConnection(res, `SELECT * from front_users`, null, function(result) {
        if (result !== false) {
            res.send({
                code: '0000000',
                message: '请求成功',
                data: result
            });
        }
    });
})

// 分页条件查询用户
router.post('/page', verifyToken, (req, res) => {
    let data = req.body;
    // 获取分页条件
    let pageNo = Number(data.pageNo);
    let pageSize = Number(data.pageSize);
    // 当前页面都一条索引,数据库第一条数据是零
    let currentFirstIndex = (pageNo - 1) * pageSize;

    // 非学校管理员，只能查看本班信息
    if (data.aditionalInfo.roleId !== 3001) {
        createConnection(res, `SELECT className from classes WHERE classId = ${data.aditionalInfo.classId}`, null, function(result2) {
            if (result2 !== false) {
                let sql1;
                if (!data.status) {
                    sql1 = `SELECT * from front_users WHERE (userId LIKE '%${data.searchInfo}%' OR userName LIKE '%${data.searchInfo}%' OR className LIKE '%${data.searchInfo}%') AND className = ${result2[0].className}`;
                } else {
                    sql1 = `SELECT * from front_users WHERE (userId LIKE '%${data.searchInfo}%' OR userName LIKE '%${data.searchInfo}%' OR className LIKE '%${data.searchInfo}%') AND status=${data.status} AND className = ${result2[0].className}`;
                }
                createConnection(res, sql1, null, function(result1) {
                    if (result1 !== false) {
                        res.send({
                            code: '0000000',
                            message: '请求成功',
                            data: {
                                total: result1.length,
                                pageNo,
                                pageSize,
                                dataList: result1.slice(currentFirstIndex, currentFirstIndex + pageSize)
                            }
                        });
                    }
                })
            }
        })
    } else {
        // 查询sql语句  LIMIT分页截取
        let sql;
        if (!data.status) {
            sql = `SELECT * from front_users WHERE userId LIKE '%${data.searchInfo}%' OR userName LIKE '%${data.searchInfo}%' OR className LIKE '%${data.searchInfo}%'`;
        } else {
            sql = `SELECT * from front_users WHERE (userId LIKE '%${data.searchInfo}%' OR userName LIKE '%${data.searchInfo}%' OR className LIKE '%${data.searchInfo}%') AND status=${data.status}`;
        }
        // 创建数据库连接查询
        createConnection(res, sql, null, function(result) {
            if (result !== false) {
                //学校管理员查看全部学生教师信息
                res.send({
                    code: '0000000',
                    message: '请求成功',
                    data: {
                        total: result.length,
                        pageNo,
                        pageSize,
                        dataList: result.slice(currentFirstIndex, currentFirstIndex + pageSize)
                    }
                });
            }
        });
    }
})

// 新建用户
router.post('/create', verifyToken, md5password, (req, res) => {
    let data = req.body;
    // 数据库操作先检出是否已经存在当前帐号
    createConnection(res, `SELECT * from front_users WHERE userId='${data.userId}'`, null, function(result1) {
        if (result1 !== false) {
            if (result1.length > 0) { //用户名存在时
                res.send({
                    code: '1000002',
                    message: '用户已存在',
                });
            } else { //当用户不存在，往数据库插入
                createConnection(res, `SELECT className from classes WHERE classId = ${data.classId}`, null, function(result3) {
                    if (result3 !== false) {
                        // 插入的sql语句
                        const addSql = 'INSERT INTO front_users(userId,userName,password,phone,email,identity,className,status) VALUES(?,?,?,?,?,?,?,?)';
                        // 插入的值
                        const addSqlParams = [data.userId, data.userName, data.password, data.phone, data.email, data.identity, result3[0].className, data.status];
                        createConnection(res, addSql, addSqlParams, function(result2) {
                            if (result2 !== false) {
                                createConnection(res, `UPDATE classes SET member = member + 1 WHERE classId = ${data.classId}`);
                                res.send({
                                    code: '0000000',
                                    message: '请求成功',
                                });
                            }
                        });
                    }
                })
            }
        }
    });
})

// 修改用户
router.post('/modify', verifyToken, (req, res) => {
    let data = req.body;
    createConnection(res, `SELECT className from classes WHERE classId = ${data.classId}`, null, function(result3) {
        // sql语句
        const sql = 'UPDATE front_users SET userId=?,userName=?,phone=?,email=?,identity=?,className=? WHERE userId = ?';
        // 插入的值
        // 防止插入字符串值出现bug
        if (data.identity == '教师') {
            data.identity = 0;
        } else if (data.identity == '学生') {
            data.identity = 1;
        }
        const sqlParams = [data.userId, data.userName, data.phone, data.email, data.identity, result3[0].className, data.olduserId];
        // 创建数据库连接查询
        createConnection(res, sql, sqlParams, function(result) {
            if (result !== false) {
                return new Promise(function(resolve, rejects) {
                    createConnection(res, `UPDATE classes SET member = member + 1 WHERE classId = ${data.classId}`);
                    resolve();
                }).then(function() {
                    createConnection(res, `UPDATE classes SET member = member - 1 WHERE className = '${data.oldclassName}'`);
                }).then(function() {
                    res.send({
                        code: '0000000',
                        message: '请求成功',
                    });
                })
            }
        })
    })
})

// 修改用户密码
router.post('/password/modify', verifyToken, md5password, (req, res) => {
    let data = req.body
        // 数据库操作先检出是否已经存在当前帐号
    createConnection(res, `SELECT * from front_users WHERE userId='${data.userId}'`, null, function(result1) {
        if (result1 !== false) {
            if (result1.length === 0) { //用户id不存在时
                res.send({
                    code: '1000005',
                    message: '当前用户id不存在',
                });
            } else {
                if (!data.oldpassword && !data.password) { //重置密码
                    // sql语句
                    const sql = 'UPDATE front_users SET password=? WHERE userId = ?';
                    let password = '123456';
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
                }
            }
        }
    })
})

// 修改用户状态
router.get('/status/modify/:userId', verifyToken, (req, res) => {
    if (!req.params.userId) {
        res.send({
            code: '1000006',
            message: '用户id不能为空',
        });
        return;
    }
    // 数据库操作先检出是否已经存在当前帐号
    createConnection(res, `SELECT * from front_users WHERE userId='${req.params.userId}'`, null, function(result1) {
        if (result1 !== false) {
            if (result1.length === 0) { //用户id不存在时
                res.send({
                    code: '1000005',
                    message: '当前用户id不存在',
                });
            } else {
                // sql语句
                const sql = 'UPDATE front_users SET status=? WHERE userId = ?';
                // 插入的值
                let status = result1[0].status === 1 ? 2 : 1;
                const sqlParams = [status, req.params.userId];
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
    })
})

// 查找对应班级
router.get('/queryClass/:classId', verifyToken, (req, res) => {
    // 创建数据库连接查询
    if (req.params.classId == 4001) { //学校管理员，返回所有班级（不包括Root）
        createConnection(res, `SELECT * from classes`, null, function(result1) {
            result1 = result1.filter((item) => {
                return item.classId !== 4001;
            })
            res.send({
                code: '0000000',
                message: '请求成功',
                data: result1
            });
        })
    } else {
        createConnection(res, `SELECT * from classes WHERE classId = ${req.params.classId}`, null, function(result2) {
            res.send({
                code: '0000000',
                message: '请求成功',
                data: result2
            });
        })
    }
})

// 导出
module.exports = router;