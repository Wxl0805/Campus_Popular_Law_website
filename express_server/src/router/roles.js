const express = require('express')
const router = express.Router()
    // 导入数据库连接
const createConnection = require('../config/mysql')
    //导入token验证中间件
const verifyToken = require('../middlewares/verifyTokenAndAuthority')

// 查询所有角色
router.get('/queryAll', verifyToken, (req, res) => {
    // 创建数据库连接查询
    createConnection(res, `SELECT * from roles`, null, function(result) {
        if (result !== false) {
            res.send({
                code: '0000000',
                message: '请求成功',
                data: result
            });
        }
    });
})

// 新建角色
router.post('/create', verifyToken, (req, res) => {
    let data = req.body;
    // 数据库操作先检出是否已经存在当前角色名称
    createConnection(res, `SELECT * from roles WHERE roleName='${data.roleName}'`, null, function(result1) {
        if (result1 !== false) {
            if (result1.length > 0) { //角色名称存在时
                res.send({
                    code: '1000002',
                    message: '角色名称已存在',
                });
            } else { //当角色名称不存在，往数据库插入
                // 插入的sql语句
                const addSql = 'INSERT INTO roles(roleName,roleDesc) VALUES(?,?)';
                // 插入的值
                const addSqlParams = [data.roleName, data.roleDesc];
                createConnection(res, addSql, addSqlParams, function(result2) {
                    if (result2 !== false) {
                        res.send({
                            code: '0000000',
                            message: '请求成功',
                        });
                    }
                });
            }
        }
    });
})

// 修改角色
router.post('/modify', verifyToken, (req, res) => {
    let data = req.body;
    // 数据库操作先检出是否已经存在当前帐号
    createConnection(res, `SELECT * from roles WHERE roleId='${data.roleId}'`, null, function(result1) {
        if (result1 !== false) {
            if (result1.length === 0) { //用户id不存在时
                res.send({
                    code: '1000005',
                    message: '当角色id不存在',
                });
            } else {
                createConnection(res, `SELECT * from roles WHERE roleName='${data.roleName}'`, null, function(result2) {
                    if (result2 !== false) {
                        if (result1[0].roleName !== data.roleName && result2.length > 0) {
                            res.send({
                                code: '1000002',
                                message: '角色名称已存在',
                            });
                            return;
                        }
                        // sql语句
                        const sql = 'UPDATE roles SET roleName=?,roleDesc=? WHERE roleId = ?';
                        // 插入的值
                        const sqlParams = [data.roleName, data.roleDesc, data.roleId];
                        // 创建数据库连接查询
                        createConnection(res, sql, sqlParams, function(result3) {
                            if (result3 !== false) {
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
    })
})

// 删除角色
router.delete('/delete/:ids', verifyToken, (req, res) => {
    let ids = JSON.parse(req.params.ids);
    if (ids.length === 0) {
        res.send({
            code: '1000006',
            message: '角色id不能为空',
        });
    }
    let str = '('
    ids.forEach((item, i) => {
        if (i == ids.length - 1) {
            str = str + item;
        } else {
            str = str + item + ', '
        }
    })
    str += ')';
    createConnection(res, `SELECT * FROM roles WHERE roleId in ${str}`, null, function(result1) {
        if (result1 !== false) {
            if (result1.length !== ids.length) {
                res.send({
                    code: '1000005',
                    message: '角色id不存在',
                });
            } else {
                let sql = `DELETE FROM roles WHERE roleId in ${str}`
                    // 创建数据库连接查询
                createConnection(res, sql, null, function(result2) {
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

// 导出
module.exports = router;