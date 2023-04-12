const express = require('express')
const router = express.Router()
    // 导入数据库连接
const createConnection = require('../config/mysql')
    //导入token和权限验证中间件
const verifyToken = require('../middlewares/verifyTokenAndAuthority')
    // 导入fs
const fs = require('fs')
const dateChangeFormat = require('../utils/dateFormatter')


// 通过id查询视频
router.get('/query/:videoId', verifyToken, (req, res) => {
    // 创建数据库连接查询
    createConnection(res, `SELECT * from videos WHERE videoId='${req.params.videoId}'`, null, function(result) {
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
                    message: '视频不存在',
                });
            }
        }
    });
})

// 分页条件查询视频
router.post('/page', verifyToken, (req, res) => {
    let data = req.body;
    // 获取分页条件
    let pageNo = Number(data.pageNo);
    let pageSize = Number(data.pageSize);
    // 当前页面都一条索引,数据库第一条数据是零
    let currentFirstIndex = (pageNo - 1) * pageSize;
    // 查询sql语句  LIMIT分页截取
    let sql = `SELECT * from videos WHERE videoId LIKE '%${data.searchInfo}%' OR 
    author LIKE '%${data.searchInfo}%' OR title LIKE '%${data.searchInfo}%' ORDER BY time DESC`;
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

// 新建视频
router.post('/create', verifyToken, (req, res) => {
    let data = req.body;
    // 获取时间戳，转换成datetime
    let timestamp = Date.parse(new Date());
    let date = new Date(timestamp);
    date = dateChangeFormat('YYYY-mm-dd HH:MM:SS', date);

    // 插入的sql语句
    const addSql = 'INSERT INTO videos(title,videoUrl,author,videoTitleImg,time) VALUES(?,?,?,?,?)';
    // 插入的值
    const addSqlParams = [data.title, data.videoUrl, data.author, data.videoTitleImg, date];
    createConnection(res, addSql, addSqlParams, function(result) {
        if (result !== false) {
            res.send({
                code: '0000000',
                message: '请求成功',
            });
        }
    })
})

// 修改视频
router.post('/modify', verifyToken, (req, res) => {
    let data = req.body;
    // 数据库操作先检出是否已经存在当前视频
    createConnection(res, `SELECT * from videos WHERE videoId='${data.videoId}'`, null, function(result1) {
        if (result1 !== false) {
            if (result1.length === 0) { //视频id不存在时
                res.send({
                    code: '1000005',
                    message: '视频不存在',
                });
            } else {
                // 修改的sql语句
                const editSql = 'UPDATE videos SET title=?,videoUrl=?,author=?,videoTitleImg=? WHERE videoId = ?';
                // 修改的值
                const editSqlParams = [data.title, data.videoUrl, data.author, data.videoTitleImg, data.videoId];
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

// 删除视频
router.delete('/delete/:ids', verifyToken, (req, res) => {
    let ids = JSON.parse(req.params.ids);
    if (ids.length === 0) {
        res.send({
            code: '1000006',
            message: '视频id不能为空',
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
    createConnection(res, `SELECT * FROM videos WHERE videoId in ${str}`, null, function(result1) {
        if (result1 !== false) {
            if (result1.length !== ids.length) {
                res.send({
                    code: '1000005',
                    message: '视频不存在',
                });
            } else {
                let sql = `DELETE FROM videos WHERE videoId in ${str}`
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