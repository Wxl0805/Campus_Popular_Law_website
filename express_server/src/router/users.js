/*
 * @Author: [吴志远]
 * @Date: 2022-02-17 17:20:27
 * @LastEditors: [吴志远]
 * @LastEditTime: 2022-02-23 13:50:39
 * @Description: 用户管理接口
 * @FilePath: \express_server\src\router\users.js
 */
const express = require('express')
const router = express.Router()
// 导入数据库连接
const createConnection = require('../config/mysql')
//导入token和权限验证中间件
const verifyToken = require('../middlewares/verifyTokenAndAuthority')
// 导入自定义加密中间件
const md5password = require('../middlewares/md5password')
const md5 = require('js-md5')
// 导入fs
const fs = require('fs')


// 通过id查询用户
router.get('/query/:id', verifyToken, (req, res) => {
  // 创建数据库连接查询
  createConnection(res, `SELECT * from users WHERE userId='${req.params.id}'`, null, function(result){
    if(result !== false) {
      if(result.length > 0) { 
        res.send({
          code: '0000000',
          message: '请求成功',
          data: result[0]
        });
      }else {
        res.send({
          code: '1000005',
          message: '用户id不存在',
        });
      }
    }
  });
})

// 查询所有用户
router.get('/queryAll', verifyToken, (req, res) => {
  // 创建数据库连接查询
  createConnection(res, `SELECT * from users`, null, function(result){
    if(result !== false) {
      res.send({
        code: '0000000',
        message: '请求成功',
        data: result
      });
    }
  });
})

// 分页条件查询用户
router.post('/page', verifyToken, (req, res) => {
  let data = req.body;
  // 获取分页条件
  let pageNo = Number(data.pageNo);
  let pageSize = Number(data.pageSize);
  // 当前页面都一条索引,数据库第一条数据是零
  let currentFirstIndex = (pageNo-1)*pageSize;
  // 查询sql语句  LIMIT分页截取
  let sql;
  if(!data.status) {
    sql = `SELECT * from users WHERE userName LIKE '%${data.searchInfo}%' OR name LIKE '%${data.searchInfo}%'`;
  }else {
    sql = `SELECT * from users WHERE (userName LIKE '%${data.searchInfo}%' OR name LIKE '%${data.searchInfo}%') AND status=${data.status}`;
  }
  // 创建数据库连接查询
  createConnection(res, sql, null, function(result){
    if(result !== false) {
      res.send({
        code: '0000000',
        message: '请求成功',
        data: {
          total: result.length,
          pageNo,
          pageSize,
          dataList:result.slice(currentFirstIndex, currentFirstIndex + pageSize)
        }
      });
    }
  });
})

// 新建用户
router.post('/create', verifyToken, md5password, (req, res) => {
  let data = req.body;
  // 数据库操作先检出是否已经存在当前帐号
  createConnection(res, `SELECT * from users WHERE userName='${data.userName}'`, null, function(result1){
    if(result1 !== false) {
      if(result1.length > 0) { //用户名存在时
        res.send({
          code: '1000002',
          message: '用户名已存在',
        });
      }else {  //当用户名不存在，往数据库插入
        // 插入的sql语句
        const addSql = 'INSERT INTO users(userName,password,avatar,name,mobile,email,roleId,departmentId,status) VALUES(?,?,?,?,?,?,?,?,?)';
        // 插入的值
        const addSqlParams = [data.userName,data.password,data.avatar,data.name,data.mobile,data.email,data.roleId?data.roleId:null,data.departmentId?data.departmentId:null,data.status];
        createConnection(res, addSql, addSqlParams, function(result2){
          if(result2 !== false) {
            res.send({
              code: '0000000',
              message: '请求成功',
            });
            // 修改部门成员数
            createConnection(res, `UPDATE departments SET member = member + 1 WHERE departmentId = ${data.departmentId}`);    
          } 
        });    
      }
    }
  });
})

// 修改用户
router.post('/modify', verifyToken, (req, res) => {
  let data = req.body;
  // 数据库操作先检出是否已经存在当前帐号
  createConnection(res, `SELECT * from users WHERE userId='${data.userId}'`, null, function(result1){
    if(result1 !== false) {
      if(result1.length === 0) { //用户id不存在时
        res.send({
          code: '1000005',
          message: '当前用户id不存在',
        });
      }else { 
        // sql语句
        const sql = 'UPDATE users SET avatar=?,name=?,mobile=?,email=?,roleId=?,departmentId=? WHERE userId = ?';
        // 插入的值
        const sqlParams = [data.avatar,data.name,data.mobile,data.email,data.roleId?data.roleId:null,data.departmentId?data.departmentId:null,data.userId];
        // 创建数据库连接查询
        createConnection(res, sql, sqlParams, function(result){
          if(result !== false) {
            res.send({
              code: '0000000',
              message: '请求成功',
            });
            if(result1[0].departmentId !== data.departmentId) {
              // 修改部门成员数
              createConnection(res, `UPDATE departments SET member = member - 1 WHERE departmentId = ${result1[0].departmentId}`);
              createConnection(res, `UPDATE departments SET member = member + 1 WHERE departmentId = ${data.departmentId}`);    
            }
            // 当前修改的用户为自己时，更新当前角色id
            const userId = Number(fs.readFileSync('./currentUserId.txt'));
            if(userId === data.userId) {
              fs.writeFileSync('./currentRoleId.txt', String(data.roleId));
            }
          }
        });
      }
    }
  })
})

// 删除用户
router.delete('/delete/:ids', verifyToken, (req, res) => {
  let ids = JSON.parse(req.params.ids);
  if(ids.length === 0) {
    res.send({
      code: '1000006',
      message: '用户id不能为空',
    });
    return;
  }
  let str = '('
  ids.forEach((item,i)=>{
    if(i == ids.length-1) {
      str = str + item;
    }else {
      str = str + item + ', '
    }
  })
  str += ')';
  createConnection(res, `SELECT * FROM users WHERE userId in ${str}`, null, function(result1){
    if(result1 !== false) {
      if(result1.length !== ids.length) {
        res.send({
          code: '1000005',
          message: '用户id不存在',
        });
      }else{
        let sql = `DELETE FROM users WHERE userId in ${str}`
        // 创建数据库连接查询
        createConnection(res, sql, null, function(result2){
          if(result2 !== false) {
            res.send({
              code: '0000000',
              message: '请求成功',
            });
            result1.forEach(item=>{
              // 修改部门成员数
              createConnection(res, `UPDATE departments SET member = member - 1 WHERE departmentId = ${item.departmentId}`);
            })
          }
        });
      }
    }
  })
})

// 修改用户密码
router.post('/password/modify', verifyToken, md5password, (req, res) => {
  let data = req.body
  // 数据库操作先检出是否已经存在当前帐号
  createConnection(res, `SELECT * from users WHERE userId='${data.userId}'`, null, function(result1){
    if(result1 !== false) {
      if(result1.length === 0) { //用户id不存在时
        res.send({
          code: '1000005',
          message: '当前用户id不存在',
        });
      }else {
        if(!data.oldpassword && !data.password) { //重置密码
          // sql语句
          const sql = 'UPDATE users SET password=? WHERE userId = ?';
          let password = md5(result1[0].userName + '123456');
          // 插入的值
          const sqlParams = [md5(password + md5(password).split(10,10)),data.userId];
          // 创建数据库连接查询
          createConnection(res, sql, sqlParams, function(result){
            if(result !== false) {
              res.send({
                code: '0000000',
                message: '请求成功',
              });
            }
          });
        }else { // 修改密码
          if(data.oldpassword !== result1[0].password) {
            res.send({
              code: '1000007',
              message: '原密码错误',
            });
            return;
          }
          // sql语句
          const sql = 'UPDATE users SET password=? WHERE userId = ?';
          // 插入的值
          const sqlParams = [data.password,data.userId];
          // 创建数据库连接查询
          createConnection(res, sql, sqlParams, function(result2){
            if(result2 !== false) {
              res.send({
                code: '0000000',
                message: '请求成功',
              });
            }
          });
        }
      }
    }
  })
})

// 修改用户状态
router.get('/status/modify/:id', verifyToken, (req, res) => {
  if(!req.params.id) {
    res.send({
      code: '1000006',
      message: '用户id不能为空',
    });
    return;
  }
  // 数据库操作先检出是否已经存在当前帐号
  createConnection(res, `SELECT * from users WHERE userId='${req.params.id}'`, null, function(result1){
    if(result1 !== false) {
      if(result1.length === 0) { //用户id不存在时
        res.send({
          code: '1000005',
          message: '当前用户id不存在',
        });
      }else {
        // sql语句
        const sql = 'UPDATE users SET status=? WHERE userId = ?';
        // 插入的值
        let status = result1[0].status===1?2:1;
        const sqlParams = [status,req.params.id];
        // 创建数据库连接查询
        createConnection(res, sql, sqlParams, function(result2){
          if(result2 !== false) {
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