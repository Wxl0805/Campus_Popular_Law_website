const express = require('express')
const router = express.Router()
    // 导入数据库连接
const createConnection = require('../config/mysql')
    //导入token和权限验证中间件
const verifyToken = require('../middlewares/verifyTokenAndAuthority')

// 查询所有部门
router.get('/queryAll', verifyToken, (req, res) => {
    // 创建数据库连接查询
    createConnection(res, `SELECT * from departments`, null, function(result) {
        if (result !== false) {
            res.send({
                code: '0000000',
                message: '请求成功',
                data: result
            });
        }
    });
})

// 分页条件查询部门
router.post('/page', verifyToken, (req, res) => {
    let data = req.body;
    // 获取分页条件
    let pageNo = Number(data.pageNo);
    let pageSize = Number(data.pageSize);
    // 当前页面都一条索引,数据库第一条数据是零
    let currentFirstIndex = (pageNo - 1) * pageSize;
    // 查询sql语句  LIMIT分页截取
    let sql = `SELECT * from departments WHERE departmentName LIKE '%${data.departmentName}%'`;
    // 创建数据库连接查询
    createConnection(res, sql, null, function(result) {
        if (result !== false) {
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
})

// 新建部门
router.post('/create', verifyToken, (req, res) => {
    let data = req.body;
    // 数据库操作先检出是否已经存在当前部门名称
    createConnection(res, `SELECT * from departments WHERE departmentName='${data.departmentName}'`, null, function(result1) {
        if (result1 !== false) {
            if (result1.length > 0) { //部门名称存在时
                res.send({
                    code: '1000002',
                    message: '部门名称已存在',
                });
            } else { //当部门名称不存在，往数据库插入
                // 插入的sql语句
                const addSql = 'INSERT INTO departments(departmentName,director,email,departmentDesc) VALUES(?,?,?,?)';
                // 插入的值
                const addSqlParams = [data.departmentName, data.director, data.email, data.departmentDesc];
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

// 修改部门
router.post('/modify', verifyToken, (req, res) => {
    let data = req.body;
    // 数据库操作先检出是否已经存在当前部门
    createConnection(res, `SELECT * from departments WHERE departmentId='${data.departmentId}'`, null, function(result1) {
        if (result1 !== false) {
            if (result1.length === 0) { //部门id不存在时
                res.send({
                    code: '1000005',
                    message: '当前部门id不存在',
                });
            } else {
                createConnection(res, `SELECT * from departments WHERE departmentName='${data.departmentName}'`, null, function(result2) {
                    if (result2 !== false) {
                        if (result1[0].departmentName !== data.departmentName && result2.length > 0) {
                            res.send({
                                code: '1000002',
                                message: '部门名称已存在',
                            });
                            return;
                        }
                        // sql语句
                        const sql = 'UPDATE departments SET departmentName=?,director=?,email=?,departmentDesc=? WHERE departmentId = ?';
                        // 插入的值
                        const sqlParams = [data.departmentName, data.director, data.email, data.departmentDesc, data.departmentId];
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

// 删除部门
router.delete('/delete/:ids', verifyToken, (req, res) => {
    let ids = JSON.parse(req.params.ids);
    if (ids.length === 0) {
        res.send({
            code: '1000006',
            message: '部门id不能为空',
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
    createConnection(res, `SELECT * FROM departments WHERE departmentId in ${str}`, null, function(result1) {
        if (result1 !== false) {
            if (result1.length !== ids.length) {
                res.send({
                    code: '1000005',
                    message: '部门id不存在',
                });
            } else {
                let sql = `DELETE FROM departments WHERE departmentId in ${str}`
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