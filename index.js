const express = require('express');
const bodyParser = require('body-parser');
// 加载配置
const config = require('./app/config/env');

// 实例化对象
const app = express();
// 载入请求体中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 加载路由
const V1Router = require('./app/routes/v1');
app.use('/v1', V1Router);

// 单一入口
app.post('/gate', function (req, res) {
    let v = req.headers.v;
    let method = req.headers.method;
    let timestamp = req.headers.timestamp;
    if (!v || !method || !timestamp) {
        res.json({
            code: 401,
            msg: '缺失必要参数!',
            sub_code: 'lack must params'
        });
    }
    let apiFile = './app/controller/v'+v+'/'+method.replace('.','/').replace('.','/')+'.js';
    try {
        var apiController = require(apiFile);
        return res.json(apiController(req.body));
    } catch (e) {
        return res.json({
            code: 501,
            msg: '非法请求'
        });
    }
});

app.listen(config.prot, () => console.log('this app listening on port '+config.prot));
