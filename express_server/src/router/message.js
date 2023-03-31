const express = require('express')
const router = express.Router()
    // 导入数据库连接
const createConnection = require('../config/mysql')
    //导入token和权限验证中间件
const verifyToken = require('../middlewares/frontverifyTokenAndAuthority')

// 提交留言
router.post('/submitMessage', verifyToken, (req, res) => {
    let data = req.body;
    let { title, content, userId, userName, phone, email, time } = data;
    // 插入的sql语句
    const addSql = 'INSERT INTO message(title,content,userId,userName,phone,email,time) VALUES(?,?,?,?,?,?,?)';
    // 插入的值
    const addSqlParams = [title, content, userId, userName, phone, email, time];
    // 数据库操作先检出是否已经存在当前帐号
    createConnection(res, addSql, addSqlParams, function(result1) {
        if (result1 !== false) {
            res.send({
                code: '0',
                message: '请求成功',
            });
        }
    })
})

// 导出
module.exports = router;