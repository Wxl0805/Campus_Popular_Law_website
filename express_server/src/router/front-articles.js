const express = require('express')
const router = express.Router()
    // 导入数据库连接
const createConnection = require('../config/mysql')
    //导入token和权限验证中间件
const verifyToken = require('../middlewares/frontverifyTokenAndAuthority')
const dateChangeFormat = require('../utils/dateFormatter')

// 通过id查询文章
router.get('/query/:id', (req, res) => {
    // 创建数据库连接查询
    createConnection(res, `SELECT * from articles WHERE id='${req.params.id}'`, null, function(result) {
        if (result !== false) {
            if (result.length > 0) {
                result = result.map((item) => {
                    item.time = dateChangeFormat('YYYY-mm-dd HH:MM:SS', item.time);
                    return item;
                })
                res.send({
                    code: '0',
                    message: '请求成功',
                    data: result[0]
                });
            } else {
                res.send({
                    code: '7',
                    message: '该文章不存在',
                });
            }
        }
    });
})

// 分页查询文章
router.post('/page', (req, res) => {
    let data = req.body;
    // 获取分页条件
    let { newsId, page, pageSize } = data;
    // 查询sql语句  LIMIT分页截取
    let params = [newsId, (parseInt(page) - 1) * parseInt(pageSize), parseInt(pageSize)]
    let sql = `select * from articles WHERE newsId = ? ORDER BY time DESC limit ?,?`;
    // 创建数据库连接查询
    createConnection(res, sql, params, function(result) {
        if (result !== false) {
            let sqlTotal = `select count(*) as total from articles WHERE newsId = ${newsId}` //as更换名称
            result = result.map((item) => {
                item.time = dateChangeFormat('YYYY-mm-dd HH:MM:SS', item.time);
                return item;
            })
            createConnection(res, sqlTotal, null, function(result1) {
                if (result1 !== false) {
                    let total = result1[0]['total'] //查询表中的数量
                    res.send({
                        code: '0',
                        message: '请求成功',
                        data: {
                            list: result
                        },
                        page: page,
                        pageSize: pageSize,
                        total: total
                    });
                }
            })
        }
    });
})

// 导出
module.exports = router;