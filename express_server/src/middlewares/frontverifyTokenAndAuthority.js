// 导入fs
const fs = require('fs')
    // 导入jwt
const jwt = require('jsonwebtoken')
    // 导入数据库连接
const createConnection = require('../config/mysql')

const verifyToken = (req, res, next) => {
        if (!req.headers.authorization) {
            res.status(401).send({
                code: '7',
                message: '无token权限'
            });
            return;
        }
        // 获取请求头的token做验证
        let temp = req.headers.authorization.split(' ');
        let _token = temp[temp.length - 1];
        // 读取文件中定义的jwt_secret
        const jwt_secret = fs.readFileSync('./.env', 'utf-8');
        // 验证token
        jwt.verify(_token, jwt_secret, (err, decoded) => {
            // console.log(decoded.userId); //可以拿到用户id
            if (err) { //token验证失败时
                res.status(403).send({
                    code: '7',
                    message: 'token验证失败',
                });
                return;
            } else {
                next();
            }
        })
    }
    // 导出
module.exports = verifyToken;