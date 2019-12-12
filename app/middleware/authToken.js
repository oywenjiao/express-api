const {verifyToken} = require('../tool/JwtService');

module.exports = function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['token'];
    if (token) {
        verifyToken(token).then((data) => {
            if (data.code == 0) {
                req.decoded = data;
                next();
            } else {
                res.send({code: -1, msg: "无效的token,请重新登录!"});
            }
        })
    } else {
        res.send({code: -1, msg: "无token信息,请登录后再试!"});
    }
};
