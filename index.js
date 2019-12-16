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
// 路由匹配模式
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
    let file = method.replace('.','/').replace('.','/') + '.js';
    let apiFile = './app/controller/v' + v + '/' + file;
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

/** ==================================================== 以下为调试代码 ==================================================== **/

// 获取token
app.get('/token', function (req, res) {
    const jwt = require(process.cwd() + '/app/tool/JwtService');
    let uid = req.body.uid;
    let token = jwt.createToken({uid: uid}, '1 days');
    res.send(token);
});

// 测试token
let authToken = require(process.cwd() + '/app/middleware/authToken');
app.get('/test', authToken, function (req, res) {
    return res.send(req.decoded);
});

// redis调试
app.get('/redis', function (req, res) {
    const redis = require('redis');
    const Promise = require('bluebird');
    // 对redis中的方法做同步处理
    Promise.promisifyAll(redis.RedisClient.prototype);
    Promise.promisifyAll(redis.Multi.prototype);
    const client = redis.createClient(6379, '192.168.0.138');
    // var aa = client.smembersAsync('test_express_api:lists');
    // var aa = client.spopAsync('test_express_api:sadd');
    // var aa = client.hkeysAsync('test_express_api:hset');
    // var aa = client.zrangebyscoreAsync('test_express_api:zadd', 95, 99);
    // var aa = client.expireatAsync('tt', 1576547700);
    // aa.then((ret) => {
    //     console.log(ret);
    //     res.json(ret);
    // });
    // const bb = client.multi().get('tt');
    // bb.execAsync().then((ret, err) => {
    //     console.log('res', ret);
    //     console.log('err', err);
    //     res.json(ret);
    // })
    // function sadd(key, ...value) {
    //     return client.saddAsync(key, value)
    // }
    /*sadd('test_express_api:sadd', 8,15,13).then((ret)=>{
        console.log(ret);
        res.json(ret);
    })*/
    client.existsAsync('ttt').then((ret, err) => {
        console.log('ret', ret);
        console.log('err', err);
        res.json(ret);
    });
});

app.listen(config.prot, () => console.log('this app listening on port ' + config.prot));
