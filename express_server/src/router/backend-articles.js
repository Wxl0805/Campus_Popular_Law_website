const express = require('express')
const router = express.Router()
    // 导入数据库连接
const createConnection = require('../config/mysql')
    //导入token和权限验证中间件
const verifyToken = require('../middlewares/verifyTokenAndAuthority')
    // 导入fs
const fs = require('fs')
const dateChangeFormat = require('../utils/dateFormatter')


// 通过id查询文章
router.get('/query/:id', verifyToken, (req, res) => {
    // 创建数据库连接查询
    createConnection(res, `SELECT * from articles WHERE id='${req.params.id}'`, null, function(result) {
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
                    message: '文章不存在',
                });
            }
        }
    });
})

// 分页条件查询文章
router.post('/page', verifyToken, (req, res) => {
    let data = req.body;
    // 获取分页条件
    let pageNo = Number(data.pageNo);
    let pageSize = Number(data.pageSize);
    // 当前页面都一条索引,数据库第一条数据是零
    let currentFirstIndex = (pageNo - 1) * pageSize;
    // 查询sql语句  LIMIT分页截取
    let sql = `SELECT * from articles WHERE id LIKE '%${data.searchInfo}%' OR 
    author LIKE '%${data.searchInfo}%' OR title LIKE '%${data.searchInfo}%'
    OR newsName LIKE '%${data.searchInfo}%' ORDER BY time DESC`;
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

// 新建文章
router.post('/create', verifyToken, (req, res) => {
    let data = req.body;
    // 获取时间戳，转换成datetime
    let timestamp = Date.parse(new Date());
    let date = new Date(timestamp);
    date = dateChangeFormat('YYYY-mm-dd HH:MM:SS', date);
    // 映射newsId和newsName关系
    let map = new Map();
    map.set(1, '网站公告');
    map.set(2, '热点资讯');
    map.set(3, '法律常识');
    map.set(4, '法律法规');
    map.set(5, '依法治校');
    map.set(6, '安全校园');
    map.set(7, '政策解读');
    map.set(8, '法律故事');
    map.set(9, '国家时事');

    // 插入的sql语句
    const addSql = 'INSERT INTO articles(newsId,newsName,title,content,author,titleImg,time) VALUES(?,?,?,?,?,?,?)';
    // 插入的值
    const addSqlParams = [data.newsId, map.get(data.newsId), data.title, data.content, data.author, data.titleImg, date];
    createConnection(res, addSql, addSqlParams, function(result) {
        if (result !== false) {
            res.send({
                code: '0000000',
                message: '请求成功',
            });
        }
    })
})

// 修改文章
router.post('/modify', verifyToken, (req, res) => {
    let data = req.body;
    // 数据库操作先检出是否已经存在当前文章
    createConnection(res, `SELECT * from articles WHERE id='${data.id}'`, null, function(result1) {
        if (result1 !== false) {
            if (result1.length === 0) { //文章id不存在时
                res.send({
                    code: '1000005',
                    message: '文章不存在',
                });
            } else {
                // 映射newsId和newsName关系
                let map = new Map();
                map.set(1, '网站公告');
                map.set(2, '热点资讯');
                map.set(3, '法律常识');
                map.set(4, '法律法规');
                map.set(5, '依法治校');
                map.set(6, '安全校园');
                map.set(7, '政策解读');
                map.set(8, '法律故事');
                map.set(9, '国家时事');
                // 修改的sql语句
                const editSql = 'UPDATE articles SET newsId=?,newsName=?,title=?,content=?,author=?,titleImg=? WHERE id = ?';
                // 修改的值
                const editSqlParams = [data.newsId, map.get(data.newsId), data.title, data.content, data.author, data.titleImg, data.id];
                createConnection(res, editSql, editSqlParams, function(result) {
                    if (result !== false) {
                        res.send({
                            code: '0000000',
                            message: '请求成功',
                        });
                    }
                })
            }
        }
    })
})

// 删除文章
router.delete('/delete/:ids', verifyToken, (req, res) => {
    let ids = JSON.parse(req.params.ids);
    if (ids.length === 0) {
        res.send({
            code: '1000006',
            message: '文章id不能为空',
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
    createConnection(res, `SELECT * FROM articles WHERE id in ${str}`, null, function(result1) {
        if (result1 !== false) {
            if (result1.length !== ids.length) {
                res.send({
                    code: '1000005',
                    message: '文章不存在',
                });
            } else {
                let sql = `DELETE FROM articles WHERE id in ${str}`
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