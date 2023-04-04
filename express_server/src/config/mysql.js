// 导入mysql连接包
const mysql = require('mysql')

const createConnection = (res, sql, params = null, callback = null) => {
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
    connection.query(sql, params, async(err, result) => {
        if (err) {
            res.send({
                code: '1000001',
                message: err.message
            });
            ret = false;
        } else {
            ret = result;
        }
        // 操作结束后断开数据库连接
        connection.end();
        callback && callback(ret);
    })
}
module.exports = createConnection;