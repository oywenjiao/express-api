const jwt = require('jsonwebtoken');
const config = require(process.cwd() + '/app/config/env');
const secret = config.jwt_secret;

/**
 * 生成加密token
 * @param params
 * @param expires 该参数用来设置token有效期：1000（单位毫秒ms)、'7 days'(7天)、'1h'(1小时)
 * @returns {*}
 */
const createToken = (params, expires) => {
    return jwt.sign(params, secret, {
        expiresIn: expires
    });
};

/**
 * 对已有的token进行解密并验证
 * @param _token
 * @returns {Promise<unknown>}
 */
const verifyToken = (_token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(_token, secret, (err, decoded) => {
            if (err) {
                resolve({code: 404, msg: 'token 失效', sub_code: err.message});
            }
            resolve({code: 0, decoded: decoded});
        });
    })
};

module.exports = {
    createToken,
    verifyToken
};
// exports.createToken = createToken;
// exports.verifyToken = verifyToken;
