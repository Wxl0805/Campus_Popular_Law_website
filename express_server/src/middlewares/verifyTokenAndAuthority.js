/*
 * @Author: [吴志远]
 * @Date: 2022-02-18 09:03:25
 * @LastEditors: [吴志远]
 * @LastEditTime: 2022-02-23 13:38:24
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \express_server\src\middlewares\verifyTokenAndAuthority.js
 */
// 导入fs
const fs = require('fs')
    // 导入jwt
const jwt = require('jsonwebtoken')
    // 导入数据库连接
const createConnection = require('../config/mysql')

const verifyToken = (req, res, next) => {
        if (!req.headers.authorization) {
            res.send({
                code: '1000010',
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
                res.send({
                    code: '1000000',
                    message: 'token验证失效'
                });
                return;
            } else {
                // 进行操作权限验证
                // 获取当前用户所属角色id
                const roleId = Number(fs.readFileSync('./currentRoleId.txt'));
                // 查询当前角色的权限id
                createConnection(res, `SELECT authorities from roles WHERE roleId='${roleId}'`, null, function(result1) {
                    if (result1 !== false) {
                        let authorities = '(' + result1[0].authorities + ')';
                        createConnection(res, `SELECT authorityUrl from authorities WHERE authorityId in ${authorities}`, null, function(result2) {
                            if (result2 !== false) {
                                let bool = false;
                                result2.forEach(item => {
                                    let reg = new RegExp('^' + item.authorityUrl.split(':')[1], 'gim');
                                    if (reg.test(req.originalUrl)) {
                                        bool = true;
                                    }
                                });
                                if (!bool) {
                                    res.send({
                                        code: '1000008',
                                        message: '无当前操作权限'
                                    });
                                } else {
                                    next();
                                }
                            }
                        })
                    }
                })
            }
        })
    }
    // 导出
module.exports = verifyToken;