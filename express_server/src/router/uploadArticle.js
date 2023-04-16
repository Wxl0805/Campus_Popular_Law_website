const express = require('express')
const router = express.Router()
    // 导入fs
const fs = require('fs')
    //导入token和权限验证中间件
const verifyToken = require('../middlewares/verifyTokenAndAuthority')

// 标题图片上传
router.post('/upload/titleImg', verifyToken, (req, res) => {
    let des_file = "../public/article/" + req.files[0].originalname;
    fs.readFile(req.files[0].path, (err1, data) => {
        if (err1) {
            res.send({
                code: '1000012',
                message: '上传失败',
            })
        } else {
            // 读完即可删除
            fs.unlinkSync(req.files[0].path);
            // 把内容写入新的文件
            fs.writeFile(des_file, data, (err2) => {
                if (err2) {
                    res.send({
                        code: '1000012',
                        message: '上传失败',
                    })
                    console.log(err2);
                } else {
                    res.send({
                        code: '0000000',
                        message: '请求成功',
                        filename: 'http://127.0.0.1:3000/article/' + req.files[0].originalname
                    })
                    console.log('上传成功');
                }
            })
        }
    })
})

// 导出
module.exports = router;