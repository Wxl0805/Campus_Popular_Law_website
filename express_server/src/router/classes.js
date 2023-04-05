const express = require('express')
const router = express.Router()
    // 导入数据库连接
const createConnection = require('../config/mysql')
    //导入token和权限验证中间件
const verifyToken = require('../middlewares/verifyTokenAndAuthority')

// 查询所有班级
router.get('/queryAll', verifyToken, (req, res) => {
    // 创建数据库连接查询
    createConnection(res, `SELECT * from classes`, null, function(result) {
        if (result !== false) {
            res.send({
                code: '0000000',
                message: '请求成功',
                data: result
            });
        }
    });
})

// 分页条件查询班级
router.post('/page', verifyToken, (req, res) => {
    let data = req.body;
    // 获取分页条件
    let pageNo = Number(data.pageNo);
    let pageSize = Number(data.pageSize);
    // 当前页面都一条索引,数据库第一条数据是零
    let currentFirstIndex = (pageNo - 1) * pageSize;
    // 查询sql语句  LIMIT分页截取
    let sql = `SELECT * from classes WHERE className LIKE '%${data.className}%'`;
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

// 新建班级
router.post('/create', verifyToken, (req, res) => {
    let data = req.body;
    // 数据库操作先检出是否已经存在当前班级名称
    createConnection(res, `SELECT * from classes WHERE className='${data.className}'`, null, function(result1) {
        if (result1 !== false) {
            if (result1.length > 0) { //班级名称存在时
                res.send({
                    code: '1000002',
                    message: '班级名称已存在',
                });
            } else { //当班级名称不存在，往数据库插入
                // 插入的sql语句
                const addSql = 'INSERT INTO classes(className,director,email,classDesc) VALUES(?,?,?,?)';
                // 插入的值
                const addSqlParams = [data.className, data.director, data.email, data.classDesc];
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

// 修改班级
router.post('/modify', verifyToken, (req, res) => {
    let data = req.body;
    // 数据库操作先检出是否已经存在当前班级
    createConnection(res, `SELECT * from classes WHERE classId='${data.classId}'`, null, function(result1) {
        if (result1 !== false) {
            if (result1.length === 0) { //班级id不存在时
                res.send({
                    code: '1000005',
                    message: '当前班级id不存在',
                });
            } else {
                createConnection(res, `SELECT * from classes WHERE className='${data.className}'`, null, function(result2) {
                    if (result2 !== false) {
                        if (result1[0].className !== data.className && result2.length > 0) {
                            res.send({
                                code: '1000002',
                                message: '班级名称已存在',
                            });
                            return;
                        }
                        // sql语句
                        const sql = 'UPDATE classes SET className=?,director=?,email=?,classDesc=? WHERE classId = ?';
                        // 插入的值
                        const sqlParams = [data.className, data.director, data.email, data.classDesc, data.classId];
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

// 删除班级
router.delete('/delete/:ids', verifyToken, (req, res) => {
    let ids = JSON.parse(req.params.ids);
    if (ids.length === 0) {
        res.send({
            code: '1000006',
            message: '班级id不能为空',
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
    createConnection(res, `SELECT * FROM classes WHERE classId in ${str}`, null, function(result1) {
        if (result1 !== false) {
            if (result1.length !== ids.length) {
                res.send({
                    code: '1000005',
                    message: '班级id不存在',
                });
            } else {
                let sql = `DELETE FROM classes WHERE classId in ${str}`
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