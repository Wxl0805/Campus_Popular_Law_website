/*
 * @Author: [吴志远]
 * @Date: 2022-02-19 14:50:15
 * @LastEditors: [吴志远]
 * @LastEditTime: 2022-02-23 11:35:15
 * @Description: 权限接口
 * @FilePath: \express_server\src\router\authority.js
 */
const express = require('express')
const router = express.Router()
// 导入数据库连接
const createConnection = require('../config/mysql')
//导入token验证中间件
const verifyToken = require('../middlewares/verifyTokenAndAuthority')

// 查询角色拥有权限
router.get('/query/:id', verifyToken, (req, res) => {
  // 创建数据库连接查询
  createConnection(res, `SELECT authorities from roles WHERE roleId = ${req.params.id}`, null, function(result){
    if(result !== false) {
      let authorities =  '('+result[0].authorities+')';
      // 查询权限url
      createConnection(res, `SELECT authorityId,authorityUrl from authorities WHERE authorityId in ${authorities}`, null, function(result1){
        if(result1 !== false) {
          res.send({
            code: '0000000',
            message: '请求成功',
            data: result1
          });
        }
      });
    }
  });
});

// 修改权限
router.post('/modify', verifyToken, (req, res) => {
  let data = req.body;
  if(!data.roleId) {
    res.send({
      code: '1000005',
      message: '角色id不能为空',
    });
    return;
  }
  const sql = `UPDATE roles SET authorities= '${data.authorities}' WHERE roleId = '${data.roleId}'`;
  createConnection(res, sql, null, function(result){
    if(result !== false) {
      res.send({
        code: '0000000',
        message: '请求成功',
      });
    }
  });
})

// 导出
module.exports = router;
