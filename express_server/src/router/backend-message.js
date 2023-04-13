const express = require('express')
const router = express.Router()
    // 导入数据库连接
const createConnection = require('../config/mysql')
    //导入token和权限验证中间件
const verifyToken = require('../middlewares/verifyTokenAndAuthority')
    // 导入fs
const fs = require('fs')
const dateChangeFormat = require('../utils/dateFormatter')


// 通过id查询留言
router.get('/query/:id', verifyToken, (req, res) => {
    // 创建数据库连接查询
    createConnection(res, `SELECT * from message WHERE id='${req.params.id}'`, null, function(result) {
        if (result !== false) {
            if (result.length > 0) {
                result = result.map((item) => {
                    item.time = dateChangeFormat('YYYY-mm-dd HH:MM:SS', item.time);
                    return item;
                })
                res.send({
                    code: '0000000',
                    message: '请求成功',
                    data: result[0]
                });
            } else {
                res.send({
                    code: '1000005',
                    message: '留言不存在',
                });
            }
        }
    });
})

// 分页条件查询留言
router.post('/page', verifyToken, (req, res) => {
    let data = req.body;
    // 获取分页条件
    let pageNo = Number(data.pageNo);
    let pageSize = Number(data.pageSize);
    // 当前页面都一条索引,数据库第一条数据是零
    let currentFirstIndex = (pageNo - 1) * pageSize;
    // 查询sql语句  LIMIT分页截取
    let sql = `SELECT * from message WHERE title LIKE '%${data.searchInfo}%' OR 
    userName LIKE '%${data.searchInfo}%' OR userId LIKE '%${data.searchInfo}%' 
    ORDER BY time DESC`;
    // 创建数据库连接查询
    createConnection(res, sql, null, function(result) {
        if (result !== false) {
            result = result.map((item) => {
                item.time = dateChangeFormat('YYYY-mm-dd HH:MM:SS', item.time);
                return item;
            })
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


// 删除留言
router.delete('/delete/:ids', verifyToken, (req, res) => {
    let ids = JSON.parse(req.params.ids);
    if (ids.length === 0) {
        res.send({
            code: '1000006',
            message: '留言id不能为空',
        });
        return;
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
    createConnection(res, `SELECT * FROM message WHERE id in ${str}`, null, function(result1) {
        if (result1 !== false) {
            if (result1.length !== ids.length) {
                res.send({
                    code: '1000005',
                    message: '留言不存在',
                });
            } else {
                let sql = `DELETE FROM message WHERE id in ${str}`
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