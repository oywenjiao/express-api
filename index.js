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

// 测试地址
app.get('/test', function (req, res) {
    /*const Sequelize = require(process.cwd() + '/app/config/database');
    return Sequelize.authenticate().then(() => {
        res.send('success connect to the database')
    }).catch(err => {
        console.log('Unable to connect to the database:', err)
    });*/
    /*const User = require(process.cwd() + '/app/models/user');
    User.create({
        nickname: '马大哈',
        phone: '13123456789'
    }).then((ret) => {
        res.json({code: 0, msg: '添加成功'})
    }).catch((err) => {
        res.json({code: 401, msg: '添加失败'})
    })*/
    const Order = require(process.cwd() + '/app/models/order');
    Order.create({
        trade_sn: 'MY201912101744'
    }).then((ret) => {
        res.json({code: 0, msg: '订单创建成功'})
    }).catch((err) => {
        res.json({code: 401, msg: '订单创建失败' + err})
    })
});

app.listen(config.prot, () => console.log('this app listening on port '+config.prot));
