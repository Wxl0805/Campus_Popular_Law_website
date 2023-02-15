/*
 * @Author: [吴志远]
 * @Date: 2022-02-17 14:58:59
 * @LastEditors: [吴志远]
 * @LastEditTime: 2022-02-21 13:34:17
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \express_server\src\middlewares\md5password.js
 */
// 导入md5加密
const md5 = require('js-md5')
 const md5password = (req,res,next)=>{
  if(req.body.oldpassword) {
    let oldpassword = md5(req.body.oldpassword + md5(req.body.oldpassword).split(10,10));
    req.body.oldpassword = oldpassword;
  }
  if(req.body.password) {
    let password = md5(req.body.password + md5(req.body.password).split(10,10));
    req.body.password = password;
  }
  next();
}
// 导出
module.exports = md5password;