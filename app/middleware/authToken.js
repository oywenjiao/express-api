const jwt = require('../tool/JwtService');

module.exports = function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['token'];
    if (token) {
        jwt.verifyToken(token).then((data) => {
            req.decoded = data;
            next();
        }, (err) => {
            res.send({code: -1, msg: "无效的token,请重新登录!", sub_code: err});
        });
    } else {
        res.send({code: -1, msg: "无token信息,请登录后再试!", sub_code: ""});
    }
};
