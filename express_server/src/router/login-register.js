/*
 * @Author: [吴志远]
 * @Date: 2022-02-17 15:07:50
 * @LastEditors: [吴志远]
 * @LastEditTime: 2022-02-23 13:48:27
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \express_server\src\router\login-register.js
 */
const express = require('express')
const router = express.Router()
// 导入自定义加密中间件
const md5password = require('../middlewares/md5password')
// 导入数据库连接
const createConnection = require('../config/mysql')
// 导入jwt
const jwt = require('jsonwebtoken')
// 导入fs
const fs = require('fs')

// 注册接口
router.post('/register', md5password, (req, res) => {
  let data = req.body;
  // 数据库操作先检出是否已经存在当前帐号
  createConnection(res, `SELECT * from users WHERE userName='${data.userName}'`, null, function(result1){
    if(result1 !== false) {
      if(result1.length > 0) { //用户名存在时
        res.send({
          code: '1000002',
          message: '用户名已被注册',
        });
      }else {  //当用户名不存在，往数据库插入
        // 插入的sql语句
        const addSql = 'INSERT INTO users(userName,password,name,mobile,email) VALUES(?,?,?,?,?)';
        // 插入的值
        const addSqlParams = [data.userName,data.password,data.name,data.mobile,data.email];
        createConnection(res, addSql, addSqlParams, function(result2){
          if(result2 !== false) {
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

// 登录接口
router.post('/login', md5password, (req, res) => {
  let data = req.body;
  // 数据库操作,做账号密码判断
  createConnection(res, `SELECT * from users WHERE userName='${data.userName}' AND password='${data.password}'`,null,function(result){
    if(result !== false) {
      if(result.length > 0) { //用户名密码存在时
        // 判断当前账号是否激活
        if(result[0].status === 2) {
          res.send({
            code: '1000004',
            message: '账号未激活,请联系管理员',
          });
          return;
        }
        // 读取文件中定义的jwt_secret
        const jwt_secret = fs.readFileSync('./.env', 'utf-8');
        // 发布token
        let token = jwt.sign({ userId: result[0].userId }, jwt_secret, { expiresIn: '1d' });
        delete result[0].password;
        res.send({
          code: '0000000',
          message: '请求成功',
          token: token,
          data: result[0]
        });
        fs.writeFileSync('./currentUserId.txt', String(result[0].userId));
        fs.writeFileSync('./currentRoleId.txt', String(result[0].roleId));
      }else { //用户名或密码错误
        res.send({
          code: '1000003',
          message: '用户名或密码错误',
        });
      }
    }
  });
})
// 导出
module.exports = router;