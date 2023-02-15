/*
 * @Author: [吴志远]
 * @Date: 2022-02-17 14:48:58
 * @LastEditors: [吴志远]
 * @LastEditTime: 2022-08-23 15:27:00
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \express_server\src\config\mysql.js
 */
// 导入mysql连接包
const mysql = require('mysql')

const createConnection = (res, sql, params=null,callback=null)=> {
  // 创建数据库连接
  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'management'
  });
  // 连接数据库
  connection.connect();
  let ret = false;
  // 查询
  connection.query(sql, params, async(err, result)=>{
    if(err) {
      res.send({
        code: '1000001',
        message: err.message
      });
      ret = false;
    }else {
      ret = result;
    }
    // 操作结束后断开数据库连接
    connection.end();
    callback && callback(ret);
  })
}
module.exports = createConnection;
