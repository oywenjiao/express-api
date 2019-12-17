const express = require('express');
var router = express.Router();
let controllerFile = '';
let controllerFun = '';

const helper = require(process.cwd() + '/app/tool/Helper');

router.use(function (req, res, next) {
    // 获取当前接口地址
    let pathname = req._parsedUrl.pathname;
    // 查找逻辑处理文件
    controllerFile = process.cwd() + '/app/controller/v2' + pathname + '.js';
    try {
        // 载入文件
        controllerFun = require(controllerFile);
        // 继续执行
        next();
    } catch (e) {
        return res.json({code: 404, msg: '非法请求'});
    }
});

router.get('/test/list', function (req, res) {
    controllerFun(req, res, helper);
});

module.exports = router;
