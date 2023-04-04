// 导入md5加密
const md5 = require('js-md5')
const md5password = (req, res, next) => {
        if (req.body.oldpassword) {
            let oldpassword = md5(req.body.oldpassword + md5(req.body.oldpassword).split(10, 10));
            req.body.oldpassword = oldpassword;
        }
        if (req.body.password) {
            let password = md5(req.body.password + md5(req.body.password).split(10, 10));
            req.body.password = password;
        }
        next();
    }
    // 导出
module.exports = md5password;