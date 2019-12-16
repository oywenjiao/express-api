'use strict';

const express = require('express');
var router = express.Router();
let controllerFile = '';
let controllerFun = '';

router.post('/', function (req, res) {
    return res.send('this response with v1 version');
});

// 路由中间件，验证公共参数
router.use(function (req, res, next) {
    let timestamp = req.headers.timestamp;
    let current = Date.parse(new Date()) / 1000;    // 当前时间戳
    let validTime = 300;    // 时间戳有效期5分钟
    if (!timestamp || timestamp > current || timestamp < current - validTime) {
        /*return res.json({
            code: 401,
            msg: 'timestamp 参数无效',
            sub_code: 'timestamp params invalid'
        });*/
    }
    // 获取当前接口地址
    let pathname = req._parsedUrl.pathname;
    // 查找逻辑处理文件
    controllerFile = process.cwd() + '/app/controller/v1' + pathname + '.js';
    try {
        // 载入文件
        controllerFun = require(controllerFile);
        // 继续执行
        next();
    } catch (e) {
        return res.json({code: 404, msg: '非法请求'});
    }
});

// token验证中间件，需要登录的接口直接调用即可
const authToken = require(process.cwd() + '/app/middleware/authToken');
// 公共方法
const helper = require(process.cwd() + '/app/tool/Helper');

/** =============================== 产品相关的接口路由 =============================== **/
// 获取产品列表
router.post('/product/search', function (req, res) {
    controllerFun(req, res, helper);
});

/** =============================== 用户相关的接口路由 =============================== **/
// 获取用户信息
router.post('/user/info', authToken, function (req, res) {
    controllerFun(req, res, helper);
});

/** =============================== 订单相关的接口路由 =============================== **/
// 获取订单列表
router.post('/order/list', authToken, function (req, res) {
    controllerFun(req, res, helper);
});

/** =============================== 匹配不到路由时的处理 =============================== **/

// 错误路由捕获
router.get('*', function (req, res) {
    return res.status(404).json({code: 404, msg: '非法请求'});
});
router.post('*', function (req, res) {
    return res.status(404).json({code: 404, msg: '非法请求'});
});

module.exports = router;
